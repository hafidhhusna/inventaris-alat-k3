"use client";

import React, { Suspense } from "react";
import ItemsFormContent from "@/components/ItemsFormContent";

type Props = {
  session: any;
}

export default function ItemsForm({session} : Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsFormContent />
    </Suspense>
  );
}
