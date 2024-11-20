import { PostList } from "../modules/PostList.jsx";
import { Profile } from "../modules/Profile.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.userId === null) return;
    axios
      .get(`/api/profile?userId=${props.userId}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.userId]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-screen-lg">
        <Profile userId={props.userId} name={name} />
        <div className="md:col-span-2 bg-white p-4 rounded shadow-md">
          <PostList userId={props.userId} name={name} />
        </div>
      </div>
    </div>
  );
};
