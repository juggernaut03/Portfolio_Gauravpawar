# 3D Rotating Text Loader

## Overview
A stunning 3D cylindrical text loader with rotating animation and progress counter, inspired by premium creative agency websites.

## Features
- ✨ **3D Cylindrical Text** - Text wraps around a virtual cylinder in 3D space
- 🔄 **Smooth Rotation** - Continuous Y-axis rotation with subtle X-axis wobble
- 📊 **Progress Counter** - Animated percentage counter (0-100%)
- 🎭 **Smooth Transitions** - Exit animation that slides up and fades out
- 🎨 **Clean Design** - Minimalist gray background matching reference

## Technical Implementation

### Core Concepts

1. **3D Typography**
   - Each character is positioned in 3D space along a circle's perimeter
   - Uses `rotateY()` and `translateZ()` transforms
   - Formula: `degree = (index / totalChars) * 360°`

2. **Framer Motion Animations**
   - Continuous rotation: `rotateY: 360` with infinite repeat
   - Wobble effect: `rotateX: [10, -10, 10]` for dynamic movement
   - Exit animation: Slides up with `y: "-100%"`

3. **3D Perspective**
   - Parent container has `perspective: 1000px`
   - Child uses `transformStyle: "preserve-3d"`
   - `backfaceVisibility: "hidden"` prevents seeing letter backs

### Component Structure

```jsx
<Loader onLoadingComplete={callback}>
  <3D Container>
    <Rotating Cylinder>
      {chars.map(char => <Character />)}
    </Rotating Cylinder>
    <Progress Counter />
  </3D Container>
</Loader>
```

## Customization

### Change Text
Edit the text strings in `Loader.jsx`:
```javascript
const text1 = "YOUR TEXT HERE ";
const text2 = "MORE TEXT ";
```

### Adjust Cylinder Size
Change the `radius` value:
```javascript
const radius = 200; // Increase for wider cylinder
```

### Modify Rotation Speed
Adjust the duration in the animation:
```javascript
rotateY: {
  duration: 10, // Lower = faster rotation
  repeat: Infinity,
  ease: "linear",
}
```

### Change Progress Speed
Modify the interval timing:
```javascript
const interval = setInterval(() => {
  // ...
}, 30); // Lower = faster counting
```

### Customize Colors
Update the Tailwind classes:
```javascript
className="text-black" // Change text color
className="bg-gray-100" // Change background
```

## Integration

The loader is integrated into `App.jsx`:

```javascript
const [isLoading, setIsLoading] = useState(true);

<Loader onLoadingComplete={() => setIsLoading(false)} />
<motion.div 
  animate={{ opacity: isLoading ? 0 : 1 }}
>
  {/* Main content */}
</motion.div>
```

## Animation Timeline

1. **0-3s**: Loader appears, text rotates, progress counts
2. **3s**: Progress reaches 100%
3. **3.5s**: Loader starts exit animation (slides up)
4. **4.3s**: Main content fades in with scale effect

## Performance Notes

- Uses CSS transforms for hardware acceleration
- Framer Motion optimizes animations automatically
- `backfaceVisibility: "hidden"` improves rendering performance
- Progress counter uses key-based re-rendering for smooth updates

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires modern browser with CSS 3D transform support

## Dependencies

- `framer-motion` - Animation library
- `react` - UI framework
- `tailwindcss` - Styling

## Tips for Best Results

1. **Font Choice**: Use bold, condensed fonts like Inter or Anton
2. **Text Length**: Keep text concise (20-40 characters total)
3. **Spacing**: Add spaces at the end of text segments for better distribution
4. **Testing**: Test on different screen sizes to ensure cylinder fits
5. **Performance**: Reduce radius on mobile devices if needed

## Future Enhancements

- [ ] Add sound effects on load complete
- [ ] Implement skip button for returning users
- [ ] Add particle effects around the cylinder
- [ ] Make cylinder size responsive to screen width
- [ ] Add color gradients to text
- [ ] Implement multiple text layers at different radii
