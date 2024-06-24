import React, { useEffect, useState } from "react";

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [doneItem, setDoneItem] = useState(false);
  const apiUrl = "https://playground.4geeks.com/todo";

  useEffect(() => {
    updateTodosList();
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
      console.log(`a new user was created, info: ${responseUser}`);
      const dataUser = responseUser.json();
      console.log(dataUser);
    } catch (error) {
      console.log(`error is: ${error}`);
    }
  };

  // actualizar lista
  const updateTodosList = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/lisandropiatti"
      );
      console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.todos);
        setTodos(data.todos);
      } else if (response.status === 404) {
        createUser();
        updateTodosList();
      } else {
        throw "Api not working";
      }
    } catch (error) {
      console.log(`This error: ${error}`);
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
      console.log(`Item response data add: ${responseAddItem}`);
      const dataAdd = await responseAddItem.json();
      console.log(`Item data add: ${dataAdd.label}`);
      updateTodosList();
      setInputValue("");
    } catch (error) {}
  };

  // Eliminar un item de la lista
  const deleteItemSelected = async (Id) => {
    console.log(Id);
    const deleteTask = await fetch(
      `https://playground.4geeks.com/todo/todos/${Id}`,
      {
        method: "DELETE",
      }
    );
    console.log(deleteTask);
    if (deleteTask.ok) {
      updateTodosList();
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
      console.log(resetTask);
      if (resetTask.ok) {
        createUser();
        updateTodosList();
      }
    } catch (error) {
      console.log(`Error type: ${error}`);
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
