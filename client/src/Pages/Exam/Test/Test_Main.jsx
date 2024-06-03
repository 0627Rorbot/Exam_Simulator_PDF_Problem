import React, {useState, useEffect} from "react"
import axios from "axios";
import {
  Container,
  Heading,
  Center,
  Box, 
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Card,
  CardBody,
  Button,
  Text,
  Flex,
  Spacer,
  Checkbox,
  Radio,
  VStack,
  Progress,
  AbsoluteCenter,
  ButtonGroup,
  useToast
} from '@chakra-ui/react'
import { FaRegCircleUser } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";
import TSpinner from "../../../libs/TSpinner";

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional'
]

const Test_Main = () => {
// global problem 
  const [load, setLoad] = useState(false)
  const [answeredCnt, setAnsweredCnt] = useState(0)
  const [problems, setProblems] = useState([])
  const [scores, setScores] = useState([])
  const [totalSelectedItems, setTotalSelectedItems] = useState([])

// current problem
  const [selectedItems, setSelectedItems] = useState([])
  
  const toast = useToast({position: "right top"})

  const onNext = () => {
    const correct = problems[answeredCnt].correct
    if( selectedItems == 0) {
      toast({ title: 'Check Answers', description: 'Please Check Answers', status: 'warning', duration: 5000, isClosable: true, })
      return
    }
    const sco = 0.0
    selectedItems.map( (item) => {
      if(item.trim()[0] == correct) 
        sco += 10.0
    })

    setScores([...scores, sco])
    setTotalSelectedItems([...totalSelectedItems, selectedItems])
    toast({ title: 'Score', description: `Your score is ${sco} for ${answeredCnt+1}`, status: 'warning', duration: 5000, isClosable: true, })

    setAnsweredCnt(answeredCnt++)
  }

  const onEnd = () => {
    const totalScore = 0.0
    scores.map( (sco) => {
      totalScore += sco
    })
    totalScore /= problems.length
    toast({ title: 'Total Score', description: `Your total score is ${totalScore}.`, status: 'warning', duration: 5000, isClosable: true, })
  }

  const getProblems = async() => {
    try {
      setLoad(true)
      let test_res = await axios.get(process.env.REACT_APP_API_BASE + "api/problems")
      if(test_res.status == false)
        toast({ title: 'Requesting Problems...', description: test_res.msg, status: 'warning', duration: 5000, isClosable: true, })
      else {
        toast({ title: 'Requesting Problems...', description: test_res.msg, status: 'success', duration: 5000, isClosable: true, })
        setProblems(test_res.data.data)
        console.log(test_res.data.data);
        // (test_res.data[0].problem)
        // setProblem(test_res.data[0])
        // console.log(test_res.data[0]);
      }
      setLoad(false)
    } catch (error) {
      console.log(error);
      toast({ title: 'Request Error!', description: "Can\'t have a test.", status: 'error', duration: 5000, isClosable: true,})
      setLoad(false)
    }
  }

  const onCheck = (e) => {
    const id = e.target.id
    console.log(id);
    selectedItems.filter( item => item == id ).length > 0 ?
      setSelectedItems(selectedItems.filter( t => t != id ))
    :
      setSelectedItems([...selectedItems, id])
  }  

  useEffect( () => {
    getProblems()
  }, [])

  return (
    <Container maxW='5xl' centerContent overflow={true}>
    {
      load ?
        <TSpinner />
      : 
      <>
        <Box>
          <Center mt={5}>
            <FaRegCircleUser fontSize={'80px'} fontWeight={100}/>
            <Heading fontSize={'40px'} ml={2}>Accessibility Test</Heading>
          </Center>
          {
            problems[answeredCnt] ?
              <>
                <Center mt={5}>
                  <Heading fontSize={'20px'} fontWeight={400} textAlign={'center'} width={'80%'}>
                    {problems[answeredCnt].question}
                  </Heading>
                </Center>
                <Center mt={5}>
                  <VStack spacing={5} direction='column'>
                  {
                    problems[answeredCnt].options.map( (option, i) => {
                      return (
                        <Checkbox 
                          key={i} 
                          id={i} 
                          minWidth={'80%'} 
                          bg={'gray.700'}
                          p={3}
                          borderRadius={'10px'}
                          color={"white"}
                          onChange={(e) => onCheck(e)}
                        >
                          {option}
                        </Checkbox>
                      )
                    }
                    )
                  }
                  </VStack>
                </Center>
              </>
            : <></>
          }
        </Box>
        <Box mt={10}>
          <Center>
            <Text>
              Questions answered: {answeredCnt}
            </Text>
          </Center>
          <Center>
            <Progress mt={2} width={'100%'} value={80} borderRadius={'10px'} bg={'gray.400'}/>
          </Center>
          <Center mt={5} mb={20}>
            <ButtonGroup spacing={5}>
              <Button
                colorScheme='green'
                variant='outline' 
              >
                Restart
              </Button>
              <Button
                leftIcon={<GrFormNextLink fontSize={'25px'}/>} 
                colorScheme='green' variant='solid'
                onClick={onNext}
              >
                Next Question
              </Button>
              <Button
                variant='outline' 
                colorScheme='green'
                onClick={onEnd}
              >
                End
              </Button>
            </ButtonGroup>
          </Center>
        </Box>
      </>
    }
    </Container>
  )
}

export default Test_Main