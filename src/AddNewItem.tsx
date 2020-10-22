import React from "react";
import NewItemForm from "./NewItemForm";
import { AddItemButton } from "./styles";

interface AddNewItemProps {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
}

const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = React.useState(false);
  const { dark, onAdd, toggleButtonText } = props;
  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }
  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(!showForm)}>
      {toggleButtonText}
    </AddItemButton>
  );
};

export default AddNewItem;
