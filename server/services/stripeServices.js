const stripe = require("stripe")(process.env.STRIPE_KEY);

const createCheckoutSession = async () => {
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: process.env.PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.REACT_APP_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.REACT_APP_URL}?canceled=true`,
        allow_promotion_codes: true
    });

    return session
}

module.exports = {
    createCheckoutSession
}