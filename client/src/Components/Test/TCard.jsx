import React from 'react'
import { 
  Card, 
  CardBody, 
  Button,
  Heading,
  Text,
  Center,
  Box, 
} from '@chakra-ui/react'

const TCard = ({icon, title, content, onTest}) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      size={'full'}
      mt={5}
      bg={'gray.300'}
    >
      <CardBody>
        <Center p={5}>
          <Box p={2}>
            {icon}
          </Box>
          <Box p={2}>
            <Heading size='md'>{title}</Heading>
            <Text >{content}</Text>
          </Box>
          <Box p={2}>
            <Button 
              bg={'blue.400'}
              color={'white'}
              onClick={onTest}
            >
              Start Test
            </Button>
          </Box>
        </Center>
      </CardBody>
    </Card>
  )
}

export default TCard