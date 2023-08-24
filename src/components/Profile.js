import React from 'react'
import { Helmet } from 'react-helmet';
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
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';


function Profile() {
  return (
    <div>
        <Helmet>
                <title>User Profile</title>
        </Helmet>
        <Flex>
            <Flex w={"20%"}>
                <Sidebar/>
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
                    <MDBTypography tag="h5" style={{'fontFamily': 'Arial'}}>Durgam Aditya</MDBTypography>
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
                            <MDBCardText className="text-muted">5673456</MDBCardText>
                            <MDBCardText className="text-muted">4685464</MDBCardText>
                            <MDBCardText className="text-muted">8145565</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Beneficiary</MDBTypography>
                            <MDBCardText className="text-muted"> Siva</MDBCardText>
                        </MDBCol>
                        </MDBRow>

                        <MDBTypography tag="h5">Contact</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">adi@wells.com</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">123 456 789</MDBCardText>
                        </MDBCol>
                        </MDBRow>

                        <MDBRow className="text-center text-primary" >
                            <Link to = "/forgotPassword">
                                Reset Password
                            </Link>
                            
                        </MDBRow>

                        <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>
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
