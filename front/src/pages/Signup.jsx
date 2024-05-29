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

export default function Signup() {
  return (
    <>
      <div className="h-full flex items-center justify-center ">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              All field are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fname">First name</Label>
                  <Input id="fname" type="text" placeholder="First name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lname">Last name</Label>
                  <Input id="lname" type="text" placeholder="Last name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email address" type="email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="Password" type="password" autoComplete="true" />
                </div>
            <Link to="/login" className="text-sm hover:underline" >Already have account?</Link>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Signup</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
