import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 2).then((data) => {
      console.log(data);
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
    // fetchOneDevice(device.id).then((data) => device.setDevice(data.rows));
  }, []);

  return (
    <Container className="">
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          {!device.devices ? "No results" : <DeviceList />}
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
