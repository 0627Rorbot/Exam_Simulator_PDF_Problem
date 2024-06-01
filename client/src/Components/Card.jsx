import React from "react"
import { 
  Card, 
  CardBody, 
  CardFooter,
  Button,
  Stack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"

const BCard = () => {
  return (
    <Card
      // direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      maxW='sm'
      mt={'30px'}
    >
      <Image
        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Green double couch with wooden legs'
        borderRadius='md'
      />
      <Stack>
        <CardBody>
          <Heading size='md'>The perfect latte</Heading>
          <Text py='2'>
            Caffè latte is a coffee beverage of Italian origin made with espresso
            and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button variant='solid' colorScheme='blue'>
            View
          </Button>
          <Button variant='solid' colorScheme='red' ml={3}>
            Delete
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default BCard