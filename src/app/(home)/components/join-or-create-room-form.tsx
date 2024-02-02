"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";

interface FormFields {
  formType: string;
  newRoomUsername: string;
  username: string;
  roomId: string;
}

export const JoinOrCreateRoomForm = () => {
  const router = useRouter();
  const { setValue, register, handleSubmit, watch } = useForm<FormFields>({
    defaultValues: {
      formType: "join",
    },
  });

  const handleSelectFormType = (type: string) => {
    setValue("formType", type);
  };

  const handleJoinRoom = (data: FormFields) => {
    console.log("Entrar em uma sala!", data);
    sessionStorage.setItem("username", data.username);

    window.location.href = `/room/${data.roomId}`;
  };

  const handleCreateRoom = (data: FormFields) => {
    sessionStorage.setItem("username", data.newRoomUsername);
    const roomId = uuidV4();
    window.location.href = `/room/${roomId}`;

    console.log("Criar sala nova!", data);
  };

  const onSubmit = (data: FormFields) => {
    if (data.formType.includes("join")) {
      handleJoinRoom(data);
    } else {
      handleCreateRoom(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        onValueChange={handleSelectFormType}
        defaultValue="join"
        className="w-[400px] bg-gray-900"
      >
        <TabsList className="grid w-full grid-cols-2 bg-inherit">
          <TabsTrigger value="join">Ingressar</TabsTrigger>
          <TabsTrigger value="create">Nova reunião</TabsTrigger>
        </TabsList>
        <TabsContent value="join">
          <Card className="bg-inherit text-white">
            <CardHeader>
              <CardTitle>Ingressar</CardTitle>
              <CardDescription>
                Ingresse em uma reunião. Adicione seu nome e o ID da reunião.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Nome</Label>
                <Input
                  id="username"
                  className="text-black"
                  {...register("username")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="roomId">ID da reunião</Label>
                <Input
                  id="roomId"
                  className="text-black"
                  {...register("roomId")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Entrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card className="bg-inherit text-white">
            <CardHeader>
              <CardTitle>Nova reunião</CardTitle>
              <CardDescription>Crie uma sala para sua reunião.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Label htmlFor="newRoomUsername">Seu nome</Label>
                <Input
                  id="newRoomUsername"
                  className="text-black"
                  {...register("newRoomUsername")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Criar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};
