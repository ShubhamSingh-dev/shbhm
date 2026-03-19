import { QuoteCard } from "@/components/common/quote";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen">
        <h2 className="font-bold">Hello bitches</h2>
        <QuoteCard />
      </div>
    </>
  );
}
