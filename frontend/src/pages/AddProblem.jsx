import React, {useState, useEffect, useRef} from "react"
import { Card, Button, Form, InputGroup} from 'react-bootstrap';
import axios from 'axios';

const AddProblem = () => {
  const ref_file = useRef()
  const [pdf_file_name, setPdf_File_Name] = useState('')
  const [pdf_file, setPdf_File] = useState(undefined)

  const on_selected = e => {
    console.log(e.target.files[0].name);
    setPdf_File_Name(e.target.files[0].name)
    setPdf_File(e.target.files[0])
  }
  
  const onAdd = () => {
    console.log("PDF file upload");
    let file = pdf_file;
    const formData = new FormData();

    formData.append("file", file);

    axios
      .post("http://127.0.0.1:6001/api/upload", formData)
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  }

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <Card className="mb-3">
                <Card.Header as="h2" className='text-center'>Add Problem</Card.Header>
                <Card.Body>
                  <InputGroup className="mb-3">
                    <Button variant="success"
                      onClick={() => ref_file.current.click()}
                    >
                      PDF
                    </Button>
                    <Form.Control
                      readOnly={true}
                      value={pdf_file_name}
                    />
                  </InputGroup>
                  <p></p>
                  <Button variant="primary"
                    className='w-100 f-sign'
                    onClick={ () => {
                      onAdd();
                    }}
                  >
                    Add
                  </Button>
                </Card.Body>
              </Card>
              <p>&nbsp;</p>
              <input 
                type="file" className="d-none" 
                ref={ref_file} 
                accept=".pdf"
                onChange={ e => on_selected(e)}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AddProblem