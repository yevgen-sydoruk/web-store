import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Col
      className="d-flex mb-3
    "
    >
      {device.brands.map((brand) => (
        <Card
          key={brand._id}
          style={{ cursor: "pointer" }}
          className="p-3 mr-2"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand._id === device.selectedBrand._id ? "danger" : "light"}
        >
          {brand.name + " " + brand._id}
        </Card>
      ))}
    </Col>
  );
});
export default BrandBar;
