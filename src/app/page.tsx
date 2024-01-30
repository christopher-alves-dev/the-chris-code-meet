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

export default function Home() {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px] bg-gray-900">
        <TabsList className="grid w-full grid-cols-2 bg-inherit">
          <TabsTrigger value="join">Ingressar</TabsTrigger>
          <TabsTrigger value="newRoom">Nova reunião</TabsTrigger>
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
                <Label htmlFor="name">Nome</Label>
                <Input id="name" className="text-black" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">ID da reunião</Label>
                <Input id="username" className="text-black" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Entrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="newRoom">
          <Card className="bg-inherit text-white">
            <CardHeader>
              <CardTitle>Nova reunião</CardTitle>
              <CardDescription>Crie uma sala para sua reunião.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Label htmlFor="roomName">Seu nome</Label>
                <Input id="roomName" className="text-black" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Criar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
