#!/bin/bash

# GitHub Sync Script for Kiran K & Associates
# This script automatically commits and pushes all changes to GitHub

echo "📤 Syncing to GitHub..."
echo "========================"

# Check if there are any changes
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit. Your code is already up to date!"
    exit 0
fi

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Stage all changes
echo "📝 Staging changes..."
git add -A

# Commit with timestamp
echo "💾 Creating commit..."
git commit -m "Auto-sync: Changes synced on $TIMESTAMP"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your changes have been synced to GitHub"
    echo "🔗 Repository: https://github.com/KK-AuditX/kiran-k---associates"
else
    echo "❌ Error: Failed to push to GitHub. Please check your connection."
    exit 1
fi
