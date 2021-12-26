import React, { useEffect, useState } from "react";

// モックサーバとの通信用のaxios
import axios from "axios";

// ローカルに用意したモックサーバのURL
const mockDataUrl = "http://localhost:3100/todos";

const App = () => {

  const [todoList, setTodoList] = useState([]);

  // async await で非同期通信を実現
  useEffect(() => {
    const fetchData = async() => {

      const response = await axios.get(mockDataUrl);

      setTodoList(response.data);
    }
    fetchData();
  }, []);

  console.log("取得したリスト：", todoList);

  return (

    <>
      <h1>TODO進捗管理</h1>

      <textarea />

      <button>add todo</button>

      <h2>TODOリスト</h2>
      <ul>
        {todoList.map((todo) => {
          <li key={todo.id}>
            {todo.content}({todo.done ? "完了" : "未完了"})
          </li>
        })}
      </ul>
    </>
  );
}

export default App;
