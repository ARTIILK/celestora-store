export const mockData = {
  siteConfig: {
    serverName: "Celestora Store",
    serverIP: "Discord: celestora__",
    logo: "/celestora_logo_1775370296471.png",
    discord: "https://discord.com/users/1102501002734747758", // Generic link, user should provide real one
    currency: ["INR", "USD"],
    defaultCurrency: "INR",
    theme: {
      primary: "#10b981", // Emerald
      secondary: "#0a0a0a",
      accent: "#f59e0b", // Gold
      background: "#050505"
    },
    backgroundAnimation: {
      enabled: true,
      type: "floatingParticles",
      density: 100,
      speed: 0.5
    }
  },
  categories: [
    {
      id: "premium-services",
      name: "Available Products",
      description: "Our core gaming services and products at competitive prices.",
      bannerImage: "/minecraft_premium_services_banner_1775370353860.png",
      enabled: true
    },
    {
      id: "upgrades-extras",
      name: "Minecraft Upgrades & Extras",
      description: "Enhance your gaming identity with custom skins, capes, and more.",
      bannerImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
      enabled: true
    }
  ],
  products: [
    {
      id: "mc_redeem_code",
      name: "Minecraft Redeem Code",
      categoryId: "premium-services",
      priceINR: 1200,
      priceUSD: 14.50,
      description: "A fresh Minecraft redeem code to get the full game on your account.",
      image: "https://ui-avatars.com/api/?name=Code&background=10b981&color=fff",
      featured: true,
      stock: "Limited Stock",
      checkoutURL: "#"
    },
    {
      id: "mc_premium_account",
      name: "Minecraft Premium Account",
      categoryId: "premium-services",
      priceINR: 550,
      priceUSD: 6.99,
      description: "Stable and secure premium account with full access.",
      image: "https://ui-avatars.com/api/?name=Acc&background=10b981&color=fff",
      featured: true,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "discord_nitro",
      name: "Discord Nitro Gift Link",
      categoryId: "premium-services",
      priceINR: 600,
      priceUSD: 7.50,
      description: "Instant delivery of a Discord Nitro gift link.",
      image: "https://ui-avatars.com/api/?name=Nitro&background=5865F2&color=fff",
      featured: true,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "custom_capes",
      name: "Custom Capes",
      categoryId: "upgrades-extras",
      priceINR: 350,
      priceUSD: 4.50,
      description: "Clean and stylish custom capes for your character.",
      image: "https://ui-avatars.com/api/?name=Cape&background=fbbf24&color=fff",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "premium_cosmetics",
      name: "Premium Cosmetics / Cloaks",
      categoryId: "upgrades-extras",
      priceINR: 450,
      priceUSD: 5.99,
      description: "Stand out with unique cosmetics and cloaks in-game.",
      image: "https://ui-avatars.com/api/?name=Cos&background=fbbf24&color=fff",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "og_usernames",
      name: "OG & Rare Usernames",
      categoryId: "upgrades-extras",
      priceINR: 2000,
      priceUSD: 24.99,
      description: "Limited stock of highly exclusive and rare usernames.",
      image: "https://ui-avatars.com/api/?name=OG&background=fbbf24&color=fff",
      featured: true,
      stock: "Low Stock",
      checkoutURL: "#"
    },
    {
      id: "hypixel_ready",
      name: "Hypixel Ready Accounts",
      categoryId: "upgrades-extras",
      priceINR: 850,
      priceUSD: 10.50,
      description: "Accounts confirmed ready to play on Hypixel.",
      image: "https://ui-avatars.com/api/?name=HYP&background=fbbf24&color=fff",
      featured: true,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "pvp_smp_ready",
      name: "PvP / Lifesteal / SMP Ready Accounts",
      categoryId: "upgrades-extras",
      priceINR: 750,
      priceUSD: 8.99,
      description: "High-quality accounts ready for active survival and PvP servers.",
      image: "https://ui-avatars.com/api/?name=PvP&background=fbbf24&color=fff",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "fresh_gifted",
      name: "Fresh & Gifted Accounts",
      categoryId: "upgrades-extras",
      priceINR: 650,
      priceUSD: 7.99,
      description: "Brand new accounts, perfect for starting your journey fresh.",
      image: "https://ui-avatars.com/api/?name=Gift&background=fbbf24&color=fff",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    },
    {
      id: "resource_packs",
      name: "Custom Resource Packs (On Demand)",
      categoryId: "upgrades-extras",
      priceINR: 500,
      priceUSD: 6.50,
      description: "Get a custom resource pack tailored to your aesthetic preferences.",
      image: "https://ui-avatars.com/api/?name=Pack&background=fbbf24&color=fff",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    }
  ]
};

