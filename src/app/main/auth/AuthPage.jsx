import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoogleLogin } from "@react-oauth/google";
import jwtService from "../../../service/jwtService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "react-router-dom";

const SignupFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

const OTPFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function AuthPage() {
  const { toast } = useToast();
  const [tokenSent, setTokenSent] = useState(false);
  const [email, setEmail] = useState("");

  const signupForm = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const otpForm = useForm({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onSubmit",
  });

  const oAuthLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      jwtService.loginUserWithGoogleToken(tokenResponse),
    flow: "implicit",
  });

  const emailLogin = async (data) => {
    if (data) {
      try {
        const response = await jwtService.sendToken({ email: data.email });
        toast({
          title: "OTP Token Sent!",
          description: response.message,
        });
        setTokenSent(true);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
        toast({
          title: "An Error Occurred!",
          description: err.message || "An unexpected error occurred.",
        });
      }
    }
  };

  const onOTPSubmit = async (data) => {
    if (data) {
      try {
        await jwtService.loginUser({ token: data.pin, email });
      } catch (err) {
        console.error(err);
        toast({
          title: "An Error Occurred!",
          description: err.message || "An unexpected error occurred.",
        });
      } finally {
        otpForm.reset({ pin: "" });
      }
    }
  };

  if (tokenSent) {
    return (
      <div className="w-[95%] mx-auto">
        <header className="py-2 flex items-center justify-between">
          <Link className="text-2xl font-bold">Jotion</Link>
          <Button className="p-0 h-auto bg-transparent hover:bg-transparent focus:bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="h-12 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </header>
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)}>
            <div className="items-center flex flex-col space-y-8 justify-center pt-64 w-[80%] mx-auto">
              <FormField
                control={otpForm.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center flex-col">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="h-16 w-16" />
                          <InputOTPSlot index={1} className="h-16 w-16" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} className="h-16 w-16" />
                          <InputOTPSlot index={3} className="h-16 w-16" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} className="h-16 w-16" />
                          <InputOTPSlot index={5} className="h-16 w-16" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                    <div className="flex justify-between items-center w-full py-8">
                      <Button
                        className="bg-transparent border  text-primary gap-2 hover:bg-transparent w-24"
                        onClick={() => {
                          setTokenSent(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back
                      </Button>
                      <Button className="w-24">Continue</Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    );
  } else {
    return (
      <>
        <Button onClick={() => oAuthLogin()}>Continue with Google</Button>
        <Form
          className="space-y-8 mx-auto w-[60%] flex flex-col items-center"
          {...signupForm}
        >
          <form onSubmit={signupForm.handleSubmit(emailLogin)}>
            <FormField
              className="grid w-full max-w-sm items-center gap-1.5"
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Work email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>
              Use an organization email to easily collaborate with teammates
            </p>
            <Button className="bg-primary" onClick={() => emailLogin()}>
              Continue
            </Button>
          </form>
        </Form>
      </>
    );
  }
}
