import { SingleUser } from "./SingleUser.jsx";

export const ChatList = (props) => {
  return (
    <>
      <h3 className="font-bold mb-4 text-2xl text-center">Open Chats</h3>
      {props.teamMembers.map((member, i) => (
        <SingleUser
          key={i}
          setTeamMembers={props.setTeamMembers}
          member={member}
          active={member === props.active}
        />
      ))}
    </>
  );
};
