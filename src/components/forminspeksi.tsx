import { useState } from "react";

interface InspectionFormProps {
  fields: string[];
  onSubmit: (data: InspectionData) => void;
}

interface InspectionData {
  checklist: Record<string, boolean>;
  inspeksi_oleh: string;
  dokumentasi: File | null;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, boolean>>(
    fields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
  );
  const [inspector, setInspector] = useState<string>("");
  const [dokumentasi, setDokumentasi] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ checklist: formData, inspeksi_oleh: inspector, dokumentasi });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Form Inspeksi</h2>

      {fields.map((field) => (
        <div key={field} className="mb-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field}
              checked={formData[field]}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>{field.replace(/_/g, " ")}</span>
          </label>
        </div>
      ))}

      <input
        type="text"
        placeholder="Nama Pemeriksa"
        value={inspector}
        onChange={(e) => setInspector(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="file"
        onChange={(e) => setDokumentasi(e.target.files?.[0] || null)}
        className="w-full p-2 border rounded mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Simpan Inspeksi
      </button>
    </form>
  );
};

export default InspectionForm;
