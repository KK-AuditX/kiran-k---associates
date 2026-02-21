# Email Setup Guide - Automatic Form Submission

This guide explains how to configure automatic email sending for the Contact and Career forms so that emails are sent directly without requiring manual intervention.

---

## 🎯 The Problem

When you submit the forms, it currently opens your email client (mailto). We want emails to be **sent automatically** to `Kiran@kka.co.in`.

## ✅ The Solution

The application has API endpoints set up to send emails automatically, but they need Gmail credentials to be configured.

---

## 📋 Setup Steps

### **Step 1: Enable 2-Factor Authentication on Gmail**

1. Go to your Gmail account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Scroll to **2-Step Verification**
4. Click **Enable** and follow the steps

### **Step 2: Generate Gmail App Password**

1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** from the "Select the app" dropdown
3. Select **Windows Computer** (or your device) from the "Select the device" dropdown
4. Click **Generate**
5. Google will show you a **16-character password** - copy this

Example: `abcd efgh ijkl mnop`

### **Step 3: Create `.env` File in Project Root**

1. Open your project folder in VS Code
2. Create a new file called `.env` in the root directory (same level as `package.json`)
3. Add these lines:

```
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

**Example:**
```
GMAIL_USER=kiran.krishna@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### **Step 4: Restart Your Development Server**

For Vite:
```bash
npm run dev
```

Press `Ctrl+C` to stop, then run the command again.

### **Step 5: Test the Forms**

1. Fill out the **Contact Form** or **Career Form**
2. Click **Submit**
3. The form should show a **success message** without opening your email client
4. Check your inbox at `Kiran@kka.co.in` to verify the email was received

---

## 🔒 Security Notes

- ✅ The `.env` file is already in `.gitignore` (not committed to GitHub)
- ✅ Never share your `.env` file or app password with anyone
- ✅ If compromised, regenerate the app password at https://myaccount.google.com/apppasswords
- ✅ App passwords only work for Gmail - other email providers need different setup

---

## 🚀 Deployment to Vercel

When you deploy to Vercel, follow these steps:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add two variables:
   - **Name:** `GMAIL_USER` | **Value:** Your Gmail address
   - **Name:** `GMAIL_APP_PASSWORD` | **Value:** Your app password
4. Redeploy your project

---

## 💡 Alternative Email Services

If you don't want to use Gmail, you can modify the API endpoints to use:

- **SendGrid** - Professional email service
- **Mailgun** - Developer-friendly
- **Brevo** (formerly Sendinblue)
- **AWS SES** - If using AWS infrastructure

Each requires modifying `api/career.ts` and `api/contact.ts` to use their specific transporter configuration.

---

## 🆘 Troubleshooting

### **Issue: Still opens email client instead of sending automatically**

**Solution:** The API endpoint is not accessible. Make sure:
1. ✅ `.env` file exists in the root directory
2. ✅ `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correctly configured
3. ✅ You've restarted the dev server after creating `.env`
4. ✅ 2-Factor Authentication is enabled on your Gmail account
5. ✅ You used an App Password (NOT your regular Gmail password)

### **Issue: "Failed to send email" or 500 error**

**Solution:** 
- Check if app password is correct (should be 16 characters with spaces)
- Verify 2FA is enabled
- Regenerate a new app password and try again

### **Issue: "ENOTFOUND api.example.com"**

**Solution:** 
- This means the API environment variables aren't loaded
- Restart your dev server: `npm run dev`

---

## 📝 Required Files

Make sure your project has these files:

```
✅ .env (contains your credentials)
✅ api/career.ts (sends career form emails)
✅ api/contact.ts (sends contact form emails)
✅ index.tsx (frontend forms)
```

---

## 🔗 Quick Reference Links

- Gmail App Passwords: https://myaccount.google.com/apppasswords
- Gmail Security: https://myaccount.google.com/security
- Vercel Environment Variables: https://vercel.com/docs/projects/environment-variables
- Nodemailer (Email Library): https://nodemailer.com/

---

## ✨ After Setup

Once configured:

1. **Contact Form** → Emails go to `Kiran@kka.co.in`
2. **Career Form** → Emails go to `Kiran@kka.co.in`
3. **No Manual Steps** → Forms work completely automatically ✅
4. **User Feedback** → Users see a success message confirming submission

---

**Questions?** Refer to the API files or contact the development team.
