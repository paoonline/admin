import { ITableState } from "@/models/table.type";
import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ITableState[] = [
  {
    id: "",
    uptime: "",
    current_sales: "",
    temperature: 0,
    stock_thresholds: 0,
  },
];

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    SET_TABLE: (_, action: PayloadAction<ITableState[]>) => {
      return action.payload
    },
  },
});

export const selectTable = (state: RootState) => state.table;

export const { SET_TABLE } = tableSlice.actions;

export default tableSlice.reducer;
