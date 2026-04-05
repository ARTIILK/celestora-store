import { ChevronRight, Copy, Check, Users, TrendingUp, Trophy, Star, Shield, Layout, Palette, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig, useCategories, useProducts } from "@/hooks/use-store-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "wouter";

export default function Home() {
  const { data: config, isLoading: isConfigLoading } = useSiteConfig();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const enabledCategories = categories?.filter(c => c.enabled) || [];

  const copyIP = () => {
    if (config?.serverIP) {
      const text = config.serverIP;
      const onSuccess = () => {
        setCopied(true);
        toast({
          title: "IP Copied!",
          description: "The server IP has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
          copyToClipboardFallback(text, onSuccess);
        });
      } else {
        copyToClipboardFallback(text, onSuccess);
      }
    }
  };

  const copyToClipboardFallback = (text, cb) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      cb();
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  if (isConfigLoading || isCategoriesLoading || isProductsLoading) {
    return (
      <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto space-y-20">
        <div className="space-y-6 text-center mt-20">
          <Skeleton className="h-16 w-3/4 max-w-2xl mx-auto rounded-3xl bg-white/5" />
          <Skeleton className="h-6 w-1/2 max-w-md mx-auto rounded-xl bg-white/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-96 w-full rounded-[2rem] bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const featuredProducts = products?.filter(p => p.featured) || [];

  return (
    <div className="relative w-full min-h-screen pb-40 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[180px]" />
      </div>

      <section className="relative pt-40 pb-32 lg:pt-64 lg:pb-56 px-4 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative max-w-6xl mx-auto space-y-16"
        >
          {config?.logo && (
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-primary/40 blur-[40px] rounded-full scale-110" />
              <img
                src={config.logo}
                alt="Logo"
                className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 drop-shadow-[0_0_80px_rgba(var(--primary),0.8)] cursor-pointer hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          )}

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-4"
            >
              <span className="text-xs md:text-sm text-primary font-black uppercase tracking-[0.5em]">The Ultimate Marketplace</span>
            </motion.div>
            
            <h1 className="font-display text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-[0.8] tracking-tighter text-glow uppercase italic select-none">
              {config?.serverName || "Our Server"}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/50 max-w-3xl mx-auto font-medium tracking-tight leading-tight">
              Premium Minecraft services crafted for <span className="text-white italic">serious players</span> and <span className="text-secondary italic">competitive squads</span>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 pt-12">
            <a href="#store" className="w-full md:w-auto">
              <Button className="w-full md:w-auto h-24 px-16 text-2xl font-black rounded-lg bg-primary hover:bg-primary/90 text-white shadow-2xl transition-all duration-300 border-none uppercase tracking-tighter italic group">
                Enter the Store <ChevronRight className="w-8 h-8 ml-4 group-hover:translate-x-4 transition-transform" />
              </Button>
            </a>

            <div
              onClick={copyIP}
              className="group cursor-pointer flex items-center gap-6 px-10 py-6 rounded-xl premium-blur border border-white/5 transition-all duration-700 hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col items-start translate-y-1">
                <span className="text-[10px] text-secondary font-black uppercase tracking-[0.4em] mb-1">Explore Server</span>
                <span className="font-display font-black text-2xl text-white tracking-tight">{config?.serverIP || "play.example.com"}</span>
              </div>
              <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: TrendingUp, title: "Instant Delivery", desc: "Get your products delivered immediately after purchase with our automated systems." },
            { icon: Layout, title: "Professional Service", desc: "Experience a smooth and professional transaction from start to finish." },
            { icon: Shield, title: "Active Support", desc: "Our team is always online to help you with quick replies and expert assistance." },
            { icon: Trophy, value: "Competitive Pricing", desc: "We offer the best market rates for premium Minecraft products and services." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl glass-panel border-white/10 space-y-4 text-center group"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">{item.title}</h3>
              <p className="text-white/40 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="store" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10 scroll-mt-32">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs text-primary font-black uppercase tracking-[0.4em]">Official Store</span>
            <h2 className="font-display text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Featured Items</h2>
          </div>
          <p className="text-white/40 max-w-sm text-center md:text-right font-medium leading-relaxed">
            Enhance your gameplay with our handpicked selection of top-tier ranks, bundles, and cosmetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-xs text-accent font-black uppercase tracking-[0.4em]">Explore Categories</span>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">Store Departments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabledCategories.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-96 rounded-xl overflow-hidden border border-white/10 glass-panel cursor-pointer shadow-2xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                {category.bannerImage ? (
                  <img
                    src={category.bannerImage}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                )}

                <div className="absolute bottom-10 left-10 right-10 z-20 space-y-2">
                  <div className="h-1 w-12 bg-primary rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  <h3 className="font-display text-4xl font-black text-white tracking-tighter italic uppercase group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/60 font-medium tracking-tight line-clamp-2 max-w-sm">
                    {category.description}
                  </p>
                </div>

                <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40 relative z-10">
        <div className="glass-panel p-12 md:p-24 rounded-xl text-center space-y-16 border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 blur-[150px] pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <h2 className="font-display text-7xl md:text-9xl font-black text-white tracking-tighter italic uppercase text-glow">JOIN THE VOID</h2>
            <p className="text-2xl text-white/50 max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
              Step into the exclusive Celestora circle. Receive instant product drops, direct staff support, and community perks found nowhere else.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { icon: Star, value: "250+", label: "Total Vouches" },
              { icon: Users, value: "Trusted", label: "Community Seller" },
              { icon: Shield, value: "100%", label: "Legit & Safe" },
              { icon: TrendingUp, value: "Instant", label: "Delivery Speed" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-primary flex justify-center mb-4"><stat.icon className="w-6 h-6" /></div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-black">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-8">
            <a href={config?.discord} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-500 hover:scale-105 active:scale-95 border-none uppercase tracking-tighter italic shadow-[0_20px_50px_rgba(88,101,242,0.4)]">
                Launch Discord
              </Button>
            </a>
            <Button
              onClick={copyIP}
              variant="outline"
              className="w-full sm:w-auto h-20 px-12 text-xl font-black rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-500 hover:scale-105 active:scale-95 uppercase tracking-tighter italic"
            >
              Contact Discord
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
