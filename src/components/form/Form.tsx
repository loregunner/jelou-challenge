/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import {
  filterPriorityList,
  filterStateList,
  IFilterPriority,
  IFilterState,
} from "../header/Header.utils";
import { Dispatch, useEffect } from "react";
import { ITask } from "../header/taskManager/TaskManager";
import { createAllList, updateAllList } from "../../api/listAll";

export interface IForm {
  name: string;
  due_date: string;
  status: string;
  priority: string;
  description: string;
}

export interface IFormComponent {
  isEdit: string;
  isData: ITask;
  setIsReload: Dispatch<boolean>;
  setModalOpen: Dispatch<boolean>;
}

export const Form = ({
  isEdit,
  isData,
  setIsReload,
  setModalOpen,
}: IFormComponent) => {
  const { register, setValue, reset, handleSubmit } = useForm<IForm>();

  useEffect(() => {
    if (isEdit === "edit") {
      setValue("name", isData.name);
      setValue("status", isData.status);
      setValue("priority", isData.priority);
      setValue("due_date", isData.due_date);
      setValue("description", isData.description);
    } else {
      reset();
    }
  }, [isEdit, setValue, isData, reset]);

  const onSubmit = async (data: IForm) => {
    const date = new Date(data.due_date);
    const formattedDate = date.toISOString().split("T")[0];
    const createUpdate = {
      id: isData.id.toString(),
      name: data.name,
      status: data.status,
      priority: data.priority,
      dueDate: formattedDate,
      description: data.description,
      image: isData.image ?? "",
    };
    if (isEdit === "new") {
      const response = await createAllList(createUpdate);
      response()
        .then(() => {
          setModalOpen(false);
          setIsReload(true);
        })
        .catch(() => {
          setModalOpen(false);
          reset();
          setIsReload(false);
        });
    } else {
      const response = await updateAllList(createUpdate);
      setModalOpen(true);
      response()
        .then(() => {
          setModalOpen(false);
          setIsReload(true);
        })
        .catch(() => {
          setModalOpen(false);
          setIsReload(false);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-2 w-full">
      <input
        type="text"
        placeholder="Nombre"
        {...register("name")}
        className="p-2 mb-2 border border-gray-400 rounded-md w-full"
      />
      <select
        {...register("status")}
        className="p-2 mb-2 border border-gray-400 rounded-md w-full">
        <option value="">Estado de la tarea</option>
        {filterStateList.map((item: IFilterState, index: number) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <select
        {...register("priority")}
        className="p-2 mb-2 border border-gray-400 rounded-md w-full">
        <option value="">Prioridad de la tarea</option>
        {filterPriorityList.map((item: IFilterPriority, index: number) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <input
        {...register("due_date")}
        type="date"
        className="p-2 mb-2 border border-gray-400 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="Descripción"
        {...register("description")}
        className="p-2 mb-2 border border-gray-400 rounded-md w-full"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full md:w-auto md:ml-auto">
        Guardar
      </button>
    </form>
  );
};
