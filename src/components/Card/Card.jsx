import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../../itemTypes";
import { selected } from "../../redux/action";
import styles from "./Card.module.scss";

function Card({ id, moveCard, col_id, card, card_index }) {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const [newCardTargetIndex, setNewCardTarget] = useState(card_index);
  const [moveCardIndex, setNewCardIndex] = useState({});

  // console.log("localCardsState", localCardsState);
  // console.log("store.columns", store.columns);

  const [{ isDropped }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const sourceColumnIndex = store.columns.findIndex(
        (col) => col.id === store.selectedElement.column_id
      );
      console.log(
        "🚀 ~ file: Card.jsx ~ line 50 ~ drop ~ sourceColumnIndex",
        sourceColumnIndex
      );

      const sourceCardIndex = store.columns[sourceColumnIndex].cards.findIndex(
        (card) => card.id === item.id
      );

      console.log(
        "🚀 ~ file: Card.jsx ~ line 64 ~ drop ~ sourceCardIndex",
        sourceCardIndex
      );

      const targetColumnIndex = store.columns.findIndex(
        (col) => col.id === col_id
      );

      console.log(
        "🚀 ~ file: Card.jsx ~ line 54 ~ drop ~ targetColumnIndex",
        targetColumnIndex
      );

      const targetCardIndex = store.columns[targetColumnIndex].cards.findIndex(
        (card) => card.id === id
      );

      // if (sourceCardIndex === -1) {
      //   sourceCardIndex = targetCardIndex;
      // }

      // if (sourceColumnIndex === -1) {
      //   sourceColumnIndex = targetColumnIndex;
      // }

      console.log(
        "🚀 ~ file: Card.jsx ~ line 70 ~ drop ~ targetCardIndex",
        targetCardIndex
      );

      const cardsArray = store.columns[targetColumnIndex].cards;

      console.log(
        "🚀 ~ file: Card.jsx ~ line 80 ~ drop ~ cardsArray",
        cardsArray.length
      );

      if (cardsArray.length < 1) {
        return;
      }

      const sourceId = item.id;
      const targetId = id;

      if (!targetId) {
        return;
      }

      if (sourceId === targetId) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        targetCardIndex - sourceCardIndex === 1 &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      if (sourceCardIndex < targetCardIndex && hoverClientY < hoverMiddleY) {
        setNewCardTarget(targetCardIndex - 1);
      }

      if (
        sourceCardIndex - targetCardIndex === 1 &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      if (sourceCardIndex > targetCardIndex && hoverClientY > hoverMiddleY) {
        setNewCardTarget(targetCardIndex - 1);
        return;
      }
      // setNewCardIndex(
      //   sourceCardIndex,
      //   targetCardIndex,
      //   sourceColumnIndex,
      //   targetColumnIndex
      // );

      moveCard(
        sourceCardIndex,
        targetCardIndex,
        sourceColumnIndex,
        targetColumnIndex
      );
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    canDrag: !!ref,
    item: () => {
      return { id, card_index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    if (isDragging) {
      dispatch(
        selected({
          selectedElement: {
            card_id: id,
            column_id: col_id,
          },
        })
      );
    } else {
      return null;
    }
  }, [isDragging]);

  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
        background: isDropped ? "wheat" : "white",
      }}
      ref={ref}
      className={styles.card}
      key={card.id}
      id={card.id}
    >
      {card.text}
    </div>
  );
}

export default Card;
