import { Link } from "@tanstack/react-router";
import { ShoppingCart, Gift, Search, Camera } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount());
  const loadOrCreate = useCartStore((s) => s.loadOrCreate);

  useEffect(() => {
    loadOrCreate();
  }, [loadOrCreate]);

  return (
    <header className="sticky top-0 z-40 w-full bg-header border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center gap-4 px-4 h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-9 rounded-md bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground font-black text-lg">
            J
          </div>
          <span className="font-extrabold text-xl tracking-tight hidden sm:block">
            JUMINI
          </span>
        </Link>

        <div className="flex-1 max-w-xl relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search products, brands and categories"
            className="w-full pl-10 pr-12 h-10 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <button 
            title="SmartLens Visual Search"
            onClick={() => toast.info("SmartLens visual search is coming soon!", {
              description: "You'll be able to search products by taking a photo."
            })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
          >
            <Camera className="size-5" />
          </button>
        </div>

        <nav className="flex items-center gap-1 ml-auto">
          <Link
            to="/wishlists"
            className="flex items-center gap-2 px-3 h-10 rounded-md hover:bg-secondary text-sm font-medium"
            activeProps={{ className: "text-primary" }}
          >
            <Gift className="size-5" />
            <span className="hidden sm:inline">Wishlists</span>
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-3 h-10 rounded-md hover:bg-secondary text-sm font-medium"
            activeProps={{ className: "text-primary" }}
          >
            <div className="relative">
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 bg-primary text-primary-foreground text-[10px] rounded-full grid place-items-center">
                  {itemCount}
                </Badge>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
