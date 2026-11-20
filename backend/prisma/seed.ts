import { PrismaClient, Role, EnquiryStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING SUYASH FOOD INDUSTRIES DATABASE ---');

  // 1. Admin Users
  const superAdminPassword = await bcrypt.hash('Admin@Suyash2026', 10);
  const managerPassword = await bcrypt.hash('Manager@Suyash2026', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@suyashfood.in' },
    update: {},
    create: {
      email: 'admin@suyashfood.in',
      name: 'Super Admin',
      phone: '+919805565679',
      passwordHash: superAdminPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@suyashfood.in' },
    update: {},
    create: {
      email: 'manager@suyashfood.in',
      name: 'Operations Manager',
      phone: '+919805565679',
      passwordHash: managerPassword,
      role: Role.MANAGER,
    },
  });

  console.log(`Seeded Admins: ${superAdmin.email}, ${manager.email}`);

  // 2. Categories
  const categoriesData = [
    {
      name: 'Himalayan Organic Staples',
      slug: 'himalayan-organic-staples',
      description: 'Pristine unpolished grains, stone-ground flours, mountain pulses, and spices harvested from the terrace farms of Himachal Pradesh.',
      imageUrl: '/images/products/lal-chawal-suyash-food-industries.jpeg',
      order: 1,
    },
    {
      name: 'Apricot Oils',
      slug: 'apricot-oils',
      description: 'Pure 100% cold-pressed wild and sweet apricot kernel oils extracted from high-altitude mountain orchards (Chuli Oil).',
      imageUrl: '/images/products/pure-wild-apricot-oil-suyash-industries.jpeg',
      order: 2,
    },
    {
      name: 'Saroj’s Heritage',
      slug: 'sarojs-heritage',
      description: 'Artisanal heritage mountain recipes, wild apricot cold-pressed elixirs, and traditional wellness formulations.',
      imageUrl: '/images/products/pure-apricot-oil-suyash-food-indutries.jpeg',
      order: 3,
    },
    {
      name: 'Dimple’s Jar',
      slug: 'dimples-jar',
      description: 'Pure traditional Bilona churned desi cow ghee and artisanal handcrafted small-batch orchard fruit preserves.',
      imageUrl: '/images/products/pure-desi-ghee-suyash-food-industries.png',
      order: 4,
    },
    {
      name: 'Nilansh Gold',
      slug: 'nilansh-gold',
      description: 'Premium roasted grain protein blends and wild foraged Shahi black cumin (Kala Jira).',
      imageUrl: '/images/products/kala-jira-suyash-food-industries.png',
      order: 5,
    },
    {
      name: 'Dried Gourmet & Flakes',
      slug: 'dried-gourmet-flakes',
      description: 'Naturally sun-dried crisp apple slices and wild foraged mountain mushroom blends.',
      imageUrl: '/images/products/sukhe-seb-suyash-food-industries.jpeg',
      order: 6,
    },
    {
      name: 'Wellness & Superfood Range',
      slug: 'wellness-superfood-range',
      description: 'Traditional roasted pure sattu, botanical herbal infusions, and immune-supporting garlic concentrates.',
      imageUrl: '/images/products/sattu-suyash-food-industries.jpeg',
      order: 7,
    },
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoriesMap[cat.name] = created.id;
    categoriesMap[cat.slug] = created.id;
  }
  console.log(`Seeded ${categoriesData.length} Categories.`);

  // 3. Brands
  const brandsData = [
    {
      name: 'Suyash Food Industries',
      slug: 'suyash-food-industries',
      tagline: 'Purity from the Foothills of Himachal',
      description: 'Master brand dedicated to unadulterated Himalayan organic staples.',
      order: 1,
    },
    {
      name: 'Saroj’s Heritage',
      slug: 'sarojs-heritage',
      tagline: 'Centuries of Traditional Mountain Wisdom',
      description: 'Heritage line of cold-pressed wild apricot oils.',
      order: 2,
    },
    {
      name: 'Dimple’s Jar',
      slug: 'dimples-jar',
      tagline: 'Handcrafted in Small Batches',
      description: 'Artisanal kitchen staples including Bilona ghee and kettle fruit preserves.',
      order: 3,
    },
    {
      name: 'Nilansh Gold',
      slug: 'nilansh-gold',
      tagline: 'Tradition Meets Modern Nutrition',
      description: 'Nutrient-dense protein mixes and rare mountain black cumin.',
      order: 4,
    },
    {
      name: 'ND Fresh',
      slug: 'nd-fresh',
      tagline: 'Botanical Himalayan Refreshment',
      description: 'Herbal beverage blends and invigorating botanical tonics.',
      order: 5,
    },
  ];

  const brandsMap: Record<string, string> = {};
  for (const brand of brandsData) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    brandsMap[brand.name] = created.id;
    brandsMap[brand.slug] = created.id;
  }
  console.log(`Seeded ${brandsData.length} Brands.`);

  // 4. Products Master Data (All 21 Verified Products)
  const products = [
    {
      sku: 'SFI-1',
      name: 'Lal Chawal (Red Rice)',
      slug: 'lal-chawal',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 399.0,
      salePrice: 399.0,
      weight: '500g',
      shortDescription: 'Pure Unpolished Lal Chawal — पाएं परंपरा का स्वाद — शुद्ध, अनपॉलिश लाल चावल।',
      description: 'Sourced from pristine high-altitude terraced fields of Himachal Pradesh, Suyash Food Industries Unpolished Red Rice is rich in fiber, minerals, and anthocyanin antioxidants. Cooked to a nutty, aromatic consistency, it is ideal for diabetes management, heart health, and wholesome daily nutrition.',
      ingredients: '100% Himalayan Unpolished Red Rice (Lal Chawal).',
      benefits: 'High dietary fiber, low glycemic index, rich in antioxidants, helps regulate blood sugar and supports digestive wellness.',
      storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/lal-chawal-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-2',
      name: 'Kala Chawal (Black Rice)',
      slug: 'kala-chawal',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 499.0,
      salePrice: 347.0,
      weight: '500g',
      shortDescription: 'The Ancient Power of Kala Chawal — Authenticity & Health in Every Grain.',
      description: 'Known historically as the forbidden grain, this unpolished mountain Black Rice is loaded with powerful anthocyanins, iron, and slow-burning complex carbs. It cooks with an earthy aroma and deep purple-black natural sheen.',
      ingredients: '100% Unpolished Himalayan Black Rice.',
      benefits: 'Superior antioxidant density, supports heart and liver health, rich in iron and essential minerals.',
      storageInstructions: 'Store in a cool, dry place. Keep sealed in a container after opening.',
      isFeatured: true,
      isBestSeller: false,
      image: '/images/products/kala-chawal-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-3',
      name: 'Koda (Millet Grain / Flour)',
      slug: 'koda',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 599.0,
      salePrice: 477.0,
      weight: '250g',
      shortDescription: 'Traditional Unpolished Koda Grain / Flour — पाएँ परंपरा का स्वाद, शुद्धता का भरोसा।',
      description: 'Koda (Kodo Millet) is a resilient traditional Himalayan super-grain cultivated without synthetic fertilizers. Naturally gluten-free and packed with plant polyphenols, it is an ancient grain for contemporary wellness.',
      ingredients: '100% Pure Unpolished Koda Millet.',
      benefits: 'Naturally gluten-free, assists in weight management and metabolic health, high calcium and dietary fiber.',
      storageInstructions: 'Keep in an airtight jar away from moisture.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/koda-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-4',
      name: 'Ogla (Buckwheat / Kuttu Flour)',
      slug: 'ogla',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 599.0,
      salePrice: 489.0,
      weight: '500g',
      shortDescription: 'Traditional Unfiltered Ogla Flour (बिना छाना हुआ) — Pure Himalayan Heritage.',
      description: 'Ground naturally without sifting or chemical refining, our Ogla flour retains maximum bran, mineral density, and wholesome mountain flavor. Celebrated across northern mountain cultures for festive fasting and daily wellness.',
      ingredients: '100% Pure Himalayan Buckwheat (Ogla).',
      benefits: 'Rich in rutin for cardiovascular strength, low glycemic index, completely gluten-free.',
      storageInstructions: 'Store in a cool dry pantry.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/ogla-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-5',
      name: 'Pure Sattu (Roasted Grain Mix)',
      slug: 'pure-sattu',
      category: 'Wellness & Superfood Range',
      brand: 'Suyash Food Industries',
      regularPrice: 399.0,
      salePrice: 389.0,
      weight: '200g',
      shortDescription: 'The Power of Tradition. Uncompromising Purity.',
      description: 'Crafted from carefully slow-roasted Himalayan Bengal gram and selected heritage grains, Suyash Food Industries Pure Sattu provides clean, natural, instant plant protein. Traditional cooling food ideal for nutritious morning shakes.',
      ingredients: 'Roasted Himalayan Bengal Gram (Chana) and mixed traditional grains.',
      benefits: 'Natural cooling energy, high protein, aids digestion and sustained stamina without sugar spikes.',
      storageInstructions: 'Seal tightly in an airtight container.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/sattu-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-6',
      name: 'Kafra (Buckwheat Flour)',
      slug: 'kafra',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 589.0,
      salePrice: 400.0,
      weight: '500g',
      shortDescription: 'Unfiltered, Natural Flour (Seal of Trust) — बिना छाना हुआ।',
      description: 'Sourced from high-altitude Himalayan regions, Kafra flour is traditional, unsifted, and stone-milled. It carries the authentic earthy richness of ancient mountain buckwheat varieties.',
      ingredients: '100% Unfiltered Kafra Flour.',
      benefits: 'Packed with magnesium, zinc, and bioflavonoids; assists digestive efficiency.',
      storageInstructions: 'Store in an airtight jar in a dry location.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/kafra-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-7',
      name: 'Sukhe Seb (Sun-Dried Apple Slices)',
      slug: 'sukhe-seb-sun-dried-apple-slices',
      category: 'Dried Gourmet & Flakes',
      brand: 'Suyash Food Industries',
      regularPrice: 589.0,
      salePrice: 400.0,
      weight: '200g',
      shortDescription: 'Nourishing Lives, Growing Together — Pure Himalayan Dried Apples.',
      description: 'Crafted from handpicked fresh apples from the high orchards of Himachal Pradesh. Sun-dried naturally without added sulphur, preservatives, or artificial sweeteners. Chewy, naturally tart and sweet.',
      ingredients: '100% Himalayan Sun-Dried Apples.',
      benefits: 'Pure vitamins A & C, soluble pectin fiber, zero added sugar, delicious guilt-free snacking.',
      storageInstructions: 'Keep in an airtight bag or container to retain chewiness.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/sukhe-seb-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-8',
      name: 'Kala Matar (Unpolished Black Peas)',
      slug: 'kala-matar-unpolished-black-peas',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 469.0,
      salePrice: 390.0,
      weight: '500g',
      shortDescription: 'High Plant Protein & Digestive Wellness.',
      description: 'Packed with plant-based protein and anti-inflammatory properties, Suyash Food Industries Kala Matar is naturally harvested and kept completely unpolished to safeguard delicate trace minerals and dietary bran.',
      ingredients: '100% Himalayan Unpolished Black Peas.',
      benefits: 'Abundant in plant protein, iron, and fiber; promotes gut microbiome and steady energy.',
      storageInstructions: 'Store in a dry container.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/kala-matar-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-9',
      name: 'Himalayan Lal Rajma',
      slug: 'himalayan-lal-rajma',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 669.0,
      salePrice: 590.0,
      weight: '500g',
      shortDescription: 'Authentic Himalayan Lal Rajma — Experience the Foothills.',
      description: 'Hand-picked from foothill and mountain valley farms of Himachal, this Lal Rajma cooks tender with a naturally rich, buttery texture and absorbs aromatic spices beautifully without needing hours of excessive pressure cooking.',
      ingredients: '100% Pure Himalayan Red Kidney Beans (Lal Rajma).',
      benefits: 'High protein, dense in folate and iron, authentic melt-in-mouth mountain texture.',
      storageInstructions: 'Store in a cool, dry place in a sealed container.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/lal-rajma-suyash-food-industries.jpeg',
    },
    {
      sku: 'SFI-10',
      name: 'Nilansh Gold Protein Mix',
      slug: 'nilansh-gold-protein-mix',
      category: 'Nilansh Gold',
      brand: 'Nilansh Gold',
      regularPrice: 469.0,
      salePrice: 440.0,
      weight: '150g',
      shortDescription: 'Tradition Meets Nutrition — पौष्टिकता का अनमोल तोहफा।',
      description: 'A premium traditional blend of dry-roasted mountain grains, California almonds, cashews, pumpkin seeds, and digestible plant proteins packed in a luxury glass jar.',
      ingredients: 'Roasted Himalayan multi-grains, almonds, cashews, pumpkin seeds, melon seeds.',
      benefits: 'Balanced amino acids, healthy fats, clean daily energy without synthetic whey or preservatives.',
      storageInstructions: 'Store in the glass jar tightly closed.',
      isFeatured: true,
      isBestSeller: false,
      image: '/images/products/nilansh-gold-protein-mix-suyash-industries.jpeg',
    },
    {
      sku: 'SFI-11',
      name: 'Wild Apricot Oil (Saroj’s Heritage)',
      slug: 'pure-wild-apricot-oil',
      category: 'Apricot Oils',
      brand: 'Saroj’s Heritage',
      regularPrice: 669.0,
      salePrice: 580.0,
      weight: '250 ml',
      shortDescription: 'Purely Sourced From High Mountain Forests (Chuli Oil).',
      description: 'Extracted from wild mountain apricot kernels (Chuli) gathered from the upper valleys of Himachal Pradesh. Cold-pressed with zero thermal degradation, this therapeutic oil deeply hydrates skin, nourishes scalp, and relaxes fatigued muscles.',
      ingredients: '100% Pure Cold-Pressed Wild Apricot Kernel Oil.',
      benefits: 'Rich in oleic & linoleic acids, vitamins A & E; anti-aging skin moisturizer and restorative hair oil.',
      storageInstructions: 'Keep in a dark, cool spot away from sunlight.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/pure-wild-apricot-oil-suyash-industries.jpeg',
    },
    {
      sku: 'SFI-12',
      name: 'Pure Apricot Oil (Saroj’s Heritage)',
      slug: 'pure-apricot-oil',
      category: 'Apricot Oils',
      brand: 'Saroj’s Heritage',
      regularPrice: 499.0,
      salePrice: 400.0,
      weight: '250 ml',
      shortDescription: 'Purely Sourced From The Mountain Orchards.',
      description: 'Cold-pressed gentle apricot oil from sweet orchard kernels. Fast-absorbing, lightweight, and delightfully calming for sensitive skin, baby massage, and daily cosmetic nourishment.',
      ingredients: '100% Pure Sweet Apricot Kernel Oil.',
      benefits: 'Light non-greasy absorption, rich skin elasticity booster, completely natural fragrance.',
      storageInstructions: 'Store in a cool dry cabinet.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/pure-apricot-oil-suyash-food-indutries.jpeg',
    },
    {
      sku: 'SFI-13',
      name: 'Pure Turmeric Powder',
      slug: 'pure-turmeric-powder',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 499.0,
      salePrice: 400.0,
      weight: '250g',
      shortDescription: 'Naturally Sourced High Curcumin Mountain Turmeric.',
      description: 'Stone-ground from sun-cured mountain turmeric rhizomes. Free from artificial lead chromate colorants or extracted essential oils. Gives dishes a radiant golden hue and intense earthy aroma.',
      ingredients: '100% Pure Mountain Turmeric (Haldi).',
      benefits: 'Natural curcumin anti-inflammatory, immunity booster, clean culinary purity.',
      storageInstructions: 'Store away from humidity in a dry spice jar.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/turmeric-powder-suyash-food-industries.png',
    },
    {
      sku: 'SFI-14',
      name: 'Dried Mushroom Mix',
      slug: 'dried-mushroom-mix',
      category: 'Dried Gourmet & Flakes',
      brand: 'Suyash Food Industries',
      regularPrice: 599.0,
      salePrice: 430.0,
      weight: '100g',
      shortDescription: 'Wild Himalayan Forest Mushrooms.',
      description: 'Assorted wild mushrooms hand-foraged from temperate pine forests of Himachal. Dehydrated naturally to concentrate deep savory umami. Rehydrates quickly in warm water for gourmet broths and gravies.',
      ingredients: '100% Dehydrated Forest Mushrooms.',
      benefits: 'High dietary selenium, vitamin D, rich natural umami with zero additives.',
      storageInstructions: 'Keep sealed in moisture-proof packaging.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/dried-mushroom-mix-suyash-food-industries.png',
    },
    {
      sku: 'SFI-15',
      name: 'Dimple’s Jar — Artisan Fruit Jam',
      slug: 'dimples-jar-artisan-fruit-jam',
      category: 'Dimple’s Jar',
      brand: 'Dimple’s Jar',
      regularPrice: 599.0,
      salePrice: 430.0,
      weight: '350g',
      shortDescription: 'Small Batch Handcrafted Orchard Preserves.',
      description: 'Made by slow-simmering orchard-fresh seasonal Himachali fruits with raw sugar and citrus zest. No gelatin, synthetic pectin, or commercial food coloring.',
      ingredients: 'Fresh Mountain Fruit Pulp (Apple, Plum, Apricot), Raw Cane Sugar, Lemon Juice.',
      benefits: 'Real fruit chunks, wholesome taste of home-cooked orchard preserves.',
      storageInstructions: 'Refrigerate after opening.',
      isFeatured: true,
      isBestSeller: false,
      image: '/images/products/dimple-jar-fruit-jam-e1787080032483.png',
    },
    {
      sku: 'SFI-16',
      name: 'ND Fresh Drink',
      slug: 'nd-fresh-drink',
      category: 'Wellness & Superfood Range',
      brand: 'ND Fresh',
      regularPrice: 599.0,
      salePrice: 430.0,
      weight: '500 ml',
      shortDescription: 'Himalayan Botanical Infusion.',
      description: 'Invigorating natural herbal drink brewed with hand-selected mountain flora, citrus extracts, and digestive herbs. Refreshing hot or cold.',
      ingredients: 'Water, Mountain Herbal Extracts, Ginger, Lemon, Raw Cane Sugar, Spices.',
      benefits: 'Natural revitalizer, helps digestion, hydrating and pure.',
      storageInstructions: 'Store in a cool place. Shake well before use.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/nd-fresh-suyash-food-industries.png',
    },
    {
      sku: 'SFI-17',
      name: 'Dehydrated Garlic Powder',
      slug: 'dehydrated-garlic-powder',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 599.0,
      salePrice: 430.0,
      weight: '150g',
      shortDescription: '100% Pure Mountain Garlic Granules.',
      description: 'Slow-dehydrated from pungent mountain garlic cloves known for intense aroma and natural allicin potency. Perfect for marinades, soups, rubs, and garlic bread.',
      ingredients: '100% Dehydrated Mountain Garlic.',
      benefits: 'Potent natural immunity booster, cardiovascular support, intense culinary seasoning.',
      storageInstructions: 'Keep cap tightly closed to avoid clumping.',
      isFeatured: false,
      isBestSeller: true,
      image: '/images/products/dehydrated-garlic-powder.png',
    },
    {
      sku: 'SFI-18',
      name: 'Pure Desi Ghee',
      slug: 'pure-desi-ghee',
      category: 'Dimple’s Jar',
      brand: 'Dimple’s Jar',
      regularPrice: 899.0,
      salePrice: 800.0,
      weight: '500 ml',
      shortDescription: 'Traditional Bilona Churned Mountain Cow Ghee.',
      description: 'Prepared using traditional Vedic Bilona techniques from the cultured whole curd of free-grazing Himalayan hill cows. Golden granulated texture with unmatched aroma.',
      ingredients: '100% Clarified Butterfat from Mountain Cow Milk Curd.',
      benefits: 'Rich in butyric acid, fat-soluble vitamins A, D, E, K; nourishes gut and vitality.',
      storageInstructions: 'Store in glass container at room temperature.',
      isFeatured: true,
      isBestSeller: true,
      image: '/images/products/pure-desi-ghee-suyash-food-industries.png',
    },
    {
      sku: 'SFI-19',
      name: 'Nilansh Gold Kala Jira',
      slug: 'nilansh-gold-kala-jira',
      category: 'Nilansh Gold',
      brand: 'Nilansh Gold',
      regularPrice: 199.0,
      salePrice: 120.0,
      weight: '100g',
      shortDescription: 'Wild Shahi Kala Jeera (Black Cumin).',
      description: 'Foraged wild black cumin seeds from high mountain terrain. Slender, dark, and intensely aromatic, an exquisite spice for royal rice preparations and medicinal decoctions.',
      ingredients: '100% Himalayan Wild Black Cumin (Kala Jira).',
      benefits: 'Potent digestive stimulant, antimicrobial essential oils, rich royal fragrance.',
      storageInstructions: 'Store in an airtight spice container.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/kala-jira-suyash-food-industries.png',
    },
    {
      sku: 'SFI-20',
      name: 'Garlic Paste',
      slug: 'garlic-paste',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 199.0,
      salePrice: 120.0,
      weight: '200g',
      shortDescription: 'Farm-Fresh Culinary Puree.',
      description: 'Freshly minced and ground Himalayan garlic blended with edible oil and rock salt. No artificial colors or chalky fillers.',
      ingredients: 'Fresh Mountain Garlic (85%), Sunflower Oil, Salt, Acidity Regulator.',
      benefits: 'Saves preparation time with pure unadulterated mountain garlic flavor.',
      storageInstructions: 'Refrigerate after opening.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/garlic-paste-suyash-food-industries.png',
    },
    {
      sku: 'SFI-21',
      name: 'Ginger Paste',
      slug: 'ginger-paste',
      category: 'Himalayan Organic Staples',
      brand: 'Suyash Food Industries',
      regularPrice: 210.0,
      salePrice: 190.0,
      weight: '200g',
      shortDescription: 'Authentic Zesty Mountain Ginger.',
      description: 'Pure, pungent hill ginger paste with vibrant natural heat and warming fragrance. Adds authentic mountain depth to curries and marinades.',
      ingredients: 'Fresh Mountain Ginger (85%), Sunflower Oil, Salt, Citric Acid.',
      benefits: 'Anti-inflammatory gingerols, aids digestion, intense natural zest.',
      storageInstructions: 'Refrigerate after opening.',
      isFeatured: false,
      isBestSeller: false,
      image: '/images/products/ginger-paste-suyash-food-industries.png',
    },
  ];

  for (const p of products) {
    const catId = categoriesMap[p.category] || Object.values(categoriesMap)[0];
    const brandId = brandsMap[p.brand] || Object.values(brandsMap)[0];

    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        slug: p.slug,
        regularPrice: p.regularPrice,
        salePrice: p.salePrice,
        shortDescription: p.shortDescription,
        description: p.description,
        ingredients: p.ingredients,
        benefits: p.benefits,
        storageInstructions: p.storageInstructions,
        categoryId: catId,
        brandId: brandId,
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        isInStock: true,
        stockQuantity: 100,
      },
      create: {
        sku: p.sku,
        name: p.name,
        slug: p.slug,
        regularPrice: p.regularPrice,
        salePrice: p.salePrice,
        shortDescription: p.shortDescription,
        description: p.description,
        ingredients: p.ingredients,
        benefits: p.benefits,
        storageInstructions: p.storageInstructions,
        categoryId: catId,
        brandId: brandId,
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        isInStock: true,
        stockQuantity: 100,
        images: {
          create: [
            {
              url: p.image,
              altText: p.name,
              isMain: true,
              order: 0,
            },
          ],
        },
        variations: {
          create: [
            {
              name: p.weight,
              weight: p.weight,
              regularPrice: p.regularPrice,
              salePrice: p.salePrice,
              stockQuantity: 100,
              sku: `${p.sku}-V1`,
            },
          ],
        },
      },
    });
  }
  console.log(`Seeded all ${products.length} Products with images and variations.`);

  // 5. Hero Banners
  const banners = [
    {
      title: 'Pure Himalayan Purity',
      subtitle: 'Directly From Solan, Himachal Pradesh',
      description: 'Discover unpolished traditional grains, cold-pressed wild apricot oils, and handcrafted mountain delicacies.',
      ctaText: 'Explore Himalayan Catalogue',
      ctaLink: '/shop',
      imageUrl: '/images/products/lal-chawal-suyash-food-industries.jpeg',
      order: 1,
    },
    {
      title: 'Wild Mountain Apricot Oil',
      subtitle: '100% Cold-Pressed Saroj’s Heritage',
      description: 'Traditional Chuli oil extracted from high-altitude wild mountain orchards for radiant skin and hair vitality.',
      ctaText: 'Enquire on WhatsApp',
      ctaLink: '/product/pure-wild-apricot-oil',
      imageUrl: '/images/products/pure-wild-apricot-oil-suyash-industries.jpeg',
      order: 2,
    },
    {
      title: 'Heritage Bilona Desi Ghee',
      subtitle: 'Dimple’s Jar Artisanal Kitchen',
      description: 'Churned from cultured hill cow milk using Vedic curd churning methods. Granular, aromatic, and pure.',
      ctaText: 'Discover Ghee & Preserves',
      ctaLink: '/product/pure-desi-ghee',
      imageUrl: '/images/products/pure-desi-ghee-suyash-food-industries.png',
      order: 3,
    },
  ];

  for (const b of banners) {
    await prisma.banner.create({
      data: b,
    });
  }
  console.log(`Seeded ${banners.length} Hero Banners.`);

  // 6. Testimonials (Real customer testimonials from live site audit)
  const testimonials = [
    {
      name: 'Rohit Sharma',
      role: 'Verified Customer / Student',
      location: 'Solan, HP',
      content: 'I purchased the Pure Wild Apricot Oil, and the quality exceeded my expectations. It\'s completely natural, lightweight, and has become an essential part of my daily skincare routine. Highly recommended!',
      rating: 5,
      order: 1,
    },
    {
      name: 'Neha Verma',
      role: 'Manager',
      location: 'Chandigarh',
      content: 'The Chitra Rajma and Lal Chawal cook beautifully and have an authentic taste. You can clearly see the difference in quality compared to regular market products. Fresh, clean, and worth buying.',
      rating: 5,
      order: 2,
    },
    {
      name: 'Amit Thakur',
      role: 'Food Blogger',
      location: 'Shimla',
      content: 'The dried apple slices are delicious and make a perfect healthy snack. They retain their natural orchard sweetness without any artificial taste. My entire family loved them.',
      rating: 5,
      order: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log(`Seeded ${testimonials.length} Testimonials.`);

  // 7. Website Settings
  const settings = [
    { key: 'whatsapp_number', value: '+919805565679', description: 'Business WhatsApp Click-to-Chat number' },
    { key: 'contact_phone', value: '+91 98055 65679', description: 'Primary business telephone number' },
    { key: 'contact_email', value: 'suyashfoodindustries@gmail.com', description: 'Business email address' },
    { key: 'business_address', value: 'Near Regional Hospital, Solan, Himachal Pradesh, INDIA', description: 'Headquarters physical address' },
    { key: 'announcement_text', value: '🌿 Authentic Himalayan Produce from Solan, HP • Direct Farm Sourcing • Enquire on WhatsApp for Retail & Wholesale', description: 'Header announcement bar notification' },
    { key: 'instagram_url', value: 'https://www.instagram.com/suyashfoodindustries', description: 'Official Instagram profile' },
    { key: 'facebook_url', value: 'https://www.facebook.com/suyashfoodindustries', description: 'Official Facebook page' },
    { key: 'default_whatsapp_message', value: 'Hello Suyash Food Industries, I would like to enquire about your authentic Himalayan products.', description: 'Default template for general WhatsApp enquiries' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`Seeded ${settings.length} Website Settings.`);

  // 8. Sample Enquiries (for immediate Admin CRM testing)
  const sampleEnquiry = await prisma.enquiry.upsert({
    where: { referenceNumber: 'SFI-ENQ-2026-1001' },
    update: {},
    create: {
      referenceNumber: 'SFI-ENQ-2026-1001',
      customerName: 'Vikramaditya Chauhan',
      customerPhone: '+919816012345',
      customerEmail: 'vikram.chauhan@example.com',
      customerCity: 'Shimla',
      customerMessage: 'Looking for 10 bottles of Wild Apricot Oil for our wellness boutique in Shimla.',
      status: EnquiryStatus.NEW,
      items: {
        create: [
          {
            productId: (await prisma.product.findUnique({ where: { sku: 'SFI-11' } }))!.id,
            productName: 'Wild Apricot Oil (Saroj’s Heritage)',
            variationName: '250 ml',
            quantity: 10,
            unitPrice: 580.0,
            totalPrice: 5800.0,
          },
        ],
      },
    },
  });
  console.log(`Seeded initial Enquiry: ${sampleEnquiry.referenceNumber}`);

  console.log('--- DATABASE SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
