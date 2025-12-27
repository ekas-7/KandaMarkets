"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface AnalyticsData {
  summary: {
    totalPageViews: number;
    totalSessions: number;
    totalClicks: number;
    totalFormSubmissions: number;
    conversions: number;
    conversionRate: number;
    avgPagesPerSession: string;
  };
  pageViewsByPage: { page: string; views: number }[];
  topClickedElements: { elementId: string; elementType: string; clicks: number }[];
  deviceBreakdown: Record<string, number>;
  dailyStats: { date: string; views: number }[];
  dailyVisitors: { date: string; visitors: number }[];
  topReferrers: { referrer: string; count: number }[];
  recentActivity: {
    sessionId: string;
    page: string;
    timestamp: string;
    device?: string;
    country?: string;
  }[];
}

export default function StatsPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("7");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/theauthadminkanda");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status, period]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/analytics?period=${period}`);

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
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
        <div className="text-[#9999ff] text-xl font-light">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
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
        <div className="text-white text-xl font-light">Failed to load analytics</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-white px-4 py-8"
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button
                onClick={() => router.push('/theauthadminkanda/dashboard')}
                className="bg-gray-900/50 text-white hover:bg-gray-800/50 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm px-6 py-2.5 border border-[#9999ff]/20"
              >
                ← Back
              </Button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Analytics <span className="font-light italic text-[#9999ff]">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Monitor website performance and user behavior
            </p>
          </div>
          <div className="flex gap-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2.5 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300 text-sm"
            >
              <option value="1">Last 24 Hours</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Page Views"
            value={analytics.summary.totalPageViews.toLocaleString()}
            trend={null}
          />
          <StatCard
            title="Unique Visitors"
            value={analytics.summary.totalSessions.toLocaleString()}
            trend={null}
          />
          <StatCard
            title="Conversions"
            value={analytics.summary.conversions.toLocaleString()}
            subtitle={`${analytics.summary.conversionRate}% conversion rate`}
          />
          <StatCard
            title="Total Clicks"
            value={analytics.summary.totalClicks.toLocaleString()}
            trend={null}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Daily Traffic Chart */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Daily <span className="font-light italic text-[#9999ff]">Traffic</span></h2>
            <div className="space-y-2">
              {analytics.dailyStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-gray-400 w-24 text-sm font-light">
                    {new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-black/50 rounded-full h-6 overflow-hidden border border-[#9999ff]/10">
                    <div
                      className="bg-gradient-to-r from-[#9999ff] to-[#6666cc] h-full rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${(stat.views / Math.max(...analytics.dailyStats.map(s => s.views))) * 100}%`,
                      }}
                    >
                      <span className="text-white text-xs font-normal">{stat.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Device <span className="font-light italic text-[#9999ff]">Breakdown</span></h2>
            <div className="space-y-4">
              {Object.entries(analytics.deviceBreakdown).map(([device, count]) => {
                const total = Object.values(analytics.deviceBreakdown).reduce((a, b) => a + b, 0);
                const percentage = ((count / total) * 100).toFixed(1);
                return (
                  <div key={device} className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="capitalize font-light">{device}</span>
                      <span className="font-normal">{count} ({percentage}%)</span>
                    </div>
                    <div className="bg-black/50 rounded-full h-3 overflow-hidden border border-[#9999ff]/10">
                      <div
                        className="bg-gradient-to-r from-[#9999ff] to-[#6666cc] h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Pages and Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Top Pages */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Pages</span></h2>
            <div className="space-y-3">
              {analytics.pageViewsByPage.slice(0, 5).map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 truncate flex-1 font-light">{page.page || 'Homepage'}</span>
                  <span className="text-white font-normal ml-4">{page.views} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Clicked Elements */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Clicked Elements</span></h2>
            <div className="space-y-3">
              {analytics.topClickedElements.slice(0, 5).map((element, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <div className="flex-1">
                    <span className="text-gray-300 truncate block font-light">{element.elementId}</span>
                    <span className="text-gray-500 text-xs font-light">{element.elementType}</span>
                  </div>
                  <span className="text-white font-normal ml-4">{element.clicks} clicks</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Referrers */}
        {analytics.topReferrers.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Referrers</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analytics.topReferrers.map((referrer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 truncate flex-1 font-light">{referrer.referrer}</span>
                  <span className="text-white font-normal ml-4">{referrer.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
          <h2 className="text-2xl font-normal text-white mb-4">Recent <span className="font-light italic text-[#9999ff]">Activity</span></h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#9999ff]/20">
                  <th className="pb-3 text-gray-400 font-light text-sm">Time</th>
                  <th className="pb-3 text-gray-400 font-light text-sm">Page</th>
                  <th className="pb-3 text-gray-400 font-light text-sm">Device</th>
                  <th className="pb-3 text-gray-400 font-light text-sm">Session ID</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentActivity.map((activity, index) => (
                  <tr key={index} className="border-b border-[#9999ff]/10 hover:bg-black/30 transition-all">
                    <td className="py-3 text-gray-300 font-light text-sm">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 text-gray-300 font-light">{activity.page || 'Homepage'}</td>
                    <td className="py-3 text-gray-300 capitalize font-light">{activity.device || 'unknown'}</td>
                    <td className="py-3 text-gray-500 text-xs font-mono">
                      {activity.sessionId.slice(0, 8)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend?: number | null;
  subtitle?: string;
}

function StatCard({ title, value, trend, subtitle }: StatCardProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 hover:border-[#9999ff]/40 transition-all">
      <h3 className="text-gray-400 text-sm font-light mb-2">{title}</h3>
      <div className="text-3xl font-normal text-white mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-400 font-light">{subtitle}</div>}
      {trend !== null && trend !== undefined && (
        <div className={`text-sm font-semibold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
