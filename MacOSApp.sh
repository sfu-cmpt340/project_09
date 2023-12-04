#!/bin/bash

# Run Flask app
osascript -e 'tell application "Terminal" to do script "cd /SAM && flask run"'

# Wait for Flask to start (adjust the sleep duration as needed)
sleep 5

# Run React app
osascript -e 'tell application "Terminal" to do script "cd /my-react-app && npm start"'
