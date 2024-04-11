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
    <div className="p-4 border-b border-slate-200">
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
      <div className="text-md font-thin">{content.slice(0, 100)}...</div>
      <div className="text-slate-500 font-thin text-sm pt-4">{`${Math.ceil(
        content.length / 100
      )} min read`}</div>
      {/* <div className="bg-slate-200 h-1  "></div> */}
    </div>
  );
};
