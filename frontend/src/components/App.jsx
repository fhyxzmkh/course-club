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
import { jwtDecode } from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { AdminPage } from "./pages/AdminPage.jsx";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check session on component mount
    axios.get("/api/check-session").then((response) => {
      if (response.status === 200) {
        setUserId(response.data.googleId);
      }
    });
  }, []);

  const handleLogIn = (codeResponse) => {
    const userPayload = jwtDecode(codeResponse.credential);

    axios
      .get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${codeResponse.credential}`,
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Valid token!");
        } else {
          console.error("Invalid token!");
        }
      })
      .catch((error) => {
        console.error("Network error during login:", error);
      });

    const name = userPayload.name;
    const sub = userPayload.sub;

    axios
      .post(
        "/api/login",
        {
          googleId: sub,
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Login successful");
          setUserId(response.data.userId);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        alert("Error during backend login:", error);
      });
  };

  const handleLogOut = () => {
    googleLogout();

    axios
      .post("/api/logout")
      .then((response) => {
        if (response.status === 200) {
          alert("Logout successful");
          setUserId(null);
        } else {
          alert("Logout failed");
        }
      })
      .catch((error) => {
        alert("Error during backend logout:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter basename="/course-club">
        <NavBar
          userId={userId}
          handleLogIn={handleLogIn}
          handleLogOut={handleLogOut}
        />
        <div className="App-container flex-1">
          <Routes>
            <Route path="/" element={<Home userId={userId} />} />
            <Route path="/online-learning" element={<OnlineLearning />} />
            <Route path="/resource-download" element={<ResourceDownload />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/class-zone" element={<ClassZone userId={userId} />} />
            <Route path="/team-zone" element={<TeamZone userId={userId} />} />
            <Route path="/admin" element={<AdminPage userId={userId} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
