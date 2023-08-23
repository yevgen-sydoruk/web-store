import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import star from "../assets/star.jpg";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className="mb-3 d-flex justify-content-center  ">
      <Card
        className="d-flex justify-content-center"
        onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
        style={{ width: 150, cursor: "pointer", border: "light" }}
      >
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className="d-flex justify-content-between align-items-center text-black-50">
          <div>Samsung</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={20} height={20} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
