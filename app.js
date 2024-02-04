const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 3030;
require('dotenv/config');

const userRoutes = require('./src/routes/userRoute');
const invoiceRoute = require('./src/routes/invoiceRoute');

app.use(express.json());
app.use(bodyparser.json());

//USING THE ROUTE
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/invoice', invoiceRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})