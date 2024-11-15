import { PostList } from "../modules/PostList.jsx";
import { Profile } from "../modules/Profile.jsx";

export const Home = (props) => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-screen-lg">
        <Profile userId={props.userId} />
        <div className="md:col-span-2 bg-white p-4 rounded shadow-md">
          <PostList />
        </div>
      </div>
    </div>
  );
};
