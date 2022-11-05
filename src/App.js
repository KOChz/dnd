import styles from "./App.module.scss";
import ColumnList from "./components/ColumnList/ColumnList";
import store from "./redux/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ColumnList />
      </DndProvider>
    </Provider>
  );
}

export default App;
