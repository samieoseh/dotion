import withReducer from "@/store/withReducer";
import reducer from "./store";
import { useParams } from "react-router-dom";
import { selectDocumentById, updateDocument } from "./store/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import storage from "../../../service/appwriteService";
import { ID } from "appwrite";

// eslint-disable-next-line react-refresh/only-export-components
function DocumentPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) =>
    selectDocumentById(state, params?.id),
  );
  const [data, setData] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const fileInputRef = useRef(null);
  const changeFileInputRef = useRef(null);

  useEffect(() => {
    setData(document);
    setSelectedEmoji(document?.icon || null);
    setSelectedCover(document?.background || null);
  }, [document]);

  const debounceTitleFn = useCallback(
    debounce((title) => {
      console.log({ title });
      dispatch(updateDocument({ _id: params.id, data: { title } }));
    }, 1000),
    [dispatch, params.id],
  );

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedCover(preview);
    const uploadedFile = await storage.createFile(
      import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
      ID.unique(),
      file,
    );
    console.log(uploadedFile);
    const backgroundUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&mode=admin`;
    dispatch(
      updateDocument({
        _id: params.id,
        data: { background: backgroundUrl, backgroundId: uploadedFile.$id },
      }),
    );
  };

  const handleFileUpdate = async (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedCover(preview);
    await storage.deleteFile(
      import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
      document?.backgroundId,
    );
    const uploadedFile = await storage.createFile(
      import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
      ID.unique(),
      file,
    );
    const backgroundUrl = `https://cloud.appwrite.io/v1/storage/buckets/${import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&mode=admin`;
    dispatch(
      updateDocument({
        _id: params.id,
        data: { background: backgroundUrl, backgroundId: uploadedFile.$id },
      }),
    );
  };

  const handleFileDelete = async () => {
    setSelectedCover(null);
    await storage.deleteFile(
      import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
      document?.backgroundId,
    );
    dispatch(
      updateDocument({
        _id: params.id,
        data: { background: "", backgroundId: "" },
      }),
    );
  };
  return (
    <>
      {data && (
        <div className="pl-[18rem] w-full">
          <button className="m-4 hover:bg-[#202020] rounded-md p-1 flex items-center gap-2">
            {document?.icon && <Emoji unified={document.icon} size="25" />}
            <p className="text-white">
              {document.title === "" ? "Untitled" : document.title}
            </p>
          </button>
          {selectedCover && (
            <div className="w-full h-64 relative z-10">
              <img
                src={selectedCover}
                alt={selectedCover}
                className="h-64 overflow-hidden w-full object-cover object-center"
              />
              {document.background && (
                <div className="absolute top-10 right-80">
                  <button
                    onClick={() => changeFileInputRef.current.click()}
                    className="text-[13px] bg-[#252525] py-1 px-1.5 text-[#989898] border-r border-[#3b3b3b] hover:bg-[#3b3b3b] transition-all ease-in-out duration-200"
                    style={{
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={changeFileInputRef}
                      onChange={(e) => handleFileUpdate(e)}
                    />
                    <p>Change cover</p>
                  </button>
                  <button
                    className="text-[13px]  bg-[#252525] py-1 px-1.5 text-[#989898] hover:bg-[#3b3b3b] transition-all ease-in-out duration-200"
                    style={{
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                    onClick={() => handleFileDelete()}
                  >
                    Remove Cover
                  </button>
                </div>
              )}
            </div>
          )}
          <div
            className={`w-full relative z-20 pl-64 ${!selectedCover && "pt-48 "} ${selectedEmoji ? "-mt-12" : "mt-8"} group space-y-1`}
          >
            {selectedEmoji && (
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <Emoji unified={selectedEmoji} size="100" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-transparent border-none">
                  <EmojiPicker
                    theme="dark"
                    searchPlaceholder="Filter"
                    width={450}
                    onEmojiClick={(data, e) => {
                      setSelectedEmoji(data.unified);
                      dispatch(
                        updateDocument({
                          _id: params.id,
                          data: {
                            icon: data.unified,
                          },
                        }),
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
              <div>
                {!selectedEmoji && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="hover:bg-[#202020] rounded-md py-1 p-1.5 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="#757575"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                          />
                        </svg>

                        <p className="text-[#5f5f5f]">Add Icon</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-transparent border-none">
                      <EmojiPicker
                        theme="dark"
                        searchPlaceholder="Filter"
                        width={450}
                        onEmojiClick={(data, e) => {
                          setSelectedEmoji(data.unified);
                          dispatch(
                            updateDocument({
                              _id: params.id,
                              data: {
                                icon: data.unified,
                              },
                            }),
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <div>
                {!selectedCover && (
                  <button
                    className="hover:bg-[#202020] rounded-md py-1 p-1.5 flex items-center gap-2"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#757575"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>

                    <p className="text-[#5f5f5f]" onClick={handleFileUpload}>
                      Add Cover
                    </p>
                  </button>
                )}
              </div>
            </div>
            <input
              className="text-[#e6e6e6] bg-transparent border-none outline-none text-5xl font-bold placeholder-[#373737]"
              placeholder={document.title === "" ? "Untitled" : document.title}
              value={data.title}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
                debounceTitleFn(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withReducer("documentsPage", reducer)(DocumentPage);
