import React from "react";
import AddNewItem from "./AddNewItem";
import { ColumnContainer, ColumnTitle } from "./styles";

interface ColumnProps {
  text: String;
}
const Column = ({ text, children }: React.PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem dark toggleButtonText="+ Add another task" onAdd={alert} />
    </ColumnContainer>
  );
};

export default Column;
