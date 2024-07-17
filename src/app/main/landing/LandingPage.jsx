import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../../../public/animationData.json";

export default function LandingPage() {
  return (
    <div className="w-[95%] mx-auto ">
      {/* Header */}
      <header className="py-2 flex items-center justify-between">
        <Link className="text-2xl font-bold text-black">Jotion</Link>
        <Button className="lg:hidden p-0 h-auto bg-transparent hover:bg-transparent focus:bg-transparent">
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
        <Link
          className="rounded-md bg-black  text-white text-lg px-5 py-2 font-semibold"
          to="/login"
        >
          Get Notion free
        </Link>
      </header>

      <section className="py-8 w-[90%] mx-auto">
        <div className="mx-auto flex items-center justify-center">
          <h1 className="font-bold  break-words text-center text-[44px] leading-[54px] text-black">
            <span>Write, </span>
            <span>plan, </span>
            <br />
            <span>organize, </span> <span>play</span>
          </h1>
        </div>
        <div className="pt-4 text-black">
          <p className="text-center text-2xl font-semibold">
            Turn ideas into action
          </p>
          <p className="text-center text-2xl font-semibold">
            with Jotion’s AI-powered workspace.
          </p>
        </div>
        <div className="mx-auto w-full flex items-center justify-between py-8 flex-col space-y-4">
          <Link
            className="rounded-md bg-primary  text-white text-lg px-5 py-2 font-semibold"
            to="/login"
          >
            Get Notion free
          </Link>
          <Link
            to="/"
            className="text-lg text-primary flex items-center justify-center gap-2 font-semibold"
          >
            Request a demo{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <section className="flex mx-auto -mt-32 flex-row justify-center items-center relative h-96 w-96 ">
        <Lottie
          animationData={animationData}
          height={2}
          width={2}
          className="absolute top-auto left-auto right-auto bottom-auto"
        />
      </section>
    </div>
  );
}
