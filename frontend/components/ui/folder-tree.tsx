"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from "lucide-react";

interface TreeNode {
  name: string;
  type: "folder" | "file";
  icon?: React.ReactNode;
  children?: TreeNode[];
}

interface FolderTreeProps {
  data: TreeNode[];
}

const TreeItem: React.FC<{ node: TreeNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all group ${
          depth === 0 ? "mb-1" : ""
        }`}
        style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="text-gray-400 group-hover:text-[#9999ff] transition-colors">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4" />}
        
        <span className="text-gray-400 group-hover:text-[#9999ff] transition-colors">
          {node.icon ? (
            node.icon
          ) : node.type === "folder" ? (
            isOpen ? (
              <FolderOpen className="w-5 h-5" />
            ) : (
              <Folder className="w-5 h-5" />
            )
          ) : (
            <FileText className="w-4 h-4" />
          )}
        </span>
        
        <span className="text-white font-medium group-hover:text-[#9999ff] transition-colors">
          {node.name}
        </span>
      </div>
      
      {hasChildren && isOpen && (
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-700/50" style={{ left: `${depth * 1.5 + 1.5}rem` }} />
          {node.children?.map((child, index) => (
            <TreeItem key={index} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FolderTree: React.FC<FolderTreeProps> = ({ data }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 font-mono text-sm">
      {data.map((node, index) => (
        <TreeItem key={index} node={node} depth={0} />
      ))}
    </div>
  );
};
