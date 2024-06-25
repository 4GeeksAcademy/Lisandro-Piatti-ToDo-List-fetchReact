import React, { useEffect, useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [doneItem, setDoneItem] = useState(false);
  const apiUrl = "https://playground.4geeks.com/todo";

  useEffect(() => {
    getTodosList();
  }, []);

  // crear un usuario
  const createUser = async () => {
    try {
      const responseUser = await fetch(
        "https://playground.4geeks.com/todo/users/lisandropiatti",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: "lisandropiatti",
          }),
        }
      );

      const dataUser = responseUser.json();
    } catch (error) {
      console.error(`error is: ${error}`);
    }
  };

  // actualizar lista
  const getTodosList = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/lisandropiatti"
      );

      if (response.status === 200) {
        const data = await response.json();

        setTodos(data.todos);
      } else if (response.status === 404) {
        await createUser();
        await getTodosList();
      } else {
        throw "Api not working";
      }
    } catch (error) {
      console.error(`This error: ${error}`);
    }
  };

  // agregar item a nuestra lista
  const addItemTodo = async (textTask) => {
    try {
      const responseAddItem = await fetch(
        "https://playground.4geeks.com/todo/todos/lisandropiatti",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: textTask,
            is_done: false,
          }),
        }
      );
      if (responseAddItem.ok) {
        getTodosList();
        setInputValue("");
      }
    } catch (error) {}
  };

  // Eliminar un item de la lista
  const deleteItemSelected = async (Id) => {
    const deleteTask = await fetch(
      `https://playground.4geeks.com/todo/todos/${Id}`,
      {
        method: "DELETE",
      }
    );

    if (deleteTask.ok) {
      getTodosList();
    }
  };

  const clearAllItems = async () => {
    try {
      const resetTask = await fetch(
        "https://playground.4geeks.com/todo/users/lisandropiatti",
        {
          method: "DELETE",
        }
      );

      if (resetTask.ok) {
        await createUser();
        await getTodosList();
      }
    } catch (error) {
      console.error(`Error type: ${error}`);
    }
  };

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
              addItemTodo(inputValue);
            }
          }}
          placeholder="What do you need to do?"
        />

        {todos.length === 0 ? (
          <li>there's not tasks, add any</li>
        ) : (
          todos.map((itemList, index) => (
            <li
              key={index}
              className={"d-flex justify-content-between align-items-center"}
            >
              <p className="item-text-task">{itemList.label} </p>

              <i
                className="fas fa-trash-alt"
                onClick={() => deleteItemSelected(itemList.id)}
              ></i>
            </li>
          ))
        )}
      </ul>

      <div className="d-grid gap-1 col-6 mx-auto pt-2">
        <p className="text-center text-taskts-counter">
          {todos.length} outstanding tasks
        </p>
        <button
          type="button"
          onClick={() => clearAllItems()}
          className="btn btn-dark button-text"
        >
          Reset Tasks
        </button>
      </div>
    </div>
  );
};
