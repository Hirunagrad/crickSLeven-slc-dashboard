import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import Router, { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { withAuth } from "../../withAuth";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const TManagerListResults = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });

  const [school, setSchool] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/TManager/all");
      console.log({ response });
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "email", headerName: "Email", width: 170 },
  ];

  const trim = tableData?.map((data) => {
    return {
      id: data._id,
      name: data.name,
      email: data.email,

      // created_at: data.created_at,
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
    router.push("/edit-match/" + href);
    setAnchorEl(null);
  };

  const [temporarydelete, setTemporarydelete] = useState("");

  const handleDelete = (id) => {
    handleClickOpenDialog();
    setAnchorEl(null);
    setTemporarydelete(id);
  };

  //dialog box start

  const [opendialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deletedMatch = async () => {
    try {
      const response = await axios
        .delete(`http://localhost:5000/api/v1/match/delete/${temporarydelete}`)
        .then((res) => {
          toast.success("match delete succesful !!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchData();
        });
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 70,
      renderCell: (params) => {
        return (
          <div>
            <Dialog
              open={opendialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are You Sure Delete This Match?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If deleting a match removes it from multiple locations on the website, it may be
                  too broad of an action. In this case, it may be necessary to rework the deletion
                  process so that it only removes the match from the intended location.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>No</Button>
                <Button
                  onClick={() => {
                    handleCloseDialog();
                    deletedMatch();
                  }}
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
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
                Edit
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

  return (
    <>
      <>
        <Card>
          <ToastContainer />
          <CardHeader subheader="The information can be edited" title="Match List Table" />
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
          <Divider />
          <CardContent></CardContent>
          <Divider />
        </Card>
      </>
    </>
  );
};
