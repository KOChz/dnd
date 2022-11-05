import { MOVE_CARD, MOVE_COLUMN, SELECTED } from "./actionTypes";

export const swapColumns = ({ sourceColumnIndex, targetColumnIndex }) => ({
  type: MOVE_COLUMN,
  payload: {
    sourceColumnIndex,
    targetColumnIndex,
  },
});

export const swapCards = ({
  sourceCardIndex,
  targetCardIndex,
  sourceColumnIndex,
  targetColumnIndex,
}) => ({
  type: MOVE_CARD,
  payload: {
    sourceCardIndex,
    targetCardIndex,
    sourceColumnIndex,
    targetColumnIndex,
  },
});

export const selected = ({ selectedElement }) => ({
  type: SELECTED,
  payload: { selectedElement },
});
