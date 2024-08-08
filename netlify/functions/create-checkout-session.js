const stripe = require('stripe')(process.env.DEV_STRIPE_SECRET_KEY);

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
      tipAmount = 0,
      connectedAccountId,  // New field for connected account ID
    } = JSON.parse(event.body);

    if (!customerEmail || !customerName) {
      throw new Error('Both customer email and customer name are required.');
    }

    const truncatedUrl = pageUrl.length > 500 ? pageUrl.substring(0, 500) : pageUrl;

    let dynamicAmountCents = Math.round(cost * 100);
    let tipAmountCents = Math.round(tipAmount * 100);

    const validFrequencies = [1, 2, 3, 4];
    if (!validFrequencies.includes(serviceFrequency)) {
      throw new Error('Invalid service frequency. Must be 1, 2, 3 times per week, or Once Only.');
    }

    if (serviceFrequency === 2) {
      dynamicAmountCents *= 2;
    }

    let customer = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    }).then(customers => customers.data[0]);

    let isNewCustomer = false;
    if (!customer) {
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
      case 4:
        priceId = 'price_1PirPRKHJvXfkmw3CoGToaOp';
        mode = 'payment';
        break;
      default:
        throw new Error('Invalid service frequency');
    }

    const successUrl = serviceFrequency === 4
      ? `${process.env.URL}/success`
      : `${process.env.URL}/success-recurring`;

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

    if (tipAmountCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tip',
            description: 'Optional tip',
          },
          unit_amount: tipAmountCents,
        },
        quantity: 1,
      });
    }

    if (isNewCustomer) {
      const feeProductId = 'price_1Pl0ZfKHJvXfkmw3nw7zrHWD'; 
      lineItems.push({
        price: feeProductId,
        quantity: 1,
      });
    }

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
        application_fee_amount: Math.round(dynamicAmountCents * 0.1), // 10% platform fee
        transfer_data: {
          destination: connectedAccountId,
        },
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
