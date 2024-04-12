import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";


export const useBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState([]);

    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        
        }).then((res)=>{
                setBlogs(res.data.blogs);
                setLoading(false);
            })
    })


    return {loading,blogs}
    
}

export interface Blog{
    id: number;
    author : {
        name: string;
    }
    title: string;
    content: string;

}


export const useBlog = ((id :{id:string}) =>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState();

    
    useEffect(()=>{
        console.log(id)
        console.log(`${BACKEND_URL}/api/v1/blog/${id}`);
        axios.get(`${BACKEND_URL}/api/v1/blog/${id.id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        
        }).then((res)=>{
                
                setBlog(res.data.blog);
                setLoading(false);
            })
    })


    return {loading,blog}
})