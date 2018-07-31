# MWS Project 2 - Dynamic & Offline Capable Web Apps

## Goal of the Project
In project 1 we built a responsive, accessible design that now needs to be connected to an external server.
We begin by using asynchronous JavaScript to request JSON data from the backend server. Received data from the server is then stored in an offline database using IndexedDB, which will create an app shell architecture.
The site will be optimized to meet performance benchmarks, which are tested using [Lighthouse](https://developers.google.com/web/tools/lighthouse/).

A [Node development server](https://github.com/udacity/mws-restaurant-stage-2) and API is already provided to make JSON requests to the server.
Core functionality of the application will not change, only the source of the data will change. We're using the Fetch API to make requests to the backend server to populate the content of our PWA.

## Project Requirements
* Use server data instead of local memory.
* Use IndexedDB to cache JSON responses.
* Minimum performance requirements.
  * Performance: 70 or better.
  * Progressive Web App: 90 or better.
  * Accessibility: 90 or better.

## Official Style Guide
This code adheres to the [Udacity Frontend Nanodegree Style Guide](https://udacity.github.io/frontend-nanodegree-styleguide/).

### What do I do from here?
Make sure the [Node development server](https://github.com/udacity/mws-restaurant-stage-2) is running.

Clone or download the repository.
CD into the folder location and run npm start to create a dist folder and install the needed dependencies and start a http-server.
Open url [localhost:8000](localhost:8000) in your favorite browser.

## Where can I learn more?
Follow the [Udacity Mobile Web Specialist Nanodegree](https://www.udacity.com/course/mobile-web-specialist-nanodegree--nd024)!

