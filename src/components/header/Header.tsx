/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect, useState } from "react";
import {
  filterPriorityList,
  filterStateList,
  IFilterPriority,
  IFilterState,
} from "./Header.utils";
import { useForm } from "react-hook-form";

export interface IFilter {
  name: string;
  due_date: string;
  status: string;
  priority: string;
}

export interface IFilterForm {
  setQuery: Dispatch<any>;
}

const Header = ({ setQuery }: IFilterForm) => {
  const { register, watch } = useForm<IFilter>();
  const formValues = watch();
  const [previousValues, setPreviousValues] = useState<IFilter | null>(null);

  useEffect(() => {
    if (JSON.stringify(formValues) !== JSON.stringify(previousValues)) {
      setQuery(formValues);
      setPreviousValues(formValues);
    }
  }, [formValues, previousValues]);

  return (
    <header className="flex flex-col md:flex-row items-center border-b border-gray-300 p-4">
      <h1 className="text-xl font-bold mb-4 md:mb-0 md:mr-20">Tareas</h1>
      <form className="flex flex-col md:flex-row md:gap-2 mt-2 md:mt-0 w-full">
        <input
          type="text"
          placeholder="Buscar"
          {...register("name")}
          className="p-2 mb-2 border border-gray-400 rounded-md flex-grow md:mb-0 md:mr-2 md:w-1/2 lg:w-80"
        />
        <select
          {...register("status")}
          className="p-2 border border-gray-400 mb-2 md:mb-0 rounded-md md:w-1/4 lg:w-48">
          <option value="">Estado</option>
          {filterStateList.map((item: IFilterState, index: number) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          {...register("priority")}
          className="p-2 border border-gray-400 mb-2 md:mb-0 rounded-md md:w-1/4 lg:w-48">
          <option value="">Prioridad</option>
          {filterPriorityList.map((item: IFilterPriority, index: number) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <input
          {...register("due_date")}
          type="date"
          className="p-2 border border-gray-400 rounded-md md:w-1/4 lg:w-48"
        />
      </form>
    </header>
  );
};

export default Header;
