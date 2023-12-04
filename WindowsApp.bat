@echo off

start "Flask App" cmd /k "cd SAM && flask run"

timeout /t 5 >nul

start "React App" cmd /k "cd my-react-app && npm start"