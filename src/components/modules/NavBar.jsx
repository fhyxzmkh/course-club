import "./tailwind.css";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { Button } from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function NavBar(props) {
  const handleLogInSuccess = (codeResponse) => {
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
          return;
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
          props.setUserId(response.data.userId);
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
          props.setUserId(null);
        } else {
          alert("Logout failed");
        }
      })
      .catch((error) => {
        alert("Error during backend logout:", error);
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
          {props.userId === null ? (
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
