import Image from "next/image";
import { Inter } from "next/font/google";
import DashBoard from "@/components/DashBoard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <main className={`${inter.className} `}>
    <DashBoard/>
  </main>;
}
