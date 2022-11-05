// import update from "immutability-helper";
import { MOVE_CARD, MOVE_COLUMN, SELECTED } from "./actionTypes";

import { nanoid } from "nanoid";

export const initialState = {
  columns: [
    {
      id: nanoid(),
      title: "col1",
      cards: [
        {
          id: nanoid(),
          text: "1",
        },
        {
          id: nanoid(),
          text: "2",
        },
        {
          id: nanoid(),
          text: "3",
        },
      ],
    },
    {
      id: nanoid(),
      title: "col2",
      cards: [],
    },
    {
      id: nanoid(),
      title: "col3",
      cards: [],
    },
    {
      id: nanoid(),
      title: "col4",
      cards: [],
    },
  ],
  selectedElement: {},
};

export default function columns(state = initialState, { type, payload }) {
  switch (type) {
    case SELECTED: {
      return {
        ...state,
        selectedElement: { ...payload.selectedElement },
      };
    }
    case MOVE_COLUMN: {
      console.log("MOVE_COLUMN", MOVE_COLUMN);
      const nextState = JSON.parse(JSON.stringify({ ...state }));
      console.log("payload", payload);
      const deletedElement = nextState.columns.splice(
        payload.sourceColumnIndex,
        1
      );

      nextState.columns.splice(payload.targetColumnIndex, 0, deletedElement[0]);

      return nextState;
    }
    case MOVE_CARD: {
      const prevState = JSON.parse(JSON.stringify({ ...state }));

      const deletedElement = prevState.columns[
        payload.sourceColumnIndex
      ].cards.splice(payload.sourceCardIndex, 1);

      prevState.columns[payload.targetColumnIndex].cards.splice(
        payload.targetCardIndex,
        0,
        deletedElement[0]
      );

      return prevState;
    }
    default:
      return state;
  }
}
