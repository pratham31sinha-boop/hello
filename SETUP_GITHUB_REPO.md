# Setting Up Your GitHub Repository

## Step-by-Step Guide

### 1. Create GitHub Account (if needed)
- Go to https://github.com/signup
- Sign up with email
- Verify email

### 2. Create New Repository
- Click "New" button
- Repository name: `ai-hub-3x` (or your choice)
- Description: "AI Hub 3X - ChatGPT, Gemini, Perplexity in one app"
- Choose **Public** (so GitHub Actions can build)
- Click "Create repository"

### 3. Download Your v0 Project
- In v0, click the three dots (⋮) in top right
- Click "Download ZIP"
- Extract to a folder on your computer

### 4. Setup Git Locally
\`\`\`bash
# Navigate to your project folder
cd path/to/your/ai-hub-project

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - AI Hub 3X"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ai-hub-3x.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

### 5. Enable GitHub Actions
- Go to your GitHub repository
- Click **Settings** tab
- Click **Actions** on the left
- Select "Allow all actions and reusable workflows"
- Click Save

### 6. Verify Workflow
- Go to **Actions** tab
- You should see "Build APK" workflow
- It should show as "running" or "completed"
- Wait for build to finish (5-15 minutes)

### 7: Download APK
- Click the workflow run
- Scroll to **Artifacts** section
- Download `ai-hub-apk` ZIP
- Extract and you have your APK!

## Regular Updates

After making changes in v0:
\`\`\`bash
# Download updated ZIP from v0
# Extract and copy files to your local folder

# Push changes
git add .
git commit -m "Update: [describe your changes]"
git push
\`\`\`

GitHub Actions will automatically rebuild your APK!

## Adding Collaborators

If you want others to help:
1. Go to **Settings** → **Collaborators**
2. Click "Add people"
3. Enter their GitHub username
4. They can now push updates and trigger builds

## Tips

- Each push triggers a new build (~10 minutes)
- Keep commit messages descriptive
- Use branches for major features (`git checkout -b feature-name`)
- Every successful build creates a downloadable APK artifact
