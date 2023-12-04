#!/bin/bash

# Run Flask app
gnome-terminal --title="Flask App" -- bash -c 'cd SAM && flask run'

# Wait for Flask to start (adjust the sleep duration as needed)
sleep 5

# Run React app
gnome-terminal --title="React App" -- bash -c 'cd my-react-app && npm start'
