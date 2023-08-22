import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Flex,Box,
    TableContainer, Input, Select, Heading
} from "@chakra-ui/react";
import axios from "axios";
import Sidebar from "./Sidebar";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Button
} from "@chakra-ui/react";

function AddBeneficiary(){

    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [nickName, setNickName] = useState("");
    //const basePOST = "http://localhost:8080/addBeneficiary";

    const HandleSave = () =>{
        axios.post("http://localhost:8080/addBeneficiary",
            {
                BeneficiaryName: name,
                BeneficiaryAccountNo: account,
                NickName: nickName
            }).then((response) => {
                alert(JSON.stringify(response))
                // const res = JSON.parse(response.data);
                // if(res.login){
                //     localStorage.setItem('userId',username);
                //     navigate('/dashboard');
                // }
            }).catch(error => {
                alert("error = " + error);
            });
        }
   
    return(
        <>
        <Helmet>
                <title>Add Beneficiary</title>
        </Helmet>
        <Flex>
            <Flex w={"20%"}>
                <Sidebar/>
                </Flex>

            <Card align="center" p={"20 px"} width={"75%"}>
                <CardHeader>
                    <Heading size="lg"> Add Beneficiary</Heading>
                </CardHeader>
                <CardBody>
                    <Input
                        value={name}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Enter Beneficiary Name
                    </Text>

                    <Input
                        value={account}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setAccount(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Enter Beneficiary Account No
                    </Text>

                    <Input
                        // value={wAmount}
                        placeholder=""
                        size="lg"
                        //onChange={(e) => setWAmount(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Re-enter Account No
                    </Text>


                    <Input
                        value={nickName}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setNickName(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Nickname
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button
                        colorScheme="blue"
                        //onClick={() => handleSave()}
                    >
                        Save Beneficiary
                    </Button>
                </CardFooter>
            </Card>
        </Flex>
        </>
    );
}

export default AddBeneficiary;