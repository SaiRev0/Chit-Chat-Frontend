import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";

const GeneralApp = () => {
  const theme = useTheme();

  const { room_id, chat_type } = useSelector((state) => state.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: "calc(100vw - 410px )",
          backgroundColor: theme.palette.background.paper,
          borderBottom: "6px solid #0162C4",
        }}
      >
        {chat_type === "individual" && room_id !== null ? (
          <ChatComponent />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default GeneralApp;
