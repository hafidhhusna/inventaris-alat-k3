import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/db"; 

// Fungsi untuk menentukan status inspeksi tiap item
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkStatus = (item: any) => {
  const inspeksiList = [
    ...item.inspeksi_sprinkler,
    ...item.inspeksi_APAP,
    ...item.inspeksi_detector,
    ...item.inspeksi_hidran_bangunan,
    ...item.inspeksi_hidran_halaman,
    ...item.inspeksi_kotak_p3k,
    ...item.inspeksi_ruang_mns,
    ...item.inspeksi_rumah_pompa_hidran,
    ...item.inspeksi_sarana_jalan_keluar,
    ...item.inspeksi_scba,
    ...item.inspeksi_spill_containment_room,
  ]

  console.log("Item inspeksi : ", inspeksiList);

  for(const inspeksi of inspeksiList){
    if(Object.values(inspeksi).some((value) => value !== true)){
      return "TINJAU LEBIH LANJUT"
    }
  }


  if (!inspeksiList.length){
    console.log("Status : TIDAK ADA DATA")
    return "TIDAK ADA DATA";
  } 

  return "READY";
};

export async function GET(req : NextRequest) {
  const {searchParams} = new URL(req.url);
  const bulan = parseInt(searchParams.get("bulan") || "");
  const tahun = parseInt(searchParams.get("tahun") || "");

  if(!bulan || !tahun){
    console.log("Bulan dan tahun wajib diisi")
    return NextResponse.json({error: "Bulan dan tahun wajib diisi"}, {status: 400});
  }

  const awalBulan = new Date(tahun, bulan - 1, 1);
  const akhirBulan = new Date(tahun, bulan, 0, 23, 59, 59);

  try {
    const lokasiData = await prisma.lokasi.findMany({
      include: {
        item: {
          include: {
            inspeksi_sprinkler: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                kondisi_internal_pipa: true,
                katup_kontrol: true,
                koneksi_pemadam_kebakaran: true,
                penyangga: true,
                tanda_informasi_desain_hidrolik: true,
                tanda_informasi: true,
                pipa_dan_perlengkapan: true,
                sprinkler_cadangan: true,
              }
            },
            inspeksi_APAP: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                lokasi: true,
                visibilitas: true,
                kemudahan_akses: true,
                tekanan: true,
                kepenuhan_isi: true,
                segel_pengaman: true,
                selang_dan_nozel: true,
                abnormalitas_fisik: true,
                karetban_roda_kereta: true,
              }
            },
            inspeksi_detector: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                lokasi: true,
                penghalang_detektor: true,
                kerusakan_fisik: true,
                derajat_kebersihan: true,
                audible_dan_visible: true,
                lampu: true,
                power_supply: true,
                prosedur_manufaktur: true
              }
            },
            inspeksi_hidran_bangunan: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                tanda_informasi_desain_hidraulik: true,
                koneksi_selang: true,
                perpipaan: true,
                selang: true,
                nozel: true,
                perangkat_penyimpan_selang: true,
                kabinet_penyimpanan: true
              }
            },
            inspeksi_hidran_halaman: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                kemudahan_akses: true,
                outlet_bagian_atas_hidran_pilar: true,
                batang_pilar: true,
                outlet: true,
                nozel: true,
                mur_pengoperasian: true,
                ketersediaan_kunci_hidran: true
              }
            },
            inspeksi_kotak_p3k: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                kasa_steril_terbungkus: true,
                perban: true,
                plester: true,
                kapas: true,
                gunting_peniti_pinset: true,
                sarung_tangan_masker: true,
                gelas_kecil: true,
                aquades: true,
                povidon_iodin: true,
                kantong_plastik: true,
                buku_panduan_daftar_isi: true
              }
            },
            inspeksi_ruang_mns: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                antena: true,
                transceiver: true,
                backup: true,
                ventilasi: true,
                penyampai_visual: true,
                monitoring_personel: true,
                audibilitas: true,
                peralatan_notifikasi: true,
                aktivasi_notifikasi_massal: true,
                penyediaan_alat: true,
                kapabilitas_komunikasi: true,
                daya_sekunder: true,
                ketersediaan_alat_komunikasi: true,
                konektivitas_komunikasi: true,
                daya_cadangan: true
              }
            },
            inspeksi_rumah_pompa_hidran: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                pencahayaan_normal: true,
                pencahayaan_darurat: true,
                ventilasi: true,
                sistem_drainase: true,
                pagar_pelindung_penggerak: true,
                sistem_pompa: true,
                daya_listrik_pompa: true,
                motor_penggerak: true,
                baterai: true,
                penyediaan_bahan_bakar: true,
                buku_petunjuk_perkakas_khusus_sparepart: true
              }
            },
            inspeksi_sarana_jalan_keluar: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                eksit: true,
                eksit_pelepasan: true,
                pintu_eksit: true,
                iluminasi: true,
                pencahayaan_darurat: true,
                penandaan: true,
                tangga_kebakaran: true
              }
            },
            inspeksi_scba: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                facepiece: true,
                rangka_rakitan_harness: true,
                silinder_tabung: true,
                selang: true,
                EOSTI: true,
                regulator: true
              }
            },
            inspeksi_spill_containment_room: {
              where: { createdAt: { gte: awalBulan, lte: akhirBulan } },
              select: {
                fasilitas: true,
                sistem_keamanan: true,
                sistem_pencegahan_kebakaran: true,
                sistem_pencegahan_tumpahan_limbah: true,
                sistem_penanggulangan_keadaan_darurat: true
              }
            },
          }
        }
      }
    });

    
    console.log("lokasi data : ", JSON.stringify(lokasiData, null, 2))
    console.log("data lokasi dari prisma : ", lokasiData);

    // Rekapitulasi berdasarkan lokasi
    const rekapitulasi = lokasiData.map((lokasi) => {
      const totalItems = lokasi.item.length;
      let readyCount = 0;
      let tinjauCount = 0;
      let emptyCount = 0;
      let validItems = 0;

      lokasi.item.forEach((item) => {
        const status = checkStatus(item);

        if (status === "READY") {
          readyCount++;
          validItems++;
        } else if (status === "TIDAK ADA DATA") {
          emptyCount++;
          validItems++;
        } else if(status === "TINJAU LEBIH LANJUT"){
          tinjauCount++;
          validItems++;
        }
        // NOT READY tidak dihitung ke validItems
      });

      const persentaseReady = validItems > 0 ? (readyCount / validItems) * 100 : 0;

      return {
        lokasi: lokasi.nama_lokasi,
        total_items: totalItems,
        ready_items: readyCount,
        tinjau_items: tinjauCount,
        valid_items: validItems,
        persentase_ready: `${persentaseReady.toFixed(2)}%`,
      };
    });

    console.log("rekapitulasi yang dikirim ke FE : ", rekapitulasi);

    return NextResponse.json({ data: rekapitulasi });
  } catch (error) {
    console.error("Error fetching rekapitulasi lokasi:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
