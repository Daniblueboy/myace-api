import path from 'path';
import dotenv from 'dotenv';
import {
  PrismaClient,
  Role,
  PropertyType,
  PropertyStatus,
  PromoPlacement,
  ComplianceType,
  PartnerCategory,
  PropertyMediaType,
  PropertySizeUnit,
  PaymentType,
} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined');
}
console.log('Using DATABASE_URL:', dbUrl);

const adapter = new PrismaPg({ connectionString: dbUrl });
const prisma = new PrismaClient({
  adapter,
  log: ['error'],
});

async function main() {
  console.log('Seeding database...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('ChangeMe123!', salt);

  await prisma.user.upsert({
    where: { email: 'admin@aceroyalestates.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@aceroyalestates.com',
      passwordHash,
      role: Role.ADMIN,
      themePreference: 'light',
    },
  });

  // 2. Estates
  const estates = [
    {
      name: 'Aceroyal Gardens',
      slug: 'aceroyal-gardens',
      description:
        'Secure gated estate with modern infrastructure and green spaces.',
      state: 'Lagos',
      city: 'Lekki',
      address: 'Lekki Phase 1',
      coverImage:
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=QhBnZ6NPOY0',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['Perimeter Fence', 'Street Lights', 'Estate Security'],
      status: 'ACTIVE',
    },
    {
      name: 'Aceroyal Plains',
      slug: 'aceroyal-plains',
      description:
        'Affordable land with flexible payment plans and clear titles.',
      state: 'Abuja',
      city: 'Gwarinpa',
      address: 'Gwarinpa Extension',
      coverImage:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=9No-FiEInLA',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['Motorable Roads', 'Survey Plan', 'Clear Titles'],
      status: 'ACTIVE',
    },
    {
      name: 'Aceroyal Haven',
      slug: 'aceroyal-haven',
      description: 'Modern apartments within a serene residential enclave.',
      state: 'Ogun',
      city: 'Mowe',
      address: 'Redemption Camp Road',
      coverImage:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=KmxN9a2cWJY',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['24/7 Power', 'Central Security', 'Recreational Areas'],
      status: 'ACTIVE',
    },
    {
      name: 'Aceroyal Crest',
      slug: 'aceroyal-crest',
      description:
        'Hilltop estate with panoramic views and premium apartments.',
      state: 'Oyo',
      city: 'Ibadan',
      address: 'Agodi GRA',
      coverImage:
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=qO9VvGxgE30',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['Hilltop Views', 'Smart Access', 'Premium Finishes'],
      status: 'COMING_SOON',
    },
    {
      name: 'Aceroyal Marina',
      slug: 'aceroyal-marina',
      description:
        'Waterfront estate with leisure parks and resort-style living.',
      state: 'Lagos',
      city: 'Lekki',
      address: 'Lekki Coastal Road',
      coverImage:
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=VvQeZ2sW7u0',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['Waterfront Park', 'Jogging Tracks', 'Clubhouse'],
      status: 'ACTIVE',
    },
    {
      name: 'Aceroyal Palms',
      slug: 'aceroyal-palms',
      description:
        'Family-friendly estate with sold-out phases and serviced plots.',
      state: 'Rivers',
      city: 'Port Harcourt',
      address: 'Trans-Amadi',
      coverImage:
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=Z7BR8E1sWDQ',
      brochureUrl:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      gallery: [
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['Serviced Plots', 'Gatehouse', 'Play Park'],
      status: 'SOLD_OUT',
    },
  ];

  const estateMap = new Map<string, string>();
  for (const estate of estates) {
    const record = await prisma.estate.upsert({
      where: { slug: estate.slug },
      update: estate,
      create: estate,
    });
    estateMap.set(estate.slug, record.id);
  }

  const estateFaqs = [
    {
      estateSlug: 'aceroyal-gardens',
      question: 'Is the estate fully titled?',
      answer:
        'Yes. Aceroyal Gardens has registered title documentation and verified surveys.',
      sortOrder: 1,
    },
    {
      estateSlug: 'aceroyal-gardens',
      question: 'Are inspections available on weekends?',
      answer: 'Yes, inspections run every Saturday with prior booking.',
      sortOrder: 2,
    },
    {
      estateSlug: 'aceroyal-plains',
      question: 'What plot sizes are available?',
      answer:
        'Standard plots and half plots are available, subject to availability.',
      sortOrder: 1,
    },
    {
      estateSlug: 'aceroyal-plains',
      question: 'Can I pay in installments?',
      answer: 'Yes. Installment plans are provided in the payment plan flyers.',
      sortOrder: 2,
    },
    {
      estateSlug: 'aceroyal-haven',
      question: 'When will apartment units be ready?',
      answer:
        'Units are delivered in phases. Contact us for the current delivery timeline.',
      sortOrder: 1,
    },
    {
      estateSlug: 'aceroyal-haven',
      question: 'What amenities are included?',
      answer:
        'Central security, steady power, and shared recreational facilities.',
      sortOrder: 2,
    },
    {
      estateSlug: 'aceroyal-crest',
      question: 'When will the estate open for inspections?',
      answer:
        'Inspections open in the next launch window. Join the waitlist to get notified.',
      sortOrder: 1,
    },
    {
      estateSlug: 'aceroyal-marina',
      question: 'Is waterfront access included?',
      answer:
        'Yes, residents have access to the waterfront park and leisure areas.',
      sortOrder: 1,
    },
    {
      estateSlug: 'aceroyal-palms',
      question: 'Is the estate sold out?',
      answer:
        'Yes, Aceroyal Palms is currently sold out. Contact us for future phases.',
      sortOrder: 1,
    },
  ];

  for (const [slug, estateId] of estateMap.entries()) {
    await prisma.estateFAQ.deleteMany({ where: { estateId } });
    const items = estateFaqs.filter((faq) => faq.estateSlug === slug);
    if (items.length === 0) continue;
    await prisma.estateFAQ.createMany({
      data: items.map((item) => ({
        estateId,
        question: item.question,
        answer: item.answer,
        sortOrder: item.sortOrder,
      })),
    });
  }

  // 3. Properties (6 properties)
  const properties = [
    {
      title: 'Luxury 4 Bedroom Duplex',
      slug: 'luxury-4-bedroom-duplex-lekki',
      description: 'A modern state-of-the-art duplex with swimming pool.',
      type: PropertyType.APARTMENT,
      status: PropertyStatus.AVAILABLE,
      price: 150000000,
      state: 'Lagos',
      city: 'Lekki',
      address: 'Admiralty Way, Lekki Phase 1',
      bedrooms: 4,
      bathrooms: 5,
      amenities: ['Swimming Pool', 'CCTV', 'Backup Power', 'Security'],
      featured: true,
      estateId: estateMap.get('aceroyal-gardens'),
      images: [
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '4 Bedroom Duplex (Outright)',
          bedrooms: 4,
          bathrooms: 5,
          size: '450sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 150000000,
          paymentType: PaymentType.OUTRIGHT,
        },
        {
          label: '4 Bedroom Duplex (Installment)',
          bedrooms: 4,
          bathrooms: 5,
          size: '450sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 165000000,
          paymentType: PaymentType.INSTALLMENT,
          upfrontPercent: 30,
          installmentMonths: 12,
          installmentAmount: 9600000,
        },
        {
          label: '3 Bedroom Duplex (Outright)',
          bedrooms: 3,
          bathrooms: 4,
          size: '350sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 120000000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.VIDEO,
          title: 'Video Tour',
          url: 'https://www.youtube.com/watch?v=VvQeZ2sW7u0',
        },
        {
          type: PropertyMediaType.FLYER,
          title: 'Payment Plan',
          url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      title: 'Prime Estate Land',
      slug: 'prime-estate-land-abuja',
      description: '500sqm dry land in a secure estate.',
      type: PropertyType.LAND,
      status: PropertyStatus.AVAILABLE,
      price: 25000000,
      state: 'Abuja',
      city: 'Gwarinpa',
      address: 'Plot 45, Gwarinpa Estate',
      size: '500sqm',
      amenities: ['Gated Estate', 'Good Road Access'],
      featured: true,
      estateId: estateMap.get('aceroyal-plains'),
      images: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '1 Plot (Outright)',
          size: '1 Plot',
          sizeUnit: PropertySizeUnit.PLOT,
          price: 25000000,
          paymentType: PaymentType.OUTRIGHT,
        },
        {
          label: '1 Plot (Installment)',
          size: '1 Plot',
          sizeUnit: PropertySizeUnit.PLOT,
          price: 27500000,
          paymentType: PaymentType.INSTALLMENT,
          upfrontPercent: 40,
          installmentMonths: 6,
          installmentAmount: 2750000,
        },
        {
          label: '2 Plots (Outright)',
          size: '2 Plots',
          sizeUnit: PropertySizeUnit.PLOT,
          price: 47000000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.FLYER,
          title: 'Payment Plan',
          url: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      title: 'Modern 2 Bedroom Flat',
      slug: 'modern-2-bedroom-flat-ikeja',
      description: 'Serviced apartment in the heart of Ikeja.',
      type: PropertyType.APARTMENT,
      status: PropertyStatus.SOLD,
      price: 45000000,
      state: 'Lagos',
      city: 'Ikeja',
      address: 'Allen Avenue',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Serviced', 'Elevator', 'Parking'],
      estateId: estateMap.get('aceroyal-gardens'),
      images: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '2 Bedroom (Outright)',
          bedrooms: 2,
          bathrooms: 2,
          size: '180sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 45000000,
          paymentType: PaymentType.OUTRIGHT,
        },
        {
          label: '2 Bedroom (Installment)',
          bedrooms: 2,
          bathrooms: 2,
          size: '180sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 49500000,
          paymentType: PaymentType.INSTALLMENT,
          upfrontPercent: 20,
          installmentMonths: 12,
          installmentAmount: 3300000,
        },
        {
          label: '1 Bedroom (Outright)',
          bedrooms: 1,
          bathrooms: 1,
          size: '120sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 32000000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.VIDEO,
          title: 'Apartment Tour',
          url: 'https://www.youtube.com/watch?v=2MZ0XnR3r4A',
        },
        {
          type: PropertyMediaType.FLYER,
          title: 'Payment Plan',
          url: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      title: 'Commercial Land',
      slug: 'commercial-land-ibadan',
      description: 'Large expanse suitable for factory or warehouse.',
      type: PropertyType.LAND,
      status: PropertyStatus.AVAILABLE,
      price: 12000000,
      state: 'Oyo',
      city: 'Ibadan',
      address: 'Moniya Express',
      size: '2 Acres',
      amenities: ['Commercial Zone', 'Near Express Road'],
      estateId: estateMap.get('aceroyal-plains'),
      images: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '1 Acre (Outright)',
          size: '1 Acre',
          sizeUnit: PropertySizeUnit.ACRE,
          price: 12000000,
          paymentType: PaymentType.OUTRIGHT,
        },
        {
          label: '1 Acre (Installment)',
          size: '1 Acre',
          sizeUnit: PropertySizeUnit.ACRE,
          price: 13500000,
          paymentType: PaymentType.INSTALLMENT,
          upfrontPercent: 30,
          installmentMonths: 6,
          installmentAmount: 1575000,
        },
        {
          label: '2 Acres (Outright)',
          size: '2 Acres',
          sizeUnit: PropertySizeUnit.ACRE,
          price: 22000000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.FLYER,
          title: 'Payment Plan',
          url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      title: 'Seaside Villa',
      slug: 'seaside-villa-calabar',
      description: 'Beautiful vacation home with sea view.',
      type: PropertyType.APARTMENT,
      status: PropertyStatus.UPCOMING,
      price: 85000000,
      state: 'Cross River',
      city: 'Calabar',
      address: 'Marina Resort Area',
      bedrooms: 5,
      bathrooms: 6,
      amenities: ['Sea View', 'Private Garden', 'Security'],
      featured: true,
      estateId: estateMap.get('aceroyal-gardens'),
      images: [
        'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '5 Bedroom Villa (Outright)',
          bedrooms: 5,
          bathrooms: 6,
          size: '600sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 85000000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.VIDEO,
          title: 'Villa Tour',
          url: 'https://www.youtube.com/watch?v=FZQxPTV3cEA',
        },
      ],
    },
    {
      title: 'Affordable Bungalow',
      slug: 'affordable-bungalow-ogun',
      description: 'Newly built 3 bedroom bungalow.',
      type: PropertyType.APARTMENT,
      status: PropertyStatus.AVAILABLE,
      price: 18000000,
      state: 'Ogun',
      city: 'Mowe',
      address: 'Redemption Camp Road',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['Parking', 'Water Supply'],
      estateId: estateMap.get('aceroyal-haven'),
      images: [
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      ],
      variants: [
        {
          label: '3 Bedroom (Outright)',
          bedrooms: 3,
          bathrooms: 3,
          size: '240sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 18000000,
          paymentType: PaymentType.OUTRIGHT,
        },
        {
          label: '3 Bedroom (Installment)',
          bedrooms: 3,
          bathrooms: 3,
          size: '240sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 19500000,
          paymentType: PaymentType.INSTALLMENT,
          upfrontPercent: 25,
          installmentMonths: 10,
          installmentAmount: 1462500,
        },
        {
          label: '2 Bedroom (Outright)',
          bedrooms: 2,
          bathrooms: 2,
          size: '180sqm',
          sizeUnit: PropertySizeUnit.SQM,
          price: 13500000,
          paymentType: PaymentType.OUTRIGHT,
        },
      ],
      media: [
        {
          type: PropertyMediaType.FLYER,
          title: 'Payment Plan',
          url: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
  ];

  for (const prop of properties) {
    const { images, variants = [], media = [], ...data } = prop;
    await prisma.property.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        images: {
          deleteMany: {},
          create: images.map((url, index) => ({ url, sortOrder: index })),
        },
        variants: {
          deleteMany: {},
          create: variants.map((variant, index) => ({
            ...variant,
            sortOrder: index,
          })),
        },
        media: {
          deleteMany: {},
          create: media.map((item, index) => ({
            ...item,
            sortOrder: index,
          })),
        },
      },
      create: {
        ...data,
        images: {
          create: images.map((url, index) => ({ url, sortOrder: index })),
        },
        variants: {
          create: variants.map((variant, index) => ({
            ...variant,
            sortOrder: index,
          })),
        },
        media: {
          create: media.map((item, index) => ({
            ...item,
            sortOrder: index,
          })),
        },
      },
    });
  }

  // 4. Blog Posts
  const posts = [
    {
      title: 'Why Invest in Nigerian Real Estate?',
      slug: 'why-invest-nigerian-real-estate',
      excerpt:
        'A practical look at demand, population growth, and long-term value.',
      content: `Nigeria's growing population and urban migration continue to drive steady demand for quality housing. Well-planned estates with verified titles typically perform better over time because infrastructure, security, and access are managed from day one.

At Aceroyal Estates, we focus on clear documentation, infrastructure delivery, and transparent payment structures. This helps buyers avoid the uncertainty common in informal land markets and supports resale value.

When evaluating an estate, prioritize location, title documents, infrastructure delivery timelines, and developer track record. These factors directly influence your exit value and the speed of demand uptake.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'Top 5 Locations in Lagos for Estate Buyers',
      slug: 'top-5-locations-lagos',
      excerpt:
        'Comparing Lekki, Ajah, Ibeju-Lekki, Ikeja, and Epe for land and apartment buyers.',
      content: `Lagos offers diverse investment corridors depending on your budget and timeline. Lekki and Ikeja provide mature infrastructure and higher entry points, while Ibeju-Lekki and Epe still present growth opportunities with strong upside.

For estate buyers, proximity to access roads, employment nodes, and utilities is critical. Ensure the estate has verifiable titles and a development plan for roads, drainage, and power.

If you're unsure, schedule an inspection and compare two locations on the same day. It is the fastest way to understand the real market value of each corridor.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'Understanding Land Titles in Nigeria',
      slug: 'understanding-land-titles',
      excerpt:
        'C of O, Governor’s Consent, and the documents you should always request.',
      content: `Land titles can feel complex, but a few basics go a long way. A Certificate of Occupancy (C of O) is the strongest form of land ownership, while a Governor’s Consent is required for any transfer of a C of O.

When buying, ask for the title document, a survey plan, and evidence of the estate layout approval. Always verify documents through proper channels to avoid disputes.

A reputable developer will provide these documents and guide you through the verification process. If the estate is pre-title, request the development timeline and the steps to secure the final title.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'How to Budget for an Estate Purchase',
      slug: 'budget-estate-purchase',
      excerpt: 'Planning for land cost, documentation, and development levies.',
      content: `Beyond the headline price, estate buyers should budget for documentation fees, surveys, and infrastructure levies where applicable. Always request a complete cost sheet before making payment.

If you are on a payment plan, confirm the upfront percentage, installment duration, and any penalties for late payments. This helps you plan realistically and avoid unexpected charges.

At Aceroyal Estates, each estate has a payment plan flyer that outlines the schedule and fees in one place to keep the process transparent.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'Estate vs. Open Market Properties',
      slug: 'estate-vs-open-market',
      excerpt:
        'Why planned estates provide stronger long-term protection and convenience.',
      content: `Open market properties can be cheaper upfront, but they often come with higher risks around title clarity and infrastructure. Planned estates provide defined layouts, controlled access, and better long-term upkeep.

This is why Aceroyal focuses on estate development and curated apartment offerings within estates. It gives buyers predictable value, community standards, and stronger resale options.

When comparing options, assess the total cost of ownership, security, and the estate’s maintenance model.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1461937743570-86c82229c8a1?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'A First-Time Buyer’s Checklist',
      slug: 'first-time-buyer-checklist',
      excerpt: 'What to ask before you pay for land or an apartment.',
      content: `First-time buyers should confirm the estate title, infrastructure roadmap, and the developer’s delivery track record. Ask for a clear payment schedule and documentation list.

Visit the site, take note of access roads, drainage, and the surrounding developments. If buying an apartment, ask about unit finishing, warranty coverage, and service charges.

Most importantly, ensure every payment is documented with official receipts and that the contract outlines the delivery milestones.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
    {
      title: 'How to Choose the Right Payment Plan',
      slug: 'choose-right-payment-plan',
      excerpt:
        'Outright vs installment and how to decide what fits your timeline.',
      content: `Outright plans usually come with lower total costs and faster allocation, while installment plans help spread payment over time. Your decision should align with your cash flow and timeline for development.

Review the payment plan flyer for each estate or apartment option. It should clearly state upfront payment, duration, and total cost.

If you need flexibility, choose an installment plan with a manageable timeline. If you want faster allocation and better pricing, outright works best.`,
      coverImageUrl:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  // 4. General FAQs
  const faqs = [
    {
      question: 'How do I schedule an inspection?',
      answer: 'You can book via the property page or call us.',
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we have flexible payment plans for specific properties.',
    },
    {
      question: 'What documents do I get?',
      answer: 'Receipt, Contract of Sale, and Deed of Assignment.',
    },
    {
      question: 'Is my investment safe?',
      answer: 'Absolutely, all our properties are verified.',
    },
    {
      question: 'Can I buy from abroad?',
      answer: 'Yes, we have a diaspora purchase process.',
    },
    {
      question: 'What payment plans are available?',
      answer:
        'Installment plans vary by estate and are shown in payment plan flyers.',
    },
    {
      question: 'Do you provide allocation after full payment?',
      answer:
        'Yes, allocation is provided after documentation and full payment confirmation.',
    },
    {
      question: 'How long does documentation take?',
      answer:
        'Typically 7–21 business days depending on the estate and documentation package.',
    },
    {
      question: 'Are your estates government approved?',
      answer: 'Yes, all estates have verified titles and approvals.',
    },
    {
      question: 'Can I resell my plot or unit?',
      answer: 'Yes, subject to our transfer process and documentation.',
    },
  ];

  for (const faq of faqs) {
    // Basic check to avoid duplicates on re-seed, though ID is uuid.
    // We'll skip complex upsert logic for FAQs for simplicity here
    const count = await prisma.generalFAQ.count({
      where: { question: faq.question },
    });
    if (count === 0) {
      await prisma.generalFAQ.create({ data: faq });
    }
  }

  // 5. Office Locations
  const offices = [
    {
      state: 'Lagos',
      address: '123 Admiralty Way, Lekki Phase 1',
      phones: ['08012345678', '08087654321'],
      emails: ['lagos@aceroyalestates.com'],
      openingHours: 'Mon-Fri: 9am - 5pm',
    },
    {
      state: 'Abuja',
      address: '45 Gana Street, Maitama',
      phones: ['09012345678'],
      emails: ['abuja@aceroyalestates.com'],
      openingHours: 'Mon-Fri: 9am - 5pm',
    },
  ];

  for (const office of offices) {
    // Simplifying check
    const existing = await prisma.officeLocation.findFirst({
      where: { state: office.state },
    });
    if (!existing) {
      await prisma.officeLocation.create({ data: office });
    }
  }

  // 6. General Resources
  const resources = [
    {
      title: 'Aceroyal Gardens Brochure',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileType: 'PDF',
      sortOrder: 1,
      estateId: estateMap.get('aceroyal-gardens'),
    },
    {
      title: 'Aceroyal Plains Payment Plan',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileType: 'PDF',
      sortOrder: 2,
      estateId: estateMap.get('aceroyal-plains'),
    },
    {
      title: 'Aceroyal Haven Apartment Brochure',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileType: 'PDF',
      sortOrder: 3,
      estateId: estateMap.get('aceroyal-haven'),
    },
    {
      title: 'Real Estate Purchase Guide (Nigeria)',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileType: 'PDF',
      sortOrder: 4,
    },
    {
      title: 'Inspection Checklist',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileType: 'PDF',
      sortOrder: 5,
    },
  ];

  for (const resource of resources) {
    const existing = await prisma.generalResource.findFirst({
      where: { title: resource.title },
    });
    if (!existing) {
      await prisma.generalResource.create({ data: resource });
    }
  }

  // 7. Promos
  const promos = [
    {
      title: 'New Phase Launch',
      message: 'Secure your plot at pre-launch prices!',
      details:
        'Limited plots are available in the new phase with flexible payment plans. Complete an inspection to secure your allocation before public release.',
      placement: PromoPlacement.HERO_BANNER,
      active: true,
      priority: 10,
    },
    {
      title: 'Valentine Sales',
      message: 'Love at first site! Valentine discounts across select estates.',
      details:
        'Valentine savings apply to select plots and apartments for a limited period. Enjoy added documentation support and priority inspection slots.',
      placement: PromoPlacement.TOP_STRIP,
      active: true,
      priority: 9,
    },
    {
      title: 'Christmas Mega Sales',
      message: 'Get 10% off all apartments this December.',
      details:
        'Seasonal discounts apply to completed units and select off-plan apartments. Book an inspection to reserve your unit before year-end.',
      placement: PromoPlacement.TOP_STRIP,
      active: true,
      priority: 5,
    },
    {
      title: 'Inspection Day',
      message: 'Join us every Saturday for free site inspections.',
      details:
        'Meet our team on-site, view plot locations, and get a full breakdown of payment options and documentation in one visit.',
      placement: PromoPlacement.SECTION_CARD,
      active: true,
      priority: 1,
    },
    {
      title: 'New Estate Launch: Aceroyal Crest',
      message:
        'Hilltop views, smart access, and premium finishes — now opening for early subscribers.',
      videoUrl:
        'https://cdn.coverr.co/videos/coverr-aerial-sunset-1644/1080p.mp4',
      linkUrl: '/estates/aceroyal-crest',
      details:
        'Aceroyal Crest offers panoramic hilltop views, smart access control, and premium infrastructure. Early subscribers receive priority allocations and flexible payment options.',
      placement: PromoPlacement.SECTION_CARD,
      active: true,
      priority: 6,
    },
    {
      title: 'Mobile App Launch',
      message:
        'Our Android & iOS apps are launching soon. Get early access to listings and payment plans.',
      videoUrl:
        'https://cdn.coverr.co/videos/coverr-man-using-phone-4037/1080p.mp4',
      details:
        'Join the waitlist to access estate updates, payment plans, and inspection booking from your phone before public release.',
      placement: PromoPlacement.HERO_BANNER,
      active: true,
      priority: 7,
    },
    {
      title: 'Valentine Estate Specials',
      message:
        'Limited Valentine discounts on select plots and apartment options. Book an inspection this week.',
      placement: PromoPlacement.SECTION_CARD,
      active: true,
      priority: 8,
      linkUrl: '/estates/aceroyal-gardens',
      details:
        'Enjoy Valentine promotions on key estate options, including serviced plots and premium apartments. Inspections available throughout the week.',
    },
  ];

  for (const promo of promos) {
    const existing = await prisma.promoBanner.findFirst({
      where: { title: promo.title },
    });
    if (existing) {
      await prisma.promoBanner.update({
        where: { id: existing.id },
        data: promo,
      });
    } else {
      await prisma.promoBanner.create({ data: promo });
    }
  }

  // 7. Compliance
  const compliance = [
    {
      type: ComplianceType.CAC_REGISTRATION,
      title: 'RC 123456',
      description: 'Registered with Corporate Affairs Commission',
      displayOnHome: true,
    },
    {
      type: ComplianceType.GOVT_CERTIFICATE,
      title: 'EFCC SCUML',
      displayOnHome: true,
    },
    {
      type: ComplianceType.LEGAL_DOCUMENT,
      title: 'Certificate of Incorporation',
      displayOnHome: false,
    },
    {
      type: ComplianceType.AWARD,
      title: 'Real Estate Brand of the Year 2024',
      displayOnHome: true,
    },
  ];

  for (const item of compliance) {
    const existing = await prisma.complianceItem.findFirst({
      where: { title: item.title },
    });
    if (!existing) {
      await prisma.complianceItem.create({ data: item });
    }
  }

  // 8. Clients/Partners
  const partners = [
    {
      name: 'Zenith Bank',
      logoUrl: 'https://logo.clearbit.com/zenithbank.com',
      category: PartnerCategory.PARTNER,
    },
    {
      name: 'Dangote Cement',
      logoUrl: 'https://logo.clearbit.com/dangote.com',
      category: PartnerCategory.PARTNER,
    },
    {
      name: 'Julius Berger',
      logoUrl: 'https://logo.clearbit.com/julius-berger.com',
      category: PartnerCategory.PARTNER,
    },
    {
      name: 'Lagos State Govt',
      logoUrl: 'https://logo.clearbit.com/lagosstate.gov.ng',
      category: PartnerCategory.PARTNER,
    }, // Wait, enum is CLIENT/PARTNER. Using PARTNER default
    {
      name: 'Chevron',
      logoUrl: 'https://logo.clearbit.com/chevron.com',
      category: PartnerCategory.CLIENT,
    },
    {
      name: 'Shell',
      logoUrl: 'https://logo.clearbit.com/shell.com',
      category: PartnerCategory.CLIENT,
    },
  ];

  for (const p of partners) {
    const existing = await prisma.partnerLogo.findFirst({
      where: { name: p.name },
    });
    if (existing) {
      await prisma.partnerLogo.update({
        where: { id: existing.id },
        data: p,
      });
    } else {
      await prisma.partnerLogo.create({ data: p });
    }
  }

  // 9. Team Members
  const team = [
    {
      name: 'Dr Endurance Agonor',
      role: 'Chief Executive Officer',
      bio: 'Visionary leader driving the company towards excellence in real estate development.',
      photoUrl: '/images/ceo.jpg',
      displayOrder: 1,
      active: true,
    },
    {
      name: 'COO',
      role: 'Chief Operating Officer',
      bio: 'Overseeing day-to-day operations and ensuring seamless project execution.',
      photoUrl: '/images/coo.JPG',
      displayOrder: 2,
      active: true,
    },
    {
      name: 'Head of Finance',
      role: 'Finance Director',
      bio: 'Managing financial strategy and ensuring sustainable growth.',
      photoUrl: '/images/finance.JPG',
      displayOrder: 3,
      active: true,
    },
    {
      name: 'Head of Customer Care',
      role: 'Customer Relations Director',
      bio: 'Ensuring exceptional client experience at every touchpoint.',
      photoUrl: '/images/head_cust_care.JPG',
      displayOrder: 4,
      active: true,
    },
    {
      name: 'Head of Legal',
      role: 'Legal Counsel',
      bio: 'Ensuring compliance and secure documentation for all transactions.',
      photoUrl: '/images/head_legal.JPG',
      displayOrder: 5,
      active: true,
    },
    {
      name: 'HR Manager',
      role: 'Human Resources Manager',
      bio: 'Building and nurturing a high-performing team culture.',
      photoUrl: '/images/hr.JPG',
      displayOrder: 6,
      active: true,
    },
    {
      name: 'Project Manager',
      role: 'Project Manager',
      bio: 'Coordinating estate development and infrastructure delivery.',
      photoUrl: '/images/project_manager.JPG',
      displayOrder: 7,
      active: true,
    },
    {
      name: 'Regional Manager',
      role: 'Regional Manager',
      bio: 'Managing operations and sales across key regions.',
      photoUrl: '/images/regional_manager.JPG',
      displayOrder: 8,
      active: true,
    },
  ];

  for (const member of team) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (existing) {
      await prisma.teamMember.update({
        where: { id: existing.id },
        data: member,
      });
    } else {
      await prisma.teamMember.create({ data: member });
    }
  }

  // 10. Testimonials
  const testimonials = [
    {
      name: 'Tosin A.',
      role: 'Investor',
      message:
        'Aceroyal helped me secure a prime land deal with clear documentation. Highly recommended.',
      rating: 5,
      displayOrder: 1,
    },
    {
      name: 'Chinwe M.',
      role: 'Home Buyer',
      message:
        'From inspection to allocation, the process was smooth and transparent.',
      rating: 5,
      displayOrder: 2,
    },
    {
      name: 'Dapo L.',
      role: 'Diaspora Client',
      message:
        'Excellent communication and reliable updates while I purchased from abroad.',
      rating: 4,
      displayOrder: 3,
    },
    {
      name: 'Amaka E.',
      role: 'First-time Buyer',
      message:
        'The team explained every step and helped me choose the right payment plan.',
      rating: 5,
      displayOrder: 4,
    },
    {
      name: 'Kehinde O.',
      role: 'Land Buyer',
      message: 'Inspection was organized and documentation was ready on time.',
      rating: 4,
      displayOrder: 5,
    },
    {
      name: 'Sola T.',
      role: 'Client',
      message:
        'Great service, responsive support, and clear answers to all my questions.',
      rating: 5,
      displayOrder: 6,
    },
    {
      name: 'Ifeanyi K.',
      role: 'Property Investor',
      message: 'Solid options across different states and trustworthy advice.',
      rating: 4,
      displayOrder: 7,
    },
    {
      name: 'Zainab M.',
      role: 'Buyer',
      message: 'I loved the transparency and the seamless inspection booking.',
      rating: 5,
      displayOrder: 8,
    },
  ];

  for (const item of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: item.name, message: item.message },
    });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: item,
      });
    } else {
      await prisma.testimonial.create({ data: item });
    }
  }

  // 11. Newsletter Subscribers
  const subscribers = [
    'chidi.okafor@example.com',
    'bolanle.adeyemi@example.com',
    'ifeoma.ogbuefi@example.com',
    'tunde.adeleke@example.com',
    'amina.sulaiman@example.com',
    'kenechukwu.nwosu@example.com',
    'sade.abiodun@example.com',
    'victor.uzor@example.com',
  ];

  for (const email of subscribers) {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (!existing) {
      await prisma.newsletterSubscriber.create({ data: { email } });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
