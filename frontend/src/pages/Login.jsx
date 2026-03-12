import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // console.log("loginInfo=>", loginInfo);
  const navigate = useNavigate();
  const handleLogin = async (loginInfo) => {
    setLoading(true);
    try {
      // console.log("loginInfo", loginInfo);
      if (!loginInfo.email) {
        toast.error("Please enter email and password!");
        return;
      }
      if (!loginInfo.password) {
        toast.error("Please enter email and password!");
        return;
      }
      const res = await axios.post("/api/v1/auth/login", loginInfo);
      // console.log("res", res);
      if (res.success && res.data?.accessToken) {
        // localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/dashboard"); // navigate to dashboard
        }, 1000); // wait for 1 second for the toast to be displayed
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.error("handleLogin:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Email"
            required
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                email: e.target.value,
              })
            }
          />
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Password"
            type="password"
            required
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                password: e.target.value,
              })
            }
          />
          <Button
            className="w-full"
            onClick={() => handleLogin(loginInfo)}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Login"}
          </Button>
          <p className="text-sm text-center">
            No account?{" "}
            <Link className="text-blue-600" to="/signup">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
