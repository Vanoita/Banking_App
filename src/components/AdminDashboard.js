import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Flex, SimpleGrid, VStack, Text, Card, Box,Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,Table,} from "@chakra-ui/react";
import SidebarAdmin from "./SidebarAdmin";
function AdminDashboard() {
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


  //Function to fetch details for transaction details
  const getDetails = () => {
    axios
      .get(getURL)
      .then((response) => {
        setTDetails(response.data);
      })
      .catch((error) => {
        alert("error occured while loading data" + error);
      });
  };

  //Function to fetch details for account details
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

  //Function to User info
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

    const baseURLAccount = "http://localhost:8080/fetchAllAccount/";
    const baseURLUser = "http://localhost:8080/fetchUser/";
    fetchAllAccount(baseURLAccount);
    getDetails();
    fetchUser(baseURLUser);

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
        <title>Admin Dashboard</title>
      </Helmet>
      {alertMessage && (
        <div class={`alert alert-${alertType} text-center`} role="alert">
          {alertMessage}
        </div>
      )}
      <div>
        <Flex>
          <Flex w={"20%"} flexDir={"column"}>
            <SidebarAdmin/>
          </Flex>
          <Flex flex="1" p="4" flexDirection="column">
          {/* First Row */}
          <SimpleGrid columns={3} spacing="4" w={"100%"} p={"2.5%"}>
            <Box bg="gray.100">
              <VStack align="start" p="4">
                <Text>Total Transactions</Text>
                <Text>Content for Card 1</Text>
              </VStack>
            </Box>

            <Box bg="gray.200" p="4">
              <VStack align="start">
                <Text>Avg. Transaction Amount</Text>
                <Text>Content for Card 2</Text>
              </VStack>
            </Box>

            <Box bg="gray.300">
              <VStack align="start" p="4">
                <Text>Total No.of Users</Text>
                <Text>Content for Card 3</Text>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Second Row */}
          <Box mt="4">
          <Card p={"2.5%"} w={"100%"}>
                  <Text >Recent Transaction History</Text>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>Transaction ID</Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Remarks</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tDetails.map((transaction) => (
                        <Tr>
                          <Td>{transaction.id}</Td>
                          <Td>{transaction.date}</Td>
                          <Td>{transaction.amount}</Td>
                          <Td>{transaction.remarks}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
              </Card>
          </Box>
        </Flex>

        </Flex>
      </div>
    </>
  );
}

export default AdminDashboard;
