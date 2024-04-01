import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DialogBox from "./DialogBox";
import { deleteUserData, fetchAllUserData } from "../redux/userSlice";
import DeleteDialog from "./DeleteDialog";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function TableData() {
  const dispatch = useDispatch();
  const { allUserData } = useSelector(({ userSlice }) => userSlice);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState({
    open: false,
    dilogBoxType: "",
  });
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allUserData.length - page * rowsPerPage);

  const handleEditData = (rowData) => {
    console.log(rowData, "roDaata");
    setSelectedRow(rowData);
    setOpen({
      open: true,
      dilogBoxType: "Edit",
    });
  };
  const handleAddData = () => {
    setOpen({
      open: true,
      dilogBoxType: "Add",
    });
  };

  const handleClose = () => {
    setOpen({
      open: false,
      dilogBoxType: "",
    });
    setSelectedRow(null);
  };

  const handleDelete = () => {
    dispatch(deleteUserData(selectedRow?.id));
    dispatch(fetchAllUserData());
    setDeletePopup(false);
  };

  useEffect(() => {
    dispatch(fetchAllUserData());
  }, []);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <IconButton
        aria-label="add"
        onClick={() => handleAddData()}
        style={{ marginLeft: "79.5rem" }}
      >
        <AddIcon />
      </IconButton>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id Number</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>UserType</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUserData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.userType}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handleEditData(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setDeletePopup(true);
                        setSelectedRow(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allUserData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <DialogBox
        formOpen={open}
        title={
          open.dilogBoxType === "Edit" ? "Edit User Data" : "Add User Data"
        }
        maxWidth="lg"
        selectedRow={selectedRow}
        handleClose={handleClose}
      />
      <DeleteDialog
        open={deletePopup}
        setDeletePopup={setDeletePopup}
        selectedRow={selectedRow}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default TableData;
