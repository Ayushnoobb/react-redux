// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NI7YkIjvlp0dZE3siPvi3hTyQShPUBbSqaoTC5xEPTkAtEhbgElppK3LPMxTPmBYhgu62zToifcM3WIKAjPThgF00bGAeJmuN');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://127.0.0.1:5173';

app.post('/product/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NI8SNIjvlp0dZE351kRMthw',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});



app.listen(4242, () => console.log('Running on port 4242'));