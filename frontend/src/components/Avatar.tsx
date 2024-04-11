const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full ">
      <span className="text-xs font-extralight text-gray-100 ">
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
