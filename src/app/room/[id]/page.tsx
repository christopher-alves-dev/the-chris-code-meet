import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Monitor, Phone, SendHorizonal, VideoIcon } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default function Room({ params }: Props) {
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

        {/* chat container */}
        <div className="flex w-full max-w-80 flex-col justify-between rounded-3xl border-2 border-purple-800 bg-gray-950 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg bg-gray-800 p-3">
              <div className="flex items-center gap-4 text-xs text-green-500">
                <p>Christopher Ristau </p>
                <p>09:28</p>
              </div>

              <p className="text-xs text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                ligula leo, finibus eu ultricies sit amet, interdum nec mauris.
                Pellentesque gravida lorem interdum,
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border-2 border-transparent bg-gray-800 px-2 has-[:focus]:border-purple-800">
            <Input className="w-full border-0 bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0" />
            <div className="text-2xl">
              <SendHorizonal className="h-[1em] w-[1em]" />
            </div>
          </div>
        </div>
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
