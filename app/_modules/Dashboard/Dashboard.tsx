"use client";

import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardTable from "../DataTable/DataTable";
import ClearIcon from "@mui/icons-material/Clear";
import { SET_TABLE } from "@/features/table";
import { ITableState } from "@/models/table.type";
import { useDispatch } from "react-redux";
import Configuration from "../Configuration/Configuration";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const rows: ITableState[] = [
  {
    id: "1",
    uptime: "Snow",
    current_sales: "Jon",
    temperature: 35,
    stock_thresholds: 1,
  },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

export default function DashboardModule() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState<ITableState>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEditData = (data: ITableState) => {
    setEditData(data);
    setValue(1);
  };

  const handleClearEditData = () => {
    setValue(0);
    setEditData(undefined);
  };


  // init call
  useEffect(() => {
    dispatch(SET_TABLE(rows));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Loading /> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={<span>Dashboard</span>} />
          {!!editData && (
            <Tab
              label={
                <Box flexDirection={"row"}>
                  <span>Configuration</span>
                  <IconButton size="small" onClick={handleClearEditData}>
                    <ClearIcon className="cursor-pointer hover:text-sky-700" />
                  </IconButton>
                </Box>
              }
            />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DashboardTable onEdit={handleEditData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Configuration form={editData} onClear={handleClearEditData} />
      </CustomTabPanel>
    </Box>
  );
}
