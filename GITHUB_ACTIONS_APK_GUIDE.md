# Building APK with GitHub Actions (Easiest Method)

## Overview
GitHub Actions automatically builds your APK whenever you push code. No local Android SDK installation needed!

## Quick Start

### Step 1: Push to GitHub
1. Download the ZIP from v0
2. Create a GitHub repository
3. Push your code:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
\`\`\`

### Step 2: GitHub Actions Builds Automatically
- Go to your GitHub repository
- Click **Actions** tab
- You'll see "Build APK" workflow running
- Wait for it to complete (5-10 minutes)

### Step 3: Download APK
1. Click on the completed build
2. Scroll down to **Artifacts** section
3. Click **ai-hub-apk** to download
4. Extract the ZIP to get the APK file

### Step 4: Install on Phone
\`\`\`bash
# Using ADB (if installed)
adb install app-debug.apk

# Or manually transfer to phone and tap to install
\`\`\`

## What the GitHub Actions Workflow Does

✅ Checks out your code
✅ Installs Node.js dependencies
✅ Sets up Java 17 and Android SDK
✅ Builds your Next.js app as static files
✅ Adds Capacitor for Android
✅ Compiles native Android APK
✅ Uploads APK as downloadable artifact

## Rebuilding the APK

Just push new code:
\`\`\`bash
git add .
git commit -m "Your changes"
git push
\`\`\`

The APK rebuilds automatically!

## Creating Release Builds

Add a GitHub tag to trigger release builds:
\`\`\`bash
git tag v1.0.0
git push origin v1.0.0
\`\`\`

The APK will be attached to the release.

## Troubleshooting

**Build failed?**
- Click the failed build in Actions tab
- Scroll down to see error messages
- Common issues: Missing dependencies, API key problems

**APK too large?**
- This is normal for a full Next.js + native app (~50-150 MB)

**Build takes too long?**
- First build is slowest (10-15 min)
- Subsequent builds are faster (5-10 min)

## Next: Upload to Google Play Store

Once you have a working APK:
1. Create Google Play Developer account ($25)
2. Generate a signed release APK (ask for help)
3. Upload to Google Play Store with screenshots and description
