"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/socket-context";
import { Mic, Monitor, Phone, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../components/chat";

interface IAnswer {
  sender: string;
  description: RTCSessionDescriptionInit;
}

interface ICandidates {
  candidate: RTCIceCandidate;
  sender: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default function Room({ params }: Props) {
  const { socket } = useSocket();
  const localStream = useRef<HTMLVideoElement>(null);

  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null,
  );

  const handleAnswer = async (data: IAnswer) => {
    console.log("oferta recebida: ", data);
    const peerConnection = peerConnections.current[data.sender];

    if (data.description.type === "offer") {
      await peerConnection.setRemoteDescription(data.description);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      console.log("criando uma resposta");

      socket?.emit("sdp", {
        to: data.sender,
        sender: socket?.id,
        description: peerConnection.localDescription,
      });
    }

    if (data.description.type === "answer") {
      console.log("ouvindo a oferta");
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.description),
      );
    }
  };

  const initLocalCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    setVideoMediaStream(video);

    if (localStream.current) {
      localStream.current.srcObject = video;
    }
  };

  const createPeerConnection = async (
    socketId: string,
    createOffer: boolean,
  ) => {
    const config = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;
    const peerConnection = peerConnections.current[socketId];

    if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
    }

    if (createOffer) {
      const peerConnection = peerConnections.current[socketId];

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      console.log("criando uma oferta");
      socket?.emit("sdp", {
        to: socketId,
        sender: socket?.id,
        description: peerConnection.localDescription,
      });
    }

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];

      // setRemoteStreams(prevState => [...prevState, remoteStream]); Verificar se pode ser assim
      setRemoteStreams([...remoteStreams, remoteStream]);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("ice candidates", {
          to: socketId,
          sender: socket?.id,
          candidate: event.candidate,
        });
      }
    };
  };

  const handleIceCandidates = async (data: ICandidates) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  useEffect(() => {
    socket?.on("connect", async () => {
      console.log("conectado");
      socket.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });

      await initLocalCamera();
    });

    //52:47

    socket?.on("new user", (data) => {
      console.log("Novo usuário tentando se conectar", data);
      createPeerConnection(data.socketId, false);
      socket.emit("newUserStart", {
        to: data.socketId,
        sender: socket.id,
      });
    });

    socket?.on("newUserStart", (data) => {
      console.log("usuário conectado na sala", data);
      createPeerConnection(data.sender, true);
    });

    socket?.on("ice candidates", (data) => handleIceCandidates(data));

    socket?.on("sdp", (data) => handleAnswer(data));
  }, [socket]);

  return (
    <div className="flex  flex-1 flex-col justify-between">
      <div className="flex justify-between gap-8 p-4">
        {/* videos container */}
        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2">
            <video
              className="h-full w-full -scale-x-100 "
              autoPlay
              ref={localStream}
            />
            <span className="absolute bottom-3">Christopher Ristau</span>
          </div>
          {remoteStreams?.map((stream, index) => {
            return (
              <div
                key={index}
                className="relative h-full w-full rounded-md border-2 border-purple-800 bg-gray-950 p-2"
              >
                <video
                  className="h-full w-full"
                  autoPlay
                  ref={(video) => {
                    if (video && video.srcObject !== stream) {
                      video.srcObject = stream;
                    }
                  }}
                />
                <span className="absolute bottom-3">Christopher Ristau</span>
              </div>
            );
          })}
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
