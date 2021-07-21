# sse-mock-server
Server Sent Events server that sends out fake data

## What this does

- Sets up an HTTP server
- Sends out [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- Servs an HTML page to test the EventSource API with the server
- Sends out a JSON server sent event every 5 seconds
- Alternates the `event` type between the default (implied `message`) and `example` (to test event parsing)
- Sets the `data:` to a JSON object with the URL used for the request, and the time.
- The `data:` is spread across multiple lines (to test multi-line parsing)

# How to use

- Clone the repo
- Set up Node.js (14+)
- `npm run start`
- Open `http://localhost:42069/` in your browser
- Else, connect to the server using the [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) API in out browser
- Else, connect to the server using whatever Server Sent Events client you use (e.g. Godot)
