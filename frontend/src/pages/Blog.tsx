// atom familes and selector families are used in this file
export const Blog = () => {
  const {loading,blog} = useBlog();

  if(loading){
    return (
      <div>
        {/* add skeletons here */}
        Loading...
      </div>
    )
  }

  return (
    <div>
      Blog
    </div>
  )
}
