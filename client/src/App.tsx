import { useState } from "react";

import "./App.css";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/Home/Index";

function App() {
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
