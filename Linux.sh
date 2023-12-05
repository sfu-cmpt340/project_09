#!/bin/bash

# Get the directory of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run Flask app in a new terminal window
gnome-terminal --working-directory="$DIR/SAM" -- bash -c "flask run; exec bash"

# Wait for Flask to start (adjust the sleep duration as needed)
sleep 5

# Run React app in a new terminal window
gnome-terminal --working-directory="$DIR/my-react-app" -- bash -c "npm start; exec bash"