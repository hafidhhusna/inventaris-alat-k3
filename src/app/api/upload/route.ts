import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📥 Received Data:", body); // Debugging input data

    let lokasiId = body.lokasi_id;
    let titikLokasiId = body.id_titik_lokasi;

    

    if (!body.nama_item || !body.nomor_ser || !body.lokasi_id || !body.id_titik_lokasi) {
      return NextResponse.json({ error: "Field tidak boleh kosong" }, { status: 400 });
    }

    if(body.lokasi_id === "new" && body.new_lokasi_name){
      const{data : existingLokasi} = await supabase
        .from("lokasi")
        .select("lokasi_id")
        .ilike("nama_lokasi", body.new_lokasi_name.trim())

      if(existingLokasi && existingLokasi.length > 0){
        lokasiId = existingLokasi[0].lokasi_id;
      } else {
        const {data : newLokasi, error : lokasiError} = await supabase
        .from("lokasi")
        .insert({nama_lokasi : body.new_lokasi_name.trim()})
        .select()
        .single();

        if(lokasiError){
          return NextResponse.json({error : lokasiError.message}, {status:500});
        }

        lokasiId = newLokasi.lokasi_id;
      }
    }

    if(body.id_titik_lokasi === "new" && body.new_titik_lokasi_name){
      const {data : existingTitikLokasi} = await supabase
        .from("titik_lokasi")
        .select("id_titik_lokasi")
        .ilike("nama_titik_lokasi", body.new_titik_lokasi_name.trim())
        .eq("lokasi_id", lokasiId);

      if(existingTitikLokasi && existingTitikLokasi.length > 0){
        titikLokasiId = existingTitikLokasi[0].id_titik_lokasi;
      } else {
        const{data: newTitikLokasiData, error: titikError} = await supabase
        .from("titik_lokasi")
        .insert({
          nama_titik_lokasi : body.new_titik_lokasi_name.trim(),
          lokasi_id : lokasiId,
        })
        .select()
        .single();

        if(titikError){
          return NextResponse.json({error : titikError.message}, {status: 500});
        }

        titikLokasiId = newTitikLokasiData.id_titik_lokasi;
      }
    }

    const session = await getServerSession(authOptions);

    if(!session){
      alert("Please Login First Before Uploading Item!");
      return NextResponse.json({error : "User is Not Logged In!"}, {status:401});
    }

    const uploadedBy = session.user.email;

    const { data, error } = await supabase.from("item").insert([
      {
        nama_item: body.nama_item,
        jenis_sarana: body.jenis_sarana,
        nomor_ser: body.nomor_ser,
        deskripsi: body.deskripsi,
        lokasi_id: lokasiId,
        id_titik_lokasi: titikLokasiId,
        spesifikasi: body.spesifikasi || "",
        tanggal_pembelian: body.tanggal_pembelian,
        pemasok: body.pemasok,
        PIC: body.PIC,
        gambar: body.gambar || null,
        status: body.status || "PENDING",
        status_pemasangan: body.status_pemasangan === "Terpasang",
        uploadedBy
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
