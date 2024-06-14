import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList } from "./TodoList";

//create your first component
const Home = () => {
  return (
    <div
      className="window100vh"
      style={{ height: "100vh" }}
    >
      <TodoList />
    </div>
  );
};

export default Home;
