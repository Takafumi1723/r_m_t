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

  // filter()を利用して「未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  console.log("未完了リスト：", inCompletedList);

  // fileter()を利用して「完了」の要素を持つ新しい配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  console.log("完了リスト：", completedList)

  return (

    <>
      <h1>TODO進捗管理</h1>

      {/* 未実装 */}
      <textarea />

      {/* 未実装 */}
      <button>add todo</button>

      <h2>未完了TODOリスト</h2>
      <ul>
        {inCompletedList.map((todo) => 
          <li key={todo.id}>
            {/* TODOコンテンツ */}
            {todo.content}
            {/* 未実装 */}
            <button>
              {todo.done ? "未完了リストへ" : "完了リストへ"}
            </button>
            {/* 未実装 */}
            <button>
              削除
            </button>
          </li>
        )}
      </ul>

      <h2>完了TODOリスト</h2>
      <ul>
        {completedList.map((todo) => 
          <li key={todo.id}>
            {/* TODOコンテンツ */}
            {todo.content}
            {/* 未実装 */}
            <button>
              {todo.done ? "未完了リストへ" : "完了リストへ"}
            </button>
            {/* 未実装 */}
            <button>
              削除
            </button>
          </li>
        )}
      </ul>
    </>
  );
}

export default App;
