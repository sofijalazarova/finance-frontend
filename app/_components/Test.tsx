"use client";

import axios from "@/app/_custom-axios/axios";
import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    console.log("Test component mounted");

    async function fetchData() {
      const response = await axios.get("/account/test");
      console.log(response);
    }

    fetchData();
  }, []);

  return <div>Test</div>;
};

export default Test;
