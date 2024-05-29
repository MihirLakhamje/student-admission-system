import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  localStorage.removeItem("authToken");
  const navigate = useNavigate();

  const { loginAction } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await loginAction(input);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="h-full flex items-center justify-center ">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome, Back!</CardTitle>
            <CardDescription>
              All field are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email address" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="Password" type="password" autoComplete="true" />
                </div>
            <Link className="text-sm hover:underline" >Forgot password?</Link>
            <Link to="/signup" className="text-sm hover:underline" >Doesn't have account?</Link>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
