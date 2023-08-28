import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { Tabs, TabList, TabPanels, Tab, TabPanel, FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Button, Box,
    Input, Flex
} from "@chakra-ui/react";
import axios from "axios";
import { nanoid } from "nanoid";
import Sidebar from "./Sidebar";

function Transaction() {
    const [wRemark, setWRemark] = useState("");
    const [tRemark, setTRemark] = useState("");
    const [accNo, setAccNo] = useState([]);
    const [wAccNo, setWAccNo] = useState("");
    const [rName, setRName] = useState("");
    const [tAccNo, setTAccNo] = useState("");
    const [wAmount, setWAmount] = useState("");
    const [tAmount, setTAmount] = useState("");
    const [rAcc, setRAcc] = useState("");
    const basePOST = "http://localhost:8080/transaction";
    const userId = localStorage.getItem('userId');
    const [benef, setBenef] = useState([]);

    const successToastMessage = () => {
        toast.success('Transaction Successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const insufficientBalanceToastMessage = () => {
        toast.error('Insufficient Balance !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const errorToastMessage = () => {
        toast.error('Transaction Not Successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const fetchAccNo = (baseURLAccNo) => {
        axios
            .get(baseURLAccNo)
            .then((response) => {
                setAccNo(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    const fetchBeneficiary = (baseURLBenef) => {
        axios
            .post(baseURLBenef)
            .then((response) => {
                setBenef(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const baseURLAccNo = "http://localhost:8080/fetchAccNo/" + userId;
        const baseURLBenef = "http://localhost:8080/getBeneficiary/" + userId;

        fetchAccNo(baseURLAccNo);
        fetchBeneficiary(baseURLBenef);
    }, []);

    const clearFormT = () => {
        setTAccNo("");
        setRAcc("");
        setRName("");
        setTAmount("");
        setTRemark("");
    }

    const clearFormW = () => {
        setWAccNo("");
        setWAmount("");
        setWRemark("");
    }

    const transferAmount = () => {
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`;
        axios.post(basePOST,
            {
                refId: nanoid(16),
                date: date,
                mode: "Fund Transfer",
                accNo: tAccNo,
                receiverAccNo: rAcc,
                receiverName: rName,
                amount: tAmount,
                remark: tRemark

            }).then((response) => {

                if (response.data === "Insufficient funds") {
                    insufficientBalanceToastMessage();
                } else successToastMessage(); clearFormT();

            }).catch(error => {
                errorToastMessage();

                clearFormT();
            });
        //alert(tAccNo + rAcc + rName+ tAmount + userId+ tRemark);

    }

    const withdrawAmount = () => {
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`;
        axios.post(basePOST,
            {
                refId: nanoid(16),
                date: date,
                mode: "withdraw",
                accNo: wAccNo,
                amount: wAmount,
                remark: wRemark

            }).then((response) => {
                if (response.data === "Insufficient funds") {
                    insufficientBalanceToastMessage();
                } else successToastMessage();
                clearFormW();
            }).catch(error => {
                errorToastMessage();
            });
        //alert(created + " " + wAccNo + wAmount + userId + wRemark);
    }


    return (
        <>
            <Helmet>
                <title>Transaction</title>
            </Helmet>
            <Flex>
                <Flex flexDir={"column"} w={"20%"}><Sidebar /></Flex>
                <Box w={"80%"}>
                    <Tabs align="center" isFitted variant="enclosed" p={"20px"}>
                        <TabList mb="1em">
                            <Tab _selected={{ color: "white", bg: "blue.500" }}>Withdrawal</Tab>
                            <Tab _selected={{ color: "white", bg: "blue.500" }}>
                                Fund Transfer
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel align="center">
                                <Card align="center" p={"20 px"} width={"75%"}>
                                    <CardHeader>
                                        <Heading size="lg"> Withdrawal</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <FormControl>
                                            <Input
                                                value={userId}
                                                placeholder=""
                                                size="lg"
                                                disabled="true"
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'} >
                                                UserId
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={wAccNo === ''}>
                                            <Select placeholder='Select Account Number' value={wAccNo} onChange={e => setWAccNo(e.target.value)}>
                                                {accNo.map(accNumber => (
                                                    <option>{accNumber}</option>
                                                ))}
                                            </Select>
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Account Number
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={wAmount === ''}>
                                            <Input
                                                value={wAmount}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setWAmount(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Amount
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl>
                                            <Input
                                                value={wRemark}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setWRemark(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Remarks
                                            </FormLabel>
                                        </FormControl>

                                    </CardBody>
                                    <CardFooter>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => withdrawAmount()}
                                        >
                                            Withdraw
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabPanel>
                            <TabPanel>
                                <Card align="center" p={"20px"} width={"75%"}>
                                    <CardHeader>
                                        <Heading size="lg">Fund Transfer</Heading>
                                    </CardHeader>
                                    <CardBody>

                                        <FormControl>
                                            <Input
                                                value={userId}
                                                placeholder=""
                                                size="lg"
                                                disabled="true"
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                UserId
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={tAccNo === ''}>
                                            <Select placeholder='Select Account Number' value={tAccNo} onChange={e => setTAccNo(e.target.value)}>
                                                {accNo.map(accNumber => (
                                                    <option>{accNumber}</option>
                                                ))}
                                            </Select>
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                User Account Number
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl>
                                            <Select placeholder='Select Beneficiary' onChange={(e) => {
                                                if (e.target.value === "") {
                                                    setRName("");
                                                    setRAcc("");
                                                }
                                                else {
                                                    setRName(benef[e.target.value].firstName + " " + benef[e.target.value].lastName);
                                                    setRAcc(benef[e.target.value].accNo);
                                                }
                                            }}>
                                                {benef && benef.map((ben, index) => (
                                                    <option value={index}>{ben.firstName} {ben.lastName}</option>
                                                ))}
                                            </Select>
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Beneficiary Name
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={rName === ''}>
                                            <Input
                                                value={rName}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setRName(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Receiver Name
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={rAcc === ''}>
                                            <Input
                                                value={rAcc}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setRAcc(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Receiver Account Number
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl isRequired isInvalid={tAmount === ''}>
                                            <Input
                                                value={tAmount}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setTAmount(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Amount
                                            </FormLabel>
                                        </FormControl>

                                        <FormControl>
                                            <Input
                                                value={tRemark}
                                                placeholder=""
                                                size="lg"
                                                onChange={(e) => setTRemark(e.target.value)}
                                            />
                                            <FormLabel mb="18px" align="left" fontWeight={'normal'} textTransform={'none'}>
                                                Remarks
                                            </FormLabel>
                                        </FormControl>
                                    </CardBody>
                                    <CardFooter>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => transferAmount()}
                                        >
                                            Transfer
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <ToastContainer />
                </Box>
            </Flex>

        </>
    );
}

export default Transaction;