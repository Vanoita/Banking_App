import { useState } from "react";
import axios from "axios";
import '../register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Register() {
    const baseURLUser = "http://localhost:8080/saveUser";
    const baseURLAddress = "http://localhost:8080/saveAddress";
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fathersName, setFathersName] = useState("");
    const [occType, setOccType] = useState("");
    const [sourceOfIncome, setSourceOfIncome] = useState("");
    const [grossAnnualIncome, setGrossAnnualIncome] = useState(0);
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURLUser, {
            userID: "cffd5678",
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            mobNo: mobNo,
            fatherName: fathersName,
            email: email,
            password: password,
            occType: occType,
            sourceOfIncome: sourceOfIncome,
            grossAnnualIncome: grossAnnualIncome,
        }).then((response) => {
            alert("User : " + firstName + " " + middleName + " " + lastName + " Added");
        }).catch(error => {
            alert("error = " + error);
        });

        // axios.post(baseURLAddress, {
        //     userId: "abcd1234",
        //     address: address,
        //     pinCode: pinCode,
        //     city: city,
        //     state: state
        // }).then((response) => {
        //     alert("Address : " + address + " " + city + " " + state + " - "+ pinCode+" Added");
        // }).catch(error => {
        //     alert("error = " + error);
        // });

        //     alert(JSON.stringify({ userId: "abcd1234",
        //     firstName: firstName,
        //     middleName: middleName,
        //     lastName: lastName,
        //     mobNo: mobNo,
        //     fatherName: fathersName,
        //     email: email,
        //     password: password,
        //     occType: occType,
        //     sourceOfIncome: sourceOfIncome,
        //     srossAnnualIncome: grossAnnualIncome}));
    };

    return (
        <div>
            <Helmet>
                <title>Register User</title>
            </Helmet>
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

                                                    <div class="row">
                                                        <div class="col-md-4 mb-4 pb-3">
                                                            <div class="form-outline">
                                                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} class="form-control form-control-lg" />
                                                                <label class="form-label" >First name</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mb-4 pb-3">
                                                            <div class="form-outline">
                                                                <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} class="form-control form-control-lg" />
                                                                <label class="form-label">Middle name</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mb-4 pb-3">
                                                            <div class="form-outline">
                                                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} class="form-control form-control-lg" />
                                                                <label class="form-label">Last name</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4 pb-2">
                                                        <div class="form-outline">
                                                            <input type="text" value={fathersName} onChange={e => setFathersName(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Father's Name</label>
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
                                                            <input type="number" value={grossAnnualIncome} onChange={e => setGrossAnnualIncome(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Gross Annual Income</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={mobNo} onChange={e => setMobNo(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Mobile Number</label>
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
                                                                <input type="text" value={pinCode} onChange={e => setPinCode(e.target.value)} class="form-control form-control-lg" />
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
                                                            <input type="text" value={state} onChange={e => setState(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">State</label>
                                                        </div>
                                                    </div>


                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Your Email</label>
                                                        </div>
                                                    </div>
                                                    <div class="mb-4">
                                                        <div class="form-outline form-white">
                                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} class="form-control form-control-lg" />
                                                            <label class="form-label">Password</label>
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
                                                        data-mdb-ripple-color="dark">Register</button>

                                                    <div class="my-4">
                                                        <p>Already registered? <Link to="/login" className="text-white">Login</Link></p>
                                                    </div>

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
        </div>
    );
}

export default Register;
