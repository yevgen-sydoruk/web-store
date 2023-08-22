import React from "react";
import { Container, Col, Image, Row, Button, Card } from "react-bootstrap";
import bigStar from "../assets/bigStar.jpg";

const DevicePage = () => {
  const device = {
    id: 1,
    name: "Iphone 12 pro",
    price: 1000,
    rating: 5,
    img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-gold-2020?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1635202844000",
  };
  const description = [
    { id: 1, title: "RAM ", description: "6 GB" },
    { id: 2, title: "Camera ", description: "12 MP" },
    { id: 3, title: "Processor ", description: "Snapdragon" },
    { id: 4, title: "Cores", description: "2" },
    { id: 5, title: "Battery", description: "5000" },
  ];
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} style={{ textAlign: "center" }}>
          <Image width={300} height={300} src={device.img}></Image>
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
        {description.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
