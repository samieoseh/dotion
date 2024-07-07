import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

export default function LandingPage() {
  const params = useParams();
  console.log({ params });
  return (
    <div className="w-[95%] mx-auto ">
      {/* Header */}
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

      <section className="py-8 w-[90%] mx-auto">
        <div className="mx-auto flex items-center justify-center">
          <h1 className="font-bold  break-words text-center text-[44px] leading-[54px]">
            <span>Write, </span>
            <span>plan, </span>
            <br />
            <span>organize, </span> <span>play</span>
          </h1>
        </div>
        <div className="pt-4">
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
    </div>
  );
}
