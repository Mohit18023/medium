import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signin from "./pages/Signin"
import { Blog } from "./pages/Blog"
import Signup from "./pages/Signup"
import Blogs from "./pages/Blogs"
import {Publish} from "./pages/Publish"
export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/publish" element={<Publish />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
