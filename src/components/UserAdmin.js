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
    TableContainer, Input, Select, Heading, InputGroup, InputRightElement
} from "@chakra-ui/react";
import {FiSearch} from "react-icons/fi";

import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";

function UserAdmin() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const fetchURL = "http://localhost:8080/fetchAllUsers";
    const userId = '12345678';//localStorage.get('username');


    const fetchUsers = () => {
        axios
            .get(fetchURL)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <Helmet>
                <title>User Details</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}><SidebarAdmin /></Flex>
                <Box w={"80%"} p={"2.5%"} align={"center"}>
                    <Heading>User Details</Heading>
                    <InputGroup w={"50%"} align={"center"}>
                                <Input placeholder='Search Accounts' />
                                <InputRightElement>
                                    <FiSearch />
                                </InputRightElement>
                                </InputGroup>  
                    <TableContainer maxWidth={'100%'} align={'center'}>
                        <Table variant="striped" colorScheme="blue">

                            <Tr>
                                <Th>User ID</Th>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Email</Th>
                            </Tr>
                            <Tbody>
                                {users.map(details => {
                                    return (
                                        <Tr>
                                            {Object.values(details).map(val => {
                                                return (<Td>{val}</Td>)
                                            })}
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

export default UserAdmin;