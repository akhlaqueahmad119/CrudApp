import React, { useState } from "react";
import { Formik } from "formik";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  editUserData,
  fetchAllUserData,
  saveUserData,
} from "../redux/userSlice";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formsize: {
    width: 500,
    height: 400,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(2),
  },
  buttonStyle: {
    // backgroundColor: "green",
    height: 70,
  },
  button: {
    marginLeft: 205,
    marginTop: 23,
    padding: 5,
  },
}));
function TableForm({ dialogClose, selectedRow, formType }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const userType = ["Admin", "Employer", "Employee"];
  const countryName = ["India", "Bangladesh", "Nepal"];
  const cityName = ["Delhi", "Panjab", "Haryana"];
  const classes = useStyles();
  const initialValues = {
    userName:
      formType === "Edit" && selectedRow && selectedRow.userName
        ? selectedRow.userName
        : "",
    password:
      formType === "Edit" && selectedRow && selectedRow.password
        ? selectedRow.password
        : "",
    address:
      formType === "Edit" && selectedRow && selectedRow.address
        ? selectedRow.address
        : "",
    email:
      formType === "Edit" && selectedRow && selectedRow.email
        ? selectedRow.email
        : "",
    mobile:
      formType === "Edit" && selectedRow && selectedRow.mobile
        ? selectedRow.mobile
        : "91",
    userType:
      formType === "Edit" && selectedRow && selectedRow.userType
        ? selectedRow.userType
        : "",
    country:
      formType === "Edit" && selectedRow && selectedRow.country
        ? selectedRow.country
        : "",
    city:
      formType === "Edit" && selectedRow && selectedRow.city
        ? selectedRow.city
        : "",
  };
  return (
    <div className={classes.formsize}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values, "values");
          if (formType === "Edit" && selectedRow) {
            dispatch(editUserData(selectedRow?.id, values));
          } else {
            dispatch(saveUserData(values));
          }
          dispatch(fetchAllUserData());
          dialogClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.container}>
              <div className=" ">
                <TextField
                  margin="dense"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="Enter User Name"
                  label="User Name"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" ">
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  placeholder="Enter Password"
                  name="password"
                  required
                  value={values.password}
                  // onChange={handleChange}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className=" ">
                <TextField
                  margin="dense"
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Enter Address"
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className=" ">
                <TextField
                  type="email"
                  margin="dense"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="Enter Email"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" ">
                <TextField
                  margin="dense"
                  type="number"
                  variant="outlined"
                  placeholder="Enter Mobile Number"
                  label="Mobile Number"
                  name="mobile"
                  required
                  value={values.mobile}
                  onChange={(e, value) => {
                    if (e.target.value.length <= 13) {
                      setFieldValue("mobile", e.target.value);
                    }
                  }}
                  autoComplete="off"
                />
              </div>
              <div>
                <Autocomplete
                  options={userType || []}
                  sx={{ width: 225 }}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User Type"
                      margin="dense"
                      variant="outlined"
                      placeholder="Select User Type"
                      required
                      autoComplete="off"
                    />
                  )}
                  value={values.userType}
                  onChange={(e, value) => setFieldValue("userType", value)}
                />
              </div>
              <div>
                <Autocomplete
                  options={countryName || []}
                  sx={{ width: 225 }}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      margin="dense"
                      variant="outlined"
                      required
                      autoComplete="off"
                      placeholder="Select Country"
                    />
                  )}
                  value={values.country}
                  onChange={(e, value) => setFieldValue("country", value)}
                />
              </div>
              <div>
                <Autocomplete
                  options={cityName || []}
                  sx={{ width: 225 }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      margin="dense"
                      variant="outlined"
                      required
                      autoComplete="off"
                      placeholder="Select City"
                    />
                  )}
                  value={values.city}
                  onChange={(e, value) => setFieldValue("city", value)}
                />
              </div>
            </div>
            <div className={classes.buttonStyle}>
              <button className={classes.button} type="submit">
                {`${formType === "Edit" ? "Update" : "Add"} User`}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TableForm;
