import React from "react";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveContainer({
  children,
  className = ""
}: ResponsiveContainerProps) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 2xl:px-10 ${className}`}>
      {children}
    </div>
  );
}
