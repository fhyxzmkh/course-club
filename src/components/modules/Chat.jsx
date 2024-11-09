import { SingleMessage } from "./SingleMessage.jsx";
import { NewMessage } from "./NewMessage.jsx";

export const Chat = (props) => {
  return (
    <div className="flex-col">
      <h3 className="font-bold">Chatting with {props.data.recipient.name}</h3>
      <div>
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <NewMessage recipient={props.data.recipient} />
    </div>
  );
};
