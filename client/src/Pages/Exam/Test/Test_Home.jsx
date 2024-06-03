import React, {useState} from "react"
import {
  Container,
  Heading,
  Center,
  Box, 
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Button,
  Text,
  Flex,
  Spacer,
  AbsoluteCenter,
} from '@chakra-ui/react'

import { FaRegCircleUser } from "react-icons/fa6";

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional'
]

const Test_Home = () => {
  const [levelText, setLevelText] = useState('Beginner')
  const [sliderValue, setSliderValue] = useState(0)


  const onTestStart = async() => {
    window.open('/exam/test/main', '_self')
  }


  return (
    <Container maxW='5xl' centerContent  position='relative' height={500}>
      <AbsoluteCenter  width={'100%'}>
        <Box>
          <Center mt={10}>
            <FaRegCircleUser fontSize={'80px'} fontWeight={100}/>
            <Heading fontSize={'40px'} ml={2}>Accessibility Test</Heading>
          </Center>
          <Center m={2}>
            <Heading fontSize={'20px'} fontWeight={400}>
              Test your current knowledge of Accessibility.
            </Heading>
          </Center>
          <Center>
            <Heading fontSize={'20px'} fontWeight={400}>
              
            </Heading>
          </Center>
        </Box>

        <Box mt={20}>
          <Center>
          </Center>
          <Center>
            <Box width={'50%'}>
              <Flex>
                <Text fontSize={'20px'}>Difficulty Level:</Text>
                <Spacer />
                <Text fontSize={'20px'}>{levelText}</Text>
              </Flex>
              <Slider aria-label='slider-ex-2' 
                colorScheme='pink'
                defaultValue={0}
                min={0}
                max={3}
                onChangeEnd={ (value) => {
                  setLevelText(levels[value])
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Center>
          <Center mt={20}>
            <Button
              height={'60px'}
              width={'200px'} 
              leftIcon={<FaRegCircleUser />} 
              colorScheme='pink' variant='solid'
              fontSize={'25px'}
              onClick={onTestStart}
            >
              Start
            </Button>
          </Center>
        </Box>
      </AbsoluteCenter>
    </Container>
  )
}

export default Test_Home