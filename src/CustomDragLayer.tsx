import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";
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
  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column id={item.id} text={item.text} index={item.index} isPreview />
      </div>
    </CustomDragLayerContainer>
  ) : null;
};

export default CustomDragLayer;
