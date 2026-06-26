export type Produit = {
  slug: string
  nom: string
  categorie: 'Miel' | 'Chenille'
  producteur: string
  note: string
  avis: number
  prix: string
  unite: string
  image: string
  description: string
  descriptionLongue: string
  origine: string
  typeProduit: string
  texture: string
  gout: string
  conservation: string
  stock: string
  conditionnements: string[]
  conditionnementActif: string
  producteurDescription: string
  producteurStats: string[]
  caracteristiques: {
    icone: string
    label: string
  }[]
  bienfaits: string[]
}

export const produits: Produit[] = [
  {
    slug: 'miel-foret-wolou',
    nom: 'Miel de Forêt du Wolou',
    categorie: 'Miel',
    producteur: 'Apiculteur Jean-Pierre',
    note: '★★★★☆',
    avis: 128,
    prix: '4 500 XAF',
    unite: '/ pot',
    image: '/images/product-honey-forest.png',
    description:
      'Miel pur et naturel récolté dans les forêts du Woleu-Ntem. Riche en saveurs et en bienfaits, ce miel artisanal est récolté avec soin par des apiculteurs passionnés.',
    descriptionLongue:
      'Le Miel de Forêt du Wolou est issu des fleurs sauvages des forêts du Woleu-Ntem. Sa couleur ambrée foncée, son arôme boisé et son goût unique en font un miel de caractère.',
    origine: 'Woleu-Ntem, Gabon',
    typeProduit: 'Miel de forêt',
    texture: 'Épaisse et onctueuse',
    gout: 'Boisé, légèrement caramélisé',
    conservation: 'À conserver à température ambiante',
    stock: 'Stock disponible : 25 pots',
    conditionnements: ['250 g', '500 g', '1 kg', '2 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Apiculteur passionné depuis plus de 10 ans, je produis un miel naturel et de qualité dans le respect des abeilles et de l’environnement.',
    producteurStats: ['📍 Woleu-Ntem, Gabon', '120 produits vendus', '98% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: '100% Naturel' },
      { icone: '🛡️', label: 'Sans additifs ni conservateurs' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '💧', label: 'Récolté à froid Non chauffé' },
    ],
    bienfaits: [
      'Source naturelle d’énergie',
      'Riche en antioxydants',
      'Renforce le système immunitaire',
      'Aide à apaiser la toux et les maux de gorge',
    ],
  },
  {
    slug: 'chenilles-sechees-oyem',
    nom: "Chenilles Séchées d'Oyem",
    categorie: 'Chenille',
    producteur: 'Entomo Gabon',
    note: '★★★★☆',
    avis: 96,
    prix: '3 500 XAF',
    unite: '/ sachet',
    image: '/images/product-caterpillars-oyem.png',
    description:
      "Chenilles séchées d'Oyem, préparées selon les méthodes traditionnelles pour conserver leur goût, leur texture et leur richesse nutritionnelle.",
    descriptionLongue:
      "Ces chenilles séchées proviennent d'Oyem et sont sélectionnées avec soin. Elles sont idéales pour les sauces traditionnelles, les plats mijotés et les recettes familiales.",
    origine: 'Oyem, Gabon',
    typeProduit: 'Chenilles séchées',
    texture: 'Ferme et savoureuse',
    gout: 'Traditionnel, légèrement fumé',
    conservation: 'À conserver au sec',
    stock: 'Stock disponible : 40 sachets',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Producteur spécialisé dans la préparation de chenilles comestibles, nous valorisons les saveurs locales avec un séchage soigné.',
    producteurStats: ['📍 Oyem, Gabon', '95 produits vendus', '97% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: 'Produit naturel' },
      { icone: '🔥', label: 'Séchage traditionnel' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '🍽️', label: 'Riche en protéines' },
    ],
    bienfaits: [
      'Source naturelle de protéines',
      'Adapté aux plats traditionnels',
      'Produit local sélectionné',
      'Bonne conservation au sec',
    ],
  },
  {
    slug: 'miel-oyem-premium',
    nom: "Miel d'Oyem Premium",
    categorie: 'Miel',
    producteur: 'Les Ruchers du Gabon',
    note: '★★★★☆',
    avis: 73,
    prix: '5 000 XAF',
    unite: '/ pot',
    image: '/images/product-honey-oyem.png',
    description:
      "Miel premium d'Oyem, doux et parfumé, récolté auprès de producteurs locaux pour une qualité régulière et authentique.",
    descriptionLongue:
      "Ce miel d'Oyem Premium offre une texture généreuse et une douceur équilibrée. Il accompagne parfaitement les boissons chaudes, les tartines et les desserts.",
    origine: 'Oyem, Gabon',
    typeProduit: 'Miel premium',
    texture: 'Onctueuse',
    gout: 'Doux, floral',
    conservation: 'À conserver à température ambiante',
    stock: 'Stock disponible : 18 pots',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Les Ruchers du Gabon travaillent avec des apiculteurs locaux pour proposer des miels authentiques et réguliers.',
    producteurStats: ['📍 Oyem, Gabon', '88 produits vendus', '96% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: '100% Naturel' },
      { icone: '🍯', label: 'Qualité premium' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '💧', label: 'Non chauffé' },
    ],
    bienfaits: [
      'Apporte une énergie naturelle',
      'Goût doux et équilibré',
      'Idéal pour boissons et desserts',
      'Produit local de qualité',
    ],
  },
  {
    slug: 'chenilles-fumees-mouila',
    nom: 'Chenilles Fumées de Mouila',
    categorie: 'Chenille',
    producteur: 'Saveurs du Sud',
    note: '★★★★☆',
    avis: 58,
    prix: '4 000 XAF',
    unite: '/ sachet',
    image: '/images/product-caterpillars-mouila.png',
    description:
      'Chenilles fumées de Mouila, préparées pour apporter un goût profond et parfumé aux plats traditionnels.',
    descriptionLongue:
      'Les chenilles fumées de Mouila sont appréciées pour leur arôme marqué et leur texture. Elles conviennent aux sauces, accompagnements et recettes du terroir.',
    origine: 'Mouila, Gabon',
    typeProduit: 'Chenilles fumées',
    texture: 'Ferme',
    gout: 'Fumé et intense',
    conservation: 'À conserver au sec',
    stock: 'Stock disponible : 32 sachets',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Saveurs du Sud met en avant les produits du terroir gabonais avec des méthodes de préparation traditionnelles.',
    producteurStats: ['📍 Mouila, Gabon', '76 produits vendus', '95% d’avis positifs'],
    caracteristiques: [
      { icone: '🔥', label: 'Fumage traditionnel' },
      { icone: '🌿', label: 'Produit naturel' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '🍽️', label: 'Riche en goût' },
    ],
    bienfaits: [
      'Riche en protéines',
      'Saveur fumée authentique',
      'Parfait pour sauces locales',
      'Préparation artisanale',
    ],
  },
  {
    slug: 'miel-fleurs-sauvages',
    nom: 'Miel de Fleurs Sauvages',
    categorie: 'Miel',
    producteur: 'Les Ruchers du Gabon',
    note: '★★★★☆',
    avis: 41,
    prix: '4 200 XAF',
    unite: '/ pot',
    image: '/images/product-honey-flowers.png',
    description:
      'Miel de fleurs sauvages au goût floral, idéal pour sucrer naturellement les boissons, desserts et petits-déjeuners.',
    descriptionLongue:
      'Ce miel de fleurs sauvages rassemble les parfums de plusieurs fleurs locales. Il propose une douceur agréable et une belle polyvalence en cuisine.',
    origine: 'Gabon',
    typeProduit: 'Miel de fleurs sauvages',
    texture: 'Fluide et douce',
    gout: 'Floral, léger',
    conservation: 'À conserver à température ambiante',
    stock: 'Stock disponible : 22 pots',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Les Ruchers du Gabon valorisent les productions apicoles locales et les saveurs naturelles du terroir.',
    producteurStats: ['📍 Gabon', '104 produits vendus', '96% d’avis positifs'],
    caracteristiques: [
      { icone: '🌼', label: 'Fleurs sauvages' },
      { icone: '🌿', label: '100% Naturel' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '💧', label: 'Non chauffé' },
    ],
    bienfaits: [
      'Alternative naturelle au sucre',
      'Goût floral agréable',
      'Idéal au petit-déjeuner',
      'Produit local authentique',
    ],
  },
  {
    slug: 'miel-mangrove',
    nom: 'Miel de Mangrove',
    categorie: 'Miel',
    producteur: 'Nature & Saveurs',
    note: '★★★★☆',
    avis: 58,
    prix: '4 500 XAF',
    unite: '/ pot',
    image: '/images/product-honey-oyem.png',
    description:
      'Miel de mangrove au caractère doux et boisé, récolté dans un environnement naturel riche.',
    descriptionLongue:
      'Le miel de mangrove offre une saveur originale et légèrement boisée. Il convient aux amateurs de miels expressifs et naturels.',
    origine: 'Gabon',
    typeProduit: 'Miel de mangrove',
    texture: 'Onctueuse',
    gout: 'Doux, boisé',
    conservation: 'À conserver à température ambiante',
    stock: 'Stock disponible : 20 pots',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Nature & Saveurs sélectionne des produits naturels issus des terroirs gabonais.',
    producteurStats: ['📍 Gabon', '64 produits vendus', '94% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: '100% Naturel' },
      { icone: '🍯', label: 'Saveur boisée' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '💧', label: 'Non chauffé' },
    ],
    bienfaits: [
      'Source naturelle d’énergie',
      'Goût original',
      'Idéal pour infusions',
      'Produit du terroir',
    ],
  },
  {
    slug: 'miel-savane',
    nom: 'Miel de Savane',
    categorie: 'Miel',
    producteur: 'Apis Gabon',
    note: '★★★★☆',
    avis: 41,
    prix: '4 000 XAF',
    unite: '/ pot',
    image: '/images/category-honey.png',
    description:
      'Miel de savane léger et parfumé, adapté aux usages quotidiens et aux recettes sucrées.',
    descriptionLongue:
      'Le miel de savane propose une douceur simple et agréable. Il se consomme facilement au quotidien dans les boissons, les tartines et les préparations maison.',
    origine: 'Gabon',
    typeProduit: 'Miel de savane',
    texture: 'Fluide',
    gout: 'Léger, floral',
    conservation: 'À conserver à température ambiante',
    stock: 'Stock disponible : 28 pots',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Apis Gabon accompagne les apiculteurs locaux et propose des miels simples, naturels et accessibles.',
    producteurStats: ['📍 Gabon', '70 produits vendus', '94% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: '100% Naturel' },
      { icone: '🌾', label: 'Miel de savane' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '💧', label: 'Non chauffé' },
    ],
    bienfaits: [
      'Sucre naturellement',
      'Goût léger',
      'Adapté au quotidien',
      'Produit local',
    ],
  },
  {
    slug: 'chenilles-lastoursville',
    nom: 'Chenilles de Lastoursville',
    categorie: 'Chenille',
    producteur: 'Entomoculture Pro',
    note: '★★★★☆',
    avis: 47,
    prix: '3 800 XAF',
    unite: '/ sachet',
    image: '/images/category-caterpillars.png',
    description:
      'Chenilles de Lastoursville sélectionnées pour les recettes traditionnelles et les plats familiaux.',
    descriptionLongue:
      'Ces chenilles sont préparées avec soin pour préserver leur goût naturel. Elles peuvent être utilisées dans plusieurs recettes locales.',
    origine: 'Lastoursville, Gabon',
    typeProduit: 'Chenilles comestibles',
    texture: 'Ferme',
    gout: 'Naturel et traditionnel',
    conservation: 'À conserver au sec',
    stock: 'Stock disponible : 30 sachets',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Entomoculture Pro travaille sur la valorisation des chenilles comestibles du terroir gabonais.',
    producteurStats: ['📍 Lastoursville, Gabon', '61 produits vendus', '93% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: 'Produit naturel' },
      { icone: '🍽️', label: 'Riche en protéines' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '🧺', label: 'Sélection locale' },
    ],
    bienfaits: [
      'Riche en protéines',
      'Adapté aux plats traditionnels',
      'Produit local',
      'Bonne conservation',
    ],
  },
  {
    slug: 'chenilles-marinees',
    nom: 'Chenilles Marinées',
    categorie: 'Chenille',
    producteur: 'Délices du Terroir',
    note: '★★★★☆',
    avis: 36,
    prix: '4 500 XAF',
    unite: '/ sachet',
    image: '/images/product-caterpillars-oyem.png',
    description:
      'Chenilles marinées prêtes à intégrer vos recettes, avec une saveur travaillée et gourmande.',
    descriptionLongue:
      'Les chenilles marinées offrent une préparation plus parfumée, idéale pour varier les recettes et gagner du temps en cuisine.',
    origine: 'Gabon',
    typeProduit: 'Chenilles marinées',
    texture: 'Tendre et parfumée',
    gout: 'Assaisonné, gourmand',
    conservation: 'À conserver selon indication du producteur',
    stock: 'Stock disponible : 16 sachets',
    conditionnements: ['250 g', '500 g', '1 kg'],
    conditionnementActif: '500 g',
    producteurDescription:
      'Délices du Terroir transforme les produits locaux pour proposer des saveurs prêtes à cuisiner.',
    producteurStats: ['📍 Gabon', '44 produits vendus', '92% d’avis positifs'],
    caracteristiques: [
      { icone: '🌿', label: 'Produit local' },
      { icone: '🍽️', label: 'Prêt à cuisiner' },
      { icone: '📍', label: 'Origine Gabon' },
      { icone: '✨', label: 'Saveur marinée' },
    ],
    bienfaits: [
      'Gain de temps en cuisine',
      'Saveur déjà travaillée',
      'Riche en protéines',
      'Idéal pour recettes variées',
    ],
  },
]

export function getProduitBySlug(slug: string) {
  return produits.find((produit) => produit.slug === slug)
}

export function getProduitsSimilaires(slug: string, categorie: Produit['categorie']) {
  return produits
    .filter((produit) => produit.slug !== slug && produit.categorie === categorie)
    .slice(0, 4)
}
