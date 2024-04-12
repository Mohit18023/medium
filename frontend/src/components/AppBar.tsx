import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const AppBar = () => {
  return (
    <div className="border-b flex justify-between py-4 px-10">
      <Link
        to="/blogs"
        className="flex flex-col justify-center font-bold cursor-pointer"
      >
        <div>Medium</div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>
        <Avatar name="John Doe" size="big" />
      </div>
    </div>
  );
};

export default AppBar;
