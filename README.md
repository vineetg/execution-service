execution-service
=================
Introduction
------------
It is a service which exposes REST based API, to execute command over http. A simple interaction 
```bash
$ curl --data "command=ls /tmp/" http://localhost:8080/
  {"id":9}
$ curl http://localhost:8080/9
{
  "command":"ls /tmp/",
  "status":200,
  "stdout":"..",
  "stderr":""
}
```

Running
-------
After cloning the repository, go to project directory and run
```bash
$ npm install
```
This will install all the dependencies. Now we need to run server and worker process. Start each of them into two terminal windows as follows
```bash
$ node server.js
$ node worker.js
```
