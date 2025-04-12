# AstroWorld

A stunning 3D space scene featuring a floating astronaut and interactive particle effects. Built with Next.js and Three.js.

## Features

- Floating astronaut with idle animations
- Interactive particle system that responds to scroll
- Infinite space background with stars
- Smooth animations and transitions
- Responsive design

## Setup

1. Install dependencies:

```bash
npm install
```

2. Place your astronaut model:

- Copy your GLB model to `/public/models/Astronaut.glb`
- The model should be properly scaled and centered

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

- Adjust particle count and range in `ScrollParticles.tsx`
- Modify astronaut animation in `Astronaut.tsx`
- Change lighting and camera settings in `SpaceScene.tsx`

## Tech Stack

- Next.js
- Three.js
- React Three Fiber
- @react-three/drei
- Zustand
- GSAP

## Performance Tips

- Reduce particle count on mobile devices
- Use optimized 3D models
- Enable hardware acceleration in browser
- Consider using LOD (Level of Detail) for complex models
