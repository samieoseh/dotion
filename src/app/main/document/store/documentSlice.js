import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const documentAdapter = createEntityAdapter({
  selectId: (document) => document._id,
});

export const createDocument = createAsyncThunk(
  "documentsPage/createDocument",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/page", { title: "" });
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getDocuments = createAsyncThunk(
  "documentsPage/getDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/page");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateDocument = createAsyncThunk(
  "documentsPage/updateDocument",
  async (pageData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/page/${pageData._id}`,
        pageData.data,
      );
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteDocument = createAsyncThunk(
  "documentsPage/deleteDocument",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/page/${_id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const documentSlice = createSlice({
  name: "documentsPage/document",
  initialState: documentAdapter.getInitialState({
    loadingFetch: undefined,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDocument.fulfilled, (state, action) => {
      documentAdapter.addOne(state, action.payload.page);
    });
    builder.addCase(getDocuments.pending, (state) => {
      state.loadingFetch = true;
    });
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      documentAdapter.setAll(state, action.payload.pages);
    });

    builder.addCase(getDocuments.rejected, (state) => {
      state.loadingFetch = false;
    });

    builder.addCase(updateDocument.fulfilled, (state, action) => {
      documentAdapter.updateOne(state, {
        id: action.payload.updatedPage._id,
        changes: action.payload.updatedPage,
      });
    });
    builder.addCase(deleteDocument.fulfilled, (state, action) => {
      console.log(action.payload);
      documentAdapter.removeOne(state, action.payload.deletedPage._id);
    });
  },
});

export const documentSelectors = documentAdapter.getSelectors((state) => {
  return state.documentsPage.document;
});
export const selectDocumentById = (state, id) => {
  return documentSelectors.selectById(state, id);
};

export const selectLoadingFetch = ({ documentsPage }) => {
  documentsPage.loadingFetch;
};

export default documentSlice.reducer;
