import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import Navbar from '../_components/Navbar';
import { OrderConfirmed } from './orderConfirmed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface SuccessProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}


export default async function Success({ searchParams }: SuccessProps) {
    const resolvedSearchParams = await searchParams;
    const { session_id } = resolvedSearchParams;

    if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
    });

    const status = session.status;
    const customerEmail = session.customer_details?.email;

    if (status === 'open') {
    return redirect('/');
    }

    if (status === 'complete') {
    return (
    <>
        <Navbar/>
        <div className="flex grow flex-col bg-black px-5 pt-8 pb-10 h-screen" style={{
                    backgroundImage: "url('/elipses.png')", 
        }}>
            <section id="success">
                <OrderConfirmed/>
                <h1 className='text-white text-2xl'>
                We appreciate your business! A confirmation email will be sent to{' '}
                <span className='text-white text-2xl font-bold'>{customerEmail}</span>. If you have any questions, please email{' '}
                <a className="text-white underline" href="mailto:orders@example.com">orders@example.com</a>.
                </h1>
            </section>
        </div>
    </>
    );
  }

  // Optional: handle unexpected statuses
  return (
    <section id="success">
      <p>Session status: {status}</p>
    </section>
  );
}
