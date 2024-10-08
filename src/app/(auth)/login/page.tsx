"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
// import { loginSchema } from '~/lib/yupValidation';
import { login } from "./actions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import InputField from "@/components/InputField";
import { loginSchema } from "@/lib/yupValidation";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { error } = await login(values);
      if (error) {
        setLoading(false);
        toast({
          variant: "destructive",
          description: error,
        });
      } else {
        setLoading(false);
      }
    },
  });

  const { errors, touched, handleChange, handleBlur, handleSubmit, values } =
    formik;

  return (
    <div className="dark:bg-dark-background flex h-screen items-center justify-center bg-background">
      <div className="form dark:bg-dark-card my-auto w-[22rem] rounded-2xl bg-card p-6 py-10">
        <div className="mx-auto mb-8 flex flex-col items-center">
          <h1 className="dark:text-dark-foreground mt-4 text-center text-[28px] font-bold text-foreground">
            Welcome back
          </h1>
          <h4 className="dark:text-dark-foreground font-light text-foreground">
            Please sign in to continue
          </h4>
        </div>

        <div className="oauth flex w-full gap-x-6">
          <Link
            className="dark:border-dark-border dark:hover:bg-dark-accent mx-auto my-2 w-1/2 items-center justify-center rounded-lg border border-border p-3 px-4 duration-200 hover:bg-accent"
            href="/oauth/google"
          >
            <div className="flex gap-x-3">
              <FcGoogle className="text-2xl" />
              <h1 className="font-medium">Google</h1>
            </div>
          </Link>
          <Link
            className="dark:border-dark-border dark:hover:bg-dark-accent mx-auto my-2 w-1/2 items-center justify-center rounded-lg border border-border p-3 px-4 duration-200 hover:bg-accent"
            href="/oauth/github"
          >
            <div className="flex gap-x-3">
              <FaGithub className="text-2xl" />
              <h1 className="font-medium">Github</h1>
            </div>
          </Link>
        </div>

        <div className="relative my-4 flex w-full items-center text-xs">
          <div className="dark:bg-dark-border h-[0.5px] flex-grow bg-border"></div>
          <span className="dark:text-dark-foreground mx-4 text-foreground">
            OR
          </span>
          <div className="dark:bg-dark-border h-[0.5px] flex-grow bg-border"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
          <InputField
            id="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Enter your email"
          />

          <InputField
            id="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            showPass={showPass}
            setShowPass={setShowPass}
            error={errors.password}
            touched={touched.password}
          />

          <div className="btn">
            <div className="error mb-2 ml-3 text-xs text-red-500">{error}</div>

            {loading ? (
              <Button className="w-full py-4" disabled>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full py-4" type="submit">
                Sign in
              </Button>
            )}
          </div>

          <p className="dark:text-dark-text mt-2 flex flex-row items-center justify-center gap-x-2 text-center text-sm">
            Don&apos;t have an account?
            <Link href="/register">
              <span className="cursor-pointer transition-all duration-200 ease-linear hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
