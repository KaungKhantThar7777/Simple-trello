import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";
import Card from "./Card";
import Column from "./Column";
import { CustomDragLayerContainer } from "./styles";

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px,${y}px)`;
  return { transform, WebkitTransform: transform };
}

const CustomDragLayer: React.FC = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));
  if (!isDragging) {
    return null;
  }
  console.log(item);
  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === "COLUMN" ? (
          <Column id={item.id} text={item.text} index={item.index} isPreview={true} />
        ) : (
          <Card id={item.id} text={item.text} index={0} isPreview={true} columnId={item.columnId} />
        )}
      </div>
    </CustomDragLayerContainer>
  );
};

export default CustomDragLayer;
