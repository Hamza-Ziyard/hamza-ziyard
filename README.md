# Portfolio Website

A premium, data-driven portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- **Dynamic Project Rendering**: Projects are defined in `src/data/projects.js` and pages are generated automatically.
- **Responsive Design**: Fully responsive layouts for all devices.
- **Premium UI**: Glassmorphism, smooth animations, and modern typography.
- **Special Sections**:
  - **Redesign Explorations**: Dedicated page for Before/After comparisons.
  - **Project Details**: Deep dive into case studies with sticky navigation.

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **Build for production**:
   ```bash
   yarn build
   ```

## Managing Content

To add or update projects, edit `src/data/projects.js`.
Each project object supports the following structure:

```javascript
{
  id: "unique-id",
  title: "Project Title",
  // ... metadata
  sections: {
    cover: true,
    summary: true,
    uiDesigns: {
      enabled: true,
      images: []
    },
    wireframes: {
      enabled: true, // Set to false to hide
      images: []
    },
    redesign: {
      enabled: true, // Set to false to hide
      beforeImage: "...",
      afterImage: "..."
    }
  }
}
```
# hamza-ziyard
