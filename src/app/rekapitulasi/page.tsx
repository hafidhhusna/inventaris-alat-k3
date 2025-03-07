import RekapitulasiTable from "@/components/RekapitulasiTable";

export default function RekapitulasiPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Rekapitulasi Kesiapan Inspeksi</h1>
      <RekapitulasiTable />
    </main>
  );
}
