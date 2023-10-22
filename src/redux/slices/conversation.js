/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {
    group_conversations: [],
    group_current_conversation: null,
    group_current_messages: [],
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          img: user?.avatar,
          msg: "",
          time: el.lastMsgTime,
          unread: 0,
          about: user?.about,
          lastMsg: el.lastMsg,
          lastMsgFrom: el.lastMsgFrom,
        };
      });

      state.direct_chat.conversations = list;
    },
    fetchGroupConversations(state, action) {
      const list = action.payload.group_conversations.map((el) => {
        return {
          id: el._id,
          groupName: el.groupName,
          participantsNumber: el.participants.length,
          avatar: el.avatar,
        };
      });

      state.group_chat.group_conversations = list;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id,
              user_id: user?._id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "Online",
              img: user?.avatar,
              msg: "",
              time: "9:36",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
    updateGroupConversation(state, action) {
      const this_conversation = action.payload.group_conversations;
      state.group_chat.group_conversations =
        state.group_chat.group_conversations.map((el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id,
              groupName: this_conversation.groupName,
              participants: this_conversation.participants,
              avatar: this_conversation.avatar,
            };
          }
        });
    },
    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: user?.avatar,
        msg: "",
        time: "9:36",
        unread: 0,
      });
    },
    addGroupConversation(state, action) {
      const this_conversation = action.payload.group_conversations;
      state.group_chat.group_conversations =
        state.group_chat.group_conversations.filter(
          (el) => el?.id !== this_conversation._id
        );
      state.group_chat.group_conversations.push({
        id: this_conversation._id,
        groupName: this_conversation.groupName,
        participants: this_conversation.participants,
        avatar: this_conversation?.avatar,
      });
    },
    setCurrentConversation(state, action) {
      if (action.payload.chat_type === "individual") {
        state.direct_chat.current_conversation =
          action.payload.conversation_data;
      } else if (action.payload.chat_type === "group") {
        state.group_chat.group_current_conversation =
          action.payload.conversation_data;
      }
    },

    // type of fix karna hai
    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        outgoing: el.from === user_id,
        createdAt: el.created_at,
        from: el.from,
        fromName: el.fromName,
        fromImg: el.fromImg,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },

    // type of fix karna hai
    fetchGroupCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        outgoing: el.from === user_id,
        createdAt: el.created_at,
        from: el.from,
        fromName: el.fromName,
        fromImg: el.fromImg,
      }));
      state.group_chat.group_current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      if (action.payload.message.type === "individual") {
        state.direct_chat.current_messages.push(action.payload.message);
      } else if (action.payload.message.type === "group") {
        state.group_chat.group_current_messages.push(action.payload.message);
      }
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
};

export const FetchGroupConversations = ({ group_conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchGroupConversations({ group_conversations }));
  };
};

export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
};

export const AddGroupConversation = ({ group_conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addGroupConversation({ group_conversations }));
  };
};

export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
};

export const UpdateGroupConversation = ({ group_conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateGroupConversation({ group_conversations }));
  };
};

export const SetCurrentConversation = (data) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.setCurrentConversation({
        conversation_data: data.conversation_data,
        chat_type: data.chat_type,
      })
    );
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};

export const FetchGroupCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchGroupCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};
