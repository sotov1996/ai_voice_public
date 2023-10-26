const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.NODE_ENV === "production" ? process.env.STRIPE_KEY_LIVE : process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (_, res) => {
    try {
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
          return res.status(200).send({
            session_url: session.url,
            session_id: session.id
          })
      } catch (e) {
        return res.send(500)
      }
})

module.exports = router;