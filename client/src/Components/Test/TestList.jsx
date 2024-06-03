import React, {useState, useEffect} from "react";
import BCard from "../Card";
import { Center, Wrap, WrapItem } from "@chakra-ui/react";

const TestList = () => {
  return (
    <Wrap justify={'center'}>
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
  )
}

export default TestList;