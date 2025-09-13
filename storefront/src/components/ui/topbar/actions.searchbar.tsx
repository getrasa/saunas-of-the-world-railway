"use client";

import { useRef, useState } from "react";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const openIcon = () => {
    if (open) return;
    setOpen(true);
    inputRef.current?.focus();
  };

  const onBlur = () => {
    setInputFocused(false);
    if (value) return;
    setOpen(false);
  };

  const searchNow = () => {
    if (!value && !open) return;
    console.log("searching...");
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-2 border-[#4e4d4d] px-2 py-1 transition-all hover:border-b-2"
      onClick={openIcon}
      onBlur={onBlur}
      onFocus={() => setInputFocused(true)}
      style={{
        width: open ? 280 : 32,
        justifyContent: open ? "flex-end" : "center",
        gap: open ? undefined : 0,
        animationDuration: open && value ? "0s" : "0.5s",
        boxSizing: "border-box",
        ...(open
          ? {
              borderBottom: inputFocused ? "2px solid #4e4d4d" : "1px solid #4e4d4d",
            }
          : {}),
      }}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search"
        className="flex-1 border border-none text-[14px] font-medium text-[#4e4d4d] outline-none"
        style={{ width: open ? 240 : 0, opacity: open ? 100 : 0 }}
      />

      <div onClick={searchNow}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L15.8 15.8M18.1111 10.5556C18.1111 14.155 15.155 17.1111 11.5556 17.1111C7.95621 17.1111 5 14.155 5 10.5556C5 6.95621 7.95621 4 11.5556 4C15.155 4 18.1111 6.95621 18.1111 10.5556Z" stroke="#4e4d4d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  );
};


