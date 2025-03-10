import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Novatrix } from "uvcanvas";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearAllUserError } from "@/Store/UserSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-component/SpecialLoadingButton";

const Login = ({ className, ...props }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login(user.email, user.password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserError());
    }
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div
        className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)}
        {...props}
      >
        <AnimatedBackground />
        <Card className="w-full p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-white text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Login with Apple
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Login with Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-500" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-gray-800 text-white placeholder-gray-400 border-gray-600"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-gray-800 text-white placeholder-gray-400 border-gray-600"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                </div>
                {loading ? (
                  <SpecialLoadingButton content={"Logging In"} />
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                  >
                    Login
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <a
                href="/sign"
                className="underline underline-offset-4 text-blue-400 hover:text-blue-500 transition-all"
              >
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-400">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline text-gray-300 hover:text-gray-400">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-gray-300 hover:text-gray-400">
            Privacy Policy
          </a>
        </p>
        {/* <Novatrix /> */}
      </div>
    </div>
  );
};

export default Login;
