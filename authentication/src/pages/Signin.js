import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import "../Styles/Registration.css"

function Signin() {
  return (
    <div>
      <div className='py-1' style={{ backgroundColor: "aqua" }}>
        <h2 style={{ textAlign: "center" }}>Roomy</h2>
        <h5 className='pt-2' style={{ textAlign: "center" }}>Sign In</h5>
        <p className='pt-2' style={{ textAlign: "center" }}>Sign in to continue to Roomy.</p>
      </div>

      <div className="mt-3">
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{fontSize:"1.5rem"}} className="input-group-text"><MdOutlineMail /></span>
                  </div>
                  <Form.Control type="email" placeholder="Enter email" className='form_input' />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span style={{fontSize:"1.5rem"}} className="input-group-text"><RiLockPasswordLine /></span>
                  </div>
                  <Form.Control type="password" placeholder="Password"  className='form_input'/>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-1">
            <Col xs={12}>
              <Form.Group controlId="formGridRememberMe" className="mb-3">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3 mr-auto">
            <Col xs={12}>
              <p className="text-start mb-0"><Link to={'/forgot-password'}>Forgot Password?</Link></p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Button variant="primary" type="submit" className='reg_sub_btn'>
                Sign In
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className='py-5' style={{ backgroundColor: "aqua" }}>
        <p style={{ textAlign: "center" }}>Don't have an account? <Link to={'/Signup'}>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Signin;
