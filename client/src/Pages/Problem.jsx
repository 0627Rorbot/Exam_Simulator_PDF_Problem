import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Header";
import axios from "axios";
import BSpinner from "../Components/Spinner";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  SimpleGrid,
  HStack,
  Stack,
  Input,
  useToast,
  useDisclosure,
  ButtonGroup,
  Center,
  FormHelperText,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import { ImFilePdf } from "react-icons/im";

import './style.css'
import BCard from "../Components/Card";

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
  const [load, setLoad] = useState(false)
  const toast = useToast({position: "right top"})
  
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
    if(pdf_file == '' | title == '') {
      toast({ title: 'Input Error.', description: "Please input correctly", status: 'warning', duration: 5000, isClosable: true, })
      return
    }
    setLoad(true)
    let file = pdf_file;
    const formData = new FormData();

    formData.append("file", file);

    try {
      let res = await axios.post(process.env.REACT_APP_API_BASE + "api/upload", formData)
      toast({ title: 'Pdf Upload.', description: res.msg, status: 'success', duration: 5000, isClosable: true, })

      if(res.status == false) {
        setLoad(false)
        return;
      }
      
      res = await axios.post(process.env.REACT_APP_API_BASE + "api/problem", {title: title})
      toast({ title: 'Create Pdf Problem.', description: res.msg, status: 'success', duration: 5000, isClosable: true, })
    } catch (error) {
      console.log(error);
    }
    setLoad(false)
    toast({ title: 'Request Error!', description: "Can\'t Create Pdf Problem.", status: 'Failed', duration: 5000, isClosable: true,})
  };

  return (
    <>
    {
      load ?
      <BSpinner />
      :
      <></>
    }
      <Header />
      <Box background={''} p={5}>
        <Wrap spacing='30px' justify='center'>
          <WrapItem>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input 
                placeholder="exam 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
              />
              <FormHelperText>We need to input title.</FormHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <FormLabel>PDF Exam Problem URL</FormLabel>
              <Input type="text" placeholder="http://exam.pdf.com" readOnly={true} value={fileUrl} />
              <FormHelperText>We need to input pdf url.</FormHelperText>
            </FormControl>
          </WrapItem>
          <WrapItem>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Wrap spacing='10px' justify='center'>
                <WrapItem>
                  <Button colorScheme="green" onClick={() => my_file.current.click()}>
                    <FaRegFilePdf />
                    PDF
                  </Button>                
                </WrapItem>
                <WrapItem>
                  <Button colorScheme="blue" onClick={() => onAdd()}>
                    <GrDocumentUpdate />
                    Upload
                  </Button>
                </WrapItem>
                <WrapItem>
                  <Button mr={0} colorScheme="green" onClick={() => onAdd()}>
                    <ImFilePdf />
                    View
                  </Button>
                </WrapItem>  
              </Wrap>
            </FormControl>
          </WrapItem>
        </Wrap>
      </Box>
      <input type="file" 
        className="hidden" ref={my_file}
        onChange={(e) => onFileChange(e)}
      />
      <Box>
        <Wrap spacing='30px' justify='center'>
          <WrapItem>
            <BCard />
          </WrapItem>
          <WrapItem>
            <BCard />
          </WrapItem>
          <WrapItem>
            <BCard />
          </WrapItem>
          <WrapItem>
            <BCard />
          </WrapItem>
        </Wrap>
      </Box>
    </>
  );
};

export default Problem;
