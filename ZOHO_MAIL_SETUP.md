# Zoho Mail Setup Guide - Automatic Form Submission

This guide explains how to configure Zoho Mail for automatic email sending.

---

## 🎯 Quick Setup (3 Steps)

### **Step 1: Get Your Zoho Mail App Password**

1. Go to Zoho Mail: https://mail.zoho.com/
2. Click on your **Profile** (top right)
3. Go to **Settings** → **Security**
4. Look for **App Passwords** section
5. Create a new app password (or use your regular password if you prefer)
6. Copy the password

### **Step 2: Update `.env` File**

Edit the `.env` file in your project root:

```
EMAIL_USER=Kiran@kka.co.in
EMAIL_PASSWORD=your-zoho-password-here
SMTP_HOST=smtp.zoho.in
SMTP_PORT=587
SMTP_SECURE=false
```

Replace `your-zoho-password-here` with your Zoho Mail password.

### **Step 3: Restart Development Server**

```bash
# Stop the current server (if running)
# Press Ctrl+C

# Start fresh
npm run dev
```

Wait for it to start, then test the forms!

---

## ✅ Test the Forms

1. Fill out the **Contact Form** or **Career Form**
2. Click **Submit**
3. You should see **"Success!"** message
4. Check your inbox at `Kiran@kka.co.in`

---

## 📨 Zoho Mail SMTP Settings

| Setting | Value |
|---------|-------|
| **SMTP Host** | smtp.zoho.in |
| **SMTP Port** | 587 |
| **Use TLS** | Yes (SMTP_SECURE=false) |
| **Authentication** | Required |
| **Username** | Your Zoho email |
| **Password** | Your Zoho password |

---

## 🆘 Troubleshooting

### **Issue: "Email service not configured"**
- Make sure you've updated the `.env` file with your credentials
- Restart the dev server after updating `.env`

### **Issue: "Invalid login credentials"**
- Check your Zoho password is correct
- Try creating an app-specific password in Zoho settings

### **Issue: Forms still opening email client**
- Clear your browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Make sure dev server is restarted

---

## 🔐 Security

✅ The `.env` file is in `.gitignore` - **never committed to GitHub**
✅ Keep your password secure - only share with developers who need it
✅ You can regenerate app passwords anytime in Zoho settings

---

## 🚀 Deploy to Vercel

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   - `EMAIL_USER` = Your Zoho email
   - `EMAIL_PASSWORD` = Your Zoho password
   - `SMTP_HOST` = smtp.zoho.in
   - `SMTP_PORT` = 587
   - `SMTP_SECURE` = false
4. Redeploy

---

## 📞 Support

If emails still aren't sending:
1. Check that `.env` file has correct credentials
2. Verify Zoho Mail account has SMTP access enabled
3. Check browser console (F12) for error messages
4. Review the terminal where dev server is running for error logs

**Your forms are ready to send emails!** 🎉
