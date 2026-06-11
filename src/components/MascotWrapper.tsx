"use client";
import React from "react";
import dynamic from "next/dynamic";

const FloatingMascot = dynamic(() => import("./FloatingMascot"), {
  ssr: false,
});

export default function MascotWrapper() {
  return <FloatingMascot />;
}
