const express = require('express');
const app = express.Router();
const cors = require('cors');
const querystring = require('query-string');
const axios = require('axios');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

app.get('/authorize', function(req, res) {
    const client_id = "cli id";
    var redirect_uri = 'http://localhost:8080/google/callback';

    res.redirect('https://accounts.google.com/o/oauth2/auth?' +
        querystring.stringify({
            access_type: 'online',
            response_type: 'code',
            client_id: client_id,
            scope: SCOPES,
            redirect_uri: redirect_uri,
        }));
});

app.get('/callback', async(req, res) => {
    const code = req.query.code;
    console.log(code);
    var redirect_uri = 'http://localhost:8080/google/callback';
    const client_id = "id";
    const client_secret = "client_secret";
    const keyy = (client_id + ':' + client_secret).toString('base64');
    console.log(keyy)
    let key = client_id + ':' + client_secret;
    let buff = new Buffer(key);
    let base64data = buff.toString('base64');

    axios({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            params: {
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
            },
            headers: {
                'Authorization': 'Basic ' + base64data,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            json: true
        })
        .then(async(response) => {
            response.data.message = "User Successfully connected";
            response.data.status = 200;
            return res.send(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/calendar", async(req, res) => {
    const token = req.body.token || "token"

    axios({
        method: 'GET',
        url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        headers: {
            Authorization: (`Bearer ${token}`),
            'Content-type': 'application/json'
        }
    })
    .then((response) => {
        return res.send(response.data)
    })
    .catch((err) => console.log(err))
})

module.exports = app;
