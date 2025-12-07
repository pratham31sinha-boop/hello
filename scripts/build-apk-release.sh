#!/bin/bash

echo "Building Release APK for AI Hub 3X..."
echo "========================================"

if [ -z "$KEYSTORE_PASSWORD" ]; then
    echo "Error: KEYSTORE_PASSWORD environment variable not set"
    echo "Usage: KEYSTORE_PASSWORD=your_password ./scripts/build-apk-release.sh"
    exit 1
fi

if [ -z "$KEY_PASSWORD" ]; then
    echo "Error: KEY_PASSWORD environment variable not set"
    echo "Usage: KEY_PASSWORD=your_password ./scripts/build-apk-release.sh"
    exit 1
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

# Build release APK
echo "Building Release APK..."
npx cap build android --prod -- \
  --keystorePath=android/app/release-key.jks \
  --keystorePassword="$KEYSTORE_PASSWORD" \
  --keystoreAlias=release-key \
  --keystoreAliasPassword="$KEY_PASSWORD"

echo ""
echo "========================================"
echo "Release build complete!"
echo "Release APK location: android/app/build/outputs/apk/release/app-release.apk"
