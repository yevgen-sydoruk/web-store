import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const NavBar = observer((props) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  function clickHandler() {
    console.log(user.isAuth);
    user.setIsAuth(true);
    console.log(user.isAuth);
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white", textDecoration: "none" }} to={SHOP_ROUTE}>
          BestPurchase
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>
              Admin
            </Button>
            <Button
              variant={"outline-light"}
              className="ml-4"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Leave
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={clickHandler}>
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
