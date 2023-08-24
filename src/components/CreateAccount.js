import { useEffect, useState } from "react";
import axios from "axios";
import '../register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import { customAlphabet } from "nanoid";
import { useLocation, useNavigate } from "react-router";
import { Flex, SimpleGrid } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";

function CreateAccount() {
    const nanoid = customAlphabet('1234567890', 12);
    const [userId, setUserId] = useState("");
    const baseURLAccount = "http://localhost:8080/createAccount/"+userId;
    const [fatherName, setFatherName] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [dob, setDob] = useState(null);
    const [occType, setOccType] = useState("");
    const [sourceOfIncome, setSourceOfIncome] = useState("");
    const [annualGrossIncome, setAnnualGrossIncome] = useState(0);
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [mobNo, setMobNo] = useState("");

    const navigate = useNavigate();
    const {state} = useLocation();
    const location = useLocation();

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURLAccount, {
            accNo: nanoid(),
            mobNo: mobNo,
            fatherName: fatherName,
            occType: occType,
            sourceOfIncome: sourceOfIncome,
            annualGrossIncome: annualGrossIncome,
            aadhar: aadhar,
            address: address,
            state: stateName,
            city: city,
            pincode: "pincode"
        }).then((response) => {
            if(response.data) {
                navigate("/dashboard");
            }
        }).catch(error => {
            alert("error = " + error);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('userId');
        if(token) {
            setUserId(token);
        }
    },[])

    return (
        <div>
            <Helmet>
                <title>Open a saving account</title>
            </Helmet>
            <Flex>
                <Flex w={"20%"}flexDir={"column"}>
                    <Sidebar />
                </Flex>
                <SimpleGrid row={2} w={"75%"} pt={"2%"} pb={"2%"}>
                <form onSubmit={submitActionHandler}>
                <section class="h-100 h-custom gradient-custom-2">
                    <div class="container py-3 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12">
                                <div class="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                    <div class="card-body p-0">
                                        <div class="row g-0">
                                            <div class="col-lg-6">
                                                <div class="p-5">
                                                    <h3 class="fw-normal mb-5" style={{ color: "#4835d4" }}>General Infomation</h3>

                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline">
                                                            <input type="text" value={fatherName} onChange={e => setFatherName(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Father's Name</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="date" value={dob} onChange={e => setDob(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Date of Birth</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={aadhar} onChange={e => setAadhar(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Aadhar Card Number</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline">
                                                            <input type="text" value={occType} onChange={e => setOccType(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Occupation Type</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline">
                                                            <input type="text" value={sourceOfIncome} onChange={e => setSourceOfIncome(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Source of Income</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline">
                                                            <input type="number" value={annualGrossIncome} onChange={e => setAnnualGrossIncome(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Gross Annual Income</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 bg-indigo text-white">
                                                <div class="p-5">
                                                    <h3 class="fw-normal mb-5">Contact Details</h3>

                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Address</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-5 mb-4 pb-2">
                                                            <div class="form-outline form-white">
                                                                <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} class="form-control form-control-lg" />
                                                                <label class="form-label">PIN Code</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-7 mb-4 pb-2">

                                                            <div class="form-outline form-white">
                                                                <input type="text" value={city} onChange={e => setCity(e.target.value)} class="form-control form-control-lg" />
                                                                <label class="form-label">City</label>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">State</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={mobNo} onChange={e => setMobNo(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Mobile Number</label>
                                                        </div>
                                                    </div>

                                                    <div class="form-check d-flex justify-content-start mb-4 pb-3">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
                                                        <label class="form-check-label text-white" for="form2Example3">
                                                            I do accept the <a href="#!" class="text-white"><u>Terms and Conditions</u></a> of your
                                                            site.
                                                        </label>
                                                    </div>

                                                    <button type="submit" class="btn btn-light btn-lg w-50"
                                                        data-mdb-ripple-color="dark">Create Account</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
                </SimpleGrid>
            </Flex>
        </div>
    );
}

export default CreateAccount;
