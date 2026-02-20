import { useEffect, useState } from "react";

import "./App.css";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/Home/Index";
import Login from "./pages/Login/Index";
import SignUp from "./pages/Signup/Index";

function App() {
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  async function test() {
    try {
      const products = await fetch(
        "http://localhost:3001/api/v1/products",
      ).then((res) => res.json());
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    test();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
