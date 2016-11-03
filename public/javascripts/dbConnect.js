// var addr = 'http://115.146.94.139:5984/';
var addr = 'http://127.0.0.1:5984/',
    dataset  = [];

    exports.collectData = function(){

      var nano     = require('nano')(addr)
  , username = 'ccc-group'
  , userpass = 'ccc-group'
  , callback = console.log
  , cookies  = {} 
  , dbName = "a_real_twit_1";
// var nano     = require('nano')('http://127.0.0.1:5984/')
//   , username = 'anni'
//   , userpass = '19920829'
//   , callback = console.log
//   , cookies  = {} 
//   , dbName = "hellocouch"
//   , dataset  = [];

var designname = '9'
    viewname = 'finalResult';
      nano.auth(username, userpass, function (err, body, headers) {
    if (err) {
      return callback(err);
    }
 
    if (headers && headers['set-cookie']) {
      cookies[username] = headers['set-cookie'];
    }
 
    callback("Data loading!");
    var db = nano.use(dbName);


    db.view(designname, viewname, function(err, body) {
      if (!err) {
          body.rows.forEach(function(doc) {
            dataset.push(doc);
            // console.log(doc);
      });
    }
  });
    callback("Data ready!");
  });

}


exports.getData = function() {
  return dataset; 
}

exports.setAddr = function(i) {
  addr = i;
}