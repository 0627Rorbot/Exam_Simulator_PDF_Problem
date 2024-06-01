import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Header";
import axios from "axios";
// import PdfViewer from "pdf-react";

// import { Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import { Document } from 'react-pdf/dist/esm/entry.webpack';
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  SimpleGrid,
  Stack,
  Input,
} from "@chakra-ui/react";

window.Buffer = window.Buffer || require("buffer").Buffer;

const awsConfig = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
};

const Problem = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [pdf_file, setPdf_File] = useState(undefined);
  const [title, setTitle] = useState('')
  
  const my_file = useRef()

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setPdf_File(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const onAdd = async() => {
    console.log("PDF file upload");
    if(pdf_file == '' | title == '') {
      alert("Input correct!")
      return
    }
    let file = pdf_file;
    const formData = new FormData();

    formData.append("file", file);

    try {
      let res = await axios.post(process.env.REACT_APP_API_BASE + "api/upload", formData)
      alert(res.msg)
      if(res.status == false) return;
      
      res = await axios.post(process.env.REACT_APP_API_BASE + "api/problem", {title: title})
      alert(res.msg) 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>
      {/* <form onSubmit={uploadFiles} style={{ paddingTop: "30px" }}> */}
      <SimpleGrid columns={2} spacing={10} px={10}>
        <Box pt={5}>
          <FormControl isRequired>
            <FormLabel>Problem Title</FormLabel>
            <Input 
              placeholder="exam 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>PDF Exam</FormLabel>
            <Input type="text" placeholder="Pdf Url" readOnly={true} value={fileUrl} />
          </FormControl>
          <br />
          <FormControl>
            <Button colorScheme="green" onClick={() => my_file.current.click()}>
              PDF
            </Button>
            <Button colorScheme="blue" onClick={() => onAdd()}>
              Insert Problem
            </Button>
          </FormControl>
        </Box>
        <input type="file" 
          className="" ref={my_file}
          onChange={(e) => onFileChange(e)}
        />
        <Box>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>PDF View</FormLabel>
              {fileUrl ? (
                <div></div>
              ) : (
                <div
                  style={{
                    alignItems: "center",
                    border: "2px dashed rgba(0, 0, 0, .3)",
                    display: "flex",
                    fontSize: "2rem",
                    height: "100%",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  Preview area
                </div>
              )}
            </FormControl>
          </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Problem;
