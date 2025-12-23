"use client";

import React from "react";
import { FolderTree } from "./ui/folder-tree";

export default function HighLevelRepurposing() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black">
      <div className="w-full max-w-[1600px] mx-auto h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'var(--font-family-serif)' }}>
            High Level <span className="text-yellow-400">Repurposing</span>
            <span className="inline-block ml-2 align-middle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                <path d="M3 3L21 21M21 3L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl" style={{ fontFamily: 'var(--font-family-sans)' }}>
            We build bulletproof content flywheels for personal brands to grow on multiple platforms with high volume of content
          </p>
        </div>

        {/* Content Flow Visualization */}
        <div className="relative w-full max-w-4xl mx-auto">
          <FolderTree
            data={[
              {
                name: "Content Hub",
                type: "folder",
                icon: (
                  <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3" fill="white" viewBox="0 0 20 20">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                    </svg>
                  </div>
                ),
                children: [
                  {
                    name: "Short-Form Video",
                    type: "folder",
                    children: [
                      {
                        name: "TikTok Videos",
                        type: "file",
                        icon: (
                          <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                          </div>
                        ),
                      },
                      {
                        name: "Instagram Reels",
                        type: "file",
                        icon: (
                          <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                              <path d="M9 8l6 4-6 4V8z"/>
                            </svg>
                          </div>
                        ),
                      },
                      {
                        name: "YouTube Shorts",
                        type: "file",
                        icon: (
                          <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                              <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </div>
                        ),
                      },
                    ],
                  },
                  {
                    name: "Image Posts",
                    type: "folder",
                    children: [
                      {
                        name: "Instagram Carousels",
                        type: "file",
                        icon: (
                          <div className="w-5 h-5 bg-pink-600 rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06z"/>
                            </svg>
                          </div>
                        ),
                      },
                      {
                        name: "LinkedIn Posts",
                        type: "file",
                        icon: (
                          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                            </svg>
                          </div>
                        ),
                      },
                    ],
                  },
                ],
              },
            ]}
          />
          
          {/* Bottom text */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-family-sans)' }}>
              Your content organized and distributed across all platforms automatically
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
