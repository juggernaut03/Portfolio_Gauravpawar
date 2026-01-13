# Portfolio App - React + Vite + Tailwind CSS v4

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS v4.

## 🚀 Features

- ⚡️ **Vite** - Lightning-fast development server and build tool
- ⚛️ **React 19** - Latest React with modern features
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🌈 **Modern Design** - Gradient backgrounds, glassmorphism effects, and smooth animations
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🎯 **Portfolio Sections** - Hero, About, Projects, Skills, and Contact sections

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

```bash
# Build for production
npm run build
```

## 📋 Project Structure

```
portfolio-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.css        # Tailwind CSS imports
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration with Tailwind plugin
└── package.json         # Project dependencies
```

## 🎨 Customization

### Update Personal Information

Edit `src/App.jsx` and replace:
- "Your Name" with your actual name
- Update the tagline and description
- Add your actual projects
- Update skills and their proficiency levels
- Add your social media links

### Color Scheme

The portfolio uses a purple-to-pink gradient theme. To customize colors, update the Tailwind classes in `src/App.jsx`:
- `from-purple-400 to-pink-600` - Main gradient
- `bg-slate-900` - Background color
- `border-purple-500/20` - Border colors

### Add More Sections

You can easily add more sections by following the existing pattern:

```jsx
<section id="new-section" className="min-h-screen flex items-center justify-center px-4 py-20">
  {/* Your content here */}
</section>
```

## 🌟 Technologies Used

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool
- **Tailwind CSS 4.1.18** - Styling
- **@tailwindcss/vite** - Tailwind Vite plugin

## 📝 Notes

- This project uses Tailwind CSS v4, which has a simplified configuration
- The `@import "tailwindcss"` directive in `index.css` loads all Tailwind utilities
- No separate `tailwind.config.js` file is needed for basic usage

## 🚨 Node.js Version

**Note:** Vite 7.x requires Node.js version 20.19+ or 22.12+. If you're using Node.js 18.x, you may see warnings but the app should still work for development purposes.

To upgrade Node.js:
```bash
# Using nvm
nvm install 20
nvm use 20
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!
