import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./modules/NavBar.jsx";
import { Home } from "./pages/Home.jsx";
import { OnlineLearning } from "./pages/OnlineLearning.jsx";
import { ResourceDownload } from "./pages/ResourceDownload.jsx";
import { Exam } from "./pages/Exam.jsx";
import { TeamZone } from "./pages/TeamZone.jsx";
import { Footer } from "./modules/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <NavBar />
        <div className="App-container flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/online-learning" element={<OnlineLearning />} />
            <Route path="/resource-download" element={<ResourceDownload />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/team-zone" element={<TeamZone />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
