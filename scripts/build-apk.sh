#!/bin/bash

echo "Building APK for AI Hub 3X..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build Next.js app
echo "Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Add Android platform if not exists
if [ ! -d "android" ]; then
    echo "Adding Android platform..."
    npx cap add android
fi

# Sync files
echo "Syncing web files to Android..."
npx cap sync

# Build APK
echo "Building APK..."
npx cap build android

echo ""
echo "================================"
echo "Build complete!"
echo "Debug APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "To install on device:"
echo "  adb install android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "To open Android Studio:"
echo "  npx cap open android"
