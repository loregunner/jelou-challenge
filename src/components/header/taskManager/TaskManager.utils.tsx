/* eslint-disable @typescript-eslint/no-explicit-any */
export const labelSpanish = (name: string) => {
  const optionTitle: any = {
    in_progress: "En progreso",
    Completada: "Completada",
    done: "Hecho",
    todo: "Todas",
    medium: "Media",
    high: "Alta",
    low: "Baja",
  };

  return optionTitle[name] ?? name;
};

export const totalItems = (name: string, tasks: any) => {
  const optionTitle: any = {
    in_progress: tasks["in_progress"]?.length,
    Completada: tasks["Completada"]?.length,
    done: tasks["done"]?.length,
    todo: tasks["todo"]?.length,
    medium: tasks["medium"]?.length,
    high: tasks["high"]?.length,
    low: tasks["low"]?.length,
  };

  return optionTitle[name] ?? "";
};

export const showCard = (name: string, item: any) => {
  const optionTitle: any = {
    in_progress: (
      <>
        <span>{labelSpanish(item.priority)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    Completada: (
      <>
        <span>{labelSpanish(item.priority)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    done: (
      <>
        <span>{labelSpanish(item.priority)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    todo: (
      <>
        <span>{labelSpanish(item.priority)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    medium: (
      <>
        <span>{labelSpanish(item.status)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    high: (
      <>
        <span>{labelSpanish(item.status)}</span>
        <span>{item.due_date}</span>
      </>
    ),
    low: (
      <>
        <span>{labelSpanish(item.status)}</span>
        <span>{item.due_date}</span>
      </>
    ),
  };

  return (
    optionTitle[name] ?? (
      <>
        <span>{labelSpanish(item.status)}</span>
        <span>{labelSpanish(item.priority)}</span>
      </>
    )
  );
};
