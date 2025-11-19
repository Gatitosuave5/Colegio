"use client";

import React, { HTMLAttributes } from "react";

// 👇 Permitimos todas las props de un <div>
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export function Card({
  children,
  className = "",
  style = {},
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${className}`}
      style={style}
      {...props}   // 👈 Ahora acepta onClick y cualquier otra prop
    >
      {children}
    </div>
  );
}

// ============================
// 🟦 SUBCOMPONENTES
// ============================

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`border-b pb-2 mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
}
