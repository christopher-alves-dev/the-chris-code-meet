"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/socket-context";
import { Mic, Monitor, Phone, SendHorizonal, VideoIcon } from "lucide-react";
import { useEffect } from "react";
import { Chat } from "../components/chat";

interface Props {
  params: {
    id: string;
  };
}

export default function Room({ params }: Props) {
  const { socket } = useSocket();
  console.log({ socket });
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("conectado");
      console.log("conectado");
      socket.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });
    });
  }, [socket]);

  return (
    <div className="flex  flex-1 flex-col justify-between">
      <div className="flex justify-between gap-8 p-4">
        {/* videos container */}
        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2">
            <video className="h-full w-full" />
            <span className="absolute bottom-3">Christopher Ristau</span>
          </div>
          <div className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2">
            <video className="h-full w-full" />
            <span className="absolute bottom-3">Christopher Ristau</span>
          </div>
          <div className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2">
            <video className="h-full w-full" />
            <span className="absolute bottom-3">Christopher Ristau</span>
          </div>
          <div className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2">
            <video className="h-full w-full" />
            <span className="absolute bottom-3">Christopher Ristau</span>
          </div>
        </div>

        <Chat roomId={params.id} />
      </div>
      <footer className="relative flex items-center justify-center bg-gray-950 px-4 py-5">
        <span className="absolute left-4 text-xl font-medium">09:30</span>
        <div className="flex gap-3">
          <Button className="text-xl">
            <Mic className="h-[1em] w-[1em]" />
          </Button>
          <Button className="text-xl">
            <VideoIcon className="h-[1em] w-[1em]" />
          </Button>
          <Button className="text-xl">
            <Monitor className="h-[1em] w-[1em]" />
          </Button>
          <Button className="bg-red-500 text-xl">
            <Phone className="h-[1em] w-[1em]" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
