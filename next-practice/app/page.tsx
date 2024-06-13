import Image from "next/image";
import { getUser } from "./lib/db";
export default function Home() {
  getUser();
  return (
    <main>
      <div>
        home
      </div>
    </main>
  );
}
