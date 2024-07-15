import { Card, Icon } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";

const dataTableData = {
  columns: [
    { Header: "id", accessor: "id", width: "5%" },
    { Header: "user", accessor: "user", width: "15%" },
    { Header: "action", accessor: "action", width: "10%" },
    { Header: "last login", accessor: "last_login", width: "15%" },
  ],
  rows: [
    {
      id: "1",
      user: "John Michael",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },

    {
      id: "2",
      user: "Alexa Liras",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "3",
      user: "Laurent Perrier",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "4",
      user: "Michael Levi",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "5",
      user: "Richard Gran",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "6",
      user: "Michael Johnson",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "7",
      user: "Miriam Eric",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "8",
      user: "Peter Parker",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "9",
      user: "Diana Prince",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "10",
      user: "Tony Stark",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "11",
      user: "Eleanor Rigby",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
    {
      id: "12",
      user: "Jack Sparrow",
      action: (
        <MDBox display="flex" gap={1}>
          <Icon style={{ cursor: "pointer" }}>lockperson</Icon>
          <Icon style={{ cursor: "pointer" }}>edit</Icon>
        </MDBox>
      ),
      last_login: "2024-05-24 12:12:21",
    },
  ],
};

const MasterList = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
    </DashboardLayout>
  );
};

export default MasterList;
