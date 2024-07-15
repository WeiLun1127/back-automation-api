/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { ReactNode } from "react";

// @mui material components
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import { Checkbox, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";

// Declaring prop types for DataTableBodyCell
interface Props {
  children: ReactNode;
  noBorder?: boolean;
  align?: "left" | "right" | "center";
  cell?: any;
  editRows?: number[];
  onEditRow?: (row: number) => void;
}

const statuses = ["PENDING", "IN PROGRESS", "SUCCESSFUL", "APPROVED", "FAILED"];

function DataTableBodyCell({
  noBorder,
  align,
  children,
  cell,
  editRows,
  onEditRow,
}: Props): JSX.Element {
  const renderData = () => {
    const editable = editRows?.includes(cell?.row?.values?.id) || false;

    if (cell?.column?.id === "edit") {
      return (
        <Checkbox
          size="small"
          sx={{ padding: 0 }}
          checked={editable}
          onChange={() => onEditRow(cell?.row?.values?.id)}
        />
      );
    }

    if (editable && cell?.column?.id === "status") {
      return (
        <Select
          value={cell?.value}
          // onChange={handleChange}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      );
    }

    return children;
  };

  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {renderData()}
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

export default DataTableBodyCell;
