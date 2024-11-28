import { useEffect, useState } from "react";
import axios from "axios";
import { Button, List } from "antd";

export const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/api/admin-getUsers");
      setUsers(response.data);
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.get(`/api/admin-deleteComment?userId=${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white  mt-4">
        <List
          header={<p className="font-bold text-center">成员列表</p>}
          bordered
          dataSource={users}
          renderItem={(user) => (
            <List.Item className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{user.name}</span>
                <p>组别：{user.groupId}</p>
              </div>
              <Button
                color="danger"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
