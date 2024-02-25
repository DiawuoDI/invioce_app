const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3030;
require('dotenv/config');

const userRoutes = require('./src/routes/userRoute');
const invoiceRoute = require('./src/routes/invoiceRouter');
const itemRoute = require('./src/routes/itemRouter');
const clientRoute = require('./src/routes/clientRouter');

app.use(express.json());
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

//USING THE ROUTE
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/invoice', invoiceRoute);
app.use('/api/v1/item', itemRoute);
app.use('/api/v1/client', clientRoute);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})