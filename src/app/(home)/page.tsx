import { JoinOrCreateRoomForm } from "./components/join-or-create-room-form";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <JoinOrCreateRoomForm />
    </div>
  );
}
