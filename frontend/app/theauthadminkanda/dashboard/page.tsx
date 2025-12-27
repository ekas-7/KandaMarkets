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
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingStatus(leadId);
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the local state
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
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
                <option value="converted">Converted</option>
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
                          className="rounded-3xl bg-gray-900 border-2 border-[#9999ff]/30 p-0 backdrop:bg-black/90 shadow-[0_0_50px_rgba(153,153,255,0.3)] max-w-4xl w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="relative">
                            {/* Header */}
                            <div className="bg-black/50 px-8 py-6 border-b border-[#9999ff]/20">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-3xl font-normal text-white">
                                      Lead <span className="text-[#9999ff] font-light italic">Details</span>
                                    </h3>
                                    {/* Status Badge */}
                                    <span className={`px-4 py-1 rounded-full text-sm font-light capitalize ${
                                      lead.status === 'new' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                      lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                      lead.status === 'qualified' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                      'bg-green-500/20 text-green-400 border border-green-500/30'
                                    }`}>
                                      {lead.status}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    Submitted on {new Date(lead.submittedAt).toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    const modal = document.getElementById(`modal-${lead._id}`);
                                    if (modal) (modal as HTMLDialogElement).close();
                                  }}
                                  className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                                >
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 max-h-[70vh] overflow-y-auto">
                              {/* Status Update Section */}
                              <div className="mb-8">
                                <h4 className="text-lg font-normal text-[#9999ff] mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Update Lead Status
                                </h4>
                                <div className="bg-black/40 p-6 rounded-xl border border-[#9999ff]/10">
                                  <p className="text-sm text-gray-400 mb-4">Change the status of this lead to track your progress</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['new', 'contacted', 'qualified', 'converted'].map((statusOption) => (
                                      <button
                                        key={statusOption}
                                        onClick={() => updateLeadStatus(lead._id, statusOption)}
                                        disabled={lead.status === statusOption || updatingStatus === lead._id}
                                        className={`px-4 py-3 rounded-xl font-light capitalize transition-all border-2 ${
                                          lead.status === statusOption
                                            ? statusOption === 'new' 
                                              ? 'bg-blue-500/30 border-blue-500/60 text-blue-300 cursor-not-allowed'
                                              : statusOption === 'contacted'
                                              ? 'bg-yellow-500/30 border-yellow-500/60 text-yellow-300 cursor-not-allowed'
                                              : statusOption === 'qualified'
                                              ? 'bg-purple-500/30 border-purple-500/60 text-purple-300 cursor-not-allowed'
                                              : 'bg-green-500/30 border-green-500/60 text-green-300 cursor-not-allowed'
                                            : statusOption === 'new'
                                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                                            : statusOption === 'contacted'
                                            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                                            : statusOption === 'qualified'
                                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                            : 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                        }`}
                                      >
                                        {updatingStatus === lead._id ? (
                                          <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                          </span>
                                        ) : (
                                          <>
                                            {statusOption}
                                            {lead.status === statusOption && (
                                              <svg className="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                              </svg>
                                            )}
                                          </>
                                        )}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Personal Information Section */}
                              <div className="mb-8">
                                <h4 className="text-lg font-normal text-[#9999ff] mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  Personal Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-6 rounded-xl border border-[#9999ff]/10">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Full Name</p>
                                    <p className="text-white text-lg font-light">{lead.fullName}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email Address</p>
                                    <a href={`mailto:${lead.email}`} className="text-[#9999ff] text-lg hover:text-[#8888ee] transition-colors font-light flex items-center">
                                      {lead.email}
                                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Phone Number</p>
                                    <a href={`tel:${lead.phone}`} className="text-white text-lg hover:text-[#9999ff] transition-colors font-light flex items-center">
                                      {lead.phone}
                                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                      </svg>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Business Information Section */}
                              <div className="mb-8">
                                <h4 className="text-lg font-normal text-[#9999ff] mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Business Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-6 rounded-xl border border-[#9999ff]/10">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Business Name</p>
                                    <p className="text-white text-lg font-light">{lead.businessName}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Instagram Handle</p>
                                    <a 
                                      href={`https://instagram.com/${lead.instagramHandle.replace('@', '')}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-[#9999ff] text-lg hover:text-[#8888ee] transition-colors font-light flex items-center"
                                    >
                                      {lead.instagramHandle}
                                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Business Type</p>
                                    <p className="text-white text-lg font-light capitalize">{lead.businessType}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Budget Range</p>
                                    <p className="text-white text-lg font-light">{lead.budget}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Services Section */}
                              <div className="mb-8">
                                <h4 className="text-lg font-normal text-[#9999ff] mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Services Interested In
                                </h4>
                                <div className="bg-black/40 p-6 rounded-xl border border-[#9999ff]/10">
                                  <div className="flex flex-wrap gap-3">
                                    {lead.services.map((service, idx) => (
                                      <span
                                        key={idx}
                                        className="px-4 py-2 bg-[#9999ff]/20 border border-[#9999ff]/40 rounded-full text-sm text-[#9999ff] font-light hover:shadow-[0_0_15px_rgba(153,153,255,0.4)] transition-all"
                                      >
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Goals Section */}
                              <div className="mb-6">
                                <h4 className="text-lg font-normal text-[#9999ff] mb-4 flex items-center">
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                  Biggest Goal
                                </h4>
                                <div className="bg-black/40 p-6 rounded-xl border border-[#9999ff]/10">
                                  <p className="text-white text-base font-light leading-relaxed">{lead.biggestGoal}</p>
                                </div>
                              </div>
                            </div>

                            {/* Footer with actions */}
                            <div className="bg-black/50 px-8 py-6 border-t border-[#9999ff]/20 flex justify-between items-center">
                              <div className="flex gap-3">
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="px-6 py-2.5 bg-[#9999ff]/20 border border-[#9999ff]/40 text-[#9999ff] rounded-full hover:bg-[#9999ff]/30 hover:shadow-[0_0_20px_rgba(153,153,255,0.4)] transition-all flex items-center gap-2 font-light"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Send Email
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="px-6 py-2.5 bg-[#9999ff]/20 border border-[#9999ff]/40 text-[#9999ff] rounded-full hover:bg-[#9999ff]/30 hover:shadow-[0_0_20px_rgba(153,153,255,0.4)] transition-all flex items-center gap-2 font-light"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  Call Now
                                </a>
                              </div>
                              <button
                                onClick={() => {
                                  const modal = document.getElementById(`modal-${lead._id}`);
                                  if (modal) (modal as HTMLDialogElement).close();
                                }}
                                className="px-8 py-2.5 bg-[#9999ff] text-white rounded-full hover:shadow-[0_0_25px_rgba(153,153,255,0.6)] transition-all font-light"
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
