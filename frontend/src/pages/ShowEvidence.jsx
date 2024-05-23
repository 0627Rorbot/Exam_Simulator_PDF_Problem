import React, {useState, useEffect} from 'react';
import { Card, Button, Form, } from 'react-bootstrap';

import { evidences_url } from "../utils/urls";
import axios from 'axios';

const ShowEvidence = props => {
  const [loading, setLoading] = useState(false)
  const [evidences, setEvidences] = useState([])
  const [caseId, setCaseId] = useState('')

  const searchCaseById = async id => {
    const data = await axios.post(evidences_url)
    setEvidences( data.data.filter( e => e.caseId == id))
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
                    <Card.Header as="h2">Get Evidences of a case</Card.Header>
                    <Card.Body>
                      <Form >
                      <Form.Group className="mb-3">
                        <Form.Label>Case ID</Form.Label>
                        <Form.Control type="text" placeholder="Case ID" value={ caseId }
                          name="caseId" 
                          onChange={ e => {
                            setCaseId(e.target.value) 
                          }}
                        />
                        </Form.Group>

                        <Button variant="primary"
                          onClick={ () => {
                            searchCaseById(caseId);
                          }}
                        >
                          Get Evidences
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                  
                  {
                    evidences.length > 0 
                    ? 
                      evidences.map( (evidence, key) => (
                        <div className="card mb-4" key={key} >
                          <ul id="imageList" className="list-group list-group-flush">
                            <li className="list-group-item">
                              <p className="text-center">
                                <img src={`${evidence.file}`} style={{ maxWidth: '420px' }} />
                              </p>
                              <p>Evidence Description: {evidence.description}</p>
                              <p>Date: {evidence.date}</p>
                              <button
                                className="btn btn-primary"
                                name={key}
                                variant="primary"
                                onClick={ () => {
                                }}
                              >
                                TIP 0.1 MATIC
                              </button>
                            </li>
                          </ul>
                        </div>
                      )) 
                    : <p></p>
                  }
                </div>
              </main>
            </div>
          </div>
        </div>
    }
    </div>
  );
}

export default ShowEvidence;