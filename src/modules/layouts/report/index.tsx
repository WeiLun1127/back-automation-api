import { Card } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import DataTable from "assets/examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import { useEffect, useState } from "react";

const tableColumns = [
  { Header: "", accessor: "edit", width: "1%" },
  { Header: "id", accessor: "id", width: "4%" },
  { Header: "transaction id", accessor: "transaction_id", width: "15%" },
  { Header: "currency", accessor: "currency", width: "10%" },
  { Header: "value", accessor: "value", width: "15%" },
  { Header: "created date", accessor: "created_date", width: "15%" },
  { Header: "modified date", accessor: "updated_date", width: "15%" },
  { Header: "type", accessor: "type", width: "10%" },
  { Header: "status", accessor: "status", width: "15%" },
];

type Transaction = {
  id: number;
  transaction_id: string;
  currency: string;
  value: string;
  created_date: string;
  updated_date: string;
  type: string;
  status: string;
};

const Transactions = () => {
  const [tableData, setTableData] = useState([]);
  const [editRows, setEditRows] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await fetch("/transactions.json").then((res) => res.json())) as Transaction[];

        const newData = data.map((row, index) => ({
          ...row,
          id: index + 1,
          transaction_id: row.id,
        }));

        setTableData(newData);
      } catch (error) {
        console.error("error", error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const onEditRow = (rowId: number) => {
    if (editRows.includes(rowId)) {
      setEditRows(editRows.filter((editRow) => editRow !== rowId));
      return;
    }

    setEditRows([...editRows, rowId]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={3} pb={3}>
        <Card>
          <DataTable
            table={{
              columns: tableColumns,
              rows: tableData.map((row, index) => ({
                id: index,
                ...row,
              })),
            }}
            canSearch
            canFilter
            editRows={editRows}
            onEditRow={onEditRow}
          />
        </Card>
      </MDBox>

      <MDSnackbar
        open={error}
        fontSize="small"
        color="error"
        title="Something went wrong. Please try again later."
        close={() => setError(false)}
      />
    </DashboardLayout>
  );
};

export default Transactions;
