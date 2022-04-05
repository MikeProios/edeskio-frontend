import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "@material-table/core";

import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";

import {
  Grow,
  Grid,
  IconButton,
  Button,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

import TicketCard from "../../components/Tickets/TicketCard.jsx";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Search } from "@material-ui/icons";
import { getTicketsAction } from "../../redux/user/userActions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
  search: {
    width: "60%",
    padding: "1em",
    userSelect: "none",
  },
}));
const SubmittedTickets = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.User.tickets.tblTickets);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  useEffect(() => {
    if (organizationID) {
      dispatch(getTicketsAction(organizationID));
    }
  }, [dispatch, organizationID]);

  const delayTime = (index) => {
    return 150 * index;
  };

  console.log("tickets", tickets);

  return (
    <div className={styles.root}>
      <PageHeader title="Tickets" />
      <Grid container spacing={2}>
        <Grow in={true} timeout={10}>
          <Grid container item justifyContent="center">
            <TextField
              className={styles.search}
              helperText="Filter Tickets"
              autoFocus={true}
              placeholder="Search"
              name="Search"
              margin="none"
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grow>
      </Grid>

      <Grid container spacing={2}>
        {tickets.map((value, index) => (
          <Grow in={true} timeout={delayTime(index)}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TicketCard
                ticket={{
                  Subject: value.Subject,
                  ID: value.ID,
                  TechnicianID: value.TechnicianID,
                  Description: value.Description,
                  SubmissionDate: value.SubmissionDate,
                  LastModified: value.LastModified,
                  Priority: value.Priority,
                }}
              />
            </Grid>
          </Grow>
        ))}

        {/* <Grow in={true} timeout={300}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TicketCard
              ticket={{ Subject: "test", ID: 1, Description: "this is a test" }}
            />
          </Grid>
        </Grow>

        <Grow in={true} timeout={600}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TicketCard
              ticket={{ Subject: "test", ID: 1, Description: "this is a test" }}
            />
          </Grid>
        </Grow> */}
      </Grid>
    </div>
  );
};

export default SubmittedTickets;