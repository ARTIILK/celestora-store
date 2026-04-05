import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, User, CreditCard, ChevronLeft, Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const { cart, currency, updateQuantity, removeFromCart, getTotal, clearCart, exchangeRate } = useStore();
    const [username, setUsername] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const currencySymbol = currency === 'USD' ? '$' : '₹';

    const getOrderSummaryString = () => {
        const items = cart.map(item => `- ${item.name} (x${item.quantity}) | ${currencySymbol}${(currency === 'USD' ? item.priceUSD : (item.priceUSD * exchangeRate)).toLocaleString()} | ${item.stock || 'In Stock'}`).join('\n');
        return `🛒 CELESTORA ORDER SUMMARY 🛒\n--------------------------------\nPlayer: ${username || 'Not Specified'}\nTotal: ${currencySymbol}${getTotal().toLocaleString()}\n\nItems:\n${items}`;
    };

    const handleCopyDetails = () => {
        if (!username.trim()) {
            toast({ title: "Name Required", description: "Enter your username before copying.", variant: "destructive" });
            return;
        }
        navigator.clipboard.writeText(getOrderSummaryString());
        toast({ title: "Copied!", description: "Order details copied to clipboard. Send them on Discord!" });
    };

    const handleCheckout = () => {
        if (!username.trim()) {
            toast({
                title: "Username Required",
                description: "Please enter your Minecraft username to continue.",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            // We don't clear cart yet so they can copy if they missed it? 
            // Better to clear after success screen or on button click.
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass-panel p-12 rounded-xl border-primary/20 space-y-8"
                >
                    <div className="h-24 w-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto animate-bounce-slow">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Order Ready!</h2>
                        <p className="text-white/60 font-medium">
                            Thank you, <span className="text-primary">{username}</span>! Please complete the next step:
                        </p>
                        
                        <div className="space-y-4 pt-4 text-left">
                            <Button 
                                onClick={handleCopyDetails}
                                className="w-full h-16 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10"
                            >
                                <ShoppingBag className="w-5 h-5 mr-3" /> Copy Full Order Details
                            </Button>

                            <a 
                                href="https://discord.com/users/1102501002734747758" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <Button className="w-full h-16 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl shadow-lg shadow-[#5865F2]/20 border-none uppercase tracking-tighter italic">
                                    Message Staff Directly
                                </Button>
                            </a>
                        </div>
                        
                        <p className="text-sm text-white/40 italic pt-4">
                            Send the copied details to the ID above for instant verification and delivery.
                        </p>
                    </div>
                    <Link href="/">
                        <Button 
                            onClick={clearCart}
                            className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black italic uppercase shadow-xl shadow-primary/20 mt-8"
                        >
                            Back to Store
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-8">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase mb-4">Your bag is empty</h2>
                <Link href="/">
                    <Button variant="outline" className="border-white/10 text-white">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Left Side: Items & Info */}
                    <div className="flex-1 space-y-10">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Checkout</h1>
                        </div>

                        {/* Username Section */}
                        <section className="glass-panel p-8 rounded-xl border-white/10 space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <User className="w-6 h-6" />
                                <h3 className="text-xl font-black italic uppercase">1. Player Information</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-black uppercase tracking-widest text-white/40">Minecraft Username</label>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your IGN..."
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="h-16 bg-black/40 border-white/10 rounded-xl text-lg font-bold text-white px-6 focus:border-primary/50 transition-all pl-14"
                                    />
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                </div>
                                <p className="text-xs text-white/40 italic font-medium">Please make sure this is exactly your in-game name.</p>
                            </div>
                        </section>

                        {/* Items Section */}
                        <section className="glass-panel p-8 rounded-xl border-white/10 space-y-8">
                            <div className="flex items-center gap-3 text-primary">
                                <ShoppingBag className="w-6 h-6" />
                                <h3 className="text-xl font-black italic uppercase">2. Review Items</h3>
                            </div>

                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="h-24 w-24 bg-black/40 p-4 rounded-xl flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = 'https://ui-avatars.com/api/?name=' + item.name + '&background=random';
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="text-xl font-bold text-white">{item.name}</h4>
                                            <p className="text-primary font-black">{currencySymbol}{(currency === 'USD' ? item.priceUSD : (item.priceUSD * exchangeRate)).toLocaleString()}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="h-10 w-10 flex items-center justify-center text-white/40 hover:text-white"
                                                >
                                                    <Minus className="w-5 h-5" />
                                                </button>
                                                <span className="w-10 text-center text-white font-black text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="h-10 w-10 flex items-center justify-center text-white/40 hover:text-white"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-white/20 hover:text-red-500 rounded-xl"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="w-full md:w-[400px] space-y-8">
                        <section className="glass-panel p-8 rounded-xl border-primary/20 sticky top-32">
                            <div className="flex items-center gap-3 text-primary mb-8">
                                <CreditCard className="w-6 h-6" />
                                <h3 className="text-xl font-black italic uppercase">Order Summary</h3>
                            </div>

                            <div className="space-y-4 pb-8 border-b border-white/5">
                                <div className="flex justify-between text-white/60 font-medium">
                                    <span>Subtotal</span>
                                    <span>{currencySymbol}{getTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-white/60 font-medium">
                                    <span>Service Fee</span>
                                    <span>{currencySymbol}0.00</span>
                                </div>
                            </div>

                            <div className="py-8 space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-white/40 font-black uppercase text-xs tracking-widest">Total Amount</span>
                                    <span className="text-4xl font-black text-white italic tracking-tighter">
                                        <span className="text-primary text-xl mr-1">{currencySymbol}</span>
                                        {getTotal().toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    <span className="text-white/80 font-medium">Secure Payment</span>
                                </div>

                                <Button
                                    disabled={isProcessing}
                                    onClick={handleCheckout}
                                    className="w-full h-20 text-xl font-black rounded-lg bg-primary hover:bg-primary/90 text-white shadow-xl border-none uppercase tracking-tighter italic transition-all active:scale-95"
                                >
                                    {isProcessing ? "Processing..." : "Complete Purchase"}
                                </Button>

                                <p className="text-[10px] text-center text-white/30 uppercase tracking-[0.2em] font-medium px-4">
                                    By clicking complete purchase, you agree to our Terms of Service.
                                </p>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}
