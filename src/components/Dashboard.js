import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Flex, SimpleGrid, Text, Card, Box, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [tDetails, setTDetails] = useState([]);

  //Function to fetch details for transaction details
  const getDetails = (getURL) => {
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

 

  useEffect(() => {
    const token = localStorage.getItem("userId");
    const baseURLAccount = "http://localhost:8080/fetchAllAccount/" + token;
    const getURL = "http://localhost:8080/getTransactions/"+token;
    fetchAllAccount(baseURLAccount);
    getDetails(getURL);
  });

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        <Flex>
          <Flex w={"20%"} flexDir={"column"}>
            <Sidebar />
          </Flex>
          <SimpleGrid row={2} w={"75%"} pt={"5%"} pb={"2%"}>
            <Box>
              <Card h={"80%"} p={"2.5%"} overflow={"scroll"}>
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
            </Box>
            <Box>
              <Card h="80%" p={"2%"} overflow={"scroll"}>
                <Text >Recent Transaction History</Text>
                <Table variant='simple' >
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
                        <Td>{transaction.remark}</Td>
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
