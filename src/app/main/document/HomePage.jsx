import { selectUser, updateUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Emoji } from "emoji-picker-react";
import TimeAgo from "@/components/TimeAgo";
import { useMediaQuery } from "react-responsive";

function getTimeOfDay(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();

  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours < 24) {
    return "evening";
  } else {
    return "night";
  }
}

const Card = ({ user, page }) => {
  console.log({ page });
  return (
    <>
      {page.pageId && (
        <div className="h-40 bg-[#252525]" style={{ borderRadius: "8px" }}>
          <div
            className="h-12 w-full overflow-hidden"
            style={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            {page.pageId?.background ? (
              <img
                src={page.pageId.background}
                alt={page.pageId.background}
                className="h-full w-full object-cover overflow-hidden"
              />
            ) : (
              <div className="h-full w-full bg-[#373737]"></div>
            )}
          </div>
          <div className="-mt-4 w-[80%] mx-auto">
            {page.pageId.icon ? (
              <Emoji unified={page.pageId.icon} size="35" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#989994"
                fill="#252525"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            )}
          </div>
          <div className="py-2 w-[80%] mx-auto space-y-2">
            <p>{page.pageId.title || "Untitled"}</p>
            <div className="space-x-2">
              <p className="border border-[#393939] rounded-full inline-flex items-center justify-center w-5 h-5 text-sm text-[#595959]">
                {user?.name?.toUpperCase().charAt(0)}
              </p>
              <TimeAgo
                date={page.visitedAt}
                className="text-[#595959] text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default function HomePage({ setShowNav }) {
  const user = useSelector(selectUser);
  const timestamp = new Date().getTime();
  const timeOfDay = getTimeOfDay(timestamp);
  const [nickname, setNickname] = useState("User");
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  const dispatch = useDispatch();
  const isVeryLargeScreen = useMediaQuery({ query: "(min-width: 1800)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isLaptopScreen = useMediaQuery({ query: "(min-width: 800px)" });

  useEffect(() => {
    console.log("running useEffect");
    if (user.name) {
      setNickname(user.name);
    }
    setRecentlyVisited(user.recentlyVisited);
  }, [user]);

  const handleNicknameChange = useCallback(
    debounce((newNickname) => {
      dispatch(updateUser({ _id: user._id, data: { name: newNickname } }));
    }, 1000),
    [dispatch],
  );

  return (
    <div className="w-full">
      <div className="group flex items-center m-4 gap-2">
        <button
          className="p-[4px] lg:hidden rounded-md hover:bg-[#3d3d3d] hover:*:stroke-[#fff] group-hover:opacity-100 flex opacity-0 transition-all duration-300 ease-in-out items-center justify-center"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#757575"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="lg:ml-[18rem] mx-auto h-full w-[85%] rounded-md">
        <div className="flex items-center justify-center py-20">
          <Popover>
            <p className="text-4xl font-bold text-center">
              Good {timeOfDay},{" "}
              <PopoverTrigger asChild>
                <button className="hover: hover:bg-[#2c2c2c] px-2 py-1.5 rounded-md">
                  {nickname}
                </button>
              </PopoverTrigger>
            </p>
            <PopoverContent className="w-[24rem] bg-[#252525] border-none mr-[8rem] lg:mr-[24rem]">
              <div className="grid gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none text-[#a1a1a1]">
                    Edit Nickname
                  </h4>
                  <Input
                    placeholder="Enter your nickname"
                    className="h-8 w-full bg-[#323232] border border-[#454545] outline-none text-[#acacac] text-md focus-visible:ring-0 ring-offset-[#305a86]"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      handleNicknameChange(e.target.value);
                    }}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-[70%] mx-auto">
          {recentlyVisited.length > 0 && (
            <p className="text-[#a1a1a1]">Recently Visited</p>
          )}
          <div className="mt-8">
            <Swiper
              modules={[Navigation]}
              loop={false}
              spaceBetween={20}
              autoplay={false}
              navigation
              slidesPerView={
                isVeryLargeScreen ? 5 : isBigScreen ? 4 : isLaptopScreen ? 3 : 2
              }
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {recentlyVisited.map((page) => (
                <SwiperSlide key={page.pageId?._id}>
                  <Link to={`/${page.pageId?._id}`}>
                    <Card page={page} user={user} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
