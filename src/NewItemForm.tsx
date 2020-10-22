import React from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

interface NewItemFormProps {
  onAdd: (text: string) => void;
}
const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = React.useState("");
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};

export default NewItemForm;
