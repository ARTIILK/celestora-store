import { Link } from "wouter";
import { useSiteConfig, useCategories } from "@/hooks/use-store-data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Menu, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { SkinViewer3D } from "@/components/SkinViewer3D";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { data: config, isLoading: isConfigLoading } = useSiteConfig();
  const { data: categories } = useCategories();
  const { currency, toggleCurrency, cart } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const enabledCategories = categories?.filter(c => c.enabled) || [];
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-6 z-50 w-[calc(100%-3rem)] mx-auto premium-blur rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/20 nav-float">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              {isConfigLoading ? (
                <Skeleton className="w-10 h-10 rounded-xl bg-primary/20 shrink-0" />
              ) : (
                <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 bg-black/30">
                  <SkinViewer3D
                    width={40}
                    height={40}
                    showButtons={false}
                    enableControls={false}
                    zoom={1.38}
                    className="[&>canvas]:rounded-xl"
                  />
                </div>
              )}
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 hidden sm:block">
                {config?.serverName || "Minecraft Store"}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-white font-medium">
                Home
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-white font-medium">
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-card/95 backdrop-blur-xl border-white/10">
                {enabledCategories.map((cat) => (
                  <DropdownMenuItem key={cat.id} asChild className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                    <Link href={`/category/${cat.id}`} className="w-full">
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {enabledCategories.length === 0 && (
                  <DropdownMenuItem disabled>No categories</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {config?.currency && config.currency.length > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCurrency}
                className="border-white/10 bg-black/20 hover:bg-white/10 transition-all font-mono font-bold w-[70px]"
              >
                <RefreshCcw className="w-3 h-3 mr-2 opacity-50" />
                {currency}
              </Button>
            )}

            <Button
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white shadow-xl border-none font-bold rounded-lg px-6 h-12 transition-all hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Cart ({cartItemCount})
            </Button>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card/95 backdrop-blur-xl border-l-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-left text-white font-display">Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link href="/">
                      <Button variant="ghost" className="w-full justify-start text-lg h-12">
                        Home
                      </Button>
                    </Link>
                    <div className="h-[1px] bg-white/10 my-2" />
                    <span className="text-sm font-bold text-muted-foreground px-4 uppercase tracking-wider">Categories</span>
                    {enabledCategories.map((cat) => (
                      <Link key={cat.id} href={`/category/${cat.id}`}>
                        <Button variant="ghost" className="w-full justify-start pl-8 text-base h-10 text-muted-foreground hover:text-white">
                          {cat.name}
                        </Button>
                      </Link>
                    ))}
                    <div className="h-[1px] bg-white/10 my-2" />
                    <Button
                      onClick={() => {
                        setIsCartOpen(true);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      View Cart ({cartItemCount})
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </div>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
}
