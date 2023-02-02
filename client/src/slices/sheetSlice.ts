import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Sheet = {
  id: string;
  title: string;
  description: string;
  owner: object;
};

type SheetState = {
  sheets: Sheet[];
};

const initialState: SheetState = {
  sheets: [],
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    setSheet: (state, action: PayloadAction<Sheet[]>) => {
      state.sheets = action.payload;
    },
    setSheetEmpty: state => {
      state.sheets = { ...initialState.sheets };
    },
  },
});

const sheetReducer = sheetSlice.reducer;
const { setSheet, setSheetEmpty } = sheetSlice.actions;

export { sheetReducer, setSheet, setSheetEmpty };
