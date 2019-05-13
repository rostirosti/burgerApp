const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  burger.all(function(data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log('condition', condition);

  // sleepy is sent as a string to our server
  // convert it to a boolean before passing it to the database
  // let devd;
  // if (req.body.devoured === 'true') {
  //   devd = true;
  // } else {
  //   devd = false;
  // }

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.redirect("/")
      res.status(200).end();
    }
  });
});

router.post('/api/burgers', function(req, res) {
  burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function(result) {
    // Send back the ID of the new quote
   
    //res.json({ id: result.insertId });
    res.redirect("/");
  });
});


module.exports = router;
