/*
  Warnings:

  - You are about to drop the column `lokasi` on the `inspeksi_APAP` table. All the data in the column will be lost.
  - The `karetban_roda_kereta` column on the `inspeksi_APAP` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lokasi` on the `inspeksi_detector` table. All the data in the column will be lost.
  - The `derajat_kebersihan` column on the `inspeksi_detector` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[nama_lokasi]` on the table `lokasi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_titik_lokasi]` on the table `titik_lokasi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- DropForeignKey
ALTER TABLE "inspeksi_APAP" DROP CONSTRAINT "inspeksi_APAP_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_detector" DROP CONSTRAINT "inspeksi_detector_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_hidran_bangunan" DROP CONSTRAINT "inspeksi_hidran_bangunan_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_hidran_halaman" DROP CONSTRAINT "inspeksi_hidran_halaman_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_kotak_p3k" DROP CONSTRAINT "inspeksi_kotak_p3k_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_ruang_mns" DROP CONSTRAINT "inspeksi_ruang_mns_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_rumah_pompa_hidran" DROP CONSTRAINT "inspeksi_rumah_pompa_hidran_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_sarana_jalan_keluar" DROP CONSTRAINT "inspeksi_sarana_jalan_keluar_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_scba" DROP CONSTRAINT "inspeksi_scba_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_spill_containment_room" DROP CONSTRAINT "inspeksi_spill_containment_room_id_item_fkey";

-- DropForeignKey
ALTER TABLE "inspeksi_sprinkler" DROP CONSTRAINT "inspeksi sprinkler_id_item_fkey";

-- AlterTable
ALTER TABLE "inspeksi_APAP" DROP COLUMN "lokasi",
DROP COLUMN "karetban_roda_kereta",
ADD COLUMN     "karetban_roda_kereta" BOOLEAN;

-- AlterTable
ALTER TABLE "inspeksi_detector" DROP COLUMN "lokasi",
DROP COLUMN "derajat_kebersihan",
ADD COLUMN     "derajat_kebersihan" BOOLEAN;

-- AlterTable
ALTER TABLE "inspeksi_sprinkler" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "ItemStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lokasi_nama_lokasi_key" ON "lokasi"("nama_lokasi");

-- CreateIndex
CREATE UNIQUE INDEX "titik_lokasi_nama_titik_lokasi_key" ON "titik_lokasi"("nama_titik_lokasi");

-- AddForeignKey
ALTER TABLE "inspeksi_sprinkler" ADD CONSTRAINT "inspeksi sprinkler_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_APAP" ADD CONSTRAINT "inspeksi_APAP_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_detector" ADD CONSTRAINT "inspeksi_detector_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_bangunan" ADD CONSTRAINT "inspeksi_hidran_bangunan_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_hidran_halaman" ADD CONSTRAINT "inspeksi_hidran_halaman_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_kotak_p3k" ADD CONSTRAINT "inspeksi_kotak_p3k_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_ruang_mns" ADD CONSTRAINT "inspeksi_ruang_mns_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_rumah_pompa_hidran" ADD CONSTRAINT "inspeksi_rumah_pompa_hidran_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_sarana_jalan_keluar" ADD CONSTRAINT "inspeksi_sarana_jalan_keluar_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_scba" ADD CONSTRAINT "inspeksi_scba_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inspeksi_spill_containment_room" ADD CONSTRAINT "inspeksi_spill_containment_room_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id_item") ON DELETE CASCADE ON UPDATE NO ACTION;
