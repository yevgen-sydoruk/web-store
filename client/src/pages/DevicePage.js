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
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}></Image>
        </Col>
        <Col md={4}>
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
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: "32px", border: "5px solid lightgray" }}
          >
            <h3>From: ${device.price}</h3>
            <Button variant={"outline-dark"}>Add to cart</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-5">
        <h1>Details</h1>
        {/* {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10 }}
          >
            {info.title}: {info}
          </Row>
        ))} */}
      </Row>
    </Container>
  );
};

export default DevicePage;
