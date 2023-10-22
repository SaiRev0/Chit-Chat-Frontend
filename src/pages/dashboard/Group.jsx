import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import GroupElement from "../../components/GroupElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import CreateGroup from "../../sections/dashboard/CreateGroup";
import NoChat from "../../assets/Illustration/NoChat";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { FetchGroupConversations } from "../../redux/slices/conversation";
import ChatComponent from "./Conversation";

const user_id = window.localStorage.getItem("user_id");

const Group = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const { group_id, chat_type } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const { group_conversations } = useSelector(
    (state) => state.conversation.group_chat
  );

  useEffect(() => {
    socket.emit("get_group_conversations", { user_id }, (data) => {
      dispatch(FetchGroupConversations({ group_conversations: data }));
    });
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            overflowY: "auto",
            height: "100vh",
            width: isDesktop ? 320 : "30vw",
            backgroundColor: theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          {!isDesktop && (
            // Bottom Nav
            <BottomNav />
          )}
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                height: "100%",
                mr: "-10px!important",
              }}
            >
              <Stack sx={{ pr: "10px" }} spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  All Groups
                </Typography>
                {/* Group List */}
                {group_conversations.map((el, idx) => {
                  return <GroupElement key={idx} {...el} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 410px )",
            backgroundColor: theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        >
          {chat_type === "group" && group_id !== null ? (
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
                Select a group or create a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenDialog}
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Group;
