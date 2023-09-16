---
title: "Service to service communication in Google Cloud"
date: "2023-02-13"
tags:
    - Python
    - Google
---


At my work we process our data using Google Cloud services. For different use cases, we mainly use Cloud functions to process files and Cloud Run services to generate features, sleep scores and predictions. We use PubSub to trigger our cloud functions and, Cloud Task or Scheduler to trigger our respective Cloud Run services. All of them use HTTP requests to communicate with each others. By default, communication with Cloud run services requires authentication. Here, I am going to present how to set up authenticated communications with google Cloud Run services.


## Our data flow

In our data infrastructure we use a Scheduler that pings one of our Cloud Run service that we call the `poller`. The role of the `poller` is, once triggered, to scan a Google Cloud bucket where are stored our new data. If new data is found, it sends the necessary metadata to another Cloud Run service, called the `worker`. The `worker` will then process the data. If the processing succeeds or fails the `worker` sends back an HTTP message (HTTP code `200` or `500`) that prompts the `poller` to move the processed file to the required bucket.

## Scheduler to Cloud Run

- Create a service account for the scheduler that has Cloud run invoker role
- Deploy and configure the scheduler
- Make a test

## Cloud Run to Cloud Run

- Create a service account for the scheduler that has Cloud run invoker role
- Change the service account in your YAML template
- Use `google.auth` library to authenticate
- make a test
