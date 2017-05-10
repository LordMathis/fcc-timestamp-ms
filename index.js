var express = require('express');
var path = require('path');

var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];


var app = express();

app.set('views', path.join(__dirname, '/views'));
app.engine('md', require('marked-engine').renderFile);
app.set('view engine', 'md');
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:time', (req, res) => {

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

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
