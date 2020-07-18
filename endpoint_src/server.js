const express = require('express')
    , ProcessPayment = require('./processPayment')
    , ProcessOrderDetails = require('./create-orderDetails')
;

const app = express();
app.use(express.json());

app.post('/paymentapi', async function (req, res) {
    if (!req.body) {
        res.status(400).send("Missing body");
        return;
    }
    if (!req.body.nonce) {
        res.status(400).send("Missing nonce");
        return;
    }
    if (!req.body.amount) {
        res.status(400).send("Missing amount");
        return;
    }

    const [orderDetails] = ProcessOrderDetails.createPaymentDetails(req.body);

    try {
    //req.body
        const pmtRply = await ProcessPayment.createAnAcceptPaymentTransaction(req.body.nonce, req.body.amount, orderDetails)
        res.json(pmtRply);
        res.status(201).send();
    } catch (ex) {
        res.json(ex);
        res.status(500).send();
    }
    return
});

app.listen(4202, () => console.log('Node server is running..'));