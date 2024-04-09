import { Link } from "react-router-dom";
import Input from "./Input";
import { SignupInput } from "@mohit1823/medium-common";
import { useState } from "react";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
                {type === "signin"? "LogIn to your account":"Create an Account"}
            </div>
            <div className="text-slate-500">
              {type === "signup" ? "Already have an account?" : "Don't have an account?"}

              <Link className="pl-2 underline" to={type === "signin"? "/signup":"/signin"}>
                {type === "signup" ? "Log In" : "Sign Up"}
              </Link>
             
            </div>
          </div>
          <div className="pt-8">
            <Input
              lable="Name"
              placeholder="Mohit"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <Input
              lable="Email"
              placeholder="Mohit@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <Input
              lable="password"
              type="password"
              placeholder="*********"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              className="text-white w-full mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
