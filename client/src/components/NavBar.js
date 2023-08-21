import React, { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const NavBar = (props) => {
  const { user } = useContext(Context);
  console.log(user);
  console.log(user.isAuth);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white", textDecoration: "none" }} to={SHOP_ROUTE}>
          BestPurchase
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={"outline-light"}>Admin</Button>
            <Button variant={"outline-light"} className="ml-4">
              Leave
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
