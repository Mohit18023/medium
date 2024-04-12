import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Circle from "./Circle";

interface BlogCardProps {
  id :number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  
  return (
    <Link to={`/blogs/${id}`}>

    <div className="p-4 border-b border-slate-200 min-w-screen max-w-screen-lg cursor-pointer">
      <div className="flex">
        <Avatar name={authorName} />

        <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2 ">
          <Circle />
        </div>
        <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">
        {content.split(" ").slice(0, 100).join(" ")}...
      </div>
      <div className="text-slate-500 font-thin text-sm pt-4">{`${Math.ceil(
        content.length / 100
      )} min read`}</div>
    </div>
    </Link>
  );
};
