# Tailwind CSS Classes Reference - Portfolio Project

## 🎨 Color Palette Used

### Backgrounds
- `bg-slate-900` - Main dark background
- `bg-slate-800/50` - Semi-transparent card backgrounds
- `bg-slate-700/50` - Input field backgrounds
- `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900` - Main page gradient

### Text Colors
- `text-white` - Primary text
- `text-gray-300` - Secondary text
- `text-gray-400` - Tertiary text
- `bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent` - Gradient text

### Accent Colors
- `from-purple-400 via-pink-500 to-red-500` - Hero gradient
- `from-purple-500 to-pink-600` - Button gradients
- `border-purple-500/20` - Subtle borders
- `border-purple-500/50` - Hover borders

## 📐 Layout Classes

### Flexbox
- `flex` - Enable flexbox
- `flex items-center justify-center` - Center content
- `flex gap-4` - Add gap between flex items
- `space-x-8` - Horizontal spacing

### Grid
- `grid md:grid-cols-2 lg:grid-cols-3 gap-8` - Responsive grid

### Sizing
- `min-h-screen` - Full viewport height
- `max-w-7xl` - Maximum width container
- `w-full` - Full width
- `h-16` - Fixed height

## 🎭 Effects

### Backdrop Effects
- `backdrop-blur-md` - Blur background (glassmorphism)
- `backdrop-blur-sm` - Subtle blur

### Opacity
- `/50` - 50% opacity (e.g., `bg-slate-800/50`)
- `/20` - 20% opacity (e.g., `border-purple-500/20`)
- `/80` - 80% opacity (e.g., `bg-slate-900/80`)

### Transitions
- `transition-colors` - Smooth color transitions
- `transition-transform` - Smooth transform transitions
- `transition-all` - Transition all properties

### Hover Effects
- `hover:text-purple-400` - Change text color on hover
- `hover:scale-105` - Scale up on hover
- `hover:border-purple-500/50` - Change border on hover
- `hover:bg-purple-500/10` - Change background on hover

### Animations
- `animate-pulse` - Pulsing animation

## 📱 Responsive Design

### Breakpoint Prefixes
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

### Examples
- `md:text-8xl` - Large text on medium+ screens
- `md:flex` - Flex layout on medium+ screens
- `md:grid-cols-2` - 2 columns on medium+ screens
- `lg:grid-cols-3` - 3 columns on large+ screens

## 🔤 Typography

### Font Sizes
- `text-xl` - Extra large
- `text-2xl` - 2x large
- `text-3xl` - 3x large
- `text-5xl` - 5x large
- `text-6xl` - 6x large
- `text-8xl` - 8x large

### Font Weights
- `font-semibold` - Semi-bold
- `font-bold` - Bold

### Line Height
- `leading-relaxed` - Relaxed line height

## 🎯 Positioning

### Position
- `fixed` - Fixed positioning
- `relative` - Relative positioning

### Z-Index
- `z-50` - High z-index for navbar

### Spacing
- `px-4` - Horizontal padding (1rem)
- `py-3` - Vertical padding (0.75rem)
- `p-8` - All-around padding (2rem)
- `mb-6` - Margin bottom (1.5rem)
- `mt-4` - Margin top (1rem)

## 🎨 Borders

### Border Width
- `border` - 1px border
- `border-2` - 2px border
- `border-b` - Bottom border only

### Border Radius
- `rounded-lg` - Large rounded corners
- `rounded-xl` - Extra large rounded corners
- `rounded-2xl` - 2x large rounded corners
- `rounded-full` - Fully rounded (circle/pill)

## 🎪 Special Effects

### Gradient Text
```jsx
className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
```

### Glassmorphism Card
```jsx
className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
```

### Gradient Button
```jsx
className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:scale-105 transition-transform"
```

### Progress Bar
```jsx
<div className="w-full bg-slate-700 rounded-full h-2">
  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '85%'}}></div>
</div>
```

## 🎨 Common Patterns

### Section Container
```jsx
<section className="min-h-screen flex items-center justify-center px-4 py-20">
  <div className="max-w-6xl w-full">
    {/* Content */}
  </div>
</section>
```

### Card Component
```jsx
<div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105">
  {/* Card content */}
</div>
```

### Input Field
```jsx
<input 
  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 text-white"
/>
```

## 💡 Tips

1. **Opacity Modifiers**: Use `/` for opacity (e.g., `bg-slate-800/50` = 50% opacity)
2. **Hover States**: Prefix with `hover:` for hover effects
3. **Responsive**: Use breakpoint prefixes (`md:`, `lg:`) for responsive design
4. **Gradients**: Use `bg-gradient-to-{direction}` with `from-` and `to-` colors
5. **Transitions**: Add `transition-{property}` for smooth animations

## 🔗 Useful Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind Gradient Generator](https://tailwindcss.com/docs/gradient-color-stops)
