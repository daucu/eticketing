const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const fileupload = require('express-fileupload');
//connect to database
const connectDB = require('./config/connection');
connectDB();
//allow json to parsed
app.use(express.json());

//allow static files
app.use(express.static(__dirname + '/uploads'));

//enable file upload using express-fileupload
app.use(fileupload({ createParentPath: true }));

//routes
app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/ticket', require('./routes/ticket'));
app.use('/api/brand', require('./routes/brand'));


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});