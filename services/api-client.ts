import { ITableState } from "@/models/table.type";
import HttpClient from "./http-client";
import API_CONTEXT from "./api.context";

class ApiClient extends HttpClient {
  get SERVICES() {
    return {
      //get
      GET_DASHBOARD: () => this.get<ITableState[]>(API_CONTEXT.DASHBOARD),

      UPDATE_DASHBOARD: (req: ITableState) =>
        this.put<{ id: string }, ITableState[]>(
          API_CONTEXT.DASHBOARD + "/" + req.id,
          req
        ),

      CREATE_DASHBOARD: (req: ITableState) =>
        this.post<ITableState, ITableState[]>(
          API_CONTEXT.DASHBOARD + "/" + req.id,
          req
        ),


      DELETE_DASHBOARD: (req: {id: string}) =>
        this.delete<{ id: string }, ITableState[]>(
          API_CONTEXT.DASHBOARD + "/" + req.id,
        ),
    };
  }
}

export default ApiClient;
