import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoogleLogin } from "@react-oauth/google";
import jwtService from "../../../service/jwtService";

export default function SignupPage() {
    const oAuthLogin = useGoogleLogin({
      onSuccess: (tokenResponse) => jwtService.createUserWithToken(tokenResponse),
      flow: "implicit",
    });
  
  return (
    <div className="space-y-8 mx-auto w-[60%] flex flex-col items-center">
      <Button onClick={() => oAuthLogin()}>Continue with Google</Button>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input type="email" id="email" placeholder="Enter your email address" />
      </div>
      <p>Use an organization email to easily collaborate with teammates</p>
      <Button className="bg-primary">Continue</Button>
    </div>
  );
}
