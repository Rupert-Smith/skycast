import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import "./styles/global.scss";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
