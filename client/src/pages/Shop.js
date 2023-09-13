import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
    fetchDevices(null, null, 1, 5).then((data) => {
      device.setDevices(data.docs);
      device.setTotalCount(data.total);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType._id, device.selectedBrand._id, device.page, device.limit).then(
      (data) => {
        device.setDevices(data.docs);
        device.setTotalCount(data.total);
      }
    );
  }, [device.page, device.selectedBrand, device.selectedType]);
  return (
    <Container className="">
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />

          {device.devices.length === 0 ? "No results" : <DeviceList />}
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
