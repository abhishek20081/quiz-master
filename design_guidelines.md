# Quiz Website Design Guidelines

## Design Approach

**Selected Approach:** Design System + Quiz Platform Reference (Kahoot, Duolingo, Typeform)

This quiz application requires clarity, instant feedback, and engaging interactions. Drawing from successful quiz platforms while maintaining a clean, modern aesthetic focused on usability and readability.

## Core Design Elements

### Typography
- **Primary Font:** Inter or Manrope via Google Fonts
- **Question Text:** text-2xl md:text-3xl font-semibold
- **Answer Options:** text-lg font-medium
- **Timer/Score:** text-xl md:text-2xl font-bold
- **Body Text:** text-base font-normal

### Layout System
**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8, and 12
- Component padding: p-6 or p-8
- Section gaps: space-y-4, space-y-6
- Button spacing: px-8 py-4

### Component Library

#### 1. Landing Page
- **Hero Section:** Full-height centered layout (min-h-screen flex items-center)
- **Name Input Form:** 
  - Large, friendly input field (h-14, text-lg)
  - Prominent "Start Quiz" button below
  - Quiz title and brief description above input
- **Layout:** Single column, max-w-md centered

#### 2. Set Selection Screen
- **Two Large Cards:** Side-by-side on desktop (grid grid-cols-1 md:grid-cols-2 gap-6)
- **Card Design:**
  - Tall, clickable cards (min-h-64)
  - Large "SET A" / "SET B" labels (text-4xl font-bold)
  - Question count indicator ("10 Questions")
  - Subtle border with hover effect
- **Layout:** max-w-4xl centered

#### 3. Quiz Interface
- **Header Bar (Sticky):**
  - Progress indicator: "Question 5/20" (left)
  - Live timer with countdown (center) - prominent display
  - Current score (right) - large, bold numbers
  - Height: h-20, with border-b
- **Question Area:**
  - Question card: max-w-3xl centered, p-8
  - Question number badge (top-left of card)
  - Question text: Large, clear, generous line-height
- **Answer Grid:**
  - 2x2 grid on desktop, single column on mobile
  - Large answer buttons (min-h-20)
  - A, B, C, D labels in left corner of each button
  - Answer text with comfortable padding
  - Clear hover states
- **Layout:** Vertically centered content with max-w-4xl

#### 4. Results Page
- **Score Display:**
  - Hero-sized final score (text-6xl md:text-8xl font-bold)
  - "Congratulations, [Name]!" heading
  - Time taken display
  - Points breakdown section
- **Performance Summary:**
  - Visual representation (e.g., circular progress or bar)
  - Correct/Incorrect count
  - Average time per question
- **Actions:**
  - "Try Again" button
  - "Try Other Set" button
- **Layout:** Centered, max-w-2xl

### Visual Feedback
- **Correct Answer:** Green accent border/background on selection
- **Incorrect Answer:** Red accent border on selected, green highlight on correct answer
- **Timer Warning:** Visual indicator when points start decreasing (e.g., pulsing animation)
- **Score Changes:** Brief animation when score updates (+4 or reduced points)

### Navigation
- No traditional navbar needed
- Minimal back/exit button in quiz header (small, unobtrusive)
- Clear progression flow: Landing → Set Selection → Quiz → Results

### Interactive Elements
- **Buttons:** Rounded corners (rounded-lg), solid fills, clear hover/active states
- **Input Fields:** Large touch targets, clear focus states (ring-2)
- **Cards:** Subtle shadows, clean borders, smooth transitions
- **Answer Selection:** Instant visual feedback, no delay

### Animations
Use sparingly and purposefully:
- Smooth transitions between questions (fade/slide)
- Score increment animation
- Timer pulse when deducting points
- Confetti or success animation on quiz completion

### Responsive Behavior
- **Mobile:** Single column, full-width answer buttons, stacked layout
- **Desktop:** Utilize horizontal space for answer grid (2x2), wider question cards
- **Breakpoint:** md (768px) for major layout shifts

### Accessibility
- High contrast text on all backgrounds
- Large, clear touch targets (min 44px height)
- Keyboard navigation support
- Focus indicators on all interactive elements
- Screen reader friendly labels

## Images
**No hero images needed** - This is a functional app prioritizing clarity. Use solid backgrounds or subtle gradients instead. Focus visual interest on typography, card layouts, and interactive feedback.