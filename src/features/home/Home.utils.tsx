import { IFilter } from "../../components/header/Header";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const newArrayFilter = (array: any[], query: IFilter) => {
  return array.filter((item: any) => {
    if (Object.keys(query).length === 0) {
      return item;
    } else if (
      item.name.toLowerCase().includes(query.name.toLowerCase()) &&
      item.status.toLowerCase().includes(query.status.toLowerCase()) &&
      item.priority.toLowerCase().includes(query.priority.toLowerCase()) &&
      item.due_date.toLowerCase().includes(query.due_date.toLowerCase())
    ) {
      return item;
    }
  });
};
