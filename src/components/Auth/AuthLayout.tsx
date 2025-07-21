import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen w-full flex">
      <div className="m-auto">{children}</div>
    </div>
  );
}
