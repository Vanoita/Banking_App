import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

import {
    Flex, Input, Heading
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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddBeneficiary(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [account, setAccount] = useState("");
    const [nickName, setNickName] = useState("");
    const [reTAccNo, setReTAccNo] = useState("");
    const basePOST = "http://localhost:8080/addBeneficiary";
    const userId = localStorage.getItem("userId");

     
    const successToastMessage = () => {
        toast.success('Beneficiary Added Successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const clearForm = () =>{
        setFirstName("");
        setLastName("");
        setAccount("");
        setNickName("");
        setReTAccNo("");
    }

    const handleSave = (e) =>{
        axios.post(basePOST,
            {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                accNo: account,
                nickName: nickName
            }).then((response) => {
                
                successToastMessage();
                
                clearForm();
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
                        value={firstName}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Enter First Name
                    </Text>

                    <Input
                        value={lastName}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Text mb="18px" align="left">
                        Enter Last Name
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
                        value={reTAccNo}
                        placeholder=""
                        size="lg"
                        onChange={(e) => setReTAccNo(e.target.value)}
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
                        onClick={handleSave}
                    >
                        Save Beneficiary
                    </Button>
                </CardFooter>
            </Card>
            <ToastContainer/>
        </Flex>
        </>
    );
}

export default AddBeneficiary;