-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_student_id_key" ON "User"("student_id");
