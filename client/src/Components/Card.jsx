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
import bookImage from './../Images/bookImage.jpg'

const BCard = () => {
  return (
    <Card
      overflow='hidden'
      variant='outline'
      maxW='sm'
      mt={'30px'}
    >
      <Image
        src={bookImage}
        alt='Green double couch with wooden legs'
        borderRadius='sm'
        sizes="sm"
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