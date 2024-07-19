-- CreateTable
CREATE TABLE "Wedding" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watermark" BOOLEAN NOT NULL DEFAULT false,
    "theme" TEXT NOT NULL,
    "nicknameMale" TEXT NOT NULL,
    "nicknameFemale" TEXT NOT NULL,
    "fullnameMale" TEXT NOT NULL,
    "fullnameFemale" TEXT NOT NULL,
    "dadMale" TEXT NOT NULL,
    "momMale" TEXT NOT NULL,
    "dadFemale" TEXT NOT NULL,
    "momFemale" TEXT NOT NULL,
    "mainEventTime" TIMESTAMP(3) NOT NULL,
    "introductionType" INTEGER NOT NULL,
    "greetingType" INTEGER NOT NULL,
    "hookMiddleType" INTEGER NOT NULL,
    "storyType" INTEGER NOT NULL,
    "closingType" INTEGER NOT NULL,
    "songType" INTEGER NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "inviteId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "weddingId" INTEGER NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("inviteId")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
