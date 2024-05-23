import React, { useEffect, useState } from 'react';
import { Card, Button, Form, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/registerUser/actions';

const RegisterUser = props => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [address, setAddress] = useState('')
  const [date, setDate] = useState('2000-06-10')
  const [id_proof, setId_proof] = useState('')

  const registerUser = async () => {
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
                    <Card.Header as="h2">Register User</Card.Header>
                    <Card.Body>
                      <Card.Title>Add eligible user details</Card.Title>

                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>User Address</Form.Label>
                          <Form.Control type="text" placeholder="User Address" value={ address }
                            name="userAddress" 
                            onChange={ e => {
                              setAddress(e.target.value) 
                            }}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Date</Form.Label>
                          <Form.Control type="date" placeholder="Select Date" value={ date }
                            name="date"
                            onChange={ e => {
                              setDate(e.target.value)
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>ID proof</Form.Label>
                          <Form.Control type="file" placeholder="Select Date" 
                            onChange={ e => {
                              const file = e.target.files[0];
                              if( file ){
                                const url = URL.createObjectURL(file)
                                setId_proof(url)
                              }
                            }}
                          />
                        </Form.Group>

                        <Button variant="primary" 
                          onClick={ () => {
                            registerUser();
                          }}
                        >
                          Register User
                        </Button>
                      </Form>
                    </Card.Body>
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