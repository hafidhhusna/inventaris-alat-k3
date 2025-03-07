import { NextResponse } from "next/server";
import {prisma} from "@/lib/db"; 

export async function GET() {
  try {
    const lokasiData = await prisma.lokasi.findMany({
      include: {
        item: {
          include: {
            inspeksi_sprinkler: { select: { kondisi_internal_pipa: true } },
            inspeksi_APAP: { select: { visibilitas: true } },
            inspeksi_detector: { select: { lokasi: true } },
            inspeksi_hidran_bangunan: { select: { tanda_informasi_desain_hidraulik: true } },
            inspeksi_hidran_halaman: { select: { kemudahan_akses: true } },
            inspeksi_kotak_p3k: { select: { perban: true } },
            inspeksi_ruang_mns: { select: { antena: true } },
            inspeksi_rumah_pompa_hidran: { select: { pencahayaan_normal: true } },
            inspeksi_sarana_jalan_keluar: { select: { eksit: true } },
            inspeksi_scba: { select: { facepiece: true } },
            inspeksi_spill_containment_room: { select: { fasilitas: true } },
          },
        },
      },
    });

    // Rekapitulasi berdasarkan lokasi
    const rekapitulasi = lokasiData.map((lokasi) => {
      const totalItems = lokasi.item.length;
      const readyItems = lokasi.item.filter((item) => checkStatus(item) === "READY").length;
      const persentaseReady = totalItems > 0 ? (readyItems / totalItems) * 100 : 0;

      return {
        lokasi: lokasi.nama_lokasi,
        total_items: totalItems,
        ready_items: readyItems,
        persentase_ready: `${persentaseReady.toFixed(2)}%`,
      };
    });

    return NextResponse.json({ data: rekapitulasi });
  } catch (error) {
    console.error("Error fetching rekapitulasi lokasi:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

// Fungsi untuk menentukan status inspeksi tiap item
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkStatus = (item: any) => {
  const inspeksiList = [
    item.inspeksi_sprinkler,
    item.inspeksi_APAP,
    item.inspeksi_detector,
    item.inspeksi_hidran_bangunan,
    item.inspeksi_hidran_halaman,
    item.inspeksi_kotak_p3k,
    item.inspeksi_ruang_mns,
    item.inspeksi_rumah_pompa_hidran,
    item.inspeksi_sarana_jalan_keluar,
    item.inspeksi_scba,
    item.inspeksi_spill_containment_room,
  ].flat();

  if (!inspeksiList.length) return "TIDAK ADA DATA";

  return inspeksiList.some((inspeksi) => Object.values(inspeksi).includes(false))
    ? "TINJAU LEBIH LANJUT"
    : "READY";
};
