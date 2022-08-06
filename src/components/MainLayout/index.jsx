import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import Board from "react-trello";
import { ToastContainer, toast } from "react-toastify";

const MainLayout = () => {
  const [dataState, setDataState] = useState(null);
  const notify = (text) => toast(text);

  const endpoints = [
    "https://jsonplaceholder.typicode.com/users?_limit=3",
    "https://jsonplaceholder.typicode.com/todos?_limit=50",
  ];

  async function fetchData() {
    return await axios
      .all(endpoints.map((end) => axios.get(end)))
      .then((res) => {
        let data = res[0].data.map((users) => ({
          id: users.id,
          title: users.name,
          label: `UID: ${users.id}`,
          cards: res[1].data
            .filter((todos) => todos.userId === users.id)
            .map((todo) => ({
              id: todo.id,
              title: todo.title,
              label: `UID ${todo.userId}`,
              description: `${todo.completed ? `completed` : `in-progress`}`,
            })),
        }));
        setDataState({ lanes: [...data] });
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="main-board">
          {!isEmpty(dataState) ? (
            <>
              <Board
                laneStyle={{
                  width: "300px",
                  margin: "1rem",
                }}
                cardStyle={{
                  margin: "1rem",
                  paddingTop: "2rem",
                }}
                style={{ background: "#fff" }}
                data={dataState}
                onCardDelete={() => notify("item deleted")}
                draggable
                editable
                collapsibleLanes
              />
            </>
          ) : (
            <p>Loading....</p>
          )}
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </div>
    </div>
  );
};

export { MainLayout };
