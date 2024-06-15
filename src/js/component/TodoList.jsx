import React, { useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [doneItem, setDoneItem] = useState(false);

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
          <li
            key={index}
            className={`d-flex justify-content-between ${
              doneItem == true ? "text-decoration-line-through" : ""
            }`}
            onClick={() => setDoneItem(!doneItem)}
          >
            {t}{" "}
            <i
              className="fas fa-trash-alt"
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
