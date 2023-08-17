import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Input
} from "@chakra-ui/react";
import axios from "axios";

function TransactionHistory() {
    const [tDetails, setTDetails] = useState([
       {
         id:"",
        date:""
    }
    ]);
    const [accNo, setAccNo] = useState([1, 2, 3, 4]);
    const navigate = useNavigate();
    const baseURL = "http://localhost:8080/checkLogin";
    const userId = 'react170';//localStorage.get('username');
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null
    })
    const getDetails = () => {
        axios
            .get(baseURL, userId)
            .then((response) => {
                setTDetails(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    const fetchAccNo = () => {
        axios
            .get(baseURL, userId)
            .then((response) => {
                setAccNo(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        getDetails();
    }, []);
    return (
        <>
            <Helmet>
                <title>Transaction History</title>
            </Helmet>

            <h2>Transaction History</h2>
            <Table>
                <Tbody>
                    <Tr>
                        <Th>
                            <Input
                                placeholder="Select Start Date"
                                size="md"
                                type="date"
                            />
                        </Th>

                        <Th>
                            <Input
                                placeholder="Select End Date"
                                size="md"
                                type="date"
                            />
                        </Th>
                    </Tr>
                </Tbody>
            </Table>



            <TableContainer maxWidth={'100%'} align={'center'}>
                <Table variant="striped" colorScheme="blue">
                    <Thead>
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
                    </Thead>
                    <Tbody>
                        {/* /*tDetails.map(() => (
                            {/* <Tr>
                                <Td>{id}</Td>
                                <Td>{date}</Td>
                            </Tr>

                        ))*/ }
                        <Tr>
                            <Td>001</Td>
                            <Td>08/17/2023</Td>
                            <Td>13345</Td>
                            <Td>Abhinav</Td>
                            <Td>23457</Td>
                            <Td>Fund transfer</Td>
                            <Td isNumeric>2500</Td>
                            <Td>Course</Td>
                        </Tr>

                        <Tr>
                            <Td>002</Td>
                            <Td>08/17/2023</Td>
                            <Td>13765</Td>
                            <Td>Ayush</Td>
                            <Td>56755</Td>
                            <Td>Fund transfer</Td>
                            <Td isNumeric>14500</Td>
                            <Td>Trial</Td>
                        </Tr>


                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TransactionHistory;