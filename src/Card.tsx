import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "./AppStateContext";
import { CardDragItem } from "./DragItem";
import { CardContainer } from "./styles";
import { useItemDrag } from "./utils/useItemDrag";
import { isHidden } from "./utils/isHidden";

interface CardProps {
  text: string;
  id: string;
  index: number;
  columnId: string;
  isPreview?: boolean;
}
const Card = ({ text, id, index, columnId, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      const dragIndex = item.index;
      const sourceColumn = item.columnId;
      const hoverIndex = index;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, sourceColumn, hoverIndex, targetColumn },
      });

      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "CARD", id)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};

export default Card;
