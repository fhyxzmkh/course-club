import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./modules/NavBar.jsx";
import { Home } from "./pages/Home.jsx";
import { OnlineLearning } from "./pages/OnlineLearning.jsx";
import { ResourceDownload } from "./pages/ResourceDownload.jsx";
import { Exam } from "./pages/Exam.jsx";
import { TeamZone } from "./pages/TeamZone.jsx";
import { Footer } from "./modules/Footer.jsx";
import { useEffect, useState } from "react";
import { ClassZone } from "./pages/ClassZone.jsx";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check session on component mount
    axios
      .get("/api/check-session")
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data.googleId);
        } else {
          setUserId(null);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setUserId(null);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <NavBar userId={userId} setUserId={setUserId} />
        <div className="App-container flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/online-learning" element={<OnlineLearning />} />
            <Route path="/resource-download" element={<ResourceDownload />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/class-zone" element={<ClassZone userId={userId} />} />
            <Route path="/team-zone" element={<TeamZone userId={userId} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
