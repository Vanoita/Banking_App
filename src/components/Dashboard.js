import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Select,
} from "@chakra-ui/react";

function Dashboard() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const [tDetails, setTDetails] = useState([]);
  const getURL = "http://localhost:8080/getTransactions";
  const userId = "12345678"; //localStorage.get('username');
  const getDetails = () => {
    axios
      .get(getURL + "/" + userId)
      .then((response) => {
        setTDetails(response.data);
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };

  const fetchAllAccount = (baseURLAccount) => {
    axios
      .get(baseURLAccount)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };
  const fetchUser = (baseURLUser) => {
    axios
      .get(baseURLUser)
      .then((response) => {
        setUser(response.data);
        //alert(JSON.stringify(response))
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("userId");
    /*if(!token) {
            navigate("/login",{state:{from: `${location.pathname}${location.search}`}});
        }
        else {*/
    const baseURLAccount = "http://localhost:8080/fetchAllAccount/" + token;
    const baseURLUser = "http://localhost:8080/fetchUser/" + token;
    fetchAllAccount(baseURLAccount);
    getDetails();
    fetchUser(baseURLUser);
    //}

    if (state && state.message && state.type) {
      setAlertMessage(state.message);
      setAlertType(state.type);

      window.history.replaceState({ state: null }, document.title);
    }
  }, [
    alertMessage,
    alertType,
    location.pathname,
    location.search,
    state,
    navigate,
  ]);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {alertMessage && (
        <div class={`alert alert-${alertType} text-center`} role="alert">
          {alertMessage}
        </div>
      )}
      <div>
        {/* <h1>{user && `Hi ${user.firstName} ${user.lastName}`}, Welcome to Dashboard</h1>
                <div>
                    {accounts.map(acc=>{
                    return (
                        <div>{acc.accNo}</div>
                    )
                    })}
                </div> */}

        <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
          <Flex
            w="25%"
            flexDir="column"
            alignItems="center"
            backgroundColor="#e0fbfc"
          >
            <Flex flexDir="column" justifyContent="space-between">
              <Flex flexDir="column" as="nav">
                <Heading
                  mt={50}
                  mb={100}
                  fontSize="4xl"
                  alignSelf="center"
                  letterSpacing="tight"
                >
                  {user && `Hi ${user.firstName} ${user.lastName}`}, Welcome to
                  Dashboard
                </Heading>
                <Flex flexDir="column" align="center" justifyContent="center">
                  <Flex>
                    {/* <Link><Icon as={FaHome} size={"500px"}/></Link> */}
                    <Link>
                      <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Home
                      </Text>
                    </Link>
                  </Flex>
                  <Flex alignItems={"center"}>
                    {/* <Icon as={"GrTransaction"}></Icon> */}
                    <Link>
                      <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Profile
                      </Text>
                    </Link>
                  </Flex>

                  <Flex alignItems={"center"}>
                    {/* <Icon as={"GrTransaction"}></Icon> */}
                    <Link to="/transaction">
                      <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Transaction
                      </Text>
                    </Link>
                  </Flex>
                  <Flex alignItems={"center"}>
                    {/* <Icon as={"GrTransaction"}></Icon> */}
                    <Link to="/transactionhistory">
                      <Text fontSize={"2xl"} fontWeight={"bold"}>
                        Transaction History
                      </Text>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="75%" p={"50px"} flexDir={"column"}>
            <Flex h=" 40vh" flexDir={"row"}>
              <Flex flexDir={"column"}>
                <Card w={"25vw"}>
                  <CardBody>
                    <Text>
                      <Heading fontSize={"27px"}>Total Balance : </Heading>
                    </Text>
                  </CardBody>
                </Card>
              </Flex>
              <Flex p={"50px"} flexDir={"column"}>
                <Accordion>
                  {accounts.map((acc) => {
                    return (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {acc.type} {acc.accNo}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {/* Show account balance 
                            Account type  */}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Flex>
            </Flex>
            <Flex flexDir={"row"}>
              <Flex>
                <h2>Recent Transaction History</h2>
              </Flex>
              <Flex flexDir={"row"}>
                <TableContainer maxWidth={"100%"} align={"center"}>
                  <Table variant="striped" colorScheme="blue">
                    <Tr>
                      <Th>Transaction ID</Th>
                      <Th>Date</Th>
                      <Th>Account Number</Th>
                      <Th>Receiver Name</Th>
                      <Th>Receiver's Account Number</Th>
                      <Th>Transaction Type</Th>
                      <Th isNumeric>Amount</Th>
                      <Th>Remarks</Th>
                    </Tr>
                    <Tbody>
                      {tDetails.map((details) => {
                        return (
                          <Tr>
                            {Object.values(details).map((val) => {
                              return <Td>{val}</Td>;
                            })}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
}

export default Dashboard;
