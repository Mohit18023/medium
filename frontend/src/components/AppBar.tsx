import Avatar from "./Avatar"

const AppBar = () => {
  return (
    <div className="border-b flex justify-between py-4 px-10">
      <div className="flex flex-col justify-center font-bold">
        Medium
      </div>
      <div>
        <Avatar name="John Doe" size="big" />
      </div>
    </div>
  )
}

export default AppBar
