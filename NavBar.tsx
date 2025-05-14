import React from "react";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur border-b border-zinc-900 flex items-center justify-between px-6 py-3 mb-1">
      <div className="flex items-center gap-6">
        <span className="text-red-600 text-3xl font-black tracking-tight">NETFLIX</span>
        <a href="#" className="text-white hover:text-red-500 font-medium">Home</a>
        <a href="#" className="text-white hover:text-red-500 font-medium">TV Shows</a>
        <a href="#" className="text-white hover:text-red-500 font-medium">Movies</a>
        <a href="#" className="text-white hover:text-red-500 font-medium">My List</a>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="rounded bg-zinc-800 text-white px-3 py-1 text-sm focus:outline-none placeholder-zinc-400 border border-zinc-700"
        />
      </div>
    </nav>
  );
}
