import { Box, Stack, Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

const GroupElement = ({ avatar, groupName, id, participantsNumber }) => {
  const dispatch = useDispatch();
  const { group_id } = useSelector((state) => state.app);

  const selectedChatId = group_id?.toString();

  let isSelected = selectedChatId === id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ group_id: id }));
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          <Avatar alt={groupName} src={avatar} />
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{groupName}</Typography>
            <Typography variant="caption">
              {participantsNumber} Participants
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GroupElement;
