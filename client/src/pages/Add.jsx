import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  // whenever I change any value here -> setBook 실행, 이 book이 저장됨
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // ...prev 는 spread operator
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    // 만약 이 버튼을 클릭하면 default로 page가 refresh될 것
    // 이것을 방지하기 위해서 prevent event를 사용
    e.preventDefault();
    // axios를 이용하여 our data를 보낼 것 그리고 이 api request를 한다면 async로 비동기로 보내야함
    try {
      // JSON object를 request로 보낼것이기에 위에 const, useState로 지정한 book을 적음 (book의 값들을 send(post, request))
      await axios.post("http://localhost:8800/books", book);
      // 모든 request가 정상적으로 이루어진다면 /으로 이동
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  };
  // console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
      {/* 아래의 name들은 위의 useState에 있는 명칭들과 똑같아야 함 */}
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input 
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
      />
      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
