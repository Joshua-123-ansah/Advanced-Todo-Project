import React from "react";

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

export const AllHooks = () => {
  const [todoText, setTodoText] = React.useState("");
  const [priority, setPriority] = React.useState("Low");
  const [date, setDate] = React.useState(getCurrentDate());

  return { todoText, setTodoText, priority, setPriority, date, setDate };
};
