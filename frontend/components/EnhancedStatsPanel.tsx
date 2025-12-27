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
    bounceRate: number;
    avgSessionDuration: number;
    avgPagesPerSession: number;
    returningVisitors: number;
    newVisitors: number;
    activeVisitors: number;
  };
  pageViewsByPage: { page: string; views: number; avgTimeOnPage: number }[];
  entryPages: { page: string; count: number }[];
  exitPages: { page: string; count: number }[];
  topClickedElements: { elementId: string; elementType: string; elementText: string; clicks: number }[];
  deviceBreakdown: Record<string, number>;
  browserBreakdown: { browser: string; count: number }[];
  osBreakdown: { os: string; count: number }[];
  countryBreakdown: { country: string; visitors: number }[];
  cityBreakdown: { city: string; country: string; visitors: number }[];
  utmSources: { source: string; visitors: number; conversions: number; conversionRate: string }[];
  utmCampaigns: { campaign: string; visitors: number; conversions: number; conversionRate: string }[];
  dailyStats: { date: string; views: number }[];
  dailyVisitors: { date: string; visitors: number; conversions: number }[];
  topReferrers: { referrer: string; count: number; conversions: number }[];
  userFlows: { path: string; count: number }[];
  scrollDepth: { page: string; avgMaxScroll: number; sessions: number }[];
  formAnalytics: {
    abandonments: { formId: string; interactions: number; uniqueSessions: number }[];
    submissions: { formType: string; total: number; successful: number; successRate: string; avgTimeTaken: number }[];
  };
  recentConversions: { formType: string; timestamp: string }[];
  recentActivity: {
    sessionId: string;
    page: string;
    timestamp: string;
    device?: string;
    country?: string;
    city?: string;
    browser?: string;
  }[];
}

