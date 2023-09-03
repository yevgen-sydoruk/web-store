import React, { StrictMode, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { checkIfAuth } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        checkIfAuth()
          .then((data) => {
            user.setUser(true);
            user.setIsAuth(true);
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }, [user]);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </StrictMode>
  );
});

export default App;
