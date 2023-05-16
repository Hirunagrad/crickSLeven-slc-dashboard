import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import axios from "axios";

export const HotelListResults = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hotelier/");
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "isApproved",
      headerName: "Approved Status",
      width: 150,
      renderCell: (params) => {
        // console.log(params.row.isApproved);
        return params.row.isApproved ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "green",
              "&:hover": {
                background: "green",
              },
            }}
          >
            Approved
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "red",
              "&:hover": {
                background: "red",
              },
            }}
          >
            Pending
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "reviews", headerName: "Reviews", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "province", headerName: "Province", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "created_at", headerName: "Created_at", width: 150 },
    {
      field: "isPending",
      headerName: "IsPending",
      width: 150,
      renderCell: (params) => {
        return params.isPending ? <div className="">Yes</div> : <div className="">No</div>;
      },
    },
  ];

  const trim = tableData?.map((data) => {
    return {
      id: data._id,
      name: data.name,
      description: data.description,
      address: data.address,
      phone: data.phone,
      email: data.email,
      rating: data.rating,
      reviews: data.reviews,
      state: data.state,
      province: data.province,
      country: data.country,
      created_at: data.created_at,
      isPending: data.isPending,
      isApproved: data.isApproved,
    };
  });

  // menu start
  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (href) => {
    router.push("/hotels/edit/" + href);
    setAnchorEl(null);
  };
  const handleDelete = (href) => {
    router.push("/hotels/delete/" + href);
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
              <MenuItem onClick={() => handleEdit(selectedRow.id)} sx={{ color: "green" }}>
                View
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

  // console.log(tableData);

  // menu end
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={trim}
        columns={actionColumn.concat(columns)}
        components={{
          Toolbar: GridToolbar,
          ColumnMenu: GridColumnMenu,
        }}
        autoHeight={true}
        pageSize={10}
        rowsPerPageOptions={[20]}
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