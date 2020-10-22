import React from "react";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Column from "./Column";
import { AppContainer } from "./styles";

function App() {
  const { state } = useAppState();

  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={alert} />
    </AppContainer>
  );
}

export default App;
