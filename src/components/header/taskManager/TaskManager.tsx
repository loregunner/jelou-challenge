/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { labelSpanish, showCard, totalItems } from "./TaskManager.utils";
import { Modal } from "../../../ui/modal/Modal";
import useModal from "../../../hooks/useModal";
import { Form } from "../../form/Form";

export interface ITask {
  id: string;
  name: string;
  status: string;
  priority: string;
  description: string;
  due_date: string;
  created_at: string;
  image: string;
}

interface ITaskList {
  listTask: ITask[];
}

const TaskManager = ({ listTask }: ITaskList) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [groupBy, setGroupBy] = useState<string>("status");
  const [isEdit, setIsEdit] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [modalOpen, setModalOpen, toggle] = useModal(false);
  const [isData, setIsData] = useState({
    id: "",
    name: "",
    status: "",
    priority: "",
    description: "",
    due_date: "",
    created_at: "",
    image: "",
  });

  useEffect(() => {
    setTasks(listTask);
  }, [listTask, isReload]);

  const groupedTasks = tasks.reduce(
    (acc: Record<string, ITask[]>, task: any) => {
      const key = task[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    },
    {}
  );

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceList = [...groupedTasks[source.droppableId]];
    const destinationList = [...groupedTasks[destination.droppableId]];

    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === movedTask.id
          ? { ...movedTask, [groupBy]: destination.droppableId }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-2">
          <option value="status">Por estado</option>
          <option value="priority">Por prioridad</option>
          <option value="due_date">Por fecha de entrega</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            toggle(), setIsEdit("new");
          }}>
          Agregar tarea
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(groupedTasks).map((group) => (
            <Droppable key={group} droppableId={group}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between">
                    <h2 className="font-bold mb-4">{labelSpanish(group)}</h2>
                    <h2 className="font-bold mb-4">
                      {totalItems(group, groupedTasks)}
                    </h2>
                  </div>
                  {groupedTasks[group].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}>
                      {(provided) => (
                        <div
                          onClick={() => {
                            toggle(), setIsEdit("edit"), setIsData(task);
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow mb-2 flex justify-between items-center">
                          {showCard(group, task)}
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-500 hover:text-red-700">
                            Eliminar
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <Modal
        title={isEdit === "new" ? "Nueva tarea" : "Editar tarea"}
        isActive={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}>
        <Form isEdit={isEdit} isData={isData} setModalOpen={setModalOpen} setIsReload={setIsReload} />
      </Modal>
    </div>
  );
};

export default TaskManager;
