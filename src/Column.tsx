import React from "react";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Card from "./Card";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
  text: string;
  index: number;
}
const Column = ({ text, index }: ColumnProps) => {
  const { state } = useAppState();
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} />
      ))}
      <AddNewItem dark toggleButtonText="+ Add another task" onAdd={alert} />
    </ColumnContainer>
  );
};

export default Column;
