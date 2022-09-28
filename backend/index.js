import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test"
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    res.json("hello this is the backend");
})

app.get("/books", (req, res) => {
    // q means query
    // mysql은 query가 필요하기 때문에 기본적인 query를 const로 지정해야함. 
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        // if there is err -> return err
        if(err) return res.json(err)
        // if there is no err -> return data
        return res.json(data);
    })
})

// If there is a auth problem(authentication problem [errno: 1251])
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// password는 현재 나의 root의 password를 의미

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    // test하기 위해서 아래의 코드를 req대신 사용함. 그러면 db에 user의 req대신 이미 지정해놓은 아래의 const values array가 전달됨
    // const values = ["title from backend", "desc from backend", "cover pic from backend"] 사용
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    // q, values를 전달
    db.query(q, [values], (err, data)=>{
          if(err) return res.json(err)
          return res.json("Book has been created successfully.");
    })
})

app.listen(8800, () => {
    // 8800은 들어야하는 port number
    console.log("Connected to backend!");
    // 성공하면 console.log출력
})
// 이후 node index.js 라고 terminal에서 실행하면 error 발생, 
// 해결방법: package.json에서 module 추가해야함.
// "main": "index.js", 뒤에  "type" : "module", (,포함) 추가
// node index.js하면 새로 바뀌는 정보가 있을때 마다 매번 kill하고 다시 시작해야함. 
// package.json의 script test 다음에 "start": "nodemon index.js" 추가하면 자동으로 바뀐게 실행됨.