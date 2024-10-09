/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import TaskManager from "../../components/header/taskManager/TaskManager";
import { getAllList } from "../../api/listAll";
import { newArrayFilter } from "./Home.utils";

export const Home = () => {
  const [query, setQuery] = useState({
    name: "",
    due_date: "",
    status: "",
    priority: "",
  });
  const [listTask, setListTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllList();
      response()
        .then((resp: any) => {
          const respList = resp.data;
          setListTask(respList);
        })
        .catch((err: any) => {
          console.error("Hubo un problema con la solicitud:", err);
        });
    };
    fetchData();
  }, [setListTask, query]);

  return (
    <div data-testid="home_test">
      <Header setQuery={setQuery} />
      <TaskManager listTask={newArrayFilter(listTask, query)} />
    </div>
  );
};
