import React, { useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="firstdiv">
      <h1>My ToDo List </h1>
      <ul>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTodos(todos.concat(inputValue));
              setInputValue("");
            }
          }}
          placeholder="What do you need to do?"
        />

        {todos.map((t, index) => (
          <li key={index}>
            {t}{" "}
            <i
              className="fa-solid fa-trash-can"
              onClick={() =>
                setTodos(
                  todos.filter(
                    (itemValue, currentIndex) => index != currentIndex
                  )
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};
