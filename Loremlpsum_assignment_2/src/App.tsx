import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/page";
import Dashboard from "./pages/dashboard/page";

import "./styles/style.scss";

const App = () => (
   <Router>
      <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
   </Router>
);

export default App;
