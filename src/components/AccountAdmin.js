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
    Flex, Box,
    TableContainer, Input, Select, Heading
} from "@chakra-ui/react";
import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";

function AccountAdmin() {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    const fetchURL = "http://localhost:8080/checkLogin";
    const userId = '12345678';//localStorage.get('username');


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
    }, []);
    return (
        <>
            <Helmet>
                <title>Account Details</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}><SidebarAdmin /></Flex>
                <Box w={"80%"} p={"2.5%"} align={"center"}>
                    <Heading>Account Details</Heading>
                    <TableContainer maxWidth={'100%'} align={'center'}>
                        <Table variant="striped" colorScheme="blue">

                            <Tr>
                                <Th>User ID</Th>
                                <Th>Account No</Th>
                                <Th>Account Type</Th>
                                <Th>Balance</Th>
                            </Tr>
                            <Tbody>
                                {accounts.map(details => {
                                    return (
                                        <Tr>
                                            {Object.values(details).map(val => {
                                                return (<Td>{val}</Td>)
                                            })}
                                            <Td><button>disable</button></Td>
                                        </Tr>
                                    )
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