import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import Card from "../Card/Card";
import { ItemTypes } from "../../itemTypes";
import styles from "./Column.module.scss";
import { swapCards } from "../../redux/action";

function Column({ cards, id, moveColumn, col_id, column, col_index }) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const [moveCardIndex, setNewCardIndex] = useState({});

  const moveCard = useCallback(
    (
      sourceCardIndex,
      targetCardIndex,
      sourceColumnIndex,
      targetColumnIndex
    ) => {
      dispatch(
        swapCards({
          sourceCardIndex,
          targetCardIndex,
          sourceColumnIndex,
          targetColumnIndex,
        })
      );
    },
    []
  );

  const [newColumnTarget, setNewColumnTarget] = useState(col_index);

  const ref = useRef(null);
  const [{ isDropped }, drop] = useDrop({
    accept: [ItemTypes.COLUMN, ItemTypes.CARD],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (monitor.getItemType() === ItemTypes.COLUMN) {
        if (!ref.current) {
          return;
        }

        const sourceIndex = store.columns.findIndex(
          (col) => col.id === item.id
        );
        const targetIndex = store.columns.findIndex((col) => col.id === id);
        const sourceId = item.id;
        const targetId = id;

        if (sourceId === targetId) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        if (targetIndex - sourceIndex === 1 && hoverClientX > hoverMiddleX) {
          return;
        }

        if (sourceIndex < targetIndex && hoverClientX < hoverMiddleX) {
          setNewColumnTarget(targetIndex + 1);
        }

        if (sourceId - targetId === 1 && hoverClientX > hoverMiddleX) {
          return;
        }

        if (sourceIndex > targetIndex && hoverClientX < hoverMiddleX) {
          setNewColumnTarget(targetIndex - 1);
        }
        item.id = targetIndex;
        console.log("newTarget", newColumnTarget);

        moveColumn(sourceIndex, targetIndex);
      }
      if (monitor.getItemType() === ItemTypes.CARD) {
        if (store.columns[col_index].cards.length > 1) {
          return;
        }
        const sourceId = item.id;

        const sourceColumnIndex = store.columns.findIndex(
          (col) => col.id === store.selectedElement.column_id
        );
        console.log(
          "🚀 ~ file: Column.jsx ~ line 137 ~ drop ~ sourceColumnIndex",
          sourceColumnIndex
        );

        const sourceCardIndex = store.columns[
          sourceColumnIndex
        ].cards.findIndex((card) => card.id === item.id);

        console.log(
          "🚀 ~ file: Column.jsx ~ line 140 ~ drop ~ sourceCardIndex",
          sourceCardIndex
        );

        const targetColumnIndex = store.columns.findIndex(
          (col) => col.id === id
        );
        console.log(
          "🚀 ~ file: Column.jsx ~ line 151 ~ drop ~ targetColumnIndex",
          targetColumnIndex
        );

        const targetCardIndex = 0;

        // setNewCardIndex(
        //   sourceCardIndex,
        //   targetCardIndex,
        //   sourceColumnIndex,
        //   targetColumnIndex
        // );

        if (
          !cards.id &&
          !!sourceId &&
          store.columns[targetColumnIndex].cards.length < 1
        ) {
          moveCard(
            sourceCardIndex,
            targetCardIndex,
            sourceColumnIndex,
            targetColumnIndex
          );
        }
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      return { id, col_index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={styles.wrapper}
      key={column.id}
      style={{
        opacity: opacity,
        background: isDropped ? "gray" : "wheat",
      }}
      ref={ref}
    >
      <h1 className={styles.title}>{column.title}</h1>
      <div className={styles.cards_wrapper}>
        {cards.map((card, index) => (
          <Card
            moveCard={moveCard}
            card_index={index}
            col_index={col_index}
            card={card}
            id={card.id}
            key={card.id}
            col_id={column.id}
            column={column}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
