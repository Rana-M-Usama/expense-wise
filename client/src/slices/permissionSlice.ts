import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Permission = {
  _id: string;
  type: string;
  sheetId: string;
  user: object;
  sheet: any;
};

type PermissionState = {
  permissions: Permission[];
};

const initialState: PermissionState = {
  permissions: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },
    setPermissionsEmpty: state => {
      state.permissions = { ...initialState.permissions };
    },
    addPermission: (state, action: PayloadAction<{ data: Permission }>) => {
      state.permissions.push({ ...action.payload.data });
    },
    removePermission: (
      state,
      action: PayloadAction<{ data: Permission; id: string }>,
    ) => {
      const permissionIndex = state.permissions.findIndex(
        permission => permission._id === action.payload.id,
      );
      state.permissions.splice(permissionIndex, 1);
    },
    modifyPermission: (state, action) => {
      const updatedPermissionIndex = state.permissions.findIndex(
        permission => permission._id === action.payload.id,
      );

      state.permissions[updatedPermissionIndex] = {
        ...state.permissions[updatedPermissionIndex],
        ...action.payload.data,
      };
    },
  },
});

const permissionReducer = permissionSlice.reducer;
const {
  setPermissions,
  setPermissionsEmpty,
  addPermission,
  modifyPermission,
  removePermission,
} = permissionSlice.actions;

export {
  permissionReducer,
  setPermissions,
  setPermissionsEmpty,
  addPermission,
  modifyPermission,
  removePermission,
};
