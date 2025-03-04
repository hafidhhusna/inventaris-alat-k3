import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { checklist, inspeksi_oleh, dokumentasi } = req.body;
      const status = Object.values(checklist).includes(false) ? "TINJAU_LANJUT" : "READY";

      const inspeksi = await prisma.inspeksi.create({
        data: {
          tanggal_inspeksi: new Date(),
          checklist,
          inspeksi_oleh,
          dokumentasi,
          status
        }
      });

      return res.status(200).json({ success: true, data: inspeksi });
    } catch (error) {
      return res.status(500).json({ success: false, message: (error as Error).message });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
