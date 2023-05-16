import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export const ReviewListResults = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();

  var rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "MUI", col2: "is Amazing" },
  ];
  var columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  // menu start
  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReply = (href) => {
    router.push("/reviews/" + href);
    setAnchorEl(null);
  };
  const handleDelete = (href) => {
    // router.push("/reviews/delete/" + href);
    setAnchorEl(null);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 70,
      renderCell: (params) => {
        return (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleClick(e, params.row)}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleReply(selectedRow.id)} sx={{ color: "green" }}>
                Reply
              </MenuItem>
              <MenuItem onClick={() => handleDelete(selectedRow.id)} sx={{ color: "red" }}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  // menu end
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={actionColumn.concat(columns)}
        components={{
          Toolbar: GridToolbar,
          ColumnMenu: GridColumnMenu,
        }}
        autoHeight={true}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{
          backgroundColor: "white",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};


