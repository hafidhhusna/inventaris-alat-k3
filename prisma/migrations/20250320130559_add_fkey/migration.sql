/*
  Warnings:

  - You are about to drop the column `nama lokasi` on the `lokasi` table. All the data in the column will be lost.
  - You are about to drop the `Inspeksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inspeksi sprinkler` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `titik lokasi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_titik_lokasi` to the `inspeksi_APAP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_APAP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_detector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_detector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_hidran_bangunan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_hidran_bangunan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_hidran_halaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_hidran_halaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_kotak_p3k` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_kotak_p3k` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_ruang_mns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_ruang_mns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_rumah_pompa_hidran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_rumah_pompa_hidran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_sarana_jalan_keluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_sarana_jalan_keluar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_scba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_scba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_titik_lokasi` to the `inspeksi_spill_containment_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_id` to the `inspeksi_spill_containment_room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inspeksi" DROP CONSTRAINT "Inspeksi_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi sprinkler" DROP CONSTRAINT "inspeksi sprinkler_id_item_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_id_titik_lokasi_fkey";

-- DropForeignKey
ALTER TABLE "titik lokasi" DROP CONSTRAINT "titik lokasi_lokasi_id_fkey";

-- AlterTable
ALTER TABLE "inspeksi_APAP" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_detector" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_hidran_bangunan" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_hidran_halaman" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_kotak_p3k" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_ruang_mns" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_rumah_pompa_hidran" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_sarana_jalan_keluar" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_scba" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inspeksi_spill_containment_room" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar" TEXT,
ADD COLUMN     "id_titik_lokasi" INTEGER NOT NULL,
ADD COLUMN     "lokasi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "deskripsi" VARCHAR;

-- AlterTable
ALTER TABLE "lokasi" DROP COLUMN "nama lokasi",
ADD COLUMN     "nama_lokasi" VARCHAR;

-- DropTable
DROP TABLE "Inspeksi";

-- DropTable
DROP TABLE "inspeksi sprinkler";

-- DropTable
DROP TABLE "titik lokasi";

-- DropEnum
DROP TYPE "StatusInspeksi";

-- CreateTable
CREATE TABLE "inspeksi_sprinkler" (
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
    "gambar" TEXT,
    "lokasi_id" INTEGER NOT NULL,
    "id_titik_lokasi" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,

    CONSTRAINT "inspeksi sprinkler_pkey" PRIMARY KEY ("id_inspeksi")
);

-- CreateTable
CREATE TABLE "titik_lokasi" (
    "id_titik_lokasi" SERIAL NOT NULL,
    "lokasi_id" SERIAL NOT NULL,
    "nama_titik_lokasi" VARCHAR,

    CONSTRAINT "titik lokasi_pkey" PRIMARY KEY ("id_titik_lokasi")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sprinkler" ADD CONSTRAINT "inspeksi sprinkler_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sprinkler" ADD CONSTRAINT "inspeksi_sprinkler_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sprinkler" ADD CONSTRAINT "inspeksi_sprinkler_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_APAP" ADD CONSTRAINT "inspeksi_APAP_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_APAP" ADD CONSTRAINT "inspeksi_APAP_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_detector" ADD CONSTRAINT "inspeksi_detector_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_detector" ADD CONSTRAINT "inspeksi_detector_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_bangunan" ADD CONSTRAINT "inspeksi_hidran_bangunan_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_bangunan" ADD CONSTRAINT "inspeksi_hidran_bangunan_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_halaman" ADD CONSTRAINT "inspeksi_hidran_halaman_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_halaman" ADD CONSTRAINT "inspeksi_hidran_halaman_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_kotak_p3k" ADD CONSTRAINT "inspeksi_kotak_p3k_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_kotak_p3k" ADD CONSTRAINT "inspeksi_kotak_p3k_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_ruang_mns" ADD CONSTRAINT "inspeksi_ruang_mns_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_ruang_mns" ADD CONSTRAINT "inspeksi_ruang_mns_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_rumah_pompa_hidran" ADD CONSTRAINT "inspeksi_rumah_pompa_hidran_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_rumah_pompa_hidran" ADD CONSTRAINT "inspeksi_rumah_pompa_hidran_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sarana_jalan_keluar" ADD CONSTRAINT "inspeksi_sarana_jalan_keluar_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sarana_jalan_keluar" ADD CONSTRAINT "inspeksi_sarana_jalan_keluar_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_scba" ADD CONSTRAINT "inspeksi_scba_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_scba" ADD CONSTRAINT "inspeksi_scba_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_spill_containment_room" ADD CONSTRAINT "inspeksi_spill_containment_room_id_titik_lokasi_fkey" FOREIGN KEY ("id_titik_lokasi") REFERENCES "titik_lokasi"("id_titik_lokasi") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_spill_containment_room" ADD CONSTRAINT "inspeksi_spill_containment_room_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "titik_lokasi" ADD CONSTRAINT "titik lokasi_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "lokasi"("lokasi_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
