import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Divider } from "antd";
import { PostList } from "../modules/PostList.jsx";

export const Home = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-screen-lg">
        <div className="bg-white p-4 rounded shadow-md h-[460px]">
          <div className="flex justify-center items-center w-full h-auto">
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<AntDesignOutlined />}
            />
          </div>
          <Divider />
          <div className="flex justify-center items-center w-full h-auto">
            Username
          </div>
          <Divider />
          <div className="w-full h-auto text-center">
            小组成员
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
              <li>成员1</li>
              <li>成员2</li>
              <li>成员3</li>
              <li>成员4</li>
              <li>成员5</li>
              <li>成员6</li>
              <li>成员7</li>
              <li>成员8</li>
              <li>成员9</li>
              <li>成员10</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2 bg-white p-4 rounded shadow-md">
          {/*<h2 className="text-xl font-bold mb-3 text-center">交流互动</h2>*/}
          <PostList />
        </div>
      </div>
    </div>
  );
};
