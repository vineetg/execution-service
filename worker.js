var exec = require('child_process').exec;
var db = require('./lib/db');

function processRecord(rowid, command, options, next) {
   // Process the command. Passes retCode, stdout, stderr to
   // callback
   var child = exec(command, options, function(error, stdout, stderr) {
      var status = 200;
      if (error) {
         status = 500;
         console.log('exec error: ' + error);
      }
      db.updateJobById(rowid, status, stdout, stderr, function(err, row) {
         if(err) {
            res.send(400, 'Failed to update database');
         }
      });
   });
}

function process() {
   db.getJobsByStatus(201, function(err, rows) {
      if (!rows) {
         console.log("rows: " + rows);
      }
      var total_items = rows.length;
      console.log("Total items: " + total_items);
      for (var i=0; i<total_items; i++) {
         processRecord(rows[i].rowid, rows[i].command, JSON.parse(rows[i].options));
      }
   });
}

setInterval(process, 5000);
