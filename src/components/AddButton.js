import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { toJS } from "mobx";
import movieStore from "../store/store";
import { observer } from "mobx-react";
import { Input, Button } from "antd";

export const AddButton = observer(() => {
  const addMovie = toJS(movieStore.addMovie);
  const [movieName, setMovieName] = useState(null);
  return (
    <div style={{ display: "flex", width: "30%" }}>
      <Input
        size="large"
        placeholder="Movie..."
        value={movieName}
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
      />
      <Button
        type="primary"
        size="large"
        onClick={() => {
          if (movieName) {
            addMovie({
              name: movieName,
              watched: false,
            });
            setMovieName("");
          }
        }}
        icon={<PlusOutlined />}
      >
        Add
      </Button>
    </div>
  );
});
