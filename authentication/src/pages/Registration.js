import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgGenderFemale } from "react-icons/cg";
import { FaImagePortrait } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import "../Styles/Registration.css";


import { registerUser } from "../service/RegistrationApi";

const RegistrationForm = () => {

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');
  const[intialState , setinitialState] = useState('');
  const [age, setAge] = useState('');
  const notify = (message) =>{
    toast(message);
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') {
      setFullName(value);
    } else if (name === 'userName') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'gender') {
      setGender(value);
    } else if (name === 'age') {
      setAge(value);
    }
  };

  const formData = {
    fullName:"",
    userName:"",
    email:"",
    password:"",
    confirmPassword:"",
    gender:"",
    age:""

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        fullName,
        userName,
        email,
        password,
        confirmPassword,
        gender,
        age
      };

      const response = await registerUser(userData);
      console.log(response.data.message);


      if (response.data.message) {
        notify(response.data.message);
      } else {
        setFullName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setGender('male');
        setAge('');
        notify('Registration successful!');
      }
    } catch (error) {
      notify(error.response.data.message)
      
    }
  };


  return (
    <div>
      <div className='py-2' style={{ backgroundColor: "aqua" }}>
        <h5 style={{ textAlign: "center" }}>Register</h5>
        <p style={{ textAlign: "center" }}>Get your own roomy account now.</p>
      </div>

      <div className="mt-3">
        <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridFullName">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><CiUser /></span>
                  </div>
                  <Form.Control name="fullName" value={fullName} onChange={handleChange} className='form_input' type="text" placeholder="Full name" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridUsername">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><CiUser /></span>
                  </div>
                  <Form.Control name="userName" value={userName} onChange={handleChange} className='form_input' type="text" placeholder="Username" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridEmail">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><MdOutlineMail /></span>
                  </div>
                  <Form.Control name="email" value={email} onChange={handleChange} className='form_input' type="email" placeholder="Email" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridPassword">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><RiLockPasswordLine /></span>
                  </div>
                  <Form.Control name="password" value={password} onChange={handleChange} className='form_input' type="password" placeholder="Password" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridConfirmPassword">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><RiLockPasswordLine /></span>
                  </div>
                  <Form.Control name="confirmPassword" value={confirmPassword} onChange={handleChange} className='form_input' type="password" placeholder="Confirm Password" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formGridGender">
              <div className="d-flex justify-content-between" style={{ width: "257px" }}>
                <p>Gender</p>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={handleChange}
                    checked={gender === "male"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={handleChange}
                    checked={gender === "female"}
                  />
                </div>
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridAge">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{ fontSize: "1.5rem" }} className="input-group-text"><FaImagePortrait /></span>
                  </div>
                  <Form.Control name="age" value={age} onChange={handleChange} className='form_input' type="number" placeholder="Age" />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Button variant="primary" type="submit" onClick={notify} className='reg_sub_btn' >
              Register
            </Button>
            
          </Row>
        </Form>
      </div>

      <div className='py-2' style={{ backgroundColor: "aqua" }}>
        <p style={{ textAlign: "center" }}>Already have an account? <span><Link to={'/Signin'}> Sign in</Link></span></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;








