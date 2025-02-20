import { Route, Routes } from "react-router-dom";
import "./App.css";

import PrimaryLayout from "@/layouts/primary-layout";

import Home from "@/pages/home";

function App() {
  return (
    <Routes>
      <Route element={<PrimaryLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
