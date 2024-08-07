const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object;

      // Retrieve the customer's email and pageUrl from the session metadata
      const customerEmail = session.customer_details.email;
      const pageUrl = session.metadata.pageUrl;

      console.log(`Session completed for customer: ${customerEmail}, page URL: ${pageUrl}`);

      // Perform any additional actions (e.g., send an email)

      break;
    // Add more cases to handle other event types
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
