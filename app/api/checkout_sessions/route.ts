import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest){
    const formData = await req.formData();
    const cartString = formData.get("cart");

    if (!cartString || typeof cartString !== "string") {
        return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    let cart: Record<string, number>;
    try {
        cart = JSON.parse(cartString);
    } catch {
        return NextResponse.json({ error: "Malformed cart JSON" }, { status: 400 });
    }

    const line_items = Object.entries(cart).map(([priceId, quantity]) => ({
        price : priceId,
        quantity,
    }))

    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/?canceled=true`,
        });
        return NextResponse.redirect(session.url!, 303);
    } catch (err) {
        return NextResponse.json(
        { error: "Stripe session creation failed" },
        { status: 500 }
        )
    }
}