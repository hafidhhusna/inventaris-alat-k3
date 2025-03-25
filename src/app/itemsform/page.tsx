"use client";

import React, { Suspense } from "react";
import ItemsFormContent from "@/components/ItemsFormContent";

export default function ItemsForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsFormContent />
    </Suspense>
  );
}
