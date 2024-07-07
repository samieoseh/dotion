import { selectUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import jwtService from "../../service/jwtService";
import {
  createDocument,
  deleteDocument,
  documentSelectors,
  getDocuments,
  selectLoadingFetch,
} from "@/app/main/document/store/documentSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export default function SidePanel() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector(documentSelectors.selectAll);
  const documentLoadingFetch = useSelector(selectLoadingFetch);

  useEffect(() => {
    if (documentLoadingFetch === undefined) {
      console.log("Not Loaded");
      dispatch(getDocuments());
    }
  }, []);

  return (
    <div className="w-[18rem] h-screen border-r border-[#4a4a4a] py-2 group bg-[#202020] fixed top-0 left-0 bottom-0">
      {/* top */}
      <div className="h-[2.5rem] mx-2 hover:bg-[#2c2c2c] rounded-md flex items-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <div className="py-2 flex items-center gap-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  height={25}
                  width={25}
                />
              ) : (
                <p>{user.name[0]}</p>
              )}
              <p className="text-[#bfbfbf] text-[16px]">
                {truncateText(user.name, 9)}
              </p>
            </div>
          </SelectTrigger>
          <SelectContent className="w-96">
            <SelectGroup>
              <div className="py-2">
                <p className="text-sm px-2 text-[#7d7d7d]">{user.email}</p>

                <div className="py-2 px-4 mt-4 hover:bg-[#373737] flex items-center gap-4">
                  <div>
                    <img src={user.picture} alt="user" height={35} width={35} />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <p className="text-[#b5b5b5]">{user.name}'s Dotion</p>
                      <p className="text-[#909090]">
                        Free Plan <span>.</span> 1 member
                      </p>
                    </div>
                    <Check className="stroke-[#d3d3d3]" />
                  </div>
                </div>
                <Separator className="bg-[#3a3a3a]" />
              </div>
              <SelectItem
                value="apple"
                className="text-[#7d7d7d] hover:bg-[#373737] cursor-pointer"
              >
                Create work account
              </SelectItem>
              <SelectItem
                value="banana"
                className="text-[#7d7d7d] hover:bg-[#373737] cursor-pointer"
              >
                Add another account
              </SelectItem>
              <button
                onClick={() => jwtService.logoutUser()}
                className="relative flex select-none items-center rounded-sm py-1.5 pl-4 pr-2 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 bg-transparent h-auto w-full text-[#7d7d7d] hover:bg-[#373737] cursor-pointer"
              >
                Log out
              </button>
              <Separator className="my-2 bg-[#3a3a3a]" />
              <SelectItem
                value="blueberry"
                className="text-[#7d7d7d] hover:bg-[#373737] cursor-pointer"
              >
                Get mac app
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-4">
          <button className="p-[4px] rounded-md hover:bg-[#3d3d3d] hover:*:stroke-[#fff] group-hover:opacity-100 flex opacity-0 transition-all duration-300 ease-in-out items-center justify-center">
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
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              dispatch(createDocument()).then((action) => {
                if (action.error) {
                  dispatch(
                    toast({
                      title: "An error occured",
                      desciption: "Could not create a new document",
                    }),
                  );
                }
                navigate(`/${action.payload.page._id}`);
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mx-2 my-2 flex flex-col">
        <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#989994"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <p className="text-[#989994]">Search</p>
        </button>
        <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#989994"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <p className="text-[#989994]">Home</p>
        </button>
        <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#989994"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
            />
          </svg>

          <p className="text-[#989994]">Inbox</p>
        </button>
        <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#989994"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <p className="text-[#989994]">Settings</p>
        </button>
      </div>
      <div className="mx-2 space-y-2 py-4">
        <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md">
          <p className="text-sm text-[#989994] ">Private</p>
        </button>
        <div className="space-y-2">
          {/* List of documents */}
          {documents.map((document) => (
            <div key={document._id}>
              <Link
                className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex justify-between items-center "
                to={`/${document._id}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#989994"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <p className="text-md text-[#989994]">
                    {document.title === "" ? "Untitled" : document.title}
                  </p>
                </div>
                <button
                  className="mr-4 p-1 rounded-md hover:bg-[#3d3d3d] transition-all ease-in-out duration-150"
                  onClick={() => dispatch(deleteDocument(document._id))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#989994"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
