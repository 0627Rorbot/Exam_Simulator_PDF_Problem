import React, { useEffect, useState } from 'react';
import { Card, Button, Form, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/registerUser/actions';
import './style.css'

const LoginUser = props => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [address, setAddress] = useState('')

  const loginUser = async () => {
    if( address.trim() == "" || date.trim() == "" || id_proof.trim() == "") {
      alert( "Input correct" );
      return
    }
    const data = {
      address: address,
      date: date,
      id_proof: id_proof
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
              <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                <div className="content mr-auto ml-auto">
                  <p>&nbsp;</p>
                  <Card className="mb-3">
                    <Card.Header as="h2" className='text-center'>Sign In</Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="text" placeholder="User Mail" value={ address }
                            name="userAddress" 
                            onChange={ e => {
                              setAddress(e.target.value) 
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="text" placeholder="Password" value={ address }
                            name="userAddress" 
                            onChange={ e => {
                              setAddress(e.target.value) 
                            }}
                          />
                        </Form.Group>
                        <br />
                        <Button variant="primary"
                          className='w-100 f-sign'
                          onClick={ () => {
                            loginUser();
                          }}
                        >
                          Log in
                        </Button>
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      <p className='text-center f-13'>
                        Don't have an account?
                        <a className='text-center f-13'>Sign up</a>
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

export default LoginUser;