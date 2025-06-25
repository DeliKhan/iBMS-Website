import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const products = await stripe.prices.list({expand: ['data.product'],limit: 30});

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products from Stripe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from Stripe' },
      { status: 500 }
    );
  }
}