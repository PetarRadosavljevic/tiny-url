# TinyURL
## Questions: 
1. What is a URL shortening system?
2. What's the main value? Who needs such a system and why?
3. Describe The main mechanism of work and system components.
4. What do you think are the main challenges in implementing and running the
   system
5. Try to suggest some ideas for advanced features.

### 1. What is a URL shortening system?
URL shortening system is web service that converts long URLs into shorter, more manageable links.
work by redirecting users from the shortened URL to the original long URL. It also provides useful 
analytics for generated links.

### 2. What's the main value? Who needs such a system and why?
The main advantage of shorter URL links is when sharing on social media or sms, due to charter limit.
They are also more readable, and less prone to errors when manually typing. 
Main example would be typing url from some form of advertisement.

### 3. Describe The main mechanism of work and system components.
The main mechanism of work of a URL shortening system involves converting long URLs
into shorter urls, storing them and then redirecting users to original URL when users land on 
short link. It works in next steps:

1. **URL Submission:** Users input a long URL into the URL shortening system's interface (client app in this case).

2. **Shortening Algorithm:** The system generates a unique, shortened URL using shortening algorithm ([nanoid](https://github.com/ai/nanoid) in this case).
This algorithm creates a short string of characters that is mapped to the original URL.

3. **Storage and Mapping:** The system stores the mapping between the shortened URL and the original 
long URL in a database (MongoDB in this case). This mapping allows the system to redirect users
from the shortened URL to the correct destination.

4. **Redirection:** When a user clicks on a shortened URL, their browser sends a request 
to the URL shortening system's server. The server looks up the corresponding original URL based 
on the shortened URL in its database. At this point system collects analytics.

5. **Forwarding:** The system then issues an HTTP redirect response, instructing the user's browser
to navigate to the original long URL. This redirection process typically happens transparently and quickly, 
so users are seamlessly taken to their intended destination.

### 4. What do you think are the main challenges in implementing and running the system
Main challenges include scalability, including both high traffic to server
and database scalability since the redirects should be stored indeterminately.
Also, as the number of urls grows the uniqueness and collisions can pose an issue.
With large datasets the cost will rise, just as the price for scaling server for desired speed and uptime.
And there are risks of abusing system and using it for malicious purposes like phishing or distributing malware. 

### 5. Try to suggest some ideas for advanced features.
As mentioned before mongodb should be sharded to increase performance, 
also the server should be deployed with load balancer and multiple instances (pods in case of kubernetes) 
to increase performance and uptime. 

The most used urls should be cached, with cache replicas if necessary.

Some advanced features not concerning preformance would include security and checks for malicious links 
and adding support for custom short urls.

## Running application in docker

### Setting up mongodb in docker

Instructions on running `MongoDB`  containers necessary for application.

Before running docker deploy commands edit `compose.yml` config for mongo if necessary.

```
environment:
  MONGO_INITDB_DATABASE: tiny // database name used for project
  MONGO_INITDB_ROOT_USERNAME: root 
  MONGO_INITDB_ROOT_PASSWORD: root
  MONGO_NON_ROOT_USERNAME: tinyuser // database user used for projet
  MONGO_NON_ROOT_PASSWORD: tinypass // database pass used for projet
```

With this configuration our `.env` configs for mongo look like in local deployment

```    
# DB
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_USER=tinyuser
DATABASE_PASSWORD=tinypass
DATABASE_NAME=tiny
```

For running docker container run command:

```
docker compose up -d mongo
```

### Starting server application in docker

The deployment of server application depends on the mongo container, 
so we need to set the environment like it is described in previous step before continuing. 
If you have mongo container set up we can skip this.

Next we need to set `.env` used for server application. The file needs to be in **tiny-url-api** directory
with fallowing values that reflects mongo credentials setup earlier.

```
# APP
PORT=4000

# DB
# Here we set mongo as host so that containers can comunicate with each other on docker network
DATABASE_HOST=mongo 
DATABASE_PORT=27017
DATABASE_USER=tinyuser
DATABASE_PASSWORD=tinypass
DATABASE_NAME=tiny
```

For docker deployment use `PORT=4000` since the Dockerfile is set to expose it, but if you need different port
we can bind it to different one on localhost in `compose.yml` file.


For running docker containers run command:

```
docker compose up -d server
```

This will also create mongo container if it doesn't already exist. 


### Starting client application in docker

The deployment of server application depends on the running server and mongo containers.
We need to set up env like described in previous sections for server and mongo containers.

Next we need to set `.env` used for docker. The file needs to be in **tiny-url-client** directory.

```
VITE_APP_API_URL='http://localhost:4000/'
VITE_APP_BASE_URL='http://localhost:4000/'
```

For running docker containers run command

```
docker compose up -d client
```

This will also create server and mongo containers if they don't already exist.

If you have set up all the env variables as described you can also run all containers at once with command:
```
docker compose up -d
```