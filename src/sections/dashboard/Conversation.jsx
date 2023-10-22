import {
  Box,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { DotsThreeVertical } from "phosphor-react";
import React from "react";
import { Message_options } from "../../data";

const MessageOption = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el, i) => (
            <MenuItem key={i} onClick={handleClose}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

const TextMsg = ({ el, menu }) => {
  const theme = useTheme();
  const utcTimestamp = el.createdAt;
  const dateInUTC = new Date(utcTimestamp);

  // Create a new Date object with IST (UTC+5:30) timezone offset
  const dateInIST = new Date(dateInUTC.getTime());

  const ISTTime = dateInIST.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: !el.outgoing ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: !el.outgoing ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        {menu && <MessageOption />}
        <Avatar alt={el.fromName} src={el.fromImg} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Typography sx={{ fontWeight: "bold" }} variant="caption">
            {el.fromName}
          </Typography> */}
          <Paper
            variant="outlined"
            sx={{
              px: 2,
              py: 0.5,
              ml: !el.outgoing ? 1 : 0,
              mr: !el.outgoing ? 0 : 1,
              backgroundColor: !el.outgoing
                ? alpha(theme.palette.background.default, 1)
                : theme.palette.primary.main,
              borderRadius: !el.outgoing
                ? "20px 20px 20px 5px"
                : "20px 20px 5px 20px",
            }}
          >
            <Typography variant="body1">{el.message}</Typography>
          </Paper>
          <Typography sx={{ fontWeight: "light" }} variant="caption">
            {ISTTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export { TextMsg };
