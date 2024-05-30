import React, {useState, useEffect} from "react";

import Setting from "../Components/Exam/Setting"; 
import Simulator from "../Components/Exam/Simulator";
// import Result from "../components/Exam/Result";

const Exam = () => {
  const [status, setStatus] = useState(-1);
  return (
    <div>
      <Simulator />
    </div>
  )
}

export default Exam;