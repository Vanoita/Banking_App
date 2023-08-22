import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Button,Box,
    Input,Flex
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
    const navigate = useNavigate();
    const baseURL = "http://localhost:8080/fetchAccNo";
    const basePOST = "http://localhost:8080/transaction";
    const userId = "12345678"; //localStorage.get('username');

   
    
    const successToastMessage = () => {
        toast.success('Transaction Successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const errorToastMessage = () => {
        toast.error('Transaction Not Successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const fetchAccNo = () => {
        axios
            .get(baseURL+"/"+userId)
            .then((response) => {
                setAccNo(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
            });
    };

    useEffect(() => {
        fetchAccNo();
    }, []);

    
    const transferAmount = () => {
       const currentDate = new Date();
       const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()+1}`;
        axios.post(basePOST,
            {
                refId: nanoid(16),
                date: date,
                mode: "Fund Transfer",
                accNo:   tAccNo,
                receiverAccNo: rAcc,
                receiverName: rName,
                amount: tAmount,
                remark: tRemark

            }).then((response) => {
                
                successToastMessage();
                }).catch(error => {
                errorToastMessage();
            });
        //alert(tAccNo + rAcc + rName+ tAmount + userId+ tRemark);

    }

    const withdrawAmount = () => {
        const currentDate = new Date();
       const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()+1}`;       
        axios.post(basePOST,
            {
                refId: nanoid(16),
                date: date,
                mode: "withdraw",
                accNo: wAccNo,
                amount: wAmount,
                remark: wRemark

            }).then((response) => {
               successToastMessage();
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
                <Flex flexDir={"column"} w={"20%"}><Sidebar/></Flex>
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
                                <Input
                                    value={userId}
                                    placeholder=""
                                    size="lg"
                                    disabled="true"
                                />
                                <Text mb="18px" align="left">
                                    UserId
                                </Text>
                                {/* <Input
                  value={accNo}
                  placeholder=""
                  size="lg"
                  onChange={(e) => setAccNo(e.target.value)}
                /> */}
                                <Select placeholder='Select Account Number' value={wAccNo} onChange={e => setWAccNo(e.target.value)}>
                                    {accNo.map(accNumber => (
                                        <option>{accNumber}</option>
                                    ))}
                                </Select>
                                <Text mb="18px" align="left">
                                    Account Number
                                </Text>
                                <Input
                                    value={wAmount}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setWAmount(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Amount
                                </Text>


                                <Input
                                    value={wRemark}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setWRemark(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Remarks
                                </Text>

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
                                <Input
                                    value={userId}
                                    placeholder=""
                                    size="lg"
                                    disabled="true"
                                />
                                <Text mb="18px" align="left">
                                    UserId
                                </Text>
                                {/* <Input
                  value={accNo}
                  placeholder=""
                  size="lg"
                  onChange={(e) => setAccNo(e.target.value)}
                /> */}
                                <Select placeholder='Select Account Number' value={tAccNo} onChange={e => setTAccNo(e.target.value)}>
                                    {accNo.map(accNumber => (
                                        <option>{accNumber}</option>
                                    ))}
                                </Select>
                                <Text mb="18px" align="left">
                                    User Account Number
                                </Text>


                                <Input
                                    value={rName}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setRName(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Receiver Name
                                </Text>

                                <Input
                                    value={rAcc}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setRAcc(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Receiver Account Number
                                </Text>

                                <Input
                                    value={tAmount}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setTAmount(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Amount
                                </Text>

                                <Input
                                    value={tRemark}
                                    placeholder=""
                                    size="lg"
                                    onChange={(e) => setTRemark(e.target.value)}
                                />
                                <Text mb="18px" align="left">
                                    Remarks
                                </Text>
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