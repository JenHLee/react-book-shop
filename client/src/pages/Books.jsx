//24:47
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

// 1. Books 함수가 실행되었을때 가장 먼저 useEffect가 실행됨
// 2. fecthAllBooks 가 실행되면서 try axios.get (REST API)로 모든 data fecth
// 3. 만약 실패하면 catch 로 error 출력

const Books = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fecthAllBooks = async () => {
      try {
        const res = await axios.get("http:localhost:8800/books")
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllBooks()
  }, []);
  return <div>books</div>;
};

export default Books;
