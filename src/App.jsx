import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    //newTodosで未完了のTODOリストを更新
    setIncompleteTodos(newTodos);
    //入力したテキストボックスを空にする
    setTodoText("");
  };

  //削除ボタンの動作
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    //0番目の要素から一番目を削除
    newTodos.splice(index, 1);
    //newTodosで未完了のTODOリストを更新
    setIncompleteTodos(newTodos);
  };

  //完了ボタンの動作
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    //0番目の要素から一番目を削除
    newIncompleteTodos.splice(index, 1);
    //新しい完了したTODOを生成
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻るボタンの動作
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    //0番目の要素から一番目を削除
    newCompleteTodos.splice(index, 1);
    //未完了のTODOリストを更新
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOリストは５個まで！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
