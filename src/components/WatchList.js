import React, { useState, useEffect } from "react";
import { toJS } from "mobx";
import movieStore from "../store/store";
import { observer } from "mobx-react";
import { List, Input, Button, Typography, Tag, Row, Col, Space } from "antd";

const { Search } = Input;
export const WatchList = observer(() => {
  const movies = toJS(movieStore.movies);
  const watchChange = toJS(movieStore.watchChange);
  const watchedMovie = toJS(movieStore.watchedMovie);
  const deleteMovie = toJS(movieStore.deleteMovie);

  const [data, setData] = useState([]);

  const updateData = () => {
    const _movies = movies.filter((movie) => movie.watched !== true);
    setData(_movies);
  };

  useEffect(() => {
    updateData();
  }, [movies.length, watchChange]);
  return (
    <div style={{ marginTop: 20, width: "100%" }}>
      <List
        header={
          <Row>
            <Col span={12}>
              <h3>WatchList {<Tag color="magenta">{data.length}</Tag>}</h3>
            </Col>
            <Col span={12}>
              <Search
                placeholder="Search Movie"
                size="large"
                allowClear
                onSearch={(value) => {
                  const updatedData = movies.filter(
                    (movie) =>
                      movie.name.includes(value) && movie.watched !== true
                  );
                  setData(updatedData);
                }}
              />
            </Col>
          </Row>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Col span={12}>
              <Typography.Text>{item.name}</Typography.Text>
            </Col>
            <Col span={12}>
              <Space size="large">
                <Button
                  type="primary"
                  onClick={() => {
                    const afterAdd = watchedMovie(item.id);
                    updateData();
                    setData(afterAdd);
                  }}
                >
                  watched
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    deleteMovie(item.id);
                  }}
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </Button>
              </Space>
            </Col>
          </List.Item>
        )}
      />
    </div>
  );
});
