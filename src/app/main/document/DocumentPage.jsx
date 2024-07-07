import withReducer from "@/store/withReducer";
import reducer from "./store";
import { useParams } from "react-router-dom";
import { selectDocumentById, updateDocument } from "./store/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

// eslint-disable-next-line react-refresh/only-export-components
function DocumentPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const document = useSelector((state) =>
    selectDocumentById(state, params?.id),
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(document);
  }, [document]);

  const debounceTitleFn = useCallback(
    debounce((title) => {
      console.log({ title });
      dispatch(updateDocument({ _id: params.id, data: { title } }));
    }, 500),
    [dispatch, params.id],
  );

  return (
    <>
      {data && (
        <div className="p-4 pl-[19rem] w-full">
          <button className="hover:bg-[#202020] rounded-md p-1">
            <p className="text-white">
              {document.title === "" ? "Untitled" : document.title}
            </p>
          </button>
          <div className=" w-full pl-64 pt-48">
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
