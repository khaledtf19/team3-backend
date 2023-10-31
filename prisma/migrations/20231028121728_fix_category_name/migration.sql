/*
  Warnings:

  - You are about to drop the column `courseId` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseId` on table `CourseStep` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseStepId` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStep" DROP CONSTRAINT "CourseStep_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_courseStepId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "courseId";
ALTER TABLE "Category" ADD COLUMN     "name" STRING NOT NULL;

-- AlterTable
ALTER TABLE "CourseStep" ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "name" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "courseStepId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");

-- AddForeignKey
ALTER TABLE "CourseStep" ADD CONSTRAINT "CourseStep_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
