var restify = require('restify');
var db = require('./lib/db');
var server = restify.createServer();

server.use(restify.bodyParser());

function get(req, res, next) {
   response = {};
   id = req.params.id;

   db.getJobById(id, function(err, row) {
      if (err) {
         res.send(400);
      }
      if (row) {
         response['command'] = row.command;
         response['options'] = JSON.parse(row.options);
         response['status'] = row.status;
         response['stdout'] = row.stdout;
         response['stderr'] = row.stderr;
         res.send(200, response);
      }
      else {
         res.send(404);
      }
   });
}

function post(req, res, next) {
   var response = {};
   var command = req.params['command'];
   var options = {
      encoding: req.params['encoding'],
      timeout: req.params['timeout'],
      maxBufer: req.params['maxBufer'],
      killSignal: req.params['killSignal'],
      cwd: req.params['cwd'],
      env: req.params['env']
   };

   options = JSON.stringify(options);

   db.addJob(command, options, function(err, result) {
      if (err) {
         res.send(400);
      }
      response['id'] = result;
      res.send(200, response);
   });
}

server.post('/', post);
server.get('/:id', get);

server.listen(8080);

