import "./tailwind.css";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check session on component mount
    fetch("/api/check-session")
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setLoggedIn(false);
      });
  }, []);

  const handleLogInSuccess = (codeResponse) => {
    const userPayload = jwtDecode(codeResponse.credential);

    fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${codeResponse.credential}`,
    )
      .then((res) => {
        if (res.ok) {
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

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ googleId: sub, name: name }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Login successful");
          setLoggedIn(true);
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during backend login:", error);
      });
  };

  const handleLogOut = () => {
    googleLogout();
    fetch("/api/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Logout successful");
          setLoggedIn(false);
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during backend logout:", error);
      });
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="flex items-center">
          <div className="text-lg font-bold text-gray-700">Course club</div>
          <ul className="flex space-x-4 ml-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                首页
              </Link>
            </li>
            <li>
              <Link
                to="/online-learning"
                className="text-blue-500 hover:text-blue-600"
              >
                在线学习
              </Link>
            </li>
            <li>
              <Link
                to="/resource-download"
                className="text-blue-500 hover:text-blue-600"
              >
                资源下载
              </Link>
            </li>
            <li>
              <Link to="/exam" className="text-blue-500 hover:text-blue-600">
                成果检验
              </Link>
            </li>
            <li>
              <Link
                to="/team-zone"
                className="text-blue-500 hover:text-blue-600"
              >
                小组空间
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4 ml-4">
          {!loggedIn ? (
            <GoogleLogin
              onSuccess={handleLogInSuccess}
              onError={() => alert("Something went wrong...")}
            />
          ) : (
            <Button onClick={handleLogOut}>Log out</Button>
          )}
        </div>
      </nav>
    </>
  );
}
