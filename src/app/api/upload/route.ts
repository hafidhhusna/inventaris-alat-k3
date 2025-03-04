import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📥 Received Data:", body); // Debugging input data

    if (!body.nama_item || !body.nomor_ser || !body.lokasi_id || !body.id_titik_lokasi) {
      return NextResponse.json({ error: "Field tidak boleh kosong" }, { status: 400 });
    }

    const { data, error } = await supabase.from("item").insert([
      {
        nama_item: body.nama_item,
        jenis_sarana: body.jenis_sarana,
        nomor_ser: body.nomor_ser,
        lokasi_id: body.lokasi_id,
        id_titik_lokasi: body.id_titik_lokasi,
        spesifikasi: body.spesifikasi || "",
        tanggal_pembelian: body.tanggal_pembelian,
        pemasok: body.pemasok,
        PIC: body.PIC,
        gambar: body.gambar || null,
        status_pemasangan: body.status_pemasangan === "Terpasang",
      },
    ]);

    console.log("🗄️ Database Response:", data, error); // Debugging Supabase response

    if (error) {
      console.error("❌ Error saving to database:", error);
      return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Item berhasil disimpan!", data }, { status: 201 });

  } catch (err) {
    console.error("🔥 Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
