import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import AddNewItem from "./AddNewItem";
import { useAppState } from "./AppStateContext";
import Card from "./Card";
import { DragItem } from "./DragItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { isHidden } from "./utils/isHidden";
import { useItemDrag } from "./utils/useItemDrag";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}
const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const dragRef = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });

        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const sourceColumn = item.columnId;
        const hoverIndex = 0;
        const targetColumn = id;

        if (sourceColumn === targetColumn) {
          return;
        }

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, sourceColumn, hoverIndex, targetColumn },
        });
        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });
  drop(drag(dragRef));
  return (
    <ColumnContainer
      ref={dragRef}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card id={task.id} key={task.id} index={i} columnId={id} text={task.text} />
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
