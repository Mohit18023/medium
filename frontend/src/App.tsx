import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signin from "./pages/Signin"
import { Blog } from "./pages/Blog"
import Signup from "./pages/Signup"
import Blogs from "./pages/Blogs"
export default function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/blogs" element={<Blogs />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
