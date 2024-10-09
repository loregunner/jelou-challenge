/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getAllList = () => () => {
  return axios.get("https://tasks-manager-test.fly.dev/api/Tasks" as string);
};

export const createAllList = (data: any) => (): any => {
    return axios.post("https://tasks-manager-test.fly.dev/api/tasks" as string, data);
  };

  export const updateAllList = (data: any) => (): any => {
    return axios.put(`https://tasks-manager-test.fly.dev/api/tasks/${data.id}` as string, data);
  };