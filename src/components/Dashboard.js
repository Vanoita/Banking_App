import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Flex, SimpleGrid, VStack, Text, Card,Box,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td, } from "@chakra-ui/react";
function Dashboard() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [accounts, setAccounts] = useState([1,2,3]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const location = useLocation();
  const [tDetails, setTDetails] = useState([]);
  const getURL = "http://localhost:8080/getTransactions";
  const userId = "12345678"; //localStorage.get('username');
  const [totalBalance, setTotalBalance] = useState(0);

  //Function to fetch details for transaction details
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

  //Function to fetch details for account details
  const fetchAllAccount = (baseURLAccount) => {
    axios
      .get(baseURLAccount)
      .then((response) => {
        const accountData = response.data.accounts;
        setTotalBalance(
          accounts.reduce((total, account) => total + account.balance, 0)
        );
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
        <Flex>
          <Flex w={"20%"}flexDir={"column"}>
            <Sidebar />
          </Flex>
          <SimpleGrid row={2} w={"75%"} pt={"5%"} pb={"2%"}>
            <Flex>
                <Card h={"80%"} p={"2.5%"}>
                  <Text>Account Information</Text>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>Account Number</Th>
                        <Th>Balance</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {accounts.map((account) => (
                        <Tr>
                          <Td>{account.accNo}</Td>
                          <Td>{account.balance}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  </Card>
            </Flex>
            <Box>
            <Card h="80%" p={"2.5%"}>
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
                          <Td>{transaction.refId}</Td>
                          <Td>{transaction.date}</Td>
                          <Td>{transaction.amount}</Td>
                          <Td>{transaction.remarks}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
              </Card>
            </Box>
          </SimpleGrid>
          </Flex>
      </div>
    </>
  );
}

export default Dashboard;
