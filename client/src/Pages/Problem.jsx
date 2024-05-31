import React, { useEffect, useState} from "react";
import Header from "../Components/Header";
import axios from "axios";
import { pdfjs } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

window.Buffer = window.Buffer || require("buffer").Buffer;

const awsConfig = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
};

const Problem = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [fileUrl, setFileUrl] = useState(undefined);
  const [pdf_file, setPdf_File] = useState(undefined)
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setPdf_File(file)
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const onAdd = () => {
    console.log("PDF file upload");
    let file = pdf_file;
    const formData = new FormData();

    formData.append("file", file);

    axios
      .post(process.env.REACT_APP_API_BASE + "api/upload", formData)
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  }

  return (
    <>
      <Header></Header>
      {/* <form onSubmit={uploadFiles} style={{ paddingTop: "30px" }}> */}
        <SimpleGrid columns={2} spacing={10} px={10}>
          <Box pt={5}>
            <input 
              type="file" className="d-none" 
              accept=".pdf"
              onChange={ e => onFileChange(e)}
            />
            <Button
              colorScheme="blue"
              onClick={() => onAdd()}
            >
              Insert Problem
            </Button>
          </Box>
          <Box>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>PDF View</FormLabel>      
                {fileUrl && (
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                  >
                    <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
                  </Worker>
                )} 
              </FormControl>
            </Stack>
          </Box>
        </SimpleGrid>
    </>
  );
}

export default Problem;
