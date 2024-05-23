import React, { useState, useEffect } from 'react';
import { Card, Button, Form, } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { createEvidence, readEvidences } from '../store/registerEvidence/actions';

const RegisterEvidence = props => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [caseId, setCaseId] = useState('')
  const [date, setDate] = useState('2000-06-10')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')

  const registerEvidence = async () => {
    if( caseId.trim() == "" || date.trim() == "" || description.trim() == "" || file.trim() == "") {
      alert( "Input correct" );
      return
    }
    const data = {
      caseId: caseId,
      date: date,
      description: description,
      file: file
    }
    dispatch( createEvidence(data) );
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
                <Card>
                  <Card.Header as="h2">Submit Evidence</Card.Header>
                  <Card.Body>
                    <Card.Title>Provide the below details to submit an evidence.</Card.Title>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Case ID</Form.Label>
                        <Form.Control type="text" placeholder="Case ID" value={ caseId }
                          name="caseId" 
                          onChange={ e => {
                            setCaseId(e.target.value) 
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label >Upload Evidence File</Form.Label>
                        <Form.Control type="file" id="fname"
                          name="fileHash"
                          placeholder="Enter the Hash" 
                          onChange={ e => {
                            const file = e.target.files[0];
                            if( file ){
                              const url = URL.createObjectURL(file)
                              setFile(url)
                            }
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" placeholder="Select Date"
                          name="createdDate"
                          id="dateofbirth"
                          value={ date }
                          onChange={ e => {
                            setDate(e.target.value) 
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Evidence Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Evidence Description"
                          value={ description } name="description" 
                          onChange={ e => {
                            setDescription(e.target.value) 
                          }}
                        />
                      </Form.Group>
                      <Button variant="primary"
                        onClick={ () => {
                          registerEvidence();
                        }}
                      >
                        Submit Evidence
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default RegisterEvidence;