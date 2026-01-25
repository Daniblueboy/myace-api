-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('LAND', 'APARTMENT');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AVAILABLE', 'SOLD', 'UPCOMING');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('GENERAL', 'PROPERTY_ENQUIRY');

-- CreateEnum
CREATE TYPE "PromoPlacement" AS ENUM ('HERO_BANNER', 'TOP_STRIP', 'POPUP', 'SECTION_CARD');

-- CreateEnum
CREATE TYPE "ComplianceType" AS ENUM ('CAC_REGISTRATION', 'GOVT_CERTIFICATE', 'LEGAL_DOCUMENT', 'AWARD', 'OTHER');

-- CreateEnum
CREATE TYPE "PartnerCategory" AS ENUM ('CLIENT', 'PARTNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "themePreference" TEXT NOT NULL DEFAULT 'light',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "price" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "size" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "mapEmbedUrl" TEXT,
    "panoramaUrl" TEXT,
    "videoUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyFAQ" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyResource" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeLocation" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phones" TEXT[],
    "emails" TEXT[],
    "openingHours" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "OfficeLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralFAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GeneralFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GeneralResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadSubmission" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL DEFAULT 'GENERAL',
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "officeState" TEXT,
    "enquiryType" TEXT,
    "message" TEXT,
    "propertyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoBanner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "imageUrl" TEXT,
    "linkUrl" TEXT,
    "placement" "PromoPlacement" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromoBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceItem" (
    "id" TEXT NOT NULL,
    "type" "ComplianceType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "registrationNo" TEXT,
    "issuedBy" TEXT,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "fileUrl" TEXT,
    "externalLink" TEXT,
    "displayOnHome" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerLogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "category" "PartnerCategory" NOT NULL DEFAULT 'PARTNER',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogPostToBlogTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogPostToBlogTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BlogCategoryToBlogPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogCategoryToBlogPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_slug_idx" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_state_idx" ON "Property"("state");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_type_idx" ON "Property"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_name_key" ON "BlogCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTag_name_key" ON "BlogTag"("name");

-- CreateIndex
CREATE INDEX "_BlogPostToBlogTag_B_index" ON "_BlogPostToBlogTag"("B");

-- CreateIndex
CREATE INDEX "_BlogCategoryToBlogPost_B_index" ON "_BlogCategoryToBlogPost"("B");

-- AddForeignKey
ALTER TABLE "PropertyImage" ADD CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyFAQ" ADD CONSTRAINT "PropertyFAQ_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyResource" ADD CONSTRAINT "PropertyResource_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadSubmission" ADD CONSTRAINT "LeadSubmission_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogPostToBlogTag" ADD CONSTRAINT "_BlogPostToBlogTag_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogPostToBlogTag" ADD CONSTRAINT "_BlogPostToBlogTag_B_fkey" FOREIGN KEY ("B") REFERENCES "BlogTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogCategoryToBlogPost" ADD CONSTRAINT "_BlogCategoryToBlogPost_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogCategoryToBlogPost" ADD CONSTRAINT "_BlogCategoryToBlogPost_B_fkey" FOREIGN KEY ("B") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
