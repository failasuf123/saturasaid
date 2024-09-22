-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wedding" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watermark" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT NOT NULL,
    "nicknameMale" TEXT NOT NULL,
    "nicknameFemale" TEXT NOT NULL,
    "fullnameMale" TEXT NOT NULL,
    "fullnameFemale" TEXT NOT NULL,
    "dadMale" TEXT NOT NULL,
    "momMale" TEXT NOT NULL,
    "dadFemale" TEXT NOT NULL,
    "momFemale" TEXT NOT NULL,
    "accountName1" TEXT,
    "accountBank1" TEXT,
    "accountNumber1" TEXT,
    "accountName2" TEXT,
    "accountBank2" TEXT,
    "accountNumber2" TEXT,
    "event" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gmap" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "event2" TEXT,
    "address2" TEXT,
    "gmap2" TEXT,
    "time2" TIMESTAMP(3),
    "isEvent2" BOOLEAN NOT NULL DEFAULT true,
    "introductionType" INTEGER NOT NULL,
    "greetingType" INTEGER NOT NULL,
    "hookMiddleType" INTEGER NOT NULL,
    "storyType" INTEGER NOT NULL,
    "closingType" INTEGER NOT NULL,
    "songType" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "inviteId" SERIAL NOT NULL,
    "number" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "check" BOOLEAN NOT NULL DEFAULT false,
    "nickmale" TEXT NOT NULL,
    "nickfemale" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("inviteId")
);

-- CreateTable
CREATE TABLE "Confirmation" (
    "confirmationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Confirmation_pkey" PRIMARY KEY ("confirmationId")
);

-- CreateTable
CREATE TABLE "Expression" (
    "expressionId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Expression_pkey" PRIMARY KEY ("expressionId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkid_key" ON "User"("clerkid");

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expression" ADD CONSTRAINT "Expression_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
