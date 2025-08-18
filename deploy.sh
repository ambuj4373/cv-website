#!/bin/bash

# One-command deploy for Ambuj Shukla's portfolio

set -e  # Exit if any command fails

echo "Enter commit message:"
read msg

git checkout main
git pull origin main
git add .
git commit -m "$msg"
git push origin main

echo "Pushed to GitHub. Waiting 5 seconds before opening site..."
sleep 5
open "https://cv-website-neon.vercel.app"
