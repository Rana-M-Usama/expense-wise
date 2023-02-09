import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Sheet = {
  _id: string;
  title: string;
  description: string;
  permissionType: string;
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
    setSheets: (state, action: PayloadAction<Sheet[]>) => {
      state.sheets = action.payload;
    },
    setSheetsEmpty: state => {
      state.sheets = { ...initialState.sheets };
    },
    addSheet: (state, action: PayloadAction<{ data: Sheet }>) => {
      state.sheets.unshift({
        ...action.payload.data,
        permissionType: "admin",
      });
    },
    removeSheet: (state, action: PayloadAction<{ id: string }>) => {
      const sheetIndex = state.sheets.findIndex(
        sheet => sheet._id === action.payload.id,
      );
      state.sheets.splice(sheetIndex, 1);
    },
    modifySheet: (state, action) => {
      const updatedSheetIndex = state.sheets.findIndex(
        sheet => sheet._id === action.payload.id,
      );

      state.sheets[updatedSheetIndex] = {
        ...state.sheets[updatedSheetIndex],
        ...action.payload.data,
      };
    },
  },
});

const sheetReducer = sheetSlice.reducer;
const { setSheets, setSheetsEmpty, addSheet, removeSheet, modifySheet } =
  sheetSlice.actions;

export {
  sheetReducer,
  setSheets,
  setSheetsEmpty,
  addSheet,
  removeSheet,
  modifySheet,
};
