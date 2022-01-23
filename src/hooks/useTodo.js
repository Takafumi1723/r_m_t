import { useState, useEffect } from "react";
import {ulid} from "ulid"; // 一意なidを生成するulid
import { getAllTodosData, addTodoData, deleteTodoData, updateTodoData } from "../api/todos";

export const useTodo = () => {
  // 現在のtodoリストの状態
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getAllTodosData().then((res) => {
      setTodoList([...res].reverse());
    })
  }, []);

  // done属性の真偽値を反転させて更新する関数
  const toggleTodoListItemStatus = (id, todo) => {
    // doneを反転させたい対象todo
    const targetItem = todoList.find((t) => t.id === id);
    // doneを反転させたtodo
    const newTodoItem = {...targetItem, done: !targetItem.done};
    // 指定idのtodoを更新して、todoListも更新する
    updateTodoData(id, newTodoItem).then((res) => {
      const newTodoList = todoList.map((t) => 
        t.id !== res.id ? t : res 
      );
      setTodoList(newTodoList);
    });
  };

  // 新規todoを追加
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      id: ulid(),
      cotent: todoContent,
      done: false
    };
    return addTodoData(newTodoItem).then((res) => {
      setTodoList([res, ...todoList])
    });
  };

  // todoを削除
  const deleteTodoListItem = (id) => {
    deleteTodoData(id).then((res) => {
      const newTodoList = todoList.filter((t) => t.id !== res);
      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem
  };
};
