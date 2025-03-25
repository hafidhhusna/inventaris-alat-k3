"use client";

import React, { Suspense } from "react";
import InspectionDetailsContent from "@/components/InspectionDetailsContent";

export default function ItemsForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InspectionDetailsContent />
    </Suspense>
  );
}
