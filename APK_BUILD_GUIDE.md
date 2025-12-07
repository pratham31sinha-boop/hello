# Building APK for AI Hub 3X

This guide will help you build a native Android APK for the AI Hub 3X app using Capacitor.

## Prerequisites

1. **Node.js** (v16+) - Already installed
2. **Java Development Kit (JDK)** 17+
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Set JAVA_HOME environment variable
3. **Android SDK**
   - Download Android Studio: https://developer.android.com/studio
   - Install Android SDK (API level 33+)
   - Set ANDROID_SDK_ROOT environment variable
4. **Git** - For version control

## Setup Steps

### Step 1: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 2: Build the Next.js App
\`\`\`bash
npm run build
\`\`\`

This creates an optimized static export in the `out/` folder.

### Step 3: Add Capacitor
\`\`\`bash
npm install @capacitor/core @capacitor/cli @capacitor/android --save-dev
npx cap add android
\`\`\`

This creates the `android/` directory with your native Android project.

### Step 4: Sync Web Files
\`\`\`bash
npx cap sync
\`\`\`

Syncs the built web app with the Android project.

### Step 5: Build APK

#### Development APK (Debug):
\`\`\`bash
npx cap build android
\`\`\`

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release APK (Production):
First, create a signing key:
\`\`\`bash
keytool -genkey -v -keystore android/app/release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release-key
\`\`\`

Then build:
\`\`\`bash
npm run build:apk:release
\`\`\`

Or manually:
\`\`\`bash
npx cap build android -- --keystorePath=android/app/release-key.jks --keystorePassword=YOUR_PASSWORD --keystoreAlias=release-key --keystoreAliasPassword=YOUR_KEY_PASSWORD
\`\`\`

## Installation on Device

### Using ADB (Android Debug Bridge):
\`\`\`bash
# Connect your Android device via USB (enable Developer Mode)
adb install android/app/build/outputs/apk/debug/app-debug.apk
\`\`\`

### Or manually:
- Transfer the APK to your device
- Open Files app and tap the APK to install

## Troubleshooting

### JAVA_HOME not set
\`\`\`bash
# Mac/Linux
export JAVA_HOME=$(/usr/libexec/java_home)

# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-17.0.x
\`\`\`

### ANDROID_SDK_ROOT not set
\`\`\`bash
# Mac/Linux
export ANDROID_SDK_ROOT=~/Library/Android/sdk

# Windows
set ANDROID_SDK_ROOT=C:\Users\USERNAME\AppData\Local\Android\sdk
\`\`\`

### Port 3000 already in use
Change the port in `capacitor.config.json` or run:
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

## Uploading to Google Play Store

1. Create a Google Play Developer account ($25 one-time)
2. Create an app in Google Play Console
3. Generate release APK with signing key
4. Upload to Play Store with screenshots and description

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Development](https://developer.android.com/develop)
- [Google Play Store Publishing](https://support.google.com/googleplay/android-developer)
