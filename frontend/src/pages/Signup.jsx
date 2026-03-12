import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSignup = async (signupInfo) => {
    try {
      if (!signupInfo.name) {
        toast.error("Please enter Name!");
        return;
      }
      if (!signupInfo.email) {
        toast.error("Please enter email!");
        return;
      }
      if (!signupInfo.password) {
        toast.error("Please enter password!");
        return;
      }
      const res = await axios.post("/api/v1/auth/register", signupInfo);
      // console.log("res", res);
      if (res.success && res.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success("Successfully signed up!");
        setTimeout(() => {
          navigate("/dashboard"); // navigate to dashboard
        }, 1000); // wait for 1 second for the toast to be displayed
      } else {
        toast.error("Signup failed!");
      }
    } catch (error) {
      console.error("handleSignup:", error);
    }
  };
  // console.log("signupInfo", signupInfo);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Create Account</h2>
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Full Name"
            onChange={(e) =>
              setSignupInfo({
                ...signupInfo,
                name: e.target.value,
              })
            }
          />
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Email"
            onChange={(e) =>
              setSignupInfo({
                ...signupInfo,
                email: e.target.value,
              })
            }
          />
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setSignupInfo({
                ...signupInfo,
                password: e.target.value,
              })
            }
          />
          <Button
            onClick={() => handleSignup(signupInfo)}
            className="w-full hover:cursor-pointer"
          >
            Signup
          </Button>
          <p className="text-sm text-center">
            Already have account?{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
