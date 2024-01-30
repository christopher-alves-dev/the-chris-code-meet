import { Button } from "@/components/ui/button";
import {
  CameraIcon,
  Computer,
  Mic,
  Monitor,
  Phone,
  VideoIcon,
} from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default function Room({ params }: Props) {
  return (
    <div className="flex  flex-1 flex-col justify-between">
      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2">
        <div className="relative h-full w-full rounded-md bg-gray-950 p-2">
          <video className="h-full w-full" />
          <span className="absolute bottom-3">Christopher Ristau</span>
        </div>
        <div className="relative h-full w-full rounded-md bg-gray-950 p-2">
          <video className="h-full w-full" />
          <span className="absolute bottom-3">Christopher Ristau</span>
        </div>
        <div className="relative h-full w-full rounded-md bg-gray-950 p-2">
          <video className="h-full w-full" />
          <span className="absolute bottom-3">Christopher Ristau</span>
        </div>
        <div className="relative h-full w-full rounded-md bg-gray-950 p-2">
          <video className="h-full w-full" />
          <span className="absolute bottom-3">Christopher Ristau</span>
        </div>
      </div>
      <footer className="items- relative flex justify-center bg-gray-950 px-4 py-5">
        <span className="absolute left-4 text-2xl font-medium">09:30</span>
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
          <Button className="text-xl">
            <Phone className="h-[1em] w-[1em]" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
