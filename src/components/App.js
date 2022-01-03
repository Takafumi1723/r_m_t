import React, { useEffect, useState } from "react";

// モックサーバとの通信用のaxios
import axios from "axios";

// ローカルに用意したモックサーバのURL
const mockDataUrl = "http://localhost:3100/todos";

// TodoTitle コンポーネント
const TodoTitle = ({title, as}) => {
  if(as === "h1") {
    return <h1>{title}</h1>;
  }

  if(as === "h2") {
    return <h2>{title}</h2>;
  }

  return <p>{title}</p>;
};

// TodoItem コンポーネント
const TodoItem = ({todo}) => {
  return (
    <li>
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
  )
}

// TodoList コンポーネント
const TodoList = ({todoList}) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem todo={todo} key={todo.id}></TodoItem>
      ))}
    </ul>
  )
} 

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
      <TodoTitle title="TODO進捗管理" as="h1"></TodoTitle>

      {/* 未実装 */}
      <textarea />

      {/* 未実装 */}
      <button>add todo</button>

      <TodoTitle title="未完了TODOリスト" as="h2"></TodoTitle>
      <TodoList todoList={inCompletedList}></TodoList>

      <TodoTitle title="完了TODOリスト" as="h2"></TodoTitle>
      <TodoList todoList={completedList}></TodoList>
    </>
  );
}

export default App;
