-- Admin User
INSERT INTO "User" ("id", "name", "email", "passwordHash", "role", "themePreference", "createdAt", "updatedAt")
VALUES (
  'user-admin-1', 
  'Super Admin', 
  'admin@aceroyalestates.com', 
  '$2b$10$9UcUlGeNuhT1y3w6gZMIr.JOOlx5.JJlDiUyYKzLULNF2X37rBHym', 
  'ADMIN', 
  'light', 
  NOW(), 
  NOW()
) ON CONFLICT ("email") DO NOTHING;

-- Properties
INSERT INTO "Property" ("id", "title", "slug", "description", "type", "status", "price", "currency", "state", "city", "address", "bedrooms", "bathrooms", "featured", "createdAt", "updatedAt")
VALUES
(
  'prop-1', 'Luxury 4 Bedroom Duplex', 'luxury-4-bedroom-duplex-lekki', 'A modern state-of-the-art duplex with swimming pool.', 
  'APARTMENT', 'AVAILABLE', 150000000, 'NGN', 'Lagos', 'Lekki', 'Admiralty Way, Lekki Phase 1', 4, 5, true, NOW(), NOW()
),
(
  'prop-2', 'Prime Estate Land', 'prime-estate-land-abuja', '500sqm dry land in a secure estate.', 
  'LAND', 'AVAILABLE', 25000000, 'NGN', 'Abuja', 'Gwarinpa', 'Plot 45, Gwarinpa Estate', null, null, true, NOW(), NOW()
) ON CONFLICT ("slug") DO NOTHING;

-- Property Images
INSERT INTO "PropertyImage" ("id", "propertyId", "url", "sortOrder")
VALUES
('img-1', 'prop-1', 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80', 0),
('img-2', 'prop-2', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', 0)
ON CONFLICT DO NOTHING;

-- Blog Posts
INSERT INTO "BlogPost" ("id", "title", "slug", "excerpt", "content", "coverImageUrl", "published", "createdAt", "updatedAt")
VALUES
(
  'blog-1', 'Why Invest in Nigerian Real Estate?', 'why-invest-nigerian-real-estate', 
  'The market is booming with opportunities.', 'Detailed article content here...', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', true, NOW(), NOW()
) ON CONFLICT ("slug") DO NOTHING;

-- General FAQs
INSERT INTO "GeneralFAQ" ("id", "question", "answer", "sortOrder")
VALUES
('faq-1', 'How do I schedule an inspection?', 'You can book via the property page or call us.', 0),
('faq-2', 'What documents do I get?', 'Receipt, Contract of Sale, and Deed of Assignment.', 1)
ON CONFLICT DO NOTHING;

-- Office Locations
INSERT INTO "OfficeLocation" ("id", "state", "address", "phones", "emails", "openingHours")
VALUES
('office-1', 'Lagos', '123 Admiralty Way, Lekki Phase 1', ARRAY['08012345678'], ARRAY['lagos@aceroyalestates.com'], 'Mon-Fri: 9am - 5pm')
ON CONFLICT DO NOTHING;
