import React, { useEffect, useState } from "react";

// Redux State
import { useSelector, useDispatch } from "react-redux";

//Material-UI
import { Grow, MenuItem, Select } from "@material-ui/core";

// Basic Components
import PageHeader from "../../components/PageHeader/PageHeader.jsx";

//import AddUserDialog from "./AddUserDialog";

// Material Table
import MaterialTable from "@material-table/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";
import { AiFillPrinter } from "react-icons/ai";
import {
  getPermissionsAllAction,
  putPermissionsAction,
} from "../../redux/user/userActions.js";
import { Satellite } from "@material-ui/icons";

// import store from "../../redux/store";

// import {
//   // permissionsSelector,
//   permissionsUsersEmailSelector,
//   permissionsRolesNameSelector,
//   permissionsModulesNameSelector,
//   permissionsLoadingSelector,
// } from "../../redux/permissions/permissionsReducer";

//Redux

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
}));

const Permissions = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const tableRows = useSelector((state) => state.User.access);

  const loading = useSelector((state) => state.User.loading);

  useEffect(() => {
    dispatch(getPermissionsAllAction());
  }, [dispatch]);

  const columns = [
    {
      title: "User ID",
      field: "UserID",
      editable: false,
    },
    {
      title: "First Name",
      field: "FirstName",
      editable: false,
    },
    {
      title: "Last Name",
      field: "LastName",
      editable: false,
    },
    {
      title: "Role",
      field: "RoleName",
      lookup: { Basic: "Basic", Tech: "Tech", Admin: "Admin" },
    },
  ];

  return (
    <>
      <div className={styles.root}>
        <PageHeader title={"Permissions"} />
        <Grow in={true} timeout={150}>
          <div>
            <MaterialTable
              title="Permissions"
              icons={tableIcons}
              columns={columns}
              data={tableRows}
              isLoading={loading}
              options={{
                // draggable: true,
                // sorting: true,
                emptyRowsWhenPaging: false,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50, 100, 200, 500],
                rowStyle: {
                  fontSize: 16,
                },
                actionsColumnIndex: -1,
                selection: false,
                addRowPosition: "first",
                exportAllData: true,
                exportMenu: [
                  {
                    label: "Export PDF",
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, "test"),
                  },
                  {
                    label: "Export CSV",
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, "test"),
                  },
                ],
              }}
              editable={{
                // onRowAdd: (newRow) =>
                //   new Promise((resolve, reject) => {
                //     // const updatedRows = [
                //     //   ...tableData,
                //     //   { id: Math.floor(Math.random() * 100), ...newRow },
                //     // ];
                //     // setTimeout(() => {
                //     //   tableData = updatedRows;
                //     //   resolve();
                //     // }, 2000);
                //   }),
                // onRowDelete: (selectedRow) =>
                //   new Promise((resolve, reject) => {
                //     // const index = selectedRow.tableData.id;
                //     // const updatedRows = [...tableData];
                //     // updatedRows.splice(index, 1);
                //     // setTimeout(() => {
                //     //   tableData = updatedRows;
                //     //   resolve();
                //     // }, 2000);
                //   }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    dispatch(
                      putPermissionsAction({
                        updatedRow,
                        oldRow,
                      })
                    );
                    resolve();
                  }),
              }}
              actions={
                [
                  // {
                  //   icon: tableIcons.Add,
                  //   tooltip: "Assign Permission",
                  //   isFreeAction: true,
                  //   onClick: (event) => handleOpen(event),
                  // },
                  // {
                  //   icon: tableIcons.Edit,
                  //   tooltip: "Edit Permission",
                  //   isFreeAction: false,
                  //   onClick: (event) => alert("You wanna add a permission"),
                  // },
                ]
              }
            />
          </div>
        </Grow>
      </div>
    </>
  );
};

export default Permissions;