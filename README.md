# CrawlerBot Registry

[![Build Status][travis-image]][travis-url]  [![Docker Pulls](https://img.shields.io/docker/pulls/simlife/simlife-registry.svg)](https://hub.docker.com/r/simlife/simlife-registry/)

This is the [Simlife](http://www.simlife.io/) registry service, based on [Spring Cloud Netflix](http://cloud.spring.io/spring-cloud-netflix/), [Eureka](https://github.com/Netflix/eureka) and [Spring Cloud Config](http://cloud.spring.io/spring-cloud-config/).

Full documentation is available on the [Simlife documentation for microservices](http://www.simlife.io/microservices-architecture).

## Deploy to Heroku

Click this button to deploy your own instance of the registry:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

There are a few limitations when deploying to Heroku.

* The registry will only work with [native configuration](http://www.simlife.io/simlife-registry/#spring-cloud-config) (and not Git config).
* The registry service cannot be scaled up to multiple dynos to provide redundancy. You must deploy multiple applications (i.e. click the button more than once). This is because Eureka requires distinct URLs to synchronize in-memory state between instances.

## Running locally

To run the cloned repository;
* For development run `./mvnw -Pdev,webpack` to just start in development or run `./mvnw` and run `yarn && yarn start` for hot reload of client side code.
* For production profile run `./mvnw -Pprod`

[travis-image]: https://travis-ci.org/simlife/simlife-registry.svg?branch=master
[travis-url]: https://travis-ci.org/simlife/simlife-registry
