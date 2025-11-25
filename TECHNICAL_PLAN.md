# Technical Implementation Plan: PAGAMBIT Interactive Web Comic

## 1. Project Overview
**PAGAMBIT** is a modern, interactive web-based comic application designed to provide an immersive reading experience. Unlike traditional static web comics, this project leverages realistic page-flipping physics, dynamic multimedia integration (video/audio), and a responsive user interface to bridge the gap between physical reading and digital interactivity.

## 2. Technology Stack

The application is built using a robust, modern frontend stack designed for performance, maintainability, and user experience.

### Core Framework & Build Tooling
*   **React (v19.0.0)**: Utilized for building a component-based, declarative user interface. React's virtual DOM ensures efficient updates, which is critical for the smooth animation required in a page-flip application.
*   **Vite (v6.3.1)**: Chosen as the build tool and development server. Vite provides lightning-fast hot module replacement (HMR) and optimized production builds using Rollup, ensuring a smooth developer experience and high-performance deployment.

### Styling & UI
*   **Tailwind CSS (v4.1.4)**: A utility-first CSS framework used for rapid UI development. It allows for highly responsive designs, dark mode implementation, and complex animations without writing custom CSS files.
*   **PostCSS & Autoprefixer**: Ensures cross-browser compatibility for modern CSS features.

### Specialized Libraries
*   **react-pageflip (v2.0.3)**: The core engine powering the book simulation. This library provides the mathematical calculations for the page-turning physics, shadow rendering, and responsive scaling.
*   **Lucide React**: A lightweight, consistent icon library used for the application's control interface.

## 3. System Architecture

The application follows a modular, component-driven architecture.

### 3.1 Component Structure
The application is organized into distinct functional units:

*   **`App.jsx`**: The root component that handles global layout and initialization.
*   **`Book.jsx`**: The central container component. It manages the `HTMLFlipBook` instance, maintains the state of the current page, and coordinates interactions between the pages and the controls.
*   **`MediaPage.jsx`**: A reusable sub-component responsible for rendering individual page content. It intelligently handles different media types (static images vs. MP4 videos) and manages overlay interactions (e.g., speech bubbles).
*   **`Controls.jsx`**: A detached UI layer that provides user inputs (navigation, zoom, settings) without interfering with the book's visual flow.
*   **`Modal.jsx`**: A generic overlay component used for secondary interfaces like the Table of Contents, Settings, and Sharing options.

### 3.2 State Management
The application uses React's built-in hooks for state management, avoiding the complexity of external stores (like Redux) for this specific scope:
*   **`useState`**: Manages local UI states such as `currentPage`, `isMuted`, `isNightMode`, and `isFullscreen`.
*   **`useRef`**: Provides direct access to the underlying DOM elements (Audio, Book instance) for imperative actions like `flipNext()` or `audio.play()`.
*   **`useEffect`**: Handles side effects such as event listeners for keyboard navigation, window resizing, and initial audio unlocking.

## 4. Key Functional Modules

### 4.1 The Page-Flip Engine
The `HTMLFlipBook` component is configured to support:
*   **Responsive Scaling**: Automatically adjusts dimensions based on the viewport size while maintaining aspect ratio.
*   **Shadows & Lighting**: Simulates depth during page turns.
*   **Mobile Support**: Optimized touch events for swiping on touch devices.

### 4.2 Multimedia Integration
The system supports a hybrid content model:
*   **Images**: Standard comic pages.
*   **Video**: Seamlessly integrated MP4 loops for dynamic scenes (cinemagraphs).
*   **Audio**: Background ambience and page-turn sound effects, managed via a global audio reference to ensure playback continuity.

### 4.3 Interactive Overlays
A custom overlay system allows for "hidden" content, such as speech bubbles that appear on hover. This is implemented using absolute positioning and CSS transitions within the `MediaPage` component.

## 5. Deployment Strategy
*   **Platform**: GitHub Pages.
*   **CI/CD**: Automated deployment via `gh-pages` scripts.
*   **Asset Optimization**: Assets are served from the `public` directory, ensuring correct path resolution in the production build.

## 6. Future Roadmap
The architecture is designed to be extensible. Planned features include:
*   **Deep Linking**: URL parameters to open the book at a specific page.
*   **Search Functionality**: Indexing text content for client-side search.
*   **User Preferences Persistence**: Using `localStorage` to save reading progress and theme settings.
