import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import star from "../assets/star.jpg";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className="mb-3 d-flex justify-content-center  "
      onClick={() => navigate(DEVICE_ROUTE + "/" + device._id)}
    >
      <Card style={{ width: 250, cursor: "pointer" }} border={"dark"} className="p-2">
        <Image
          className="align-self-center mb-3"
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />

        <h2 style={{ fontSize: "1.0625rem" }}>{device.name}</h2>
        <div className="d-flex align-items-center text-black-50">
          <div>{device.rating}</div>
          <Image width={20} height={20} src={star} />
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
