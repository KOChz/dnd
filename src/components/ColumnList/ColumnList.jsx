import { useDispatch, useSelector } from "react-redux";

import Column from "../Column/Column";
import styles from "./ColumnList.module.scss";
import { swapColumns } from "../../redux/action";

function ColumnList() {
  const dispatch = useDispatch();
  const columns = useSelector((store) => [...store.columns]);

  const moveColumn = (sourceColumnIndex, targetColumnIndex) =>
    dispatch(swapColumns({ sourceColumnIndex, targetColumnIndex }));

  return (
    <div className={styles.wrapper}>
      {columns.map((col, index) => (
        <Column
          column={col}
          key={col.id}
          id={col.id}
          moveColumn={moveColumn}
          cards={col.cards}
          col_index={index}
        />
      ))}
    </div>
  );
}

export default ColumnList;
