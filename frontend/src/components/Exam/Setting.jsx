import React, {useState, useEffect} from "react"
import { Card, Button, Form, } from 'react-bootstrap';

const Setting = () => {
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <Card className="mb-3">
                <Card.Header as="h2" className='text-center'>Sign In</Card.Header>
                <Card.Body>
                  <p></p>
                  <Button>Start</Button>
                </Card.Body>
              </Card>
              <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Setting