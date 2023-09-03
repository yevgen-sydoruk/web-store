import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type._id === device.selectedType._id}
          onClick={() => device.setSelectedType(type)}
          key={type._id}
        >
          {type.name + " " + type._id}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});
export default TypeBar;
