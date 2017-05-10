var express = require('express');

var app = express();

var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

app.get('/:time', (req, res) => {

    console.log(req.params);

    var time = parseInt(req.params.time * 1000, 10);
    var date = new Date(time);

    var natural;
    if (!isNaN(date.getTime())) {
        natural = months[date.getMonth()] + " " +
            date.getDate() + ", " + date.getFullYear();
    } else {
        natural = null
    }

    var dateJSON = {
        unix: date.getTime() / 1000,
        natural: natural
    };

    res.json(dateJSON);

});

app.listen('3000');
