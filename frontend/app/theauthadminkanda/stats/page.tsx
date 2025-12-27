"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StatsPanel from "@/components/StatsPanel";

export default function StatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/theauthadminkanda");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-black"
        style={{
          backgroundColor: "black",
          backgroundImage: `
            linear-gradient(to top, rgba(153, 153, 255, 0.125), transparent),
            linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "auto, 44px 44px, 44px 44px",
          backgroundRepeat: "no-repeat, repeat, repeat",
        }}
      >
        <div className="text-[#9999ff] text-xl font-light">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <StatsPanel />;
}
