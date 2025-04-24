import RekapitulasiTable from "@/components/RekapitulasiTable";

type Props = {
  session: any;
}

export default function RekapitulasiPage({session} : Props) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Rekapitulasi Kesiapan Inspeksi</h1>
      <RekapitulasiTable />
    </main>
  );
}
