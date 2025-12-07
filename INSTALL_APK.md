# Installing Your AI Hub 3X APK

## Prerequisites
- Android phone (Android 12+)
- APK file downloaded from GitHub Actions
- USB cable (optional, for ADB installation)

## Method 1: Manual Installation (No Computer Needed)

1. **Transfer APK to Phone**
   - Email the APK to yourself
   - Download from email on phone
   - Or use file sharing app

2. **Install APK**
   - Open Files app on your phone
   - Navigate to Downloads folder
   - Tap the APK file
   - Tap "Install"
   - Grant permissions if asked

3. **Launch App**
   - App appears on home screen
   - Tap to launch AI Hub 3X

## Method 2: ADB Installation (Computer Required)

### Windows/Mac/Linux:
1. **Install ADB**
   - Download: https://developer.android.com/tools/adb
   - Extract to a folder

2. **Enable Developer Mode on Phone**
   - Settings → About phone
   - Tap "Build number" 7 times
   - Back to Settings → Developer options
   - Enable "USB Debugging"

3. **Connect and Install**
\`\`\`bash
# Navigate to your Downloads folder (where APK is)
cd Downloads

# Connect phone via USB
adb devices

# Install APK
adb install ai-hub-app-debug.apk
\`\`\`

## First Launch

1. Open the app
2. **Add Your API Keys** (if not already added in Settings)
   - Go to Settings tab
   - Paste your OpenAI, Google, Perplexity API keys
   - Keys saved securely on phone

3. **Start Chatting**
   - Select ChatGPT, Gemini, or Perplexity
   - Type your message
   - Get responses!

## Troubleshooting

**"Installation blocked" error**
- This is a security warning from Google Play Protect
- Tap "Install anyway" or disable Play Protect temporarily

**"Unknown app" warning**
- This is normal for side-loaded APKs
- Tap "Install" to continue

**App crashes on launch**
- Make sure Android 12+
- Try restarting phone
- Reinstall the APK

**API keys not working**
- Check keys are valid (test on web first)
- Make sure you have active quota/billing
- Settings → Clear all data → Try again

## Keeping Updated

To get new versions:
1. GitHub repository gets updated
2. GitHub Actions builds new APK
3. Download latest from Actions
4. Uninstall old version
5. Install new APK

The app will ask for permission to overwrite previous version.
