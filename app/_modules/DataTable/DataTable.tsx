import { selectTable } from "@/features/table";
import { ITableState } from "@/models/table.type";
import { searchArray } from "@/utils";
import CreateIcon from "@mui/icons-material/Create";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, TextField, debounce } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IDataTableProps } from "./DataTable.type";

export default function DataTable({ onEdit }: IDataTableProps) {
  const tableSelector = useSelector(selectTable);
  const [tableData, setTableData] = useState<ITableState[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "uptime", headerName: "Uptime", width: 130 },
    { field: "current_sales", headerName: "Current sales", width: 130 },
    { field: "temperature", headerName: "Temperature", width: 130 },
    { field: "stock_thresholds", headerName: "Stock thresholds", width: 130 },
    {
      field: "notification_edit",
      headerName: "Notification / Update configuration",
      align: "right",
      flex: 1,
      headerAlign: "right",
      sortable: false,
      renderCell: (e) => {
        return (
          <Box>
            <NotificationsIcon
              className="cursor-pointer hover:text-sky-700"
              onClick={() => handleNotification()}
            />
            <CreateIcon
              className="cursor-pointer ml-6 hover:text-sky-700"
              onClick={() => handleManageConfig(e.row)}
            />
          </Box>
        );
      },
    },
  ];

  const handleNotification = () => {
    alert("Alert");
  };

  const handleManageConfig = (data:ITableState) => {
    onEdit(data)
  };

  const handleSearch = (text: string) => {
    const searchResult = searchArray(tableSelector, text, [
      "id",
      "uptime",
      "current_sales",
    ]);
    setTableData(searchResult);
  };

  const debouncedOnChange = debounce(handleSearch, 500);

  useEffect(() => {
    setTableData(tableSelector);
  }, [tableSelector]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        mb={2}
        className="w-full"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <h5>Machine display</h5>
        <TextField
          id="search-table"
          label="Search"
          variant="outlined"
          onChange={(e) => debouncedOnChange(e.target.value)}
        />
      </Box>

      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[1, 10]}
        checkboxSelection={false}
      />
    </Box>
  );
}
