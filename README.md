execution-service
=================
Introduction
------------
It is a service which exposes REST based API, to execute command over http. A simple interaction 
```bash
$ curl --data "command=ls /tmp/" http://localhost:8080/
{"id":1}

$ curl http://localhost:8080/1
{
  "command":"ls /tmp/",
  "options":{},
  "status":200,
  "stdout":"files",
  "stderr":""
}
```
Supported POST parameters are -

- **cwd** String Current working directory of the child process
- **encoding** String (Default: 'utf8')
- **timeout** Number (Default: 0) in milliseconds
- **maxBuffer** Number (Default: 200*1024)
- **killSignal** String (Default: 'SIGTERM')

More examples using options -
```bash
$ curl --data "command=sleep 2&timeout=3000&cwd=/Users/vineet/Pictures" http://localhost:8080/
{"id":2}

$ curl http://localhost:8080/2
{
  "command":"sleep 2",
  "options":{
    "timeout":"3000",
    "cwd":"/Users/vineet/Pictures"
  },
  "status":200,
  "stdout":"",
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
