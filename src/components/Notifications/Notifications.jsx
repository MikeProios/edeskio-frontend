import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { IconButton, Tooltip, Badge } from "@material-ui/core";

import { NotificationsNone } from "@material-ui/icons";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  notificationIcon: {
    color: "#fff",
    fontSize: "1.2em",
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.secondary.light,
      fontSize: "1.5em",
    },
  },

  notificationButton: {
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.5em",
    },
  },

  notificationBadge: {
    fontSize: "1.5em",
  },
}));

const Notifications = () => {
  const styles = useStyles();

  const [notifications, setNotifications] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(
      "https://edeskio.com:8443/websocket/notifications"
    );
    socketRef.current.on("message", ({ name, message }) => {
      setNotifications([...notifications, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [notifications]);
  return (
    <>
      <IconButton className={styles.notificationButton}>
        <Badge
          badgeContent={notifications.length}
          color="error"
          overlap="rectangular"
        >
          <Tooltip title="Notifications" placement="bottom">
            <NotificationsNone className={styles.notificationIcon} />
          </Tooltip>
        </Badge>
      </IconButton>
    </>
  );
};

export default Notifications;