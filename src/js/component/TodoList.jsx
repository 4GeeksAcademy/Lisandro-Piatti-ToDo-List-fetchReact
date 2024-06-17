import React, { useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [doneItem, setDoneItem] = useState(false);

  return (
    <div className="firstdiv">
      <h1>My ToDo List </h1>
      <ul className="mx-auto">
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

        {todos.length === 0 ? (
          <li>there's not tasks, add any</li>
        ) : (
          todos.map((t, index) => (
            <li
              key={index}
              className={"d-flex justify-content-between align-items-center"}
            >
              <p className="item-text-task">{t} </p>

              <i
                className="fas fa-trash-alt "
                onClick={() =>
                  setTodos(
                    todos.filter(
                      (itemValue, currentIndex) => index != currentIndex
                    )
                  )
                }
              ></i>
            </li>
          ))
        )}
      </ul>

      <div className="counter-tasks">
        <p className="text-taskts-counter">{todos.length} tasks</p>
      </div>
    </div>
  );
};