export default function EnhancedStatsPanel() {
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
      const response = await fetch(`/api/admin/analytics-enhanced?period=${period}`);

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

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
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
              Comprehensive website performance and user behavior insights
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

        {/* Live Metrics */}
        {analytics.summary.activeVisitors > 0 && (
          <div className="mb-8 bg-gradient-to-r from-green-900/30 to-green-700/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-white font-light">
                <span className="font-normal">{analytics.summary.activeVisitors}</span> active visitor{analytics.summary.activeVisitors !== 1 ? 's' : ''} right now
              </span>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Page Views"
            value={analytics.summary.totalPageViews.toLocaleString()}
          />
          <StatCard
            title="Unique Visitors"
            value={analytics.summary.totalSessions.toLocaleString()}
            subtitle={`${analytics.summary.newVisitors} new, ${analytics.summary.returningVisitors} returning`}
          />
          <StatCard
            title="Conversions"
            value={analytics.summary.conversions.toLocaleString()}
            subtitle={`${analytics.summary.conversionRate}% conversion rate`}
          />
          <StatCard
            title="Avg Session"
            value={formatDuration(analytics.summary.avgSessionDuration)}
            subtitle={`${analytics.summary.avgPagesPerSession.toFixed(1)} pages/session`}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Bounce Rate"
            value={`${analytics.summary.bounceRate.toFixed(1)}%`}
          />
          <StatCard
            title="Total Clicks"
            value={analytics.summary.totalClicks.toLocaleString()}
          />
          <StatCard
            title="Form Submissions"
            value={analytics.summary.totalFormSubmissions.toLocaleString()}
          />
        </div>

        {/* Daily Traffic & Conversions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Daily Visitors Chart */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Daily <span className="font-light italic text-[#9999ff]">Visitors</span></h2>
            <div className="space-y-2">
              {analytics.dailyVisitors.map((stat, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-gray-400 w-24 text-sm font-light">
                    {new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-black/50 rounded-full h-6 overflow-hidden border border-[#9999ff]/10">
                    <div
                      className="bg-gradient-to-r from-[#9999ff] to-[#6666cc] h-full rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${(stat.visitors / Math.max(...analytics.dailyVisitors.map(s => s.visitors))) * 100}%`,
                      }}
                    >
                      <span className="text-white text-xs font-normal">{stat.visitors}</span>
                    </div>
                  </div>
                  {stat.conversions > 0 && (
                    <span className="text-green-400 text-xs font-light">+{stat.conversions}</span>
                  )}
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

        {/* Geographic Data */}
        {analytics.countryBreakdown.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Countries */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
              <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Countries</span></h2>
              <div className="space-y-3">
                {analytics.countryBreakdown.slice(0, 8).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                    <span className="text-gray-300 font-light">{item.country || 'Unknown'}</span>
                    <span className="text-white font-normal">{item.visitors} visitors</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
              <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Cities</span></h2>
              <div className="space-y-3">
                {analytics.cityBreakdown.slice(0, 8).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                    <div className="flex-1">
                      <span className="text-gray-300 font-light">{item.city || 'Unknown'}</span>
                      <span className="text-gray-500 text-xs font-light ml-2">{item.country}</span>
                    </div>
                    <span className="text-white font-normal ml-4">{item.visitors}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Browser & OS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Browsers */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Browser <span className="font-light italic text-[#9999ff]">Distribution</span></h2>
            <div className="space-y-3">
              {analytics.browserBreakdown.slice(0, 6).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 font-light">{item.browser || 'Unknown'}</span>
                  <span className="text-white font-normal">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Operating <span className="font-light italic text-[#9999ff]">Systems</span></h2>
            <div className="space-y-3">
              {analytics.osBreakdown.slice(0, 6).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 font-light">{item.os || 'Unknown'}</span>
                  <span className="text-white font-normal">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        {analytics.topReferrers.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Referrers</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analytics.topReferrers.slice(0, 10).map((referrer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 truncate flex-1 font-light">{referrer.referrer}</span>
                  <div className="ml-4 flex items-center gap-2">
                    <span className="text-white font-normal">{referrer.count}</span>
                    {referrer.conversions > 0 && (
                      <span className="text-green-400 text-xs font-light">+{referrer.conversions}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UTM Campaigns */}
        {(analytics.utmSources.length > 0 || analytics.utmCampaigns.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* UTM Sources */}
            {analytics.utmSources.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
                <h2 className="text-2xl font-normal text-white mb-4">UTM <span className="font-light italic text-[#9999ff]">Sources</span></h2>
                <div className="space-y-3">
                  {analytics.utmSources.slice(0, 6).map((item, index) => (
                    <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 font-light">{item.source}</span>
                        <span className="text-white font-normal">{item.visitors} visitors</span>
                      </div>
                      <div className="text-xs text-gray-400 font-light">
                        {item.conversions} conversions ({item.conversionRate}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UTM Campaigns */}
            {analytics.utmCampaigns.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
                <h2 className="text-2xl font-normal text-white mb-4">UTM <span className="font-light italic text-[#9999ff]">Campaigns</span></h2>
                <div className="space-y-3">
                  {analytics.utmCampaigns.slice(0, 6).map((item, index) => (
                    <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 font-light">{item.campaign}</span>
                        <span className="text-white font-normal">{item.visitors} visitors</span>
                      </div>
                      <div className="text-xs text-gray-400 font-light">
                        {item.conversions} conversions ({item.conversionRate}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Page Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Top Pages */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Pages</span></h2>
            <div className="space-y-3">
              {analytics.pageViewsByPage.slice(0, 8).map((page, index) => (
                <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 truncate flex-1 font-light">{page.page || 'Homepage'}</span>
                    <span className="text-white font-normal ml-4">{page.views}</span>
                  </div>
                  {page.avgTimeOnPage > 0 && (
                    <div className="text-xs text-gray-400 font-light">
                      Avg time: {formatDuration(page.avgTimeOnPage)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Entry Pages */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Entry <span className="font-light italic text-[#9999ff]">Pages</span></h2>
            <div className="space-y-3">
              {analytics.entryPages.slice(0, 8).map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 truncate flex-1 font-light">{page.page || 'Homepage'}</span>
                  <span className="text-white font-normal ml-4">{page.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exit Pages */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <h2 className="text-2xl font-normal text-white mb-4">Exit <span className="font-light italic text-[#9999ff]">Pages</span></h2>
            <div className="space-y-3">
              {analytics.exitPages.slice(0, 8).map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 truncate flex-1 font-light">{page.page || 'Homepage'}</span>
                  <span className="text-white font-normal ml-4">{page.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Depth Analysis */}
        {analytics.scrollDepth.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-normal text-white mb-4">Scroll <span className="font-light italic text-[#9999ff]">Depth</span></h2>
            <div className="space-y-3">
              {analytics.scrollDepth.map((item, index) => (
                <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-light">{item.page || 'Homepage'}</span>
                    <span className="text-white font-normal">{item.avgMaxScroll}% avg scroll</span>
                  </div>
                  <div className="bg-black/50 rounded-full h-2 overflow-hidden border border-[#9999ff]/10">
                    <div
                      className="bg-gradient-to-r from-[#9999ff] to-[#6666cc] h-full rounded-full"
                      style={{ width: `${item.avgMaxScroll}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-light mt-1">{item.sessions} sessions</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Click Analytics */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-normal text-white mb-4">Top <span className="font-light italic text-[#9999ff]">Clicked Elements</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analytics.topClickedElements.slice(0, 10).map((element, index) => (
              <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300 truncate flex-1 font-light">{element.elementId || element.elementText || 'Unknown'}</span>
                  <span className="text-white font-normal ml-4">{element.clicks}</span>
                </div>
                <div className="text-xs text-gray-500 font-light">{element.elementType}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Analytics */}
        {(analytics.formAnalytics.submissions.length > 0 || analytics.formAnalytics.abandonments.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Form Submissions */}
            {analytics.formAnalytics.submissions.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
                <h2 className="text-2xl font-normal text-white mb-4">Form <span className="font-light italic text-[#9999ff]">Performance</span></h2>
                <div className="space-y-3">
                  {analytics.formAnalytics.submissions.map((item, index) => (
                    <div key={index} className="p-3 bg-black/50 rounded-lg border border-[#9999ff]/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-light">{item.formType}</span>
                        <span className="text-green-400 font-normal">{item.successRate}% success</span>
                      </div>
                      <div className="text-xs text-gray-400 font-light mb-2">
                        {item.successful}/{item.total} successful submissions
                      </div>
                      {item.avgTimeTaken > 0 && (
                        <div className="text-xs text-gray-500 font-light">
                          Avg time: {formatDuration(item.avgTimeTaken)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Abandonments */}
            {analytics.formAnalytics.abandonments.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
                <h2 className="text-2xl font-normal text-white mb-4">Form <span className="font-light italic text-[#9999ff]">Abandonments</span></h2>
                <div className="space-y-3">
                  {analytics.formAnalytics.abandonments.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                      <div className="flex-1">
                        <span className="text-gray-300 font-light">{item.formId}</span>
                        <div className="text-xs text-gray-500 font-light mt-1">
                          {item.uniqueSessions} users abandoned
                        </div>
                      </div>
                      <span className="text-orange-400 font-normal ml-4">{item.interactions} interactions</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Flows */}
        {analytics.userFlows.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-normal text-white mb-4">Common <span className="font-light italic text-[#9999ff]">User Flows</span></h2>
            <div className="space-y-3">
              {analytics.userFlows.slice(0, 10).map((flow, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-[#9999ff]/10 hover:border-[#9999ff]/30 transition-all">
                  <span className="text-gray-300 flex-1 font-light text-sm">{flow.path}</span>
                  <span className="text-white font-normal ml-4">{flow.count} users</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Conversions */}
        {analytics.recentConversions.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-normal text-white mb-4">Recent <span className="font-light italic text-[#9999ff]">Conversions</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analytics.recentConversions.slice(0, 10).map((conversion, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all">
                  <span className="text-gray-300 font-light">{conversion.formType}</span>
                  <span className="text-gray-400 text-xs font-light">
                    {new Date(conversion.timestamp).toLocaleString()}
                  </span>
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
                  <th className="pb-3 text-gray-400 font-light text-sm">Location</th>
                  <th className="pb-3 text-gray-400 font-light text-sm">Device</th>
                  <th className="pb-3 text-gray-400 font-light text-sm">Browser</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentActivity.slice(0, 20).map((activity, index) => (
                  <tr key={index} className="border-b border-[#9999ff]/10 hover:bg-black/30 transition-all">
                    <td className="py-3 text-gray-300 font-light text-sm">
                      {new Date(activity.timestamp).toLocaleString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-3 text-gray-300 font-light">{activity.page || 'Homepage'}</td>
                    <td className="py-3 text-gray-300 font-light text-sm">
                      {activity.city && activity.country ? `${activity.city}, ${activity.country}` : activity.country || 'Unknown'}
                    </td>
                    <td className="py-3 text-gray-300 capitalize font-light">{activity.device || 'unknown'}</td>
                    <td className="py-3 text-gray-300 font-light">{activity.browser || 'Unknown'}</td>
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
  subtitle?: string;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 hover:border-[#9999ff]/40 transition-all">
      <h3 className="text-gray-400 text-sm font-light mb-2">{title}</h3>
      <div className="text-3xl font-normal text-white mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-400 font-light">{subtitle}</div>}
    </div>
  );
}
