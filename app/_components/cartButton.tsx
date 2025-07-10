import { useCart } from "../shop/cartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/app/_components/badge";
import Link from "next/link";

export default function CartButton() {
    const { cart } = useCart();
    const totalInCart = Object.values(cart).reduce((total,qty) => total+qty, 0);
    return (
        <Link href="/cart">
            <div className="relative h-8 min-w-8">
                <ShoppingCart/>
                <Badge
                className="absolute top-0 right-0 h-3 min-w-3 rounded-full px-1 font-mono tabular-nums">
                {totalInCart}
                </Badge>
            </div>
        </Link>
    )
}