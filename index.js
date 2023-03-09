const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
app.use(express.json());
const {
    Configuration,
    OpenAIApi
} = require("openai");

/**CORS Allow */
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
    )

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        next()
    }
};
app.use(allowCrossDomain)

const configuration = new Configuration({
    apiKey: process.env.BEARER_TOKEN,
});
const openai = new OpenAIApi(configuration);


// サーバーを起動する
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.post("/gpt", async function (req, res) {
    console.log(req);
    const completion = openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: req.body.message,
    });
    completion.then(response => {
        res.json(response.data.choices[0].message);
    }).catch(e => {
        console.log(e);
        res.json({
            message: e
        });
    });
});