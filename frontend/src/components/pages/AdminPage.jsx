import {
  AppstoreOutlined,
  FileAddOutlined,
  MailOutlined,
  MessageOutlined,
  QuestionOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { ManagePost } from "../modules/ManagePost.jsx";
import { ManageMassage } from "../modules/ManageMassage.jsx";
import { UploadQuestion } from "../modules/UploadQuestion.jsx";
import { ChangeQuestion } from "../modules/ChangeQuestion.jsx";
import { ManageComment } from "../modules/ManageComment.jsx";
import { ManageUser } from "../modules/ManageUser.jsx";
import { ChangeGroup } from "../modules/ChangeGroup.jsx";
import { ChangeResource } from "../modules/ChangeResource.jsx";
import { DeleteResource } from "../modules/DeleteResource.jsx";

const items = [
  {
    key: "sub1",
    label: "互动管理",
    icon: <MailOutlined />,
    children: [
      {
        key: "1",
        label: "帖子管理",
      },
      {
        key: "2",
        label: "评论管理",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub2",
    label: "文件管理",
    icon: <FileAddOutlined />,
    children: [
      {
        key: "3",
        label: "上传资源",
      },
      {
        key: "4",
        label: "删除资源",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub3",
    label: "题目管理",
    icon: <QuestionOutlined />,
    children: [
      {
        key: "5",
        label: "上传题目",
      },
      {
        key: "6",
        label: "编辑题目",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "消息管理",
    icon: <MessageOutlined />,
    children: [
      {
        key: "7",
        label: "删除消息",
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub5",
    label: "成员管理",
    icon: <TeamOutlined />,
    children: [
      {
        key: "8",
        label: "删除成员",
      },
      {
        key: "9",
        label: "设置分组",
      },
    ],
  },
];

export const AdminPage = (props) => {
  const defaultOpenKeys = items
    .filter((item) => item.children)
    .map((item) => item.key);

  const [menuKey, setMenuKey] = useState("1");

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
      <div>
        <Menu
          onClick={(e) => {
            setMenuKey(e.key);
          }}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          items={items}
        />
      </div>
      <div className="bg-gray-100 w-full h-dvh overflow-y-auto">
        {menuKey === "1" ? <ManagePost /> : null}
        {menuKey === "2" ? <ManageComment /> : null}
        {menuKey === "3" ? (
          <ChangeResource
            resource={props.resource}
            setResource={props.setResource}
          />
        ) : null}
        {menuKey === "4" ? (
          <DeleteResource
            resource={props.resource}
            setResource={props.setResource}
          />
        ) : null}
        {menuKey === "5" ? <UploadQuestion /> : null}
        {menuKey === "6" ? <ChangeQuestion /> : null}
        {menuKey === "7" ? <ManageMassage /> : null}
        {menuKey === "8" ? <ManageUser /> : null}
        {menuKey === "9" ? <ChangeGroup /> : null}
      </div>
    </div>
  );
};
