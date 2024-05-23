import React, {useState, useEffect} from 'react';
import { Card, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCase } from '../store/registerCase/actions';

const RegisterCase = props => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [courtId, setCourtId] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('2000-06-10')

  const registerCase = async () => {
    if( courtId.trim() == "" || date.trim() == "" || description.trim() == "") {
      alert( "Input correct" );
      return
    }
    const data = {
      courtId: courtId,
      date: date,
      description: description
    }
    dispatch( createCase( data ) );
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
                  <Card>
                    <Card.Header as="h2">Register Case</Card.Header>
                    <Card.Body>
                      <Card.Title>Provide the below details to register a case.</Card.Title>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Court ID</Form.Label>
                          <Form.Control type="text" placeholder="Court ID" value={ courtId }
                            name="courtId" 
                            onChange={ e => {
                              setCourtId( e.target.value ) 
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Case Description</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Case Description" value={ description }
                            name="caseDescription"
                            onChange={ e => {
                              setDescription( e.target.value ) 
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" placeholder="Select Date" value={ date }
                            name="startDateTime" 
                            onChange={ e => {
                              setDate( e.target.value ) 
                            }}
                          />
                        </Form.Group>
                        <Button variant="primary" 
                          onClick={ () => {
                            registerCase();
                          }}
                        >
                          Register Case
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

export default RegisterCase;