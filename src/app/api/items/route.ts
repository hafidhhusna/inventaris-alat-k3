import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { id_item: "asc" },
    });

    console.log(items)
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
