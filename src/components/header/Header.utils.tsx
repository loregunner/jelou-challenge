export interface IFilterState {
  value: string;
  label: string;
}

export interface IFilterPriority {
  value: string;
  label: string;
}

export const filterStateList = [
  { value: "todo", label: "Por hacer" },
  { value: "in_progress", label: "En progreso" },
  { value: "Completada", label: "Completada" },
];

export const filterPriorityList = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
];
