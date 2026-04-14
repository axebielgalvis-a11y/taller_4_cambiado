import { Header } from "./features/layout/components/Header";
import { Content } from "./features/layout/components/Content";
import { Footer } from "./features/layout/components/Footer";
import  Login  from "./features/auth/Components/login";
import  Register  from "./features/auth/Components/register";
import RickAndMorty from "./features/api/rickandmorty";
import Dashboard from "./features/dashboard/Dashboard";
import { HashRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/rickandmorty" element={<RickAndMorty />} />
        <Route path="/Api" element={<RickAndMorty />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>

      <Footer />
    </HashRouter>
  );
}

export default App;
