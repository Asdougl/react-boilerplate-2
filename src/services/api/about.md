# Custom REST Service API

This `api` directory contains a bunch of helpers to enable the fast integration with REST APIs. The API integrates with both Axios and fetch and return a common response type to the consumer. Add more "http agents" by modifying Requests and Response files.

A Response can be either an OK response,

```js
const response = {
  ok: true,
  data: { your: 'data' },
  status: 200,
}
```

or a not ok response,

```js
const response = {
  ok: false,
  message: 'Invalid body format',
  status: 400, // optional
}
```

## Core

`api/core.ts` contains all the basic type defintion and API helper functions to speed up API integration. These definitions and functions are supposed to be your rarely modified boilerplate

## Request

`api/request.ts` contains helper functions to quickly build REST integrations, however these won't be particularly useful if your service doesn't strictly adhere to the REST standards

## Response

`api/response.ts` contains helper functions for handling request responses, which imply a REST structure to API responses, you may need to edit this to fit your API responses if your APIs have a different response.
