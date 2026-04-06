export const mockData = {
  siteConfig: {
    serverName: "Celestora Store",
    serverIP: "Discord: celestora__",
    logo: "/celestora_logo_1775370296471.png",
    discord: "https://discord.com/users/1102501002734747758", // Generic link, user should provide real one
    currency: ["INR", "USD"],
    defaultCurrency: "INR",
    theme: {
      primary: "#d946a6", // Magenta/Pink-Purple
      secondary: "#0a0a0a",
      accent: "#fbbf24", // Gold
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
      image: "/mine.webp",
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
      image: "/creep.webp",
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
      image: "/nitro.png",
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
      image: "./cape.png",
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
      image: "./ccape.png",
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
      image: "/og.webp",
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
      image: "/hipix.webp",
      featured: true,
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
      image: "./gcm.jpg",
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
      image: "./cmtr.jpg",
      featured: false,
      stock: "In Stock",
      checkoutURL: "#"
    }
  ]
};

