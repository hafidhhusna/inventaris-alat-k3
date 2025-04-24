"use client";

import React, { Suspense } from "react";
import InspectionDetailsContent from "@/components/InspectionDetailsContent";

type Props = {
  session: any;
}

export default function InspectionDetails({session} : Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InspectionDetailsContent />
    </Suspense>
  );
}
