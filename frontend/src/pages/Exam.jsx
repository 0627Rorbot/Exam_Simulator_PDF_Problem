import React, {useState, useEffect} from "react";

import Setting from "../components/Exam/Setting"; 
import Simulator from "../components/Exam/Simulator";
import Result from "../components/Exam/Result";

const Exam = () => {
  const [status, setStatus] = useState(-1);
  return (
    <div>
      <Simulator />
    </div>
  )
}

export default Exam;