import { LoadingScreen } from "@/components/specific/LoadingScreen";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <>
      {/* <LoadingScreen /> */}
      <div className="h-screen w-screen">
        <Navbar />
      </div>
    </>
  );
}
