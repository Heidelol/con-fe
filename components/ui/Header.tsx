import React from "react";

interface HeaderProps {
  greeting?: string;
  showWordmark?: boolean;
  className?: string;
}

export function Header({
  greeting = "Buenos días",
  showWordmark = true,
  className = "",
}: HeaderProps) {
  return (
    <header
      className={`w-full px-6 pt-7 pb-3 flex items-center justify-between ${className}`}
    >
      {showWordmark ? (
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-[22px] tracking-[-0.02em] font-medium text-[#1F3443] select-none">
            con fe
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#D3B58A] opacity-85 translate-y-[2px]"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div />
      )}

      {greeting && (
        <span className="font-sans text-[13px] tracking-normal text-[#6F8796] select-none">
          {greeting}
        </span>
      )}
    </header>
  );
}
