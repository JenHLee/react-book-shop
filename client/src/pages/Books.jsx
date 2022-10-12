//24:47
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// 1. Books 함수가 실행되었을때 가장 먼저 useEffect가 실행됨
// 2. fecthAllBooks 가 실행되면서 try axios.get (REST API)로 모든 data fecth
// 3. 만약 실패하면 catch 로 error 출력

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fecthAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        // useState의 setBooks를 이용하여 나의 book data를 업데이트할 수 있음
        // res.data가 업데이트 됨
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {/* books array를 map함 
        array안에 있는 각각의 book은 
        아래의 div안에 있는 img(cover), h2(title), p(desc), span(price)로 각각의 값들을 return함 */}
        {books.map((book) => (
          <div className="book" key={book.id}>
            {/* book의 cover은 nn이 아니였음, 즉 null일 수도 있기 때문의 아래의 조건이 의미하는 바는
            book.cover이 있다면 img book.cover을 불러오라는 뜻 
            (book.cover && img 즉 둘 중 하나라도 없으면 아래의 코드가 실행되지 않음) */}
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            {/* onClick fuction이용할때 book.id를 전달해야함 그래야 특정한 id의 book을 지울 수 있음 */}
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            {/* 특정한 book의 정보를 업데이트하기 위해서 book.id로 그 book을 선택해야하기 떄문에 벡틱 사용 */}
            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button className="formButton">
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
