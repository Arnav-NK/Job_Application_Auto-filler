# 🚀 Installation & Setup Guide

# ⚡ Quick Start

No backend setup, environment variables, or coding knowledge required.

### 1. Download the Extension

Download the extension source code (ZIP) and extract it on your computer.

### 2. Open Chrome Extensions

Open Google Chrome and visit:

```text
chrome://extensions/
```

Enable **Developer Mode** using the toggle in the top-right corner.

### 3. Load the Extension

Click **Load Unpacked** and select the extracted extension folder containing:

```text
manifest.json
```

Example:

```text
Job_Application_Auto-filler/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── background.js
```

### 4. Launch the Extension

After loading successfully, the extension icon will appear in the Chrome toolbar.

### 5. Create an Account / Login

Open the extension popup and sign up or log in to your account.

### 6. Upload Your Resume

Upload your resume PDF and save your profile information.

### 7. Start Autofilling

Open any supported job application page and click **Auto Fill** from the extension.

The extension will automatically detect and fill matching form fields using your saved resume data.

### 🎉 You're Ready to Go!


## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Arnav-NK/Job_Application_Auto-filler.git
cd Job_Application_Auto-filler
```

---

## 2️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Create Backend `.env`

Inside the `backend` folder create a file named:

```bash
.env
```

The structure should look like:

```text
backend/
├── server.js
├── package.json
├── .env
```

Add the following variables:

```env
PORT=3004

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Example:

```env
PORT=3004
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobautofiller
JWT_SECRET=mysecretkey123
```

Save the file.

Start the backend server:

```bash
node server.js
```

You should see:

```bash
Server running on port 3004
```

---

## 3️⃣ Frontend Setup

Open a new terminal and move to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

### Create Frontend `.env`

Inside the frontend folder create:

```bash
.env
```

Folder structure:

```text
frontend/
├── src/
├── public/
├── .env
├── package.json
```

Add:

```env
VITE_API_URL=http://localhost:3004
```

For production deployment:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Start the frontend:

```bash
npm run dev
```

---

## 4️⃣ Deploy Frontend to Vercel

Push your code to GitHub.

Go to:

https://vercel.com

1. Login with GitHub.
2. Click **Add New Project**.
3. Import your repository.
4. Select the frontend folder as the root directory.
5. Add environment variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

6. Click **Deploy**.

After deployment you'll get a URL like:

```text
https://job-autofiller.vercel.app
```

Copy this URL.

---

## 5️⃣ Update Extension Home Page Link

Open:

```text
public/home.html
```

Find:

```html
<a href="http://localhost:5173">Open Dashboard</a>
```

Replace it with your Vercel URL:

```html
<a href="https://job-autofiller.vercel.app">
    Open Dashboard
</a>
```

Save the file.

If the URL is stored inside JavaScript, update it there as well:

```javascript
window.open(
  "https://job-autofiller.vercel.app",
  "_blank"
);
```

---

## 6️⃣ Build the Extension

If using Vite:

```bash
npm run build
```

This will create a folder similar to:

```text
dist/
```

---

## 7️⃣ Load the Extension in Chrome

Open Chrome and visit:

```text
chrome://extensions/
```

Enable:

```text
Developer Mode
```

Click:

```text
Load Unpacked
```

Select the extension folder containing:

```text
manifest.json
```

Example:

```text
Job_Application_Auto-filler/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
```

or

```text
dist/
├── manifest.json
```

After loading successfully, the extension icon will appear in the Chrome toolbar.

---

## 8️⃣ Using the Extension

1. Start the backend server.
2. Open the extension popup.
3. Sign Up or Login.
4. Upload your Resume PDF.
5. Review and edit extracted details.
6. Save your profile.
7. Open any supported job application website.
8. Click **Auto Fill**.
9. The extension will automatically populate matching fields.

---

## 🔧 Troubleshooting

### Backend Not Connecting

Verify:

```env
VITE_API_URL=http://localhost:3004
```

or

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

### Extension Not Loading

Ensure:

```text
manifest.json
```

exists in the selected folder.

---

### Changes Not Reflecting

After modifying files:

```bash
npm run build
```

Then go to:

```text
chrome://extensions/
```

and click:

```text
Reload
```

for the extension.

---

## 🌐 Deployment Flow

```text
Frontend (Vercel)
       │
       ▼
Backend (Render)
       │
       ▼
MongoDB Atlas
```
