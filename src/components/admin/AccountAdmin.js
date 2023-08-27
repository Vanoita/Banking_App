import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import {
    Table,
    Tbody,
    Tr,
    Th,
    Td,
    Flex, Box,
    TableContainer, Input, Heading, InputRightElement, InputGroup, Button

} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";

function AccountAdmin() {
    const [accounts, setAccounts] = useState([]);
    const fetchURL = "http://localhost:8080/fetchAllAccounts";
    const [searchQuery, setSearchQuery] = useState("");

    const toggleHandler = (e, accNo) => {
        axios.get("http://localhost:8080/toggleDisable/" + accNo)
            .then((response) => {
                if (e.target.innerHTML === "Enable")
                    e.target.innerHTML = "Disable";
                else e.target.innerHTML = "Enable";
            })
    }


    const fetchAccounts = () => {
        axios
            .get(fetchURL)
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        fetchAccounts();
    });
    return (
        <>
            <Helmet>
                <title>Account Details</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}><SidebarAdmin /></Flex>
                <Box w={"80%"} p={"2.5%"} align={"center"}>
                    <Heading>Account Details</Heading>
                    <InputGroup w={"50%"} align={"center"}>
                        <Input placeholder='Search Accounts'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                        <InputRightElement>
                            <FiSearch />
                        </InputRightElement>
                    </InputGroup>
                    <TableContainer maxWidth={'100%'} align={'center'}>
                        <Table variant="striped" colorScheme="blue">

                            <Tr>
                                <Th>User ID</Th>
                                <Th>Account No</Th>
                                <Th>Account Type</Th>
                                <Th>Balance</Th>
                                <Th>Enable/Disable</Th>
                            </Tr>
                            <Tbody>
                                {accounts.filter(account => account.accNo.includes(searchQuery)).map(details => {
                                    return (
                                        <Tr>
                                            <Td>{details.userId}</Td>
                                            <Td>{details.accNo}</Td>
                                            <Td>{details.accType}</Td>
                                            <Td>{details.balance}</Td>
                                            <Td><Button onClick={(e) => toggleHandler(e, details.accNo)}>{details.disabled ? "Enable" : "Disable"}</Button></Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>
            </Flex >
        </>
    );
}

export default AccountAdmin;