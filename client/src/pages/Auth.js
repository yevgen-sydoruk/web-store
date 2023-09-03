import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  const clickHandler = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        console.log(data);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPasssword(e.target.value)}
            type="password"
          />
        </Form>
        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {isLogin ? (
            <div>
              Need Account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
            </div>
          ) : (
            <div>
              Do you have Account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
            </div>
          )}
          <Button variant={"outline-success"} onClick={clickHandler}>
            Submit
          </Button>
        </div>
      </Card>
    </Container>
  );
});

export default Auth;
