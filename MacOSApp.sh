DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run Flask app in a new Terminal window
osascript -e "tell application \"Terminal\" to do script \"cd $DIR/SAM && flask run\""

# Wait for Flask to start (adjust the sleep duration as needed)
sleep 5

# Run React app in a new Terminal window
osascript -e "tell application \"Terminal\" to do script \"cd $DIR/my-react-app && npm start\""