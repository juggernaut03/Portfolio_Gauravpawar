# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Navigate to Project
```bash
cd /Users/gauravpawar/Documents/[1]Gaurav/portfolio-main/portfolio-app
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Visit: `http://localhost:5173`

---

## ✨ What You'll See

A beautiful, modern portfolio website with:
- 🎨 Purple-to-pink gradient theme
- 💎 Glassmorphism effects
- 📱 Fully responsive design
- 🎯 5 main sections (Hero, About, Projects, Skills, Contact)

---

## 🎨 Quick Customization

### Update Your Name
**File:** `src/App.jsx`  
**Line:** 26

```jsx
<h1 className="...">
  Your Name  {/* ← Change this */}
</h1>
```

### Update Tagline
**File:** `src/App.jsx`  
**Line:** 29

```jsx
<p className="...">
  Full Stack Developer | Designer | Creator  {/* ← Change this */}
</p>
```

### Update About Section
**File:** `src/App.jsx`  
**Lines:** 48-54

Replace the paragraph text with your own description.

---

## 🛠️ Common Tasks

### Add a New Project
**File:** `src/App.jsx`  
**Line:** 67

Change the array from `[1, 2, 3]` to `[1, 2, 3, 4]` to add a 4th project card.

### Change Colors
Replace these gradient classes throughout the file:
- `from-purple-400 to-pink-600` → Your colors
- `bg-slate-900` → Your background

### Add Social Links
**File:** `src/App.jsx`  
**Lines:** 149-151

Update the `href="#"` with your actual social media URLs.

---

## 📝 File Structure

```
portfolio-app/
├── src/
│   ├── App.jsx          ← Main component (edit this!)
│   ├── index.css        ← Tailwind import
│   └── main.jsx         ← Entry point
├── vite.config.js       ← Vite + Tailwind config
├── package.json         ← Dependencies
└── README.md            ← Full documentation
```

---

## 🎯 Next Steps

1. ✏️ **Customize content** - Update name, description, projects
2. 🖼️ **Add images** - Add profile photo and project screenshots
3. 🎨 **Adjust colors** - Match your personal brand
4. 📧 **Connect form** - Add email functionality to contact form
5. 🚀 **Deploy** - Build and deploy to Vercel/Netlify

---

## 📚 Documentation Files

- `README.md` - Full project documentation
- `PROJECT-SETUP.md` - Detailed setup summary
- `TAILWIND-REFERENCE.md` - Tailwind classes reference
- `QUICK-START.md` - This file!

---

## 💡 Pro Tips

1. **Hot Reload**: Changes auto-refresh in browser
2. **Tailwind IntelliSense**: Install VS Code extension for autocomplete
3. **Responsive Testing**: Use browser DevTools to test mobile views
4. **Build for Production**: Run `npm run build` when ready to deploy

---

## ⚠️ Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Node Version Warning?
You're using Node.js v18, but Vite 7 prefers v20+. The app will still work, but consider upgrading:
```bash
nvm install 20
nvm use 20
```

### Tailwind Not Working?
1. Check `vite.config.js` has `tailwindcss()` plugin
2. Check `src/index.css` has `@import "tailwindcss";`
3. Restart dev server

---

## 🎉 You're All Set!

Your portfolio is ready to customize. Happy coding! 🚀
