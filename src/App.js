import List from "./components/List";
import React, { useEffect, useState } from "react";
import service from "./Service";

function App() {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [thirdList, setThirdList] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await service.get();
      setFirstList(list);
    })();
  }, []);

  const moveElement = (list, moveLeft = false) => {
    if (list === firstList && !moveLeft) {
      setSecondList([list[0], ...secondList]);
      setFirstList(list.filter((o) => o !== list[0]));
    }
    if (list === secondList && !moveLeft) {
      setThirdList([list[0], ...thirdList]);
      setSecondList(list.filter((o) => o !== list[0]));
    }
    if (list === secondList && moveLeft) {
      setFirstList([list[0], ...firstList]);
      setSecondList(list.filter((o) => o !== list[0]));
    }
    if (list === thirdList) {
      const lastItem = list[list.length - 1];
      service.delete(lastItem.id).then(() => {
        setThirdList((prevList) => prevList.filter((o) => o !== lastItem));
      });
    }
  };
  const listItemStyle = {
    border: "1px solid black",
    padding: "15px",
  };
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <div style={listItemStyle}>
        <List list={firstList} />
        {firstList.length > 0 && (
          <button onClick={() => moveElement(firstList)}>
            Transfer first to right
          </button>
        )}
      </div>
      <div style={listItemStyle}>
        <List list={secondList} />
        {secondList.length > 0 && (
          <div style={{ display: "flex", gap: "16px" }}>
            <button onClick={() => moveElement(secondList, true)}>
              Transfer first to left
            </button>
            <button onClick={() => moveElement(secondList)}>
              Transfer first to right
            </button>
          </div>
        )}
      </div>
      <div style={listItemStyle}>
        <List list={thirdList} />
        {thirdList.length > 0 && (
          <button onClick={() => moveElement(thirdList)}>
            Remove last item
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
