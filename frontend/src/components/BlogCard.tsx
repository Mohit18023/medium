import Avatar from "./Avatar";
import Circle from "./Circle";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="border border-slate-200 pb-4">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="font-extralight pl-2">{authorName}</div>
        <div className="flex justify-center flex-col pl-2">
          {" "}
          <Circle />{" "}
        </div>
        <div className="pl-2 font-thin text-slate-400">{publishedDate}</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100)}...</div>
      <div className="text-slate-500 font-thin text-sm">{`${Math.ceil(
        content.length / 100
      )} min read`}</div>
      {/* <div className="bg-slate-200 h-1  "></div> */}
    </div>
  );
};
