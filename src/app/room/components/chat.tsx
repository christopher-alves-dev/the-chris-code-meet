import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/socket-context";
import { SendHorizonal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface IChatMessage {
  message: string;
  username: string;
  roomId: string;
  time: string;
}

interface Props {
  roomId: string;
}

export const Chat = ({ roomId }: Props) => {
  console.log({ roomIdChat: roomId });
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { socket } = useSocket();

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      console.log({ value: inputRef.current?.value });
      const messageToServer = {
        message: inputRef.current?.value,
        username: "Christopher Ristau",
        roomId,
        time: new Date().toLocaleDateString(),
      };

      socket?.emit("chat", messageToServer);
      setChatMessages((prevState) => [...prevState, messageToServer]);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    socket?.on("chat", (data: IChatMessage) => {
      console.log("message: ", data);
      setChatMessages((prevState) => [...prevState, data]);
    });
  }, [socket]);

  return (
    <div className="flex w-full max-w-80 flex-col justify-between rounded-3xl border-2 border-purple-800 bg-gray-950 p-4">
      <div className="flex flex-col gap-4">
        {chatMessages.map((chat, index) => (
          <div
            key={`${chat.username}-${chat.time}-${index}`}
            className="flex flex-col gap-2 rounded-lg bg-gray-800 p-3"
          >
            <div className="flex items-center gap-4 text-xs text-green-500">
              <p>{chat.username}</p>
              <p>{chat.time}</p>
            </div>

            <p className="text-xs text-gray-400">{chat.message}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-800 px-2 has-[:focus]:border-purple-800"
      >
        <Input
          ref={inputRef}
          className="w-full border-0 bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <Button type="submit" className="text-2xl">
          <SendHorizonal className="h-[1em] w-[1em]" />
        </Button>
      </form>
    </div>
  );
};
