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
    TableContainer, Input, Select, Heading
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "./Sidebar";

function TransactionHistory() {
    const [tDetails, setTDetails] = useState([]);
    const [accNo, setAccNo] = useState([]);
    const getURL = "http://localhost:8080/getTransactionsByDate";
    const [selectAccNo, setSelectAccNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getTransactions = (e) => {
        axios.post(getURL,
            {
                accNo: selectAccNo,
                startDate: startDate,
                endDate: endDate
            })
            .then((response) => {
                setTDetails(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data:" + error);
            });
    }


    const fetchAccNo = (fetchURL) => {
        axios
            .get(fetchURL)
            .then((response) => {
                setAccNo(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const fetchURL = "http://localhost:8080/fetchAccNo/" + userId;;
        fetchAccNo(fetchURL);
    }, []);
    return (
        <>
            <Helmet>
                <title> Transaction History</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}><Sidebar /></Flex>
                <Box w={"80%"} p={"2.5%"} align={"center"}>
                    <Heading>Transaction History</Heading>
                    <Table align="center" maxWidth={'75%'}>
                        <Tbody>
                            <Tr>
                                <Th>
                                    <Input
                                        placeholder="Select Start Date"
                                        size="md"
                                        type="date"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                    />
                                    Start Date
                                </Th>

                                <Th>
                                    <Input
                                        placeholder="Select End Date"
                                        size="md"
                                        type="date"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                    />
                                    End Date
                                </Th>
                                <Th>
                                    <Select placeholder='Select Account Number' value={selectAccNo} onChange={e => setSelectAccNo(e.target.value)}>
                                        {accNo.map(accNumber => (
                                            <option>{accNumber}</option>
                                        ))}
                                    </Select>
                                </Th>
                                <Th>
                                    <button type="button" class="btn btn-primary" onClick={getTransactions}>Search</button>
                                </Th>
                            </Tr>
                        </Tbody>
                    </Table>



                    <TableContainer maxWidth={'100%'} align={'center'}>
                        <Table variant="striped" colorScheme="blue">

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
                            <Tbody>
                                {tDetails.map(details => {
                                    let amount = details.amount;
                                    if (details.mode === 'withdraw' || details.accNo === selectAccNo) amount = -details.amount;
                                    return (
                                        <Tr>
                                            <Td>{details.refId}</Td>
                                            <Td>{details.date}</Td>
                                            <Td>{details.accNo}</Td>
                                            <Td>{details.receiverName}</Td>
                                            <Td>{details.receiverAccNo}</Td>
                                            <Td>{details.mode}</Td>
                                            <Td>{amount}</Td>
                                            <Td>{details.remark}</Td>
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

export default TransactionHistory;