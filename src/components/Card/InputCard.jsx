import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../itemTypes";
import { selected } from "../../redux/action";
import styles from "./Card.module.scss";

function InputCard({ card_key, id, moveCardToEmptyColumn, col_id }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const sourceCol = useSelector((store) => [store]);
  // console.log("sourceCol", sourceCol[0].selectedElement.card_id);
  // console.log("id", id);

  const [newTarget, setNewTarget] = useState(id);

  const [{ isDropped }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    drop(item, monitor) {
      // console.log("id, item.id", id, item.id);
      console.log("item", item, id);
      //   if (!ref.current) {
      //     return;
      //   }
      const sourceId = item.id;
      const targetId = id;

      if (sourceId === targetId) {
        return;
      }
      //   const hoverBoundingRect = ref.current?.getBoundingClientRect();

      //   const hoverMiddleY =
      //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      //   const clientOffset = monitor.getClientOffset();
      //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      //   if (targetId - sourceId === 1 && hoverClientY > hoverMiddleY) {
      //     return;
      //   }

      //   if (sourceId < targetId && hoverClientY < hoverMiddleY) {
      //     setNewTarget(targetId - 1);
      //   }

      //   if (sourceId - targetId === 1 && hoverClientY > hoverMiddleY) {
      //     return;
      //   }

      //   if (sourceId > targetId && hoverClientY > hoverMiddleY) {
      //     setNewTarget(targetId - 1);
      //     return;
      //   }
      //   item.id = targetId;
      //   console.log("target_col_id", col_id);
      moveCardToEmptyColumn(
        sourceId,
        sourceCol[0].selectedElement.column_id,
        col_id
      );
    },
  });

  //   const [{ isDragging }, drag] = useDrag({
  //     type: ItemTypes.CARD,
  //     canDrag: !!ref,
  //     item: () => {
  //       return { id };
  //     },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   });

  //   drag(drop(ref));

  //   useEffect(() => {
  //     if (isDragging) {
  //       dispatch(
  //         selected({
  //           selectedElement: {
  //             card_id: id,
  //             column_id: col_id,
  //           },
  //         })
  //       );
  //     } else {
  //       return null;
  //     }
  //   }, [isDragging]);

  // console.log("!!isDragging_CARD", isDragging);

  return (
    <div
      //   style={{
      //     opacity: isDragging ? 0 : 1,
      //     background: isDropped ? "wheat" : "white",
      //   }}
      ref={drop}
      className={styles.card}
      key={card_key}
      //   id={id}
    >
      <input className={styles.input} />
    </div>
    // <div className={styles.droptarget}></div>
  );
}

export default InputCard;
