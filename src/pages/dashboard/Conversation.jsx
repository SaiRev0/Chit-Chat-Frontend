import { Stack, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { ChatHeader, ChatFooter } from "../../components/Chat";
import useResponsive from "../../hooks/useResponsive";
import { TextMsg } from "../../sections/dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
  FetchGroupCurrentMessages,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";

const Conversation = ({ isMobile, menu, chat_type }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { group_conversations, group_current_messages } = useSelector(
    (state) => state.conversation.group_chat
  );

  const { room_id, group_id } = useSelector((state) => state.app);

  useEffect(() => {
    //individual
    if (chat_type === "individual") {
      const current = conversations.find((el) => el?.id === room_id);
      socket.emit(
        "get_messages",
        { conversation_id: current?.id, chat_type: chat_type },
        (data) => {
          dispatch(FetchCurrentMessages({ messages: data }));
        }
      );
      dispatch(
        SetCurrentConversation({
          conversation_data: current,
          chat_type: chat_type,
        })
      );
    }
    //group
    else if (chat_type === "group") {
      const current = group_conversations.find((el) => el?.id === group_id);
      socket.emit(
        "get_messages",
        { conversation_id: current?.id, chat_type: chat_type },
        (data) => {
          dispatch(FetchGroupCurrentMessages({ messages: data }));
        }
      );
      dispatch(
        SetCurrentConversation({
          conversation_data: current,
          chat_type: chat_type,
        })
      );
    }
  }, [
    chat_type,
    conversations,
    dispatch,
    group_conversations,
    group_id,
    room_id,
  ]);

  const messagesToDisplay =
    chat_type === "individual" ? current_messages : group_current_messages;

  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {messagesToDisplay.map((el) => {
          return <TextMsg key={el.id} el={el} menu={menu} />;
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { group_current_messages } = useSelector(
    (state) => state.conversation.group_chat
  );

  const { chat_type } = useSelector((state) => state.app);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages, group_current_messages]);

  return (
    <Stack
      height={"100%"}
      maxHeight="calc(100vh - 6px)"
      width={isMobile ? "100vw" : "auto"}
    >
      <ChatHeader chat_type={chat_type} />
      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Conversation menu={true} isMobile={isMobile} chat_type={chat_type} />
      </Box>

      <ChatFooter />
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
