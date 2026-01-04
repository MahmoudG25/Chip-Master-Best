import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Serves from "./pages/Serves";
import About from "./pages/About";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serves" element={<Serves />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
