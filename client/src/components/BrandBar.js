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
          className="p-3 m-2"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand._id === device.selectedBrand._id ? "danger " : "#dee2e6"}
        >
          {brand.name}
        </Card>
      ))}
    </Col>
  );
});
export default BrandBar;
