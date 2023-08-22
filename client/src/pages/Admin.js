import React from "react";
import { Container, Button } from "react-bootstrap";

const Admin = () => {
  return (
    <Container className="d-flex flex-column">
      <Button variont={"outline-dark"} className="mt-2">
        Add Type
      </Button>
      <Button variont={"outline-dark"} className="mt-2">
        Add Brand
      </Button>
      <Button variont={"outline-dark"} className="mt-2">
        Add Device
      </Button>
    </Container>
  );
};

export default Admin;
