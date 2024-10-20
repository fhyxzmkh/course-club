import "./tailwind.css";
import { Link } from "react-router-dom";

export function NavBar() {
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
                to="/comment-board"
                className="text-blue-500 hover:text-blue-600"
              >
                留言板
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4 ml-4">
          <div>登录组件</div>
          <div>个人信息</div>
        </div>
      </nav>
    </>
  );
}
