import { memo, useCallback, useState } from "react";

import { ItemTypes } from "../../itemTypes";
import { useDrag } from "react-dnd";

export const SourceBox = memo(function SourceBox({ type, children }) {
  const [forbidDrag, setForbidDrag] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      canDrag: !forbidDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, type]
  );
  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag);
  }, [forbidDrag, setForbidDrag]);

  // console.log("isDragging", isDragging);

  return <div ref={drag}>{children}</div>;
});
