import React from "react";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Card from "./Card";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}
const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} />
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch({ type: "ADD_TASK", payload: { text, listId: id } })}
      />
    </ColumnContainer>
  );
};

export default Column;
