const connection = require('../../db/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const makePayment = async (req,res)=>{
    const {business_id} = req.body;
    const query = 'SELECT * FROM businesses WHERE business_id = ?'

    connection.query(query,business_id, async (err,result)=>{
        if (err){
            return res.status(400).json(err)
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: result[0].booking_price * 100,
            currency:'usd'
        });

        console.log(paymentIntent)

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    })
}

module.exports = {makePayment}