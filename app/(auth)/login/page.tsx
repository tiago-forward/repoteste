import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/public/logo-main.png";

export default function Login() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <Image
            src={logo}
            alt="FDS Games"
            width={150}
            height={40}
            className="m-auto"
          />
          <CardDescription className="text-center">
            Para obter acesso, contate seu superior
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Insira seu e-mail"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Insira sua senha"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer mt-4">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
