"use client";
import { FormEvent, useState } from "react";
import {
  signupFunction,
  forgotPasswordFunction,
} from "@/utils/auth-function";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
interface AuthFormProps {
  children: React.ReactNode;
  buttonTitle: string;
  authFunctionId: number;
}

export const AuthForm = ({
  children,
  buttonTitle,
  authFunctionId,
}: AuthFormProps) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const handleOnsubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Convert FormData into a plain object.
    const formValues: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    let response;

    try {
      switch (authFunctionId) {
        case 1:
          const result = await signIn("credentials", {
            redirect: false, // Prevent automatic redirection
            email: formValues.email,
            password: formValues.password,
          });

          if (!result?.error) {
            router.push("/");
          } else {
            setErrorMessage(result.error); // Set error message for display
            setTimeout(() => {
              setErrorMessage("");
            }, 2500);
          }
          break;
        case 2:
          response = await signupFunction({
            email: formValues.email,
            password: formValues.password,
            username: formValues.username,
            confirmPasssword: formValues.confirmPassword, // Ensure this key matches your function's parameter.
          });
          break;

        case 3:
          response = await forgotPasswordFunction({ email: formValues.email });
          break;
        default:
          console.log("Invalid authFunctionId");
      }
    } catch (error: any) {
      const errorMessage = error?.message;
      console.error("Error:", error);
      setErrorMessage(errorMessage); // Set error message for display
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <form onSubmit={handleOnsubmit} className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-4 mt-2">{children}</div>
      </div>
      <div className="h-[18px]">
        {errorMessage && (
          <div className="flex items-center gap-2 text-[12px] text-red-500 bg-destructive/5 px-2 py-1 rounded-sm"><ExclamationTriangleIcon className="h-3 w-3 flex-none"/>{errorMessage}!</div>
        )}
      </div>
      <Button
        className="bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
        type="submit"
      >
        {buttonTitle}
      </Button>
    </form>
  );
};
