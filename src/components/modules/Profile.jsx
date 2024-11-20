import { Avatar, Divider } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export const Profile = (props) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (props.userId === null) return;
    axios
      .get(`/api/teamMembers?userId=${props.userId}`)
      .then((response) => {
        setTeamMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  }, [props.userId]);

  return (
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
          src="https://www.loliapi.com/acg/pp/"
        />
      </div>
      <Divider />
      <div className="flex justify-center items-center w-full h-auto font-bold">
        {props.userId === null ? "游客" : props.name}
      </div>
      <Divider />
      <div className="w-full h-auto text-center">
        <h3 className="font-bold">小组成员</h3>
        {props.userId === null ? (
          <p className="mt-2">无</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 mt-1">
            {teamMembers.map((member, idx) => {
              return <li key={idx}>{member.name}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
