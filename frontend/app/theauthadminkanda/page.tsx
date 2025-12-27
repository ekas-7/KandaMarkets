"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/theauthadminkanda/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-black"
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
      <div className="max-w-md w-full">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
                <path d="M8 8L16 4L24 8L32 4L32 16L24 20L16 16L8 20V8Z" fill="#9999ff"/>
                <path d="M8 20L16 16L24 20L32 16V28L24 32L16 28L8 32V20Z" fill="#9999ff" opacity="0.7"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-normal text-white mb-2">
              Admin <span className="font-light italic text-[#9999ff]">Portal</span>
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Secure access to Kanda Markets dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant={null as any}
              className="w-full bg-[#9999ff] text-white hover:shadow-[0_0_30px_rgba(153,153,255,0.8)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm sm:text-base px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-xs text-gray-500 text-center font-light">
              🔒 This is a secure area. All login attempts are monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
