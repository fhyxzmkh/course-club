import "./tailwind.css";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Button } from "antd";

export function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setLoggedIn(true);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLogOut = () => {
    googleLogout();
    setLoggedIn(false);
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
            <Button onClick={handleLogIn}>Sign in with Google 🚀 </Button>
          ) : (
            <Button onClick={handleLogOut}>Log out</Button>
          )}
        </div>
      </nav>
    </>
  );
}
