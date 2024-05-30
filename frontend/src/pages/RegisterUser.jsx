import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/registerUser/actions';
import './style.css'

const RegisterUser = props => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async () => {
    if( address.trim() == "" || date.trim() == "" || id_proof.trim() == "") {
      alert( "Input correct" );
      return
    }
    const data = {
      email: email,
      fname: fname,
      lname: lname,
      password: password
    }
    dispatch( createUser(data) );
  }

  return (
    <div>
    {
      loading
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        :
        <div>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px', minWidth: '250px' }}>
                <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <Card className="mb-3">
                    <Card.Header as="h2" className='text-center '>Sign Up</Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3"> 
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="text" placeholder="Email" value={ email }
                            name="userAddress" 
                            onChange={ e => {
                              setEmail(e.target.value) 
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="First Name" value={ fname }
                            name="firstName" 
                            onChange={ e => {
                              setFname(e.target.value) 
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Last Name" value={ lname }
                            name="lastName" 
                            onChange={ e => {
                              setLname(e.target.value) 
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="text" placeholder="Password" value={ password }
                            name="password" 
                            onChange={ e => {
                              setPassword(e.target.value) 
                            }}
                          />
                        </Form.Group>
                        
                        <br />

                        <Button variant="primary" 
                          className='d-block w-100 f-sign'
                          onClick={ () => {
                            registerUser();
                          }}
                        >
                          Join Simulator
                        </Button>

                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      <p className='text-center f-13'>
                        Already have an account?
                        <a className='text-center f-13'>Log in</a>
                      </p>
                    </Card.Footer>
                  </Card>
                  <p>&nbsp;</p>
                </div>
              </main>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default RegisterUser;