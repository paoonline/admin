import { Loading } from "@/app/_components/Loading/Loading";
import { selectTable } from "@/features/table";
import { ITableState } from "@/models/table.type";
import ApiClient from "@/services/api-client";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

export default function Configuration({
  onEdit,
  form,
  onDelete,
}: {
  form?: ITableState;
  onEdit(data: ITableState, isError?: boolean): void;
  onDelete(data: ITableState[], isError?: boolean): void;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ITableState>({
    defaultValues: form,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiClient = new ApiClient();
  const tableSelector = useSelector(selectTable);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    try {
      apiClient.SERVICES.UPDATE_DASHBOARD(data).then((res) => {
        onEdit(data);
        setIsLoading(false);
      });
    } catch (error) {
      onEdit(data, true);
      setIsLoading(false);
    }
  });

  const handleDelete = (open: boolean) => {
    handleOpenDeleteModal(true);
  };

  const handleOnDelete = () => {
    setIsLoading(true);
    try {
      apiClient.SERVICES.DELETE_DASHBOARD({ id: form?.id || "" }).then(() => {
        const newTableSelector = tableSelector.filter(
          (data) => form?.id !== data?.id
        );
        onDelete(newTableSelector);
        setIsLoading(false);
        handleDelete(false);
      });
    } catch (error) {
      onDelete([], true);
      setIsLoading(false);
      handleDelete(false);
    }
  };

  const handleOpenDeleteModal = (open: boolean) => {
    setOpenDeleteModal(open);
  };

  return (
    <form onSubmit={onSubmit}>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => handleOpenDeleteModal(false)}
        onConfirm={handleOnDelete}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {form &&
            Object.keys(form).map((key, i) => (
              <Box
                key={key + i}
                mb={2}
                flexDirection={"row"}
                sx={{ display: "flex" }}
              >
                <Box sx={{ width: 200 }}>{key}</Box>

                <TextField
                  type={
                    key === "temperature" || key === "stock_thresholds"
                      ? "number"
                      : "text"
                  }
                  disabled={key === "id"}
                  sx={{ width: "100%" }}
                  {...register(key as keyof ITableState, { required: true })}
                  aria-invalid={
                    errors[key as keyof ITableState] ? "true" : "false"
                  }
                  error={!!errors[key as keyof ITableState]}
                />
              </Box>
            ))}
          <Box
            mt={2}
            justifyContent={"flex-end"}
            sx={{ display: "flex" }}
            gap={4}
          >
            <Button
              variant="outlined"
              onClick={() => handleDelete(true)}
              startIcon={<DeleteIcon />}
              color="warning"
            >
              Delete
            </Button>

            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </React.Fragment>
      )}
    </form>
  );
}
