# 🍵 Mystic Drink Quiz App

A responsive 5-question short-answer quiz app built with **React** and **Tailwind CSS**, implemented from a Figma design. Each question is presented on its own dedicated screen, and all answers are compiled into a summary screen at the end.

## ✨ Features

- **Beautiful Intro Screen**: Welcoming screen with decorative design elements from Figma
- **5 Interactive Questions**: Each question has its own dedicated screen with character counter
- **Answer Tracking**: All answers are stored in state and displayed in the summary
- **Summary Screen**: View all questions and answers together with stats
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Transitions**: Navigation between screens with state management
- **Copy Summary**: Copy quiz results to clipboard
- **Retake Quiz**: Users can take the quiz again without refreshing

## 🎨 Design

The app is built directly from a Figma design and features:
- Custom decorative SVG elements and animations
- Orange and neutral color scheme
- Monospace font styling for a tech aesthetic
- Responsive layouts using Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:
```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── App.jsx                 # Main app component with state management
├── components/
│   ├── Intro.jsx          # Welcome/intro screen
│   ├── Question.jsx       # Individual question component
│   └── Summary.jsx        # Results summary screen
├── index.css              # Tailwind CSS imports
└── main.jsx               # React entry point
```

## 📱 Responsive Design

The app is fully responsive and adapts to:
- **Mobile**: 320px and up
- **Tablet**: 640px and up
- **Desktop**: 1024px and up

Tailwind breakpoints are used throughout for responsive styling.

## 🎯 Quiz Flow

1. **Intro Screen**: User sees welcome message and clicks "Start Quiz" button
2. **Questions 1-5**: User answers each question one at a time
   - Progress bar shows current question number
   - Text area for answer input
   - Next/Complete button to proceed
3. **Summary Screen**: All questions and answers displayed
   - Statistics (questions answered count)
   - Copy summary to clipboard option
   - Retake quiz button

## 🛠️ Technologies

- **React 18**: Component library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript

## 📝 Customization

### Questions
Edit the `questions` array in `App.jsx` to change or add more questions.

### Styling
All styling uses Tailwind CSS classes. The primary color (`#f76513` orange) can be customized in the Tailwind config.

### Assets
Image assets are served from `http://localhost:3845/assets/` via the Figma MCP server. Replace these URLs if using different assets.
