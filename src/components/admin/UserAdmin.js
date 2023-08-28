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
    TableContainer, Input, Heading, InputGroup, InputRightElement
} from "@chakra-ui/react";
import {FiSearch} from "react-icons/fi";

import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";

function UserAdmin() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const fetchURL = "http://localhost:8080/fetchAllUsers";


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
                                <Input placeholder='Search UserId'
                                 value={searchQuery}
                                 onChange={(e) => setSearchQuery(e.target.value)}
                                />
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
                                {users.filter(user=>user.userId.includes(searchQuery)).map(details => {
                                    return (
                                        <Tr>
                                            <Td>{details.userId}</Td>
                                            <Td>{details.firstName}</Td>
                                            <Td>{details.lastName}</Td>
                                            <Td>{details.email}</Td>
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