import Image from "next/image";
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
    <h2>Welcome to the IRSDL App</h2>
    <Button>Click Me</Button>
    <UserButton />
   </div>
  );
}
