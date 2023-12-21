import config from "@/config";
import { useAppDispatch } from "@/redux";
import { receiveMessageHome } from "@/redux/slice/messageSlice";
import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

type Props = {
  children: any;
};

// @ts-ignore
export const SocketContext = createContext();

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(config.SOCKET_URL, {
      auth: {
        token: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      autoConnect: false,
    });

    setSocket(socket);

    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to chat server: ", socket?.id);
    });

    socket.on("receive_message_home", (data) => {
      console.log("receive_message_home", data);
      dispatch(receiveMessageHome(data));
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
