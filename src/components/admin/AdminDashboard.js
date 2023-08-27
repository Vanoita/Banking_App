import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Flex, SimpleGrid, VStack, Text, Card, Box, Thead,
  Tbody,
  Tr,
  Th,
  Td, Table,
} from "@chakra-ui/react";
import SidebarAdmin from "./SidebarAdmin";
function AdminDashboard() {
  const [tDetails, setTDetails] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [averageTransactionAmount, setAverageTransactionAmount] = useState(0);
  const getAverageTransactionAmountURL = "http://localhost:8080/getAverageTransactionAmount";
  const getTotalTransactionsURL = "http://localhost:8080/getTotalTransactions";
  const getTotalUsersURL = "http://localhost:8080/getTotalUsers";
  const getURL = "http://localhost:8080/getAllTransactions";

  const getTransactions = () => {
    axios.get(getTotalTransactionsURL).then((response) => {
      setTotalTransactions(response.data);
    }).catch((error) => { alert(error) });
  };

  const getAverageAmount = () => {
    axios.get(getAverageTransactionAmountURL).then((response) => {
      setAverageTransactionAmount(response.data);
    }).catch((error) => { alert(error) });
  }

  const getUsers = () => {
    axios.get(getTotalUsersURL).then((response) => {
      setTotalUsers(response.data);
    }).catch((error) => { alert(error) });
  }

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


  useEffect(() => {
    getDetails();
    getTransactions();
    getAverageAmount();
    getUsers();
  });
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div>
        <Flex>
          <Flex w={"20%"} flexDir={"column"}>
            <SidebarAdmin />
          </Flex>
          <Flex flex="1" p="4" flexDirection="column">
            <SimpleGrid columns={3} spacing="4" w={"100%"} p={"2.5%"}>
              <Box bg="gray.100">
                <VStack align="start" p="4">
                  <Text>Total Transactions</Text>
                  <Text>{totalTransactions}</Text>
                </VStack>
              </Box>

              <Box bg="gray.200" p="4">
                <VStack align="start">
                  <Text>Avg. Transaction Amount</Text>
                  <Text>{averageTransactionAmount}</Text>
                </VStack>
              </Box>

              <Box bg="gray.300">
                <VStack align="start" p="4">
                  <Text>Total No.of Users</Text>
                  <Text>{totalUsers}</Text>
                </VStack>
              </Box>
            </SimpleGrid>

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
          </Flex>

        </Flex>
      </div>
    </>
  );
}

export default AdminDashboard;
