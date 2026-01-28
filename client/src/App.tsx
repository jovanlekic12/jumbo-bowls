import { useState } from "react";

import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  return <div className="bg-red-500">{t("Welcome to React")}</div>;
}

export default App;
