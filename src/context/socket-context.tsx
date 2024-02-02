"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext({} as ISocketContext);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/streams`, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "O useSocket deve ser utilizado dentro de um SocketProvider",
    );
  }

  return context;
};

export { useSocket, SocketProvider };
