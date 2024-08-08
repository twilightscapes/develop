const stripe = require('stripe')('process.env.DEV_STRIPE_SECRET_KEY');

// Function to fetch connected accounts
async function getConnectedAccountId() {
  try {
    const accounts = await stripe.accounts.list();
    if (accounts.data.length === 0) {
      throw new Error('No connected accounts found.');
    }
    return accounts.data[0].id; // Return the ID of the first connected account
  } catch (error) {
    console.error('Error fetching connected accounts:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  try {
    const {
      pageUrl,
      customerEmail,
      poopArea,
      dynamicAmount,
      cost,
      serviceFrequency,
      numberOfDogs,
      customerName,
      customerAddress,
      tipAmount = 0 // Tip amount in dollars
    } = JSON.parse(event.body);

    // Validate email and name
    if (!customerEmail || !customerName) {
      throw new Error('Both customer email and customer name are required.');
    }

    const truncatedUrl = pageUrl.length > 500 ? pageUrl.substring(0, 500) : pageUrl;

    // Convert dynamicAmount and tipAmount to cents
    let dynamicAmountCents = Math.round(cost * 100);
    let tipAmountCents = Math.round(tipAmount * 100);

    // Validate serviceFrequency
    const validFrequencies = [1, 2, 3, 4];
    if (!validFrequencies.includes(serviceFrequency)) {
      throw new Error('Invalid service frequency. Must be 1, 2, 3 times per week, or Once Only.');
    }

    // Adjust dynamicAmountCents for twice a week service
    if (serviceFrequency === 2) {
      dynamicAmountCents *= 2;
    }

    // Check if a customer with this email already exists
    let customer = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    }).then(customers => customers.data[0]);

    let isNewCustomer = false;
    if (!customer) {
      // Create a customer if one doesn't exist
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        address: customerAddress,
        metadata: {
          pageUrl: truncatedUrl
        }
      });
      isNewCustomer = true;
    }

    // Determine the correct price ID and interval based on service frequency
    let priceId;
    let interval = 'week';
    let intervalCount = 1;
    let mode = 'subscription';

    switch (serviceFrequency) {
      case 1:
        priceId = 'price_1PiEAXKHJvXfkmw3mnKSjeSV';
        intervalCount = 1;
        break;
      case 2:
        priceId = 'price_1PiH4sKHJvXfkmw3SP43dBjz';
        intervalCount = 1;
        break;
      case 3:
        priceId = 'price_1PiGz5KHJvXfkmw3eyKQF3n9';
        intervalCount = 2;
        break;
      case 4: // One-time payment
        priceId = 'price_1PirPRKHJvXfkmw3CoGToaOp';
        mode = 'payment'; // Change mode to payment for one-time purchase
        break;
      default:
        throw new Error('Invalid service frequency');
    }

    // Determine success URL based on service frequency
    const successUrl = serviceFrequency === 4
      ? `${process.env.URL}/success` // One-time payment success URL
      : `${process.env.URL}/success-recurring`; // Recurring payment success URL

    // Create line items for the session
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Dog Pooper's Pick Up By The Foot | ${poopArea} sq ft - ${numberOfDogs}`,
            description: `Total area for pick up: ${poopArea} sq ft\nTotal Dogs: ${numberOfDogs}\n | Manage Your Lawn Map and account details by clicking this link: ${pageUrl}`,
          },
          recurring: mode === 'subscription' ? {
            interval: interval,
            interval_count: intervalCount,
          } : undefined,
          unit_amount: dynamicAmountCents,
        },
        quantity: 1,
      },
      {
        price: priceId,
        quantity: 1,
      },
    ];

    // Add the tip line item if a tip amount is provided
    if (tipAmountCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tip',
            description: 'Optional tip',
          },
          unit_amount: tipAmountCents, // Tip amount in cents
        },
        quantity: 1,
      });
    }

    // Add an additional fee for non-existing customers
    if (isNewCustomer) {
      const feeProductId = 'price_1Pl0ZfKHJvXfkmw3nw7zrHWD'; 
      lineItems.push({
        price: feeProductId,
        quantity: 1,
      });
    }

    // Fetch the connected account ID
    const connectedAccountId = await getConnectedAccountId();

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: mode,
      customer: customer.id,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: pageUrl,
      metadata: {
        pageUrl: truncatedUrl,
        poopArea: poopArea,
        dynamicAmount: dynamicAmount,
        numberOfDogs: numberOfDogs,
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true
      },
      payment_intent_data: {
        on_behalf_of: connectedAccountId, // Route funds to connected account
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
