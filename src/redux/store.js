import columns from "./reducer";
import { createStore } from "redux";

// console.log("columns", columns);

const store = createStore(
  columns,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
