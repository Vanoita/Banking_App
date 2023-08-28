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
    TableContainer, Input, Select, Heading, FormControl, FormLabel
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransactionHistory() {
    const [tDetails, setTDetails] = useState([]);
    const [accNo, setAccNo] = useState([]);
    const getURL = "http://localhost:8080/getTransactionsByDate";
    const [selectAccNo, setSelectAccNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const unsuccessfulToastMessageTransactions= () => {
        toast.error("Couldn't fetch Transaction details, Please select all the required fields !", {
            position: toast.POSITION.TOP_RIGHT
        });
    };

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
                unsuccessfulToastMessageTransactions();
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
                <Flex overflow={'hidden'}><Sidebar /></Flex>
                <Box  p={"2.5%"} align={"center"}>
                    <Heading>Transaction History</Heading>
                    <Table align="center" maxWidth={'75%'}>
                        <Tbody>
                            <Tr>
                                <Th>
                                    <FormControl isRequired>
                                        <Input
                                            placeholder="Select Start Date"
                                            size="md"
                                            type="date"
                                            value={startDate}
                                            onChange={e => setStartDate(e.target.value)}
                                        />
                                        <FormLabel fontWeight={'normal'} textTransform={'none'}>Start Date</FormLabel>
                                    </FormControl>
                                </Th>

                                <Th>
                                    <FormControl isRequired>

                                        <Input
                                            placeholder="Select End Date"
                                            size="md"
                                            type="date"
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                        />
                                        <FormLabel fontWeight={'normal'} textTransform={'none'}>
                                            End Date
                                        </FormLabel>
                                    </FormControl>
                                </Th>
                                <Th>
                                    <FormControl isRequired>
                                        
                                        <Select placeholder='Select Account Number' value={selectAccNo} onChange={e => setSelectAccNo(e.target.value)}>
                                            {accNo.map(accNumber => (
                                                <option>{accNumber}</option>
                                            ))}
                                        </Select>
                                        <FormLabel fontWeight={'normal'} textTransform={'none'}>
                                            Acc.No
                                        </FormLabel>
                                    </FormControl>
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