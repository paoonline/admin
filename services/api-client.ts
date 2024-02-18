import { ITableState } from "@/models/table.type";
import HttpClient from "./http-client";
import API_CONTEXT from "./api.context";

class ApiClient extends HttpClient {
  get SERVICES() {
    return {
      //get
      GET_DASHBOARD: () => this.get<ITableState[]>(API_CONTEXT.GET_DASHBOARD),

      UPDATE_DASHBOARD: (req: ITableState) =>
        this.put<{ id: string }, ITableState[]>(
          API_CONTEXT.GET_DASHBOARD + "/" + req.id,
          req
        ),
    };
  }
}

export default ApiClient;
