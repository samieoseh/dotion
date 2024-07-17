/* eslint-disable react/prop-types */
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
  createSubDocument,
  deleteDocument,
  documentSelectors,
  duplicateDocument,
  getDocuments,
  selectFavoriteDocuments,
  selectLoadingFetch,
  updateDocument,
} from "@/app/main/document/store/documentSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Emoji } from "emoji-picker-react";

import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};
const Folder = ({
  indent = 0,
  document,
  documentId,
  documents,
  user,
  handleDuplicate,
  copyToClipboard,
  handleDocumentRename,
  openInNewTab,
}) => {
  const dispatch = useDispatch();
  const childFolders = documents.filter(
    (document) => document.parentId === documentId,
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(document?.title);

  return (
    <div>
      <>
        <div key={document._id}>
          <div
            className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex justify-between items-center relative"
            to={`/${document._id}`}
            style={{
              paddingLeft: indent + 8,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center gap-2 flex-1">
              {document.icon ? (
                <div className="w-8 h-full">
                  <button
                    className={`p-[4px] absolute top-1  left-[${2 + indent * 4}px] opacity-0 ${isHovered && isOpen && childFolders.length > 0 && "opacity-100"} rounded-md bg-[#3d3d3d] transition-all ease-in-out duration-150 z-10`}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#989994"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    className={`p-[4px] opacity-0 absolute top-1 left-[${2 + indent * 4}px] ${isHovered && !isOpen && childFolders.length > 0 && "opacity-100"} rounded-md bg-[#3d3d3d] transition-all ease-in-out duration-150 z-10`}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#989994"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute top-1 left-[${2 + indent * 4}px] block ${isHovered && childFolders.length > 0 && "hidden"}`}
                  >
                    <Emoji unified={document?.icon} size="25" />
                  </div>
                </div>
              ) : (
                <div className="w-8 h-full">
                  <button
                    className={`p-[4px] absolute top-1 left-[${2 + indent * 4}px] opacity-0 ${isHovered && isOpen && childFolders.length > 0 && "opacity-100"} rounded-md bg-[#3d3d3d] transition-all ease-in-out duration-150 z-10`}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#989994"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    className={`p-[4px] opacity-0 absolute top-1 left-[${2 + indent * 4}px] ${isHovered && !isOpen && childFolders.length > 0 && "opacity-100"} rounded-md bg-[#3d3d3d] transition-all ease-in-out duration-150 z-10`}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#989994"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute top-2 left-[${2 + indent * 4}px] block ${isHovered && childFolders.length > 0 && "hidden"}`}
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <p className="text-md text-[#989994]">
                {document.title === ""
                  ? "Untitled"
                  : document.title.length > 15
                    ? document.title.substring(0, 15) + "..."
                    : document.title}
              </p>
            </div>

            {/* The options and adding of sub folders action */}

            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="mr-10 p-[1px] rounded-md hover:bg-[#3d3d3d] transition-all ease-in-out duration-150 absolute z-10 top-2 right-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#989994"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 ml-[14rem] p-0 bg-[#252525] border-none">
                  <div className="space-y-1">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="m-1.5 py-1.5 focus:bg-[#313131]">
                        <button
                          className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2"
                          onClick={() =>
                            dispatch(
                              updateDocument({
                                _id: document._id,
                                data: { isFavorite: !document.isFavorite },
                              }),
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                          {document.isFavorite
                            ? "Remove to favorite"
                            : "Add to favorite"}
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-[#363636]" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="m-1.5 py-1.5 focus:bg-[#313131]">
                        <button
                          className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2"
                          onClick={() => copyToClipboard()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                            />
                          </svg>
                          Copy Link
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="m-1.5 py-1.5 focus:bg-[#313131]">
                        <button
                          className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2"
                          onClick={() => handleDuplicate(document)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                          </svg>
                          Duplicate
                        </button>
                      </DropdownMenuItem>
                      {/* Todo: */}

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="m-1.5 py-1.5 focus:bg-[#313131]">
                          <button className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                            Rename
                          </button>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="mx-4 bg-[#252525] border-none p-4">
                            <div>
                              <Input
                                placeholder="Rename the document"
                                className="h-8 w-full bg-[#323232] border border-[#454545] outline-none text-[#acacac] text-md focus-visible:ring-0 ring-offset-[#305a86]"
                                value={documentTitle}
                                onChange={(e) => {
                                  setDocumentTitle(e.target.value);
                                  handleDocumentRename(
                                    document._id,
                                    e.target.value,
                                  );
                                }}
                              />
                            </div>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      <DropdownMenuItem className="m-1.5 py-1.5 focus:bg-[#313131]">
                        <button
                          className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2"
                          onClick={() => dispatch(deleteDocument(document._id))}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                          Delete
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="m-1.5 py-1.5 focus:bg-[#313131]">
                        <button
                          className="text-[#bfbfbf] text-left  w-full rounded-md hover:bg-[#313131] flex items-center gap-2"
                          onClick={() => openInNewTab(location.pathname)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                          Open in new tab
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {document.updatedAt && (
                      <>
                        <DropdownMenuSeparator className="my-4 bg-[#363636]" />
                        <div className="px-4 py-1.5 mx-auto text-xs space-y-1.5">
                          <p className="text-[#989994]">
                            Last edited by <span>{user?.name || "User"}</span>
                          </p>
                          <p className="text-[#989994]">
                            {new Date(document.updatedAt).toString()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                className="mr-2 p-[1px] rounded-md hover:bg-[#3d3d3d] transition-all ease-in-out duration-150 absolute z-10 top-2 right-0"
                onClick={() =>
                  dispatch(createSubDocument({ parentId: document._id })).then(
                    () => {
                      console.log("setting");
                      setIsOpen(true);
                    },
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#989994"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </>

            <Link
              to={`/${document._id}`}
              className="top-0 left-0 right-0 bottom-0 absolute"
            ></Link>
          </div>
        </div>
      </>
      {childFolders.map((folder) => {
        return (
          <>
            {isOpen && (
              <Folder
                key={folder._id}
                indent={indent + 16}
                document={folder}
                documentId={folder._id}
                documents={documents}
                user={user}
                handleDuplicate={handleDuplicate}
                copyToClipboard={copyToClipboard}
                openInNewTab={openInNewTab}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default function SidePanel({ showNav, setShowNav }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector(documentSelectors.selectAll);
  const documentLoadingFetch = useSelector(selectLoadingFetch);
  const favoriteDocuments = useSelector(selectFavoriteDocuments);
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (documentLoadingFetch === undefined) {
      dispatch(getDocuments());
    }
  }, []);

  useEffect(() => {
    setFilteredData(documents);
  }, [documents]);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast({ title: "Link copied to clipboard" });
      },
      (err) => {
        console.error("Failed to copy: ", err);
        toast({ title: "Failed to copy" });
      },
    );
  };

  const rootFolders = documents?.filter(
    (document) => document.parentId === null && document.isFavorite === false,
  );

  const rootFavoriteFolders = favoriteDocuments?.filter(
    (document) => document.parentId === null,
  );

  const handleSearchInputChange = (targetValue) => {
    setSearchInput(targetValue);

    const newFilteredData = documents.filter((document) =>
      document.title.toLowerCase().includes(targetValue.toLowerCase()),
    );

    setFilteredData(newFilteredData);
  };

  const handleDuplicate = (document) => {
    dispatch(duplicateDocument(document));
  };

  const handleDocumentRename = (documentId, documentTitle) => {
    dispatch(
      updateDocument({ _id: documentId, data: { title: documentTitle } }),
    );
  };
  console.log({ showNav });

  return (
    <div
      className={`absolute z-30 lg:block lg:translate-x-0 transition-all duration-300 ease-out ${showNav ? "translate-x-0" : "-translate-x-80 "}`}
    >
      {user && (
        <div className="w-[18rem] h-screen border-r border-[#4a4a4a] py-2 group bg-[#202020] fixed top-0 left-0 bottom-0">
          {/* top */}
          <div className="h-[2.5rem] mx-2 hover:bg-[#2c2c2c] rounded-md flex items-center lg:justify-between">
            <Select>
              <SelectTrigger className="w-[180px]">
                <div className="py-2 flex items-center gap-3">
                  {user.picture && (
                    <img
                      src={user.picture}
                      alt={user.name}
                      height={25}
                      width={25}
                    />
                  )}

                  <p className="text-[#bfbfbf] text-[16px]">
                    {truncateText(user.name || user.email, 9)}
                  </p>
                </div>
              </SelectTrigger>
              <SelectContent className="w-96">
                <SelectGroup>
                  <div className="py-2">
                    <p className="text-sm px-2 text-[#7d7d7d]">{user.email}</p>

                    <div className="py-2 px-4 mt-4 hover:bg-[#373737] flex items-center gap-4">
                      <div>
                        {user.picture ? (
                          <img
                            src={user.picture}
                            alt="user"
                            height={35}
                            width={35}
                          />
                        ) : (
                          <div>
                            <div className="px-2.5 py-1 bg-[#3d3d3d] rounded-md">
                              <p className="text-[#b5b5b5] text-xl">
                                {user.email[0].toUpperCase()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <div>
                          <p className="text-[#b5b5b5]">
                            {user.name || "User"}'s Dotion
                          </p>
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
                className="lg:pr-4"
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

          {/* main nav */}
          <div className="mx-2 my-2 flex flex-col">
            <Dialog>
              <DialogTrigger>
                <button
                  className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center"
                  onClick={() => setShowNav((prev) => !prev)}
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <p className="text-[#989994]">Search</p>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#252525] lg:min-w-[52rem] border-none">
                <DialogHeader>
                  <div className="relative">
                    <Input
                      placeholder="Search..."
                      className="h-12 w-full bg-[#323232] border border-[#454545] outline-none text-[#acacac] text-md focus-visible:ring-0 ring-offset-[#305a86] pr-[4rem]"
                      value={searchInput}
                      onChange={(e) => {
                        handleSearchInputChange(e.target.value);
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 absolute top-3 right-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                </DialogHeader>
                <ScrollArea className="h-[75vh] w-full rounded-md">
                  <div className="space-y-1">
                    {filteredData.map((document) => (
                      <div className="relative" key={document._id}>
                        {document.title && (
                          <button
                            key={document._id}
                            className="hover:bg-[#2c2c2c] w-full text-left py-3 pl-3 rounded-md"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              {document.icon ? (
                                <Emoji unified={document?.icon} size="25" />
                              ) : (
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
                              )}

                              <p className="text-md text-[#cfcfcf] ">
                                {document.title}
                              </p>
                            </div>
                          </button>
                        )}
                        <DialogClose asChild>
                          <Link
                            className="absolute top-0 left-0 right-0 bottom-0 "
                            to={`/${document._id}`}
                          ></Link>
                        </DialogClose>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Link
              className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md flex gap-2 items-center"
              to="/82cff8ee39dd442ea7540d6e73a4e7ad"
              onClick={() => setShowNav((prev) => !prev)}
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <p className="text-[#989994]">Home</p>
            </Link>
          </div>
          <div className="h-[75vh]">
            {/* favorite nav */}
            <>
              {favoriteDocuments.length > 0 && (
                <div className="mx-2 space-y-2 py-4">
                  <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md">
                    <p className="text-sm text-[#989994] ">Favorites</p>
                  </button>
                  <ScrollArea className="h-[25vh] w-full rounded-md">
                    <div className="space-y-2">
                      {rootFavoriteFolders.map((folder) => (
                        <Folder
                          key={folder._id}
                          document={folder}
                          documentId={folder._id}
                          documents={documents}
                          user={user}
                          handleDuplicate={handleDuplicate}
                          copyToClipboard={copyToClipboard}
                          openInNewTab={openInNewTab}
                          handleDocumentRename={handleDocumentRename}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </>
            {/* documents nav */}

            <div className="mx-2 space-y-2 py-4 h-full">
              <button className="hover:bg-[#2c2c2c] w-full text-left py-1.5 pl-3 rounded-md">
                <p className="text-sm text-[#989994] ">Private</p>
              </button>
              <ScrollArea
                className={`${favoriteDocuments.length > 0 ? "h-[25vh]" : "h-[65vh]"} w-full rounded-md`}
              >
                <div className="space-y-2">
                  {rootFolders.map((folder) => (
                    <Folder
                      key={folder._id}
                      document={folder}
                      documentId={folder._id}
                      documents={documents}
                      user={user}
                      handleDuplicate={handleDuplicate}
                      copyToClipboard={copyToClipboard}
                      openInNewTab={openInNewTab}
                      handleDocumentRename={handleDocumentRename}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
