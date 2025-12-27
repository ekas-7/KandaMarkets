"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Lead {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  instagramHandle: string;
  services: string[];
  businessType: string;
  budget: string;
  biggestGoal: string;
  submittedAt: string;
  status: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/theauthadminkanda");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchLeads();
    }
  }, [status]);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/leads");
      
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data.leads);
    } catch (err) {
      setError("Failed to load leads. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/theauthadminkanda" });
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-[#9999ff] text-xl">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
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
            <h1 className="text-3xl sm:text-4xl font-normal text-white mb-2">
              Admin <span className="font-light italic text-[#9999ff]">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm font-light">
              Manage and view all lead submissions
            </p>
          </div>
          <Button
            onClick={handleSignOut}
            variant={null as any}
            className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-sm px-6 py-2.5"
          >
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm font-light mb-1">Total Leads</p>
            <p className="text-3xl font-normal text-white">{leads.length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm font-light mb-1">New</p>
            <p className="text-3xl font-normal text-white">
              {leads.filter((l) => l.status === "new").length}
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm font-light mb-1">This Week</p>
            <p className="text-3xl font-normal text-white">
              {
                leads.filter((l) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(l.submittedAt) > weekAgo;
                }).length
              }
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm font-light mb-1">Today</p>
            <p className="text-3xl font-normal text-white">
              {
                leads.filter((l) => {
                  const today = new Date();
                  const leadDate = new Date(l.submittedAt);
                  return leadDate.toDateString() === today.toDateString();
                }).length
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or business..."
                className="w-full px-4 py-2.5 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-300 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/50 border border-[#9999ff]/30 rounded-lg text-white focus:outline-none focus:border-[#9999ff] focus:ring-2 focus:ring-[#9999ff]/20 transition-all duration-300 text-sm"
              >
                <option value="all">All Leads</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-[#9999ff]/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50 border-b border-[#9999ff]/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-normal text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-black/30 transition-colors">
                      <td className="px-4 py-4 text-sm text-white font-light">
                        {lead.fullName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 font-light">
                        {lead.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 font-light">
                        {lead.phone}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 font-light">
                        <div>{lead.businessName}</div>
                        <div className="text-xs text-[#9999ff]">{lead.instagramHandle}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 font-light">
                        {lead.budget}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 font-light">
                        {new Date(lead.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => {
                            const modal = document.getElementById(`modal-${lead._id}`);
                            if (modal) (modal as HTMLDialogElement).showModal();
                          }}
                          className="text-[#9999ff] hover:text-[#8888ee] transition-colors font-light"
                        >
                          View Details
                        </button>

                        {/* Modal */}
                        <dialog
                          id={`modal-${lead._id}`}
                          className="rounded-2xl bg-gray-900 border border-[#9999ff]/20 p-0 backdrop:bg-black/80"
                        >
                          <div className="p-6 max-w-2xl">
                            <div className="flex justify-between items-start mb-6">
                              <h3 className="text-2xl font-normal text-white">
                                Lead <span className="text-[#9999ff] font-light italic">Details</span>
                              </h3>
                              <button
                                onClick={() => {
                                  const modal = document.getElementById(`modal-${lead._id}`);
                                  if (modal) (modal as HTMLDialogElement).close();
                                }}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>

                            <div className="space-y-4 text-sm">
                              <div>
                                <p className="text-gray-400 font-light mb-1">Full Name</p>
                                <p className="text-white">{lead.fullName}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Email</p>
                                  <p className="text-white">{lead.email}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Phone</p>
                                  <p className="text-white">{lead.phone}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Business Name</p>
                                  <p className="text-white">{lead.businessName}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Instagram</p>
                                  <p className="text-[#9999ff]">{lead.instagramHandle}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-400 font-light mb-1">Services Interested In</p>
                                <div className="flex flex-wrap gap-2">
                                  {lead.services.map((service, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 bg-[#9999ff]/20 border border-[#9999ff]/30 rounded-full text-xs text-[#9999ff]"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Business Type</p>
                                  <p className="text-white capitalize">{lead.businessType}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-light mb-1">Budget</p>
                                  <p className="text-white">{lead.budget}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-400 font-light mb-1">Biggest Goal</p>
                                <p className="text-white">{lead.biggestGoal}</p>
                              </div>
                              <div>
                                <p className="text-gray-400 font-light mb-1">Submitted At</p>
                                <p className="text-white">
                                  {new Date(lead.submittedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                              <button
                                onClick={() => {
                                  const modal = document.getElementById(`modal-${lead._id}`);
                                  if (modal) (modal as HTMLDialogElement).close();
                                }}
                                className="px-6 py-2 bg-[#9999ff] text-white rounded-full hover:shadow-[0_0_20px_rgba(153,153,255,0.6)] transition-all"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </dialog>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-center text-gray-400 text-sm font-light">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>
    </div>
  );
}
