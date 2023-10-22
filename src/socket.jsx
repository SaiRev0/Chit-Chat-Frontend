import io from "socket.io-client";
let socket;
const url = import.meta.env.VITE_Backend;

const connectSocket = (user_id) => {
  socket = io(url, {
    cors: {
      origin: url,
      credentials: true,
    },
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
