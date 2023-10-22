import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchUserProfile,
  SelectConversation,
  showSnackbar,
} from "../../redux/slices/app";
import { socket, connectSocket } from "../../socket";
import {
  UpdateDirectConversation,
  AddDirectConversation,
  AddDirectMessage,
  UpdateGroupConversation,
  AddGroupConversation,
} from "../../redux/slices/conversation";
import AudioCallNotification from "../../sections/dashboard/Audio/CallNotification";
import VideoCallNotification from "../../sections/dashboard/video/CallNotification";
import {
  PushToAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../redux/slices/audioCall";
import AudioCallDialog from "../../sections/dashboard/Audio/CallDialog";
import VideoCallDialog from "../../sections/dashboard/video/CallDialog";
import {
  PushToVideoCallQueue,
  UpdateVideoCallDialog,
} from "../../redux/slices/videoCall";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state) => state.audioCall
  );
  const { open_video_notification_dialog, open_video_dialog } = useSelector(
    (state) => state.videoCall
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { group_conversations, group_current_conversation } = useSelector(
    (state) => state.conversation.group_chat
  );

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }));
  };
  const handleCloseVideoDialog = () => {
    dispatch(UpdateVideoCallDialog({ state: false }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("audio_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToAudioCallQueue(data));
      });

      socket.on("video_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToVideoCallQueue(data));
      });

      socket.on("new_message", (data) => {
        const message = data.message;
        if (data.chat_type === "group") {
          if (group_current_conversation?.id === data.group_id) {
            dispatch(
              AddDirectMessage({
                id: message._id,
                type: data.chat_type,
                subtype: message.type,
                message: message.text,
                outgoing: message.from === user_id,
                createdAt: message.created_at,
                from: message.from,
                fromName: message.fromName,
                fromImg: message.fromImg,
              })
            );
          }
        } else if (data.chat_type === "individual") {
          if (current_conversation?.id === data.conversation_id) {
            dispatch(
              AddDirectMessage({
                id: message._id,
                type: data.chat_type,
                subtype: message.type,
                message: message.text,
                outgoing: message.from === user_id,
                createdAt: message.created_at,
                from: message.from,
                fromName: message.fromName,
                fromImg: message.fromImg,
              })
            );
          }
        }
      });

      socket.on("start_chat", (data) => {
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });

      socket.on("start_group_chat", (data) => {
        // add / update to conversation list
        const existing_group_conversation = group_conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_group_conversation) {
          // update group conversation
          dispatch(UpdateGroupConversation({ group_conversations: data }));
        } else {
          // add group conversation
          dispatch(AddGroupConversation({ group_conversations: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });

      socket.on("new_friend_request", () => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          })
        );
      });

      socket.on("request_accepted", () => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("start_group_chat");
      socket?.off("new_message");
      socket?.off("audio_call_notification");
    };
  }, [
    isLoggedIn,
    current_conversation,
    conversations,
    dispatch,
    user_id,
    group_current_conversation,
    group_conversations,
  ]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row">
        {isDesktop && (
          // SideBar
          <SideNav />
        )}

        <Outlet />
      </Stack>
      {open_audio_notification_dialog && (
        <AudioCallNotification open={open_audio_notification_dialog} />
      )}
      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_video_notification_dialog && (
        <VideoCallNotification open={open_video_notification_dialog} />
      )}
      {open_video_dialog && (
        <VideoCallDialog
          open={open_video_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )}
    </>
  );
};

export default DashboardLayout;
