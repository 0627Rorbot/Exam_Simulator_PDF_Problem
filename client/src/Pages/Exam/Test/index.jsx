import React, {useState, useEffect} from "react"
import { IoLogoAndroid } from "react-icons/io";
import { FaJava } from "react-icons/fa6";
import { IoLogoPython } from "react-icons/io5";
import { IoLogoReact } from "react-icons/io5";
import { IoLogoAngular } from "react-icons/io";
import { FaBootstrap } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { SiTestcafe } from "react-icons/si";
import {
  Box,
  InputGroup,
  Input,
  Container,
  Center,
  InputRightElement,
  Heading
  // PhoneIcon
} from "@chakra-ui/react";
import TCard from "../../../Components/Test/TCard";

const exam_infos = [
  {id: '1', icon: <FaJava fontSize={'100px'}/>, title: 'Java Test', content: 'Test your current knowledge of Java.\nSuccessfully completing this assessment will earn you Java skill progression.'},
  {id: '2', icon: <IoLogoAndroid fontSize={'100px'}/>, title: 'Android Test', content: 'Test your current knowledge of ASP.\nSuccessfully completing this assessment will earn you ASP skill progression.'},
  {id: '3', icon: <IoLogoPython fontSize={'100px'}/>, title: 'Python Test', content: 'Test your current knowledge of Python.\nSuccessfully completing this assessment will earn you Python skill progression.'},
  {id: '4', icon: <IoLogoReact fontSize={'100px'}/>, title: 'React Test', content: 'Test your current knowledge of React.\nSuccessfully completing this assessment will earn you React skill progression.'},
  {id: '5', icon: <IoLogoAngular fontSize={'100px'}/>, title: 'Angular Test', content: 'Test your current knowledge of AngularJS.\nSuccessfully completing this assessment will earn you AngularJS skill progression.'},
  {id: '6', icon: <FaBootstrap fontSize={'100px'}/>, title: 'Bootstrap Test', content: 'Test your current knowledge of Bootstrap 4.\nSuccessfully completing this assessment will earn you Bootstrap 4 skill progression.'},
]

const Test = () => {
  const [search, setSearch] = useState('')
  const [testList, setTestList] = useState([])

  const onTest = () => {
    window.open('/exam/test/home', '_blank', 'noopener,noreferrer')
  }

  useEffect( () => {
    let list = exam_infos.filter( item => 
      item.title.toLowerCase().indexOf(search.toLowerCase()) > -1 || 
      item.content.toLowerCase().indexOf(search.toLowerCase()) > -1)
    setTestList(list)
}, [search])

  return (
    <Container maxW='4xl' bg='gray.50' centerContent>
      <Box>
        <Center mt={10}>
          <Heading fontSize={'40px'}>Test</Heading>
        </Center>
        <Center mb={2} >
          <SiTestcafe fontSize={200} fontWeight={200}/>
        </Center>
        <Center m={2}>
          <Heading fontSize={'20px'} fontWeight={100}>
            Tests help you upskill faster - what are you waiting for?
          </Heading>
        </Center>
        <Center padding={3}>
          <InputGroup >
            <Input 
              type='tel' 
              placeholder='Search Tests' 
              bg={"gray.300"}
              onChange={ e => setSearch(e.target.value.trim())}
            />
            <InputRightElement pointerEvents='none'>
              <FaSearch color='gray.300'/>
            </InputRightElement>
          </InputGroup>          
        </Center>
      </Box>
      <Box>
      {
        testList.map( item => 
          <TCard p={10} key={item.id} 
            icon={item.icon} 
            title={item.title} 
            content={item.content}
            onTest={onTest}
          />
        )
      }
      </Box>
    </Container>
  )
}

export default Test