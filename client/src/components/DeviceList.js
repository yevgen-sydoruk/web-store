import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { observer } from "mobx-react-lite";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.devices.map((device) => (
        <DeviceItem ket={device.id} device={device} />
      ))}
    </Row>
  );
});

export default DeviceList;