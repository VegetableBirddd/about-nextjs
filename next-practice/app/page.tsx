import Image from "next/image";
import { getUser } from "./lib/db";
import ShowThree from '@/app/ui/showThree'
export default function Home() {
  getUser();
  return (
    <main>
      <div className=" w-screen h-screen">
        <ShowThree />
      </div>
    </main>
  );
}
