// 作成したモックサーバとの通信にaxiosを利用する
import axios from "axios";

// モックサーバのURL
const todoDataUrl = "http://localhost:3100/todos";

// 全てのtodoを取得
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataUrl);
  return response.data
};

// todoの新規追加
export const addTodoData = async (todo) => {
  const response = await axios.post(todoDataUrl, todo);
  return response.data;
}

// todoの削除
export const delteTodoData = async (id) => {
  await axios.delete(`${todoDataUrl}/${id}`);
  return id;
}

// todoの更新
export const updateTodoData = async (id, todo) => {
  const response = await axios.post(`${todoDataUrl}/${id}`, todo);
  return response.data;
}