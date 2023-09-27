-- CreateTable
CREATE TABLE "people-wanted" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "nickname" TEXT,
    "nationality" TEXT,
    "picture" TEXT,
    "birth" TEXT,
    "reward" TEXT,
    "infos" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people-wanted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "danger" TEXT,
    "peopleWantedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_peopleWantedId_fkey" FOREIGN KEY ("peopleWantedId") REFERENCES "people-wanted"("id") ON DELETE SET NULL ON UPDATE CASCADE;
