"use client";

import { Loading } from "@/app/_components/Loading/Loading";
import ErrorSnackbar from "@/app/_components/Snackbar/Error";
import SuccessSnackbar from "@/app/_components/Snackbar/Success";
import { EDIT_TABLE, SET_TABLE } from "@/features/table";
import { ITableState } from "@/models/table.type";
import ApiClient from "@/services/api-client";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Configuration from "../Configuration/Configuration";
import DashboardTable from "../DataTable/DataTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatusErrorModal, setOpenStatusErrorModal] = useState(false);
  const apiClient = new ApiClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const handleOpenStatusModal = (open: boolean) => {
    setOpenStatusModal(open);
  };

  const handleOpenStatusErrorModal = (open: boolean) => {
    setOpenStatusErrorModal(open);
  };

  const handleEditConfig = (data: ITableState) => {
    dispatch(EDIT_TABLE(data));
    handleClearEditData();
    handleOpenStatusModal(true);
  };

  // init call
  useEffect(() => {
    try {
      apiClient.SERVICES.GET_DASHBOARD().then((res) => {
        dispatch(SET_TABLE(res));
      });
    } catch (error) {
      handleOpenStatusErrorModal(true)
    }
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <Loading />}
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
        <Configuration form={editData} onEdit={handleEditConfig} />
      </CustomTabPanel>

      <SuccessSnackbar
        open={openStatusModal}
        onClose={() => handleOpenStatusModal(false)}
      />

      <ErrorSnackbar
        open={openStatusErrorModal}
        onClose={() => handleOpenStatusErrorModal(false)}
      />
    </Box>
  );
}
