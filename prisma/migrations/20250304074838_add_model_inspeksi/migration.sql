-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PELAKSANA', 'STAFF');

-- CreateEnum
CREATE TYPE "StatusInspeksi" AS ENUM ('BELUM_DIINSPEKSI', 'READY', 'TINJAU_LEBIH_LANJUT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Inspeksi" (
    "id" SERIAL NOT NULL,
    "id_item" INTEGER NOT NULL,
    "jenis_inspeksi" VARCHAR NOT NULL,
    "tanggal_inspeksi" TIMESTAMP(3) NOT NULL,
    "checklist" JSONB NOT NULL,
    "status" "StatusInspeksi" NOT NULL DEFAULT 'BELUM_DIINSPEKSI',
    "dokumentasi" TEXT,
    "inspeksi_oleh" TEXT,

    CONSTRAINT "Inspeksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspeksi sprinkler" (
    "id_inspeksi" SERIAL NOT NULL,
    "kondisi_internal_pipa" BOOLEAN NOT NULL,
    "katup_kontrol" BOOLEAN NOT NULL,
    "koneksi_pemadam_kebakaran" BOOLEAN NOT NULL,
    "penyangga" BOOLEAN NOT NULL,
    "kepala_sprinkler" BOOLEAN NOT NULL,
    "sprinkler_cadangan" BOOLEAN NOT NULL,
    "perangkat_pengawasan_katup" BOOLEAN NOT NULL,
    "perangkat_alarm_aliran_air" BOOLEAN NOT NULL,
    "catatan" VARCHAR,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi sprinkler_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_APAP" (
    "lokasi" VARCHAR,
    "visibilitas" BOOLEAN,
    "kemudahan_akses" BOOLEAN,
    "tekanan" BOOLEAN,
    "kepenuhan_isi" BOOLEAN,
    "segel_pengaman" BOOLEAN,
    "selang_dan_nozel" BOOLEAN,
    "abnormalitas_fisik" BOOLEAN,
    "karetban_roda_kereta" VARCHAR,
    "id_inspeksi" SERIAL NOT NULL,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_APAP_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_detector" (
    "id_inspeksi" SERIAL NOT NULL,
    "lokasi" BOOLEAN,
    "penghalang_detektor" BOOLEAN,
    "kerusakan_fisik" BOOLEAN,
    "derajat_kebersihan" VARCHAR,
    "audible_dan_visible" BOOLEAN,
    "lampu" BOOLEAN,
    "power_supply" BOOLEAN,
    "prosedur_manufaktur" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_detector_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_hidran_bangunan" (
    "id_inspeksi" SERIAL NOT NULL,
    "tanda_informasi_desain_hidraulik" BOOLEAN,
    "koneksi_selang" BOOLEAN,
    "perpipaan" BOOLEAN,
    "selang" BOOLEAN,
    "nozel" BOOLEAN,
    "perangkat_penyimpan_selang" BOOLEAN,
    "kabinet_penyimpanan" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_hidran_bangunan_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_hidran_halaman" (
    "id_inspeksi" SERIAL NOT NULL,
    "kemudahan_akses" BOOLEAN,
    "outlet_bagian_atas_hidran_pilar" BOOLEAN,
    "batang_pilar" BOOLEAN,
    "outlet" BOOLEAN,
    "nozel" BOOLEAN,
    "mur_pengoperasian" BOOLEAN,
    "ketersediaan_kunci_hidran" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_hidran_halaman_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_kotak_p3k" (
    "id_inspeksi" SERIAL NOT NULL,
    "perban" BOOLEAN,
    "plester" BOOLEAN,
    "kapas" BOOLEAN,
    "gunting_peniti_pinset" BOOLEAN,
    "sarung_tangan_masker" BOOLEAN,
    "gelas_kecil" BOOLEAN,
    "aquades" BOOLEAN,
    "povidon_iodin" BOOLEAN,
    "kantong_plastik" BOOLEAN,
    "buku_panduan_daftar_isi" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_kotak_p3k_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_ruang_mns" (
    "id_inspeksi" SERIAL NOT NULL,
    "antena" BOOLEAN,
    "transceiver" BOOLEAN,
    "backup" BOOLEAN,
    "ventilasi" BOOLEAN,
    "penyampai_visual" BOOLEAN,
    "monitoring_personel" BOOLEAN,
    "audibilitas" BOOLEAN,
    "peralatan_notifikasi" BOOLEAN,
    "aktivasi_notifikasi_massal" BOOLEAN,
    "penyediaan_alat" BOOLEAN,
    "kapabilitas_komunikasi" BOOLEAN,
    "daya_sekunder" BOOLEAN,
    "ketersediaan_alat_komunikasi" BOOLEAN,
    "pemantauan_alat_komunikasi" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_ruang_mns_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_rumah_pompa_hidran" (
    "id_inspeksi" SERIAL NOT NULL,
    "pencahayaan_normal" BOOLEAN,
    "pencahayaan_darurat" BOOLEAN,
    "ventilasi" BOOLEAN,
    "sistem_drainase" BOOLEAN,
    "pagar_pelindung_penggerak" BOOLEAN,
    "sistem_pompa" BOOLEAN,
    "daya_listrik_pompa" BOOLEAN,
    "motor_penggerak" BOOLEAN,
    "baterai" BOOLEAN,
    "penyediaan_bahan_bakar" BOOLEAN,
    "buku_petunjuk_perkakas_khusus_sparepart" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_rumah_pompa_hidran_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_sarana_jalan_keluar" (
    "id_inspeksi" SERIAL NOT NULL,
    "eksit" BOOLEAN,
    "eksit_pelepasan" BOOLEAN,
    "iluminasi" BOOLEAN,
    "pencahayaan_darurat" BOOLEAN,
    "penandaan" BOOLEAN,
    "tangga_kebakaran" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_sarana_jalan_keluar_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_scba" (
    "id_inspeksi" SERIAL NOT NULL,
    "facepiece" BOOLEAN,
    "rangka_rakitan_harness" BOOLEAN,
    "silinder_tabung" BOOLEAN,
    "selang" BOOLEAN,
    "EOSTI" BOOLEAN,
    "regulator" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_scba_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "inspeksi_spill_containment_room" (
    "id_inspeksi" SERIAL NOT NULL,
    "fasilitas" BOOLEAN,
    "sistem_keamanan" BOOLEAN,
    "sistem_pencegahan_kebakaran" BOOLEAN,
    "sistem_pencegahan_tumpahan_limbah" BOOLEAN,
    "sistem_penanggulangan_keadaan_darurat" BOOLEAN,
    "id_item" INTEGER,

    CONSTRAINT "inspeksi_spill_containment_room_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "item" (
    "id_item" SERIAL NOT NULL,
    "lokasi_id" SERIAL NOT NULL,
    "jenis_sarana" VARCHAR,
    "nama_item" VARCHAR,
    "nomor_ser" VARCHAR,
    "lokasi" VARCHAR,
    "titik_lokasi" VARCHAR,
    "spesifikasi" VARCHAR,
    "tanggal_pembelian" DATE,
    "pemasok" VARCHAR,
    "PIC" VARCHAR,
    "gambar" TEXT,
    "status_pemasangan" BOOLEAN,
    "id_titik_lokasi" SERIAL NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "lokasi" (
    "lokasi_id" SERIAL NOT NULL,
    "nama lokasi" VARCHAR,

    CONSTRAINT "lokasi_pkey" PRIMARY KEY ("lokasi_id")
);

-- CreateTable
CREATE TABLE "rekapitulasi_bulanan" (
    "rekap_bulanan_id" SERIAL NOT NULL,
    "bulan" VARCHAR,
    "tanggal" TIMESTAMP(3),
    "id_item" SERIAL NOT NULL,
    "foto" TEXT,

    CONSTRAINT "rekapitulasi_bulanan_pkey" PRIMARY KEY ("rekap_bulanan_id")
);

-- CreateTable
CREATE TABLE "rekapitulasi_mingguan" (
    "rekap_mingguan_id" SERIAL NOT NULL,
    "minggu_ke" INTEGER,
    "tanggal" TIMESTAMP(3),
    "id_item" SERIAL NOT NULL,
    "foto" TEXT,

    CONSTRAINT "rekapitulasi_mingguan_pkey" PRIMARY KEY ("rekap_mingguan_id")
);

-- CreateTable
CREATE TABLE "titik lokasi" (
    "id_titik_lokasi" SERIAL NOT NULL,
    "lokasi_id" SERIAL NOT NULL,
    "nama_titik_lokasi" VARCHAR,

    CONSTRAINT "titik lokasi_pkey" PRIMARY KEY ("id_titik_lokasi")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspeksi" ADD CONSTRAINT "Inspeksi_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspeksi sprinkler" ADD CONSTRAINT "inspeksi sprinkler_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_APAP" ADD CONSTRAINT "inspeksi_APAP_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_detector" ADD CONSTRAINT "inspeksi_detector_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_bangunan" ADD CONSTRAINT "inspeksi_hidran_bangunan_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_halaman" ADD CONSTRAINT "inspeksi_hidran_halaman_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_kotak_p3k" ADD CONSTRAINT "inspeksi_kotak_p3k_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_ruang_mns" ADD CONSTRAINT "inspeksi_ruang_mns_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_rumah_pompa_hidran" ADD CONSTRAINT "inspeksi_rumah_pompa_hidran_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sarana_jalan_keluar" ADD CONSTRAINT "inspeksi_sarana_jalan_keluar_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_scba" ADD CONSTRAINT "inspeksi_scba_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_spill_containment_room" ADD CONSTRAINT "inspeksi_spill_containment_room_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rekapitulasi_bulanan" ADD CONSTRAINT "rekapitulasi_bulanan_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rekapitulasi_mingguan" ADD CONSTRAINT "rekapitulasi_mingguan_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "titik lokasi" ADD CONSTRAINT "titik lokasi_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
