import React from "react";
import "antd/dist/antd.css";
import { AddButton } from "./components/AddButton"; // adding a movie 
import { WatchList } from "./components/WatchList";
import { WatchedList } from "./components/WatchedList";
import { Row, Space } from "antd";
// 3 fun. and 3 components (add, watchlist, watchedlist)
const App = () => {
  return (
    <div style={{ margin: "10%" }}>
      <AddButton />
      <Row>
        <Space>
          <WatchList />
          <WatchedList />
        </Space>
      </Row>
    </div>
  );
};
export default App;
