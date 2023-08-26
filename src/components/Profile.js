import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import {
    Flex
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';


function Profile() {
    const [user, setUser] = useState({});
    const [accNo, setAccNo] = useState([]);
    const [benef, setBenef] = useState([]);
    const fetchUser = (baseURLUser) => {
        axios
            .get(baseURLUser)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                alert("error occured while loading data" + error);
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
        const token = localStorage.getItem("userId");
        const baseURLUser = "http://localhost:8080/fetchUser/" + token;
        const baseURLAccNo = "http://localhost:8080/fetchAccNo/" + token;
        const baseURLBenef = "http://localhost:8080/getBeneficiary/" + token;
        fetchUser(baseURLUser);
        fetchAccNo(baseURLAccNo);
        fetchBeneficiary(baseURLBenef);
    });
    return (
        <div>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}>
                    <Sidebar />
                </Flex>
                <Flex w={"80%"} className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-50">
                            <MDBCol lg="6" className="mb-4 mb-lg-0">
                                <MDBCard className="mb-30" style={{ borderRadius: '.5rem' }}>
                                    <MDBRow className="g-0 ">
                                        <MDBCol md="4" className="bg-primary gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                            <MDBTypography tag="h5" style={{ 'fontFamily': 'Arial' }}>{user && `${user.firstName} ${user.lastName}`}</MDBTypography>
                                            <MDBCardText>Program Associate</MDBCardText>
                                            <MDBIcon far icon="edit mb-5" />
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBCardBody className="p-4">
                                                <MDBTypography tag="h5">Information</MDBTypography>
                                                <hr className="mt-0 mb-4" />
                                                <MDBRow className="pt-1">
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Accounts</MDBTypography>
                                                        {accNo && accNo.map((acc) => (
                                                            <MDBCardText className="text-muted">{acc}</MDBCardText>
                                                        ))}
                                                    </MDBCol>
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Beneficiary</MDBTypography>
                                                        {benef && benef.map((ben) => (
                                                            <MDBCardText className="text-muted">{ben.firstName} {ben.lastName}</MDBCardText>
                                                        ))}
                                                    </MDBCol>
                                                </MDBRow>

                                                <MDBTypography tag="h5">Contact</MDBTypography>
                                                <hr className="mt-0 mb-4" />
                                                <MDBRow className="pt-1">
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBTypography tag="h6">Email</MDBTypography>
                                                        <MDBCardText className="text-muted">{user && `${user.email}`}</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>

                                                <MDBRow className="text-center text-primary" >
                                                    <Link to="/forgotPassword">
                                                        Reset Password
                                                    </Link>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Flex>
            </Flex>
        </div>
    )
}

export default Profile
