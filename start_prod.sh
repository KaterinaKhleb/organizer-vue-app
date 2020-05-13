#!/bin/bash

echo "Welcome to the development mode of the Orginizer app"
echo "The app is reloaded automatically on every code change"
cd frontend 
npm run build &
cd ../backend
npm run start