import { useRouter } from "next/router";
import InspectionForm from "@/components/forminspeksi";

const INSPEKSI_FIELDS: Record<string, string[]> = {
  sprinkler: [
    "kondisi_internal_pipa",
    "katup_kontrol",
    "koneksi_pemadam_kebakaran",
    "penyangga",
    "kepala_sprinkler",
    "sprinkler_cadangan",
    "perangkat_pengawasan_katup",
    "perangkat_alarm_aliran_air"
  ],
  detector: [
    "lokasi",
    "penghalang_detektor",
    "kerusakan_fisik",
    "derajat_kebersihan",
    "audible_dan_visible",
    "lampu",
    "power_supply",
    "prosedur_manufaktur"
  ]
};

const InspeksiPage = () => {
  const router = useRouter();
  const jenisInspeksi = router.query.jenis as keyof typeof INSPEKSI_FIELDS;
  const fields = INSPEKSI_FIELDS[jenisInspeksi] || [];

  const handleSubmit = async (data: any) => {
    console.log("Data Inspeksi:", data);

    const formData = new FormData();
    formData.append("inspeksi_oleh", data.inspeksi_oleh);
    if (data.dokumentasi) formData.append("dokumentasi", data.dokumentasi);
    formData.append("checklist", JSON.stringify(data.checklist));

    await fetch("/api/inspeksi", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    alert("Inspeksi berhasil disimpan!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inspeksi {jenisInspeksi.toUpperCase()}</h1>
      {fields.length > 0 ? (
        <InspectionForm fields={fields} onSubmit={handleSubmit} />
      ) : (
        <p className="text-red-500">Jenis inspeksi tidak ditemukan.</p>
      )}
    </div>
  );
};

export default InspeksiPage;
