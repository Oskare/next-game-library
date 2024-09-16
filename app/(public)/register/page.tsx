import Image from "next/image";
import RegisterForm from "@/components/login/register-form";
import logo from "@/public/vercel.svg";

export default function Login() {

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-200 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Image
              src={logo}
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </div>
        </div>
        <RegisterForm/>
      </div>
    </main>
  );
}