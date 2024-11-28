import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, List, Modal } from "antd";

export const ChangeGroup = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newGroupId, setNewGroupId] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUsers = async () => {
    const response = await axios.get("/api/admin-getUsers");
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);

    console.log(user);
  };

  const handleOk = async () => {
    try {
      await axios.get(
        `/api/admin-setGroup?userId=${selectedUser.googleId}&groupId=${newGroupId}`,
      );

      await getUsers();

      alert("Group id changed successfully!");

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing group id:", error);
      alert("Failed to change group id. Please try again.");
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white mt-4">
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
                color="primary"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title="Edit Group"
        open={isModalOpen}
        destroyOnClose={true}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Enter new group ID"
          value={newGroupId}
          onChange={(e) => setNewGroupId(e.target.value)}
        />
      </Modal>
    </>
  );
};
