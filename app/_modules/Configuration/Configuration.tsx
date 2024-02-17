import { ITableState } from "@/models/table.type";
import ApiClient from "@/services/api-client";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Configuration({
  onEdit,
  form,
}: {
  form?: ITableState;
  onEdit(data: ITableState, isError?: boolean): void;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ITableState>({
    defaultValues: form,
  });

  const apiClient = new ApiClient();
  const onSubmit = handleSubmit((data) => {
    try {
      apiClient.SERVICES.PUT_DASHBOARD(data).then((res) => {
        onEdit(data);
      });
    } catch (error) {
      onEdit(data, true);
    }
  });

  return (
    <form onSubmit={onSubmit}>
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
              aria-invalid={errors[key as keyof ITableState] ? "true" : "false"}
              error={!!errors[key as keyof ITableState]}
            />
          </Box>
        ))}

      <Box mt={2} justifyContent={"flex-end"} sx={{ display: "flex" }}>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Box>
    </form>
  );
}
