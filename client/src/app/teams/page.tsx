"use client";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTeamsQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Header from "../(components)/Header";
import { useAppSelector } from "../redux";

const CustomToolBar = () => (
  <GridToolbarContainer className="toolbar flex items-center justify-end">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },

  { field: "teamName", headerName: "Team Name", width: 200 },

  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },

  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolBar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;