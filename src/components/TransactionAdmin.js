import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Flex,
    Box,
    TableContainer,
    Input,
    Select,
    Heading,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";

function AccountAdmin() {
    const [tDetails, setTDetails] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const navigate = useNavigate();
    const fetchURL = "http://localhost:8080/getAllTransactions";
    const userId = "12345678"; //localStorage.get('username');

    const fetchTransactions = () => {
        axios
            .get(fetchURL)
            .then((response) => {
                setTDetails(response.data);
            })
            .catch((error) => {
                alert("error occurred while loading data" + error);
            });
    };
    const fetchAccounts = () => {
        axios
            .get(fetchURL)
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                alert("error occurred while loading data" + error);
            });
    };

    useEffect(() => {
        fetchTransactions();
        fetchAccounts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Transaction Details</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}>
                    <SidebarAdmin />
                </Flex>
                <Box w={"80%"} p={"2.5%"} align={"center"}>
                    <Heading>Transaction Details</Heading>
                    <InputGroup w={"50%"} align={"center"}>
                        <Input
                            placeholder="Search Accounts"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputRightElement>
                            <FiSearch />
                        </InputRightElement>
                    </InputGroup>
                    <TableContainer maxWidth={"100%"} align={"center"}>
                        <Table variant="striped" colorScheme="blue">
                            <Tr>
                                <Th>Transaction ID</Th>
                                <Th>Date</Th>
                                <Th>Sender account no.</Th>
                                <Th>Receiver Acc no.</Th>
                                <Th>Amount</Th>
                                <Th>Mode</Th>
                            </Tr>
                            <Tbody>
                                {tDetails.filter(details=>details.accNo.includes(searchQuery)).map((details) => {
                                    let amount = details.amount;
                                    if (details.mode === "withdraw")
                                        amount = -details.amount;
                                    return (
                                        <Tr key={details.refId}>
                                            <Td>{details.refId}</Td>
                                            <Td>{details.date}</Td>
                                            <Td>{details.accNo}</Td>
                                            <Td>{details.receiverAccNo}</Td>
                                            <Td>{amount}</Td>
                                            <Td>{details.mode}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </>
    );
}

export default AccountAdmin;
