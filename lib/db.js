var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
//var db = new sqlite3.Database(':memory:');

db.serialize(function() {
   sql = db.run("CREATE TABLE jobs (command TEXT, options TEXT, status INTEGER, stdout TEXT, stderr TEXT)", function(err) {
      console.log("Skipping creation of jobs table.");
   });
});

exports.addJob = function(command, options, next) {
   db.run("INSERT INTO jobs VALUES (?, ?, ?, ?, ?)", command, options, 201, "", "", function(err) {
      if (err)
         return next(err);
      return next(null, this.lastID);
   });
}

exports.getJobById = function(id, next) {
   db.get("SELECT command, options, status, stdout, stderr FROM jobs WHERE rowid = ?", id, function(err, row) {
      if (err)
         return next(err);
      return next(null, row);
   });
}

exports.getJobsByStatus = function(status, next) {
   db.all("SELECT rowid, options, command FROM jobs WHERE status = ?", status, function(err, rows) {
      if (err) {
         console.log("Error while finding jobs");
         return next(err);
      }
      return next(null, rows);
   });
}

exports.updateJobById = function(id, status, stdout, stderr, next) {
   db.get("UPDATE jobs set status=?, stdout=?, stderr=? WHERE rowid = ?", status, stdout, stderr, id, function(err, row) {
      if (err)
         return next(err);
      return next(null, row);
   });
}
/*exports.close = function(next) {*/
   //db.close();
   //return next();
//}


