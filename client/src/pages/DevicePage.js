import React, { useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card } from "react-bootstrap";
import bigStar from "../assets/bigStar.jpg";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, [id]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} style={{ textAlign: "center" }}>
          <Image thumbnail src={process.env.REACT_APP_API_URL + device.img}></Image>
        </Col>
        <Col>
          <h3 style={{ color: "#CC0000", fontSize: "3rem" }}> ${device.price}</h3>
          <Button style={{ textTransform: "uppercase" }} variant={"primary"} className="me-3">
            Add to cart
          </Button>
          <Button style={{ textTransform: "uppercase" }} variant={"secondary"}>
            Buy now
          </Button>

          <h1>Specs</h1>
          <ul>
            {device.info.map((info, index) => (
              <Row key={info._id}>
                <li className="mb-1">
                  {info.title}: {info.description}
                </li>
              </Row>
            ))}
          </ul>
        </Col>

        {/* <Col md={4}>
          <Row
            className="d-flex align-items-center justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: "64px",
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col> */}
      </Row>
      <Row className="d-flex flex-column m-5"></Row>
    </Container>
  );
};

export default DevicePage;
