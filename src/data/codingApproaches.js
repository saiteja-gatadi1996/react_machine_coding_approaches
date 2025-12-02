export const codingApproaches = [
  {
    title: '01_accordion',
    code: `// ============================================
// DATA STRUCTURE
// ============================================

// Maintain array of items with structure: { id, title, info }
// Ex: data.js → [{id: 1, title: "...", info: "..."}, ...]

// ============================================
// APP.JSX - SETUP
// ============================================

// State 1: Track checkbox status (allow multiple accordions open or not)
// useState(true) by default

// State 2: Track which accordions are currently open (activeAccordions)
// useState(new Set()) → Why Set? Fast lookup with .has()

// ============================================
// CHECKBOX HANDLER
// ============================================

// Simple toggle function
// setAllowMultipleOpen((prev) => !prev)

// ============================================
// CORE LOGIC: toggleAccordion Function
// ============================================

// Receives: id of clicked accordion

// STEP 1: Create new Set from previous state
// Why? To avoid mutating state directly

// STEP 2: Check if clicked accordion already open using .has(id)

// STEP 3: If already open → .delete(id) to close it

// STEP 4: If not open (else block):
// → First check: if (!allowMultipleOpen)
// → If true: .clear() the Set (closes all other accordions)
// → Then: .add(id) to open the clicked accordion

// STEP 5: Return the updated Set

// ============================================
// RENDERING IN APP.JSX
// ============================================

// Map over data array to render Accordion components

// Pass isActive prop: activeAccordions.has(item.id)
// This checks if accordion id exists in Set

// Pass toggleAccordion function and spread ...item props

// ============================================
// ACCORDION.JSX - CHILD COMPONENT
// ============================================

// onClick handler: call toggleAccordion(id) with accordion's id

// Conditional rendering: show info only when isActive is true
// Option 1: className={\`accordion-content \${isActive ? 'open' : ''}\`}
// Option 2: {isActive && <p>{info}</p>}

// ============================================
// LOGIC FLOW
// ============================================

// Checkbox CHECKED:
// → Click any accordion → add to Set → opens
// → Click multiple → all added to Set → all stay open
// → Click opened one → delete from Set → closes

// Checkbox UNCHECKED:
// → Click accordion → clear Set first → add new id → only one opens
// → Click another → clear Set → add new id → previous closes
// → Only one accordion can be open at a time

// ============================================
// KEY OPERATIONS
// ============================================

// .has(id) → Check if accordion is open
// .delete(id) → Close accordion (remove from Set)
// .add(id) → Open accordion (add to Set)
// .clear() → Close all accordions (empty the Set)`,
  },
  {
    title: '02_analog_clock',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <AnalogClock />

// AnalogClock.jsx → main component that renders 3 ClockHand components
// ClockHand.jsx → individual hand (hour/minute/second) with rotation
// useClockHandDegrees.js → custom hook for time calculations

// ============================================
// CUSTOM HOOK: useClockHandDegrees
// ============================================

// State: Track current time
// useState(new Date()) → initializes with current time

// ============================================
// useEffect: Real-time Clock Updates
// ============================================

// Setup setInterval to update time every 1000ms (1 second)
// setInterval(() => setTime(new Date()), 1000)

// Cleanup: Clear interval when component unmounts
// return () => clearInterval(timerId)

// Dependency array: [] empty because we only want to set up interval once

// ============================================
// DEGREE CALCULATION LOGIC
// ============================================

// Helper function: getDegrees(unit, maxUnits)
// Formula: (unit / maxUnits) * 360 + 90

// Why divide by maxUnits? → converts to fraction (0-1 range)
// Why multiply by 360? → full circle rotation
// Why add 90? → CSS rotation starts at 3 o'clock, we want 12 o'clock

// Example: 15 seconds → (15/60) * 360 + 90 = 90 + 90 = 180 degrees

// ============================================
// CALCULATE DEGREES FOR EACH HAND
// ============================================

// Seconds: getDegrees(time.getSeconds(), 60)
// → Max 60 seconds in a minute

// Minutes: getDegrees(time.getMinutes(), 60)
// → Max 60 minutes in an hour

// Hours: getDegrees(time.getHours(), 12)
// → Max 12 hours on clock face (not 24)

// Return object: { secondsDegrees, minsDegrees, hourDegrees }

// ============================================
// ANALOGCLOCK.JSX - MAIN COMPONENT
// ============================================

// Destructure hook return values
// const { secondsDegrees, minsDegrees, hourDegrees } = useClockHandDegrees()

// Render 3 ClockHand components:
// → Each with unique type prop ('hour-hand', 'min-hand', 'second-hand')
// → Each with corresponding degrees prop

// ============================================
// CLOCKHAND.JSX - CHILD COMPONENT
// ============================================

// Props: { type, degrees }

// type → used for className (styling differences for each hand)
// degrees → used for inline style transform

// Inline style: style={{ transform: \`rotate(\${degrees}deg)\` }}
// This rotates the hand div based on calculated degrees

// className: \`hand \${type}\` → base class + specific type class

// ============================================
// LOGIC FLOW
// ============================================

// Initial render:
// → useClockHandDegrees hook runs
// → Gets current time via new Date()
// → Calculates degrees for all 3 hands
// → AnalogClock renders 3 ClockHand components with degrees
// → Each hand rotates to correct position

// Every second (interval tick):
// → setTime(new Date()) updates time state
// → Hook recalculates degrees for all hands
// → Component re-renders
// → Hands rotate to new positions

// Component unmount:
// → Cleanup function clears interval
// → Prevents memory leak

// ============================================
// KEY CONCEPTS
// ============================================

// Why custom hook? → Separates time logic from UI rendering
// Why interval? → Real-time updates every second
// Why cleanup? → Prevent memory leaks and multiple intervals
// Why +90 in formula? → Adjust for CSS rotation starting point
// Why transform rotate? → CSS property for rotating elements
// getSeconds()/getMinutes()/getHours() → Built-in Date methods


// ----

// PART-2: CSS (mandatory for this challenge) as it is UI heavy and relied on styling

// Step 1: AnalogClock.jsx has a main div with className as "clock"

// Styling classes: width:400px, height:400px, position:relative, border-radius:50%,

// Step 3: ClockHand.jsx has both className and style for a single div with a className as \`hand \${second-hand}\` as ex:

// Styling classes: For hand: background: black, height:6px, position: absolute, top: 50%, transform-origin: 100%,

// Styling classes: hour-hand, min-hand, second-hand (has width and right), with right as constant (Ex: right: 50%) and width varies from 30% for hour-hand and 40% for min-hand and 45% for second-hand

// make sure to add a inline style which holds transform: rotate(degrees)deg`,
  },
  {
    title: '03_imageCarousel',
    code: `// ============================================
// DATA STRUCTURE
// ============================================

// Maintain array of slide items with structure: { id, imgSrc, alt }
// Ex: carouselData.js → [{id: 1, imgSrc: "...", alt: "..."}, ...]

// ============================================
// APP.JSX - SETUP
// ============================================

// Render Carousel component
// Pass slides array as data prop
// Ex: <Carousel data={slides} />

// ============================================
// CAROUSEL.JSX - MAIN COMPONENT
// ============================================

// State: Track current slide index
// useState(0) → starts from first slide (index 0)

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

// nextSlide function:
// → Check if current slide is last one (slide === data.length - 1)
// → If yes: go to first slide (0)
// → If no: increment slide (slide + 1)
// Ternary: slide === data.length - 1 ? 0 : slide + 1

// prevSlide function:
// → Check if current slide is first one (slide === 0)
// → If yes: go to last slide (data.length - 1)
// → If no: decrement slide (slide - 1)
// Ternary: slide === 0 ? data.length - 1 : slide - 1

// ============================================
// RENDERING SLIDES
// ============================================

// Map over data array
// For each slideItem and index, render CarouselItem component

// Pass props:
// → key={slideItem.id}
// → imgSrc={slideItem.imgSrc}
// → alt={slideItem.alt}
// → isActive={slide === index} → current slide gets true, others false

// ============================================
// NAVIGATION BUTTONS
// ============================================

// Left arrow button:
// → onClick={prevSlide}
// → className='arrow arrow-left'

// Right arrow button:
// → onClick={nextSlide}
// → className='arrow arrow-right'

// ============================================
// INDICATORS (DOTS) - OPTIONAL
// ============================================

// Map over data using underscore (_, idx) → we only need index

// Render button for each slide
// → key={idx}
// → onClick={() => setSlide(idx)} → jump directly to that slide
// → className logic: active if (slide === idx), inactive otherwise
// → \`indicator \${slide !== idx ? 'indicator-inactive' : ''}\`

// ============================================
// CAROUSELITEM.JSX - CHILD COMPONENT
// ============================================

// Props: { imgSrc, alt, isActive }

// Render img with conditional className
// → Base class: 'slide'
// → Active class: 'slide-active' when isActive is true
// → className={\`slide \${isActive ? 'slide-active' : ''}\`}

// Only active slide is visible (others hidden via CSS opacity)

// ============================================
// CSS APPROACH
// ============================================

// App.jsx styling:
// → Center content: display: flex, justify-content: center, align-items: center

// .carousel:
// → position: relative (for absolute positioning of arrows/indicators)
// → display: flex, align-items: center, justify-content: center
// → Set width and height for image container

// .arrow (common for both arrows):
// → position: absolute (overlay on carousel)
// → width and height: 2rem (icon size)
// → z-index: 1 (appear above images)

// .arrow-left: left: 1rem (position on left side)
// .arrow-right: right: 1rem (position on right side)

// .slide (all images):
// → position: absolute (stack on top of each other)
// → opacity: 0 (hidden by default)

// .slide-active (current image):
// → position: relative
// → opacity: 1 (visible)

// .indicators:
// → position: absolute
// → bottom: 1rem (position at bottom of carousel)

// .indicator (individual dot):
// → background-color: white
// → height and width: 0.5rem (small circles)
// → border: none
// → margin: 0 0.2rem (spacing between dots)

// .indicator-inactive:
// → background-color: grey (non-active dots)

// ============================================
// LOGIC FLOW
// ============================================

// Initial render:
// → slide state is 0 (first image)
// → All images rendered but only index 0 has isActive={true}
// → Only first image visible via CSS

// Click next arrow:
// → nextSlide runs
// → If last slide → goes to 0, else increments
// → State updates → re-render
// → New slide becomes active

// Click prev arrow:
// → prevSlide runs
// → If first slide → goes to last, else decrements
// → State updates → re-render
// → New slide becomes active

// Click indicator dot:
// → setSlide(idx) runs directly
// → Jump to that specific slide index
// → State updates → re-render
// → Selected slide becomes active

// ============================================
// KEY CONCEPTS
// ============================================

// Why index-based? → Track position in array, easy prev/next logic
// Why ternary in nav? → Handle wrap-around (last→first, first→last)
// Why isActive prop? → Determine which slide to show via CSS
// Why position absolute on slides? → Stack all images in same space
// Why opacity toggle? → Show/hide without layout shifts
// Why map for indicators? → Create one dot per slide`,
  },
  {
    title: '05_countdownTimer',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Timer /> component
// Timer.jsx → contains entire countdown timer logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: hour → useState(0)
// State 2: minute → useState(0)
// State 3: second → useState(0)
// State 4: IsTimerActive → useState(false) → tracks if timer is running
// State 5: message → useState('') → error message if no values provided

// ============================================
// SIMPLE BUTTON HANDLERS
// ============================================

// startTimer function:
// → Check if all values are 0 (hour === 0 && minute === 0 && second === 0)
// → If yes: setMessage('Please provide some value for the timer.')
// → If no: setIsTimerActive(true) and setMessage('') to clear any message

// pauseTimer function:
// → Simply setIsTimerActive(false)

// resetTimer function:
// → Reset all states to default
// → setHour(0), setMinute(0), setSecond(0), setIsTimerActive(false)

// ============================================
// HELPER FUNCTION: formatTime
// ============================================

// Purpose: Display single digit numbers with leading zero
// Logic: time < 10 ? \`0\${time}\` : \`\${time}\`
// Example: 5 becomes "05", 15 stays "15"

// ============================================
// CORE LOGIC: useEffect for Timer
// ============================================

// Dependency array: [IsTimerActive, hour, minute, second]
// Runs whenever any of these values change

// STEP 1: Declare interval variable
// let interval = null

// STEP 2: Check if timer should run
// Condition: IsTimerActive && (hour > 0 || minute > 0 || second > 0)

// STEP 3: If condition true, start setInterval
// interval = setInterval(() => { /* logic */ }, 1000)

// ============================================
// COUNTDOWN LOGIC (Inside setInterval)
// ============================================

// Three conditions using if, else if, else if:

// CONDITION 1: if (second > 0)
// → Decrement seconds: setSecond((seconds) => seconds - 1)
// → Runs until seconds reach 0

// CONDITION 2: else if (minute > 0)
// → Decrement minutes: setMinute((minutes) => minutes - 1)
// → Reset seconds: setSecond(59)
// → This runs when seconds hit 0 but minutes remain

// CONDITION 3: else if (hour > 0)
// → Decrement hours: setHour((hours) => hours - 1)
// → Reset minutes: setMinute(59)
// → Reset seconds: setSecond(59)
// → This runs when both seconds and minutes hit 0 but hours remain

// ============================================
// PAUSE LOGIC (Inside useEffect)
// ============================================

// else if (!IsTimerActive && interval !== null)
// → Timer was paused but interval still exists
// → clearInterval(interval) to stop countdown

// ============================================
// CLEANUP (Inside useEffect)
// ============================================

// return () => clearInterval(interval)
// → Clears interval when component unmounts or dependencies change
// → Prevents memory leaks

// ============================================
// INPUT onChange LOGIC (TRICKY PART)
// ============================================

// Goal: Restrict user input to valid ranges

// Pattern: Math.max(0, Math.min(maxValue, parseInt(e.target.value)))

// Why this pattern?
// → Math.min ensures value doesn't exceed maximum
// → Math.max ensures value doesn't go below 0
// → parseInt converts string input to number

// HOUR input:
// → Math.max(0, Math.min(23, parseInt(e.target.value)))
// → If user types 24 → Math.min picks 23 (minimum of 24 and 23)
// → If user types -5 → Math.max picks 0 (maximum of 0 and -5)

// MINUTE input:
// → Math.max(0, Math.min(59, parseInt(e.target.value)))
// → If user types 60 → Math.min picks 59
// → If user types -1 → Math.max picks 0

// SECOND input:
// → Same pattern as minute
// → Math.max(0, Math.min(59, parseInt(e.target.value)))

// ============================================
// JSX STRUCTURE
// ============================================

// Divided into 3 main sections:

// SECTION 1: Inputs container
// → 3 input fields (hour, minute, second)
// → Each separated by colon (:)
// → value={formatTime(hour/minute/second)} for display
// → onChange with Math.max/Math.min validation

// SECTION 2: Buttons container
// → Conditional rendering for Start/Pause button
// → Logic: {!IsTimerActive ? <Start button> : <Pause button>}
// → Reset button always visible

// SECTION 3: Message display (optional)
// → Conditional rendering: {message && <div>{message}</div>}
// → Only shows when message state has value

// ============================================
// LOGIC FLOW
// ============================================

// Initial state:
// → All time values at 0
// → Timer inactive
// → No message

// User enters values (e.g., 00:01:30):
// → onChange handlers validate and set states
// → Math.max/Math.min ensures valid ranges

// Click Start button:
// → startTimer checks if any value > 0
// → If no values: show error message
// → If values exist: setIsTimerActive(true), clear message
// → useEffect triggers → starts setInterval

// Timer running (every 1 second):
// → Checks second > 0 → decrements
// → If second hits 0 and minute > 0 → decrements minute, resets second to 59
// → If both second and minute hit 0 and hour > 0 → decrements hour, resets both to 59
// → Continues until all values reach 0

// Click Pause button:
// → setIsTimerActive(false)
// → useEffect cleanup clears interval
// → Timer stops at current values

// Click Start again (resume):
// → setIsTimerActive(true)
// → useEffect starts new interval
// → Continues from paused values

// Click Reset button:
// → All states reset to 0
// → Timer becomes inactive

// ============================================
// KEY CONCEPTS
// ============================================

// Why useEffect dependencies? → Re-run logic when timer state changes
// Why setInterval? → Execute countdown logic every 1000ms (1 second)
// Why cleanup function? → Prevent multiple intervals and memory leaks
// Why Math.max(0, Math.min(max, value))? → Clamp input within valid range
// Why formatTime? → Display consistency (00:05:30 vs 0:5:30)
// Why conditional button rendering? → Toggle between Start/Pause based on state
// Why check all values in startTimer? → Prevent starting empty timer
// Countdown order priority: seconds → minutes → hours (most frequent to least)`,
  },
  {
    title: '06_counter',
    code: `// Inside App.jsx, use Counter.tsx component
// Inside Counter.jsx component, we start maintaining the following logic
// Step 1: useState logic for count, incrementCountByValue (Ex: 1)
// Step 2: logic for onClick on + button (handleIncrement)
// Step 3: logic for onClick on - button (handleDecrement)
// Step 4: logic for input onChange where user can change the default incrementValue (Ex: 1 to 10)

// Core Logic:

// setCount(count + Number(incrementValue))
// setCount(count - Number(incrementValue))`,
  },
  {
    title: '07_dragAndDrop',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <PuzzleGame /> component
// PuzzleGame.jsx → main component with drag/drop logic
// PuzzlePiece.jsx → child component for individual puzzle pieces

// ============================================
// INITIAL PIECES SETUP
// ============================================

// Create array of 9 puzzle pieces using Array.from
// Syntax: Array.from({ length: 9 }, (_, index) => ({ ... }))

// First param: { length: 9 } → creates array with 9 slots
// Second param: callback function with (_, index) → underscore ignores first arg

// Return object for each piece:
// → id: index + 1 (starts from 1, not 0)
// → url: \`https://picsum.photos/200/200?random=\${index + 1}\`

// Result: [{id: 1, url: "..."}, {id: 2, url: "..."}, ... {id: 9, url: "..."}]

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: pieces → useState(initialPieces)
// → Holds current arrangement of puzzle pieces

// State 2: draggedPieceId → useState(null)
// → Tracks which piece is currently being dragged
// → null when no drag operation is happening

// ============================================
// DRAG START HANDLER
// ============================================

// handleDragStart function:
// → Accepts parameter: id (id of piece being dragged)
// → Simply: setDraggedPieceId(id)
// → Stores which piece user started dragging

// ============================================
// DROP HANDLER (CORE SWAPPING LOGIC)
// ============================================

// handleDrop function:
// → Accepts parameter: id (id of piece where drag ended/dropped)

// STEP 1: Use setPieces with callback (prevPieces) => { ... }

// STEP 2: Create copy of pieces array
// → const newPieces = [...prevPieces]
// → Never mutate state directly

// STEP 3: Find draggedIndex
// → const draggedIndex = newPieces.findIndex((p) => p.id === draggedPieceId)
// → Finds position of piece that was dragged
// → draggedPieceId comes from state (set in handleDragStart)

// STEP 4: Find droppedIndex
// → const droppedIndex = newPieces.findIndex((p) => p.id === id)
// → Finds position of piece where drag ended
// → id comes from function parameter

// STEP 5: Swap pieces using array destructuring
// → [newPieces[draggedIndex], newPieces[droppedIndex]] = [newPieces[droppedIndex], newPieces[draggedIndex]]
// → Swaps the two pieces in the array

// STEP 6: Return swapped array
// → return newPieces

// After setPieces callback:
// → setDraggedPieceId(null) to reset drag state

// ============================================
// RENDERING PIECES (JSX)
// ============================================

// Map over pieces array
// → pieces.map((piece) => <PuzzlePiece ... />)

// Pass props to each PuzzlePiece:
// → key={piece.id} → React key for list rendering
// → id={piece.id} → piece identifier
// → url={piece.url} → image URL
// → onDragStart={handleDragStart} → drag start handler
// → onDrop={handleDrop} → drop handler
// → onDragOver={(e) => e.preventDefault()} → allows drop by preventing default

// ============================================
// PUZZLEPIECE.JSX - CHILD COMPONENT
// ============================================

// Props: { id, url, onDragStart, onDrop, onDragOver }

// Returns div wrapper containing img element

// Div attributes (drag & drop events):
// → onDragStart={() => onDragStart(id)} → calls parent handler with piece id
// → onDrop={() => onDrop(id)} → calls parent handler with piece id
// → onDragOver={onDragOver} → prevents default to allow drop

// Img element:
// → src={url} → displays the puzzle piece image
// → alt={\`Piece \${id}\`} → accessibility text

// Note: draggable='true' can be added to div to make it draggable (HTML5 default)

// ============================================
// DRAG & DROP FLOW
// ============================================

// User starts dragging piece (id: 5):
// → onDragStart triggers on piece 5
// → Calls handleDragStart(5)
// → setDraggedPieceId(5) → state now tracks piece 5

// User drags over piece (id: 2):
// → onDragOver triggers
// → e.preventDefault() allows drop action

// User drops on piece (id: 2):
// → onDrop triggers on piece 2
// → Calls handleDrop(2)
// → handleDrop logic runs:
// - Creates copy of pieces array
// - Finds draggedIndex (where piece 5 is located)
// - Finds droppedIndex (where piece 2 is located)
// - Swaps piece 5 and piece 2 positions
// - Returns new array
// → setDraggedPieceId(null) → resets drag state
// → Component re-renders with swapped pieces

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Create initial array with specific length and structure
// Why draggedPieceId state? → Track which piece is being moved
// Why findIndex? → Locate positions in array for swapping
// Why array destructuring for swap? → Clean one-line swap syntax
// Why e.preventDefault() in onDragOver? → Allow drop action (HTML5 default blocks it)
// Why pass id in handlers? → Identify which piece triggered the event
// Why copy array with spread? → Immutability - never mutate state directly
// Why set draggedPieceId to null after drop? → Clean up/reset drag state
// HTML5 drag/drop events order: dragStart → dragOver → drop`,
  },
  {
    title: '08_infiniteScroll',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <InfiniteScroll /> component
// InfiniteScroll.jsx → contains all infinite scroll logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: images → holds array of image objects

// Initial value uses Array.from({ length: 5 }, (_, index) => ({ ... }))
// → Creates 5 initial images
// → Each with: id (index + 1) and url (picsum with random query)
// → Result: [{id: 1, url: "..."}, {id: 2, url: "..."}, ... {id: 5, url: "..."}]

// State 2: isFetching → useState(false)
// → Tracks if currently loading new images (like API loading state)
// → Prevents multiple simultaneous fetch calls

// State 3: nextImageId → useState(6)
// → Tracks the next image id to fetch
// → Starts at 6 because initial images are 1-5

// ============================================
// useEffect: SCROLL EVENT LISTENER
// ============================================

// Dependency array: [nextImageId, isFetching, handleScroll]
// → Re-runs when any of these change

// Setup scroll listener:
// → window.addEventListener('scroll', handleScroll)

// Cleanup function:
// → return () => window.removeEventListener('scroll', handleScroll)
// → Removes listener on unmount to prevent memory leaks

// ============================================
// HANDLESCROLL FUNCTION
// ============================================

// Purpose: Detect when user scrolls near bottom of page

// Scroll detection condition:
// window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isFetching

// Breaking down the condition:

// Part 1: window.innerHeight
// → Visible viewport height

// Part 2: document.documentElement.scrollTop
// → How far user has scrolled from top

// Part 3: document.documentElement.offsetHeight
// → Total page height (including scrollable content)

// Part 4: offsetHeight - 100
// → Trigger point is 100px before actual bottom
// → Starts loading before user reaches absolute bottom

// Part 5: && !isFetching
// → Only fetch if not already fetching
// → Prevents duplicate requests

// If condition true: call fetchImages()

// ============================================
// FETCHIMAGES FUNCTION (CORE LOGIC)
// ============================================

// Simulates API call with setTimeout

// STEP 1: Set loading state
// → setIsFetching(true)

// STEP 2: Wrap logic in setTimeout (simulates network delay)
// → setTimeout(() => { ... }, 1000)

// STEP 3: Create new batch of 5 images inside setTimeout
// → Array.from({ length: 5 }, (_, index) => ({ ... }))
// → id: nextImageId + index (e.g., if nextImageId is 6: 6, 7, 8, 9, 10)
// → url: \`https://picsum.photos/200/200?random=\${nextImageId + index}\`

// STEP 4: Append new images to existing ones
// → setImages((currentImages) => [...currentImages, ...newImages])
// → Spread operator combines old and new images

// STEP 5: Update nextImageId for next batch
// → setNextImageId(nextImageId + 5)
// → Example: was 6, now becomes 11 (for next batch 11-15)

// STEP 6: Reset loading state
// → setIsFetching(false)

// ============================================
// JSX RENDERING
// ============================================

// Map over images array:
// → images.map((image) => <img ... />)

// Each img element:
// → key={image.id}
// → src={image.url}
// → alt={\`Random \${image.id}\`}

// Conditional loading indicator:
// → {isFetching && <div>Loading...</div>}
// → Shows "Loading..." text when fetching new images

// ============================================
// INFINITE SCROLL FLOW
// ============================================

// Initial render:
// → Shows 5 images (id: 1-5)
// → nextImageId is 6
// → Scroll listener attached

// User scrolls down:
// → handleScroll continuously checks scroll position
// → When position reaches (viewport + scrolled >= total height - 100px):
// - AND not currently fetching
// - Calls fetchImages()

// fetchImages executes:
// → Sets isFetching to true → shows "Loading..."
// → After 1 second (setTimeout):
// - Creates 5 new images (id: 6-10)
// - Appends to existing images array
// - Updates nextImageId to 11
// - Sets isFetching to false → hides "Loading..."

// User scrolls more:
// → Process repeats
// → Next batch: id 11-15, then 16-20, and so on...
// → Infinite loading as long as user keeps scrolling

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Generate multiple objects with sequential ids easily
// Why nextImageId state? → Track where to start next batch of images
// Why isFetching check? → Prevent fetching multiple batches simultaneously
// Why -100 in scroll condition? → Better UX, loads before hitting absolute bottom
// Why setTimeout? → Simulates real API delay (in real app, use fetch/axios)
// Why spread operator in setImages? → Preserve existing images, add new ones
// Why cleanup in useEffect? → Remove event listeners to prevent memory leaks
// Why += 5 for nextImageId? → Each batch has 5 images, so increment by 5
// innerHeight + scrollTop = how far down user is from top
// offsetHeight = total scrollable height`,
  },
  {
    title: '09_jsonCreator',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main container, holds final JSON structure
// JSONCreator.jsx → recursive component (renders itself for nested objects)

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State 1: jsonStructure → useState({})
// → Stores the entire JSON object being built

// State 2: jsonOutput → useState('')
// → Stores the stringified JSON for display in textarea

// ============================================
// APP.JSX - HANDLERS
// ============================================

// handleDataChange function:
// → Accepts: (id, key, value, children)
// → Updates: setJsonStructure({ [key]: value, children })
// → Uses computed property name [key] for dynamic key
// → Wrapped in useCallback for performance

// handleGetJSON function:
// → Converts jsonStructure to formatted string
// → JSON.stringify(jsonStructure, null, 2)
// → null = no replacer function
// → 2 = indentation spaces for readability
// → Sets result in jsonOutput state

// ============================================
// APP.JSX - RENDERING
// ============================================

// Renders root JSONCreator component:
// → id={0} → root level identifier
// → data={jsonStructure} → current structure
// → onDataChange={handleDataChange} → callback to update structure

// "Get JSON" button:
// → onClick={handleGetJSON}
// → Triggers conversion to string

// Textarea for output:
// → readOnly → user cannot edit
// → value={jsonOutput} → displays formatted JSON
// → rows and cols for sizing

// ============================================
// JSONCREATOR.JSX - STATE MANAGEMENT
// ============================================

// Wrapped in React.memo → prevents unnecessary re-renders
// Props: { id, data, onDataChange }

// State 1: key → useState('')
// → Stores the key name for this JSON property

// State 2: value → useState('')
// → Stores the value for this JSON property

// State 3: children → useState([])
// → Stores array of child JSONCreator components
// → Each child is object: { id, data }

// ============================================
// useEffect: SYNC STATE TO PARENT
// ============================================

// Dependency array: [key, value, children, onDataChange, id]
// → Runs whenever any of these change

// Condition check: if (key !== '')
// → Only sync if key has meaningful value
// → Prevents syncing empty/initial state

// Call parent handler:
// → onDataChange(id, key, value, children)
// → Passes current state up to parent component

// ============================================
// HANDLEADD FUNCTION
// ============================================

// Purpose: Add a new child (nested object)

// Logic:
// → Create new child object: { id: Date.now(), data: {} }
// → Date.now() generates unique id (timestamp)
// → data: {} starts as empty object

// Update state:
// → setChildren([...children, newChild])
// → Spread existing children, add new one at end

// Wrapped in useCallback with [children] dependency

// ============================================
// HANDLEREMOVE FUNCTION
// ============================================

// Purpose: Remove a specific child

// Accepts: childId (id of child to remove)

// Logic:
// → setChildren(children.filter((child) => child.id !== childId))
// → Filter out child with matching id
// → Returns new array without that child

// Wrapped in useCallback with [children] dependency

// ============================================
// HANDLECHILDCHANGE FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Update data for a specific child

// Accepts: (childId, childKey, childValue, childChildren)
// → childId: which child to update
// → childKey, childValue, childChildren: new data for that child

// Uses setChildren with callback: (prevChildren) => { ... }

// STEP 1: Map over prevChildren array
// → Find child with matching id

// STEP 2: For matching child, update its data
// → { ...child, data: { [childKey]: childValue, children: childChildren } }
// → Spread existing child properties
// → Replace data with new structure

// STEP 3: For non-matching children, return as-is

// STEP 4: Optimization check
// → Compare JSON.stringify of updated vs previous
// → If no actual change, return prevChildren (prevents re-render)
// → If changed, return updatedChildren

// Wrapped in useCallback with empty [] dependency
// → Doesn't depend on children (uses prevChildren in callback)

// ============================================
// JSONCREATOR.JSX - RENDERING
// ============================================

// Input 1: Key input
// → value={key}
// → onChange={(e) => setKey(e.target.value)}

// Input 2: Value input
// → value={value}
// → onChange={(e) => setValue(e.target.value)}

// Add button:
// → onClick={handleAdd}
// → Adds new nested child

// Map over children array:
// → children.map((child) => ...)

// For each child:
// → Wrapped in div with key={child.id}
// → Recursively renders JSONCreator component:
// - id={child.id}
// - data={child.data}
// - onDataChange={handleChildChange} → different handler for nested levels
// → Remove button:
// - onClick={() => handleRemove(child.id)}
// - Removes this specific child

// ============================================
// RECURSIVE FLOW EXAMPLE
// ============================================

// User creates root level:
// → Enters key: "user", value: "John"
// → Clicks "+" to add child

// handleAdd runs:
// → Creates child: { id: 1234567890, data: {} }
// → Adds to children array
// → Triggers re-render

// New JSONCreator renders (nested):
// → User enters key: "age", value: "25"
// → This calls handleChildChange on parent
// → Parent updates its children array with this child's data

// handleChildChange updates:
// → Finds child with id: 1234567890
// → Updates its data: { age: "25", children: [] }
// → Parent's useEffect triggers
// → Syncs up to App.jsx via onDataChange

// Click "Get JSON" button:
// → Converts entire structure to string
// → Displays in textarea
// → Result: {"user": "John", "children": [{"age": "25", "children": []}]}

// ============================================
// KEY CONCEPTS
// ============================================

// Why React.memo? → Prevents re-renders when props haven't changed
// Why recursive component? → Each JSONCreator can contain more JSONCreators (nested structure)
// Why Date.now() for id? → Unique timestamp, simple way to generate unique keys
// Why useCallback? → Prevents function recreation on every render (performance)
// Why filter for remove? → Creates new array without deleted item (immutable)
// Why map for update? → Creates new array with updated item (immutable)
// Why JSON.stringify comparison? → Deep equality check (detect actual data changes)
// Why [key] syntax? → Computed property name (dynamic object keys)
// Why prevChildren in callback? → Access most current state (avoid stale closures)
// Why check key !== ''? → Prevent syncing empty/initial state to parent
// Recursive rendering: Component renders itself for nested structures`,
  },
  {
    title: '10_lightAndDarkMode',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all logic (Context setup + UI)
// No separate child components needed for basic theme toggle

// ============================================
// CONTEXT API SETUP
// ============================================

// Create context outside component:
// → export const ThemeContext = createContext(null)
// → null is default value (when no Provider exists)
// → Export for potential use in other components

// ============================================
// STATE MANAGEMENT
// ============================================

// State: currentTheme → useState('dark')
// → Tracks current theme ('dark' or 'light')
// → Default: 'dark'

// ============================================
// TOGGLE FUNCTION
// ============================================

// toggleTheme function:
// → Uses setState with callback: (theme) => ...
// → Ternary logic: theme === 'dark' ? 'light' : 'dark'
// → Switches between two themes

// ============================================
// CONTEXT PROVIDER WRAPPER
// ============================================

// Wrap entire app in ThemeContext.Provider:
// → <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
// → value prop contains object with:
// - currentTheme: current state value
// - toggleTheme: function to change theme
// → Any child component can access these via useContext

// ============================================
// JSX STRUCTURE
// ============================================

// Main div:
// → className='App' → for centering content
// → id={currentTheme} → dynamic id based on state ('dark' or 'light')
// → Why id? Makes CSS targeting easier for theme-specific styles

// Switch container div:
// → Wraps label and button together

// Label element:
// → Conditional text: {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
// → Shows current mode name

// Button element:
// → onClick={toggleTheme} → triggers theme switch
// → className with template literal for dynamic class:
// \`switch-button \${currentTheme === 'dark' ? 'switch-button-on' : ''}\`
// → Base class: 'switch-button' (always present)
// → Conditional class: 'switch-button-on' (only when dark mode)

// Span inside button:
// → <span className='slider'></span>
// → This is the circular ball that slides
// → No text inside button, only the slider span

// ============================================
// CSS APPROACH - THEME COLORS
// ============================================

// .App class:
// → Center content: display flex, justify-content/align-items center
// → Set minimum height (viewport height)

// Theme-specific styling using id selector:
// → #light { background-color: lightgray; }
// → #dark { background-color: black; }
// → Why id? Direct targeting based on currentTheme state

// Label color based on theme:
// → #light label { color: dark-color; }
// → #dark label { color: light-color; }
// → Ensures text is readable on both backgrounds

// ============================================
// CSS APPROACH - TOGGLE BUTTON (CORE UI)
// ============================================

// .switch-button (base styles - the track/background):
// → position: relative → allows absolute positioning of slider inside
// → width: ~60px, height: ~30px → size of the toggle track
// → background-color: gray → track background
// → border-radius: 15px (half of height) → rounded pill shape
// → cursor: pointer → indicates clickable

// .slider (the ball that moves):
// → position: absolute → positioned relative to .switch-button
// → top: 2px, left: 2px → small padding from edges
// → width: ~26px, height: ~26px → size of ball
// → background-color: white → ball color
// → border-radius: 50% → perfect circle
// → transition: transform 0.3s ease → smooth sliding animation
// → Why transform in transition? Prepares for translateX movement

// .switch-button-on .slider (dark mode - moved position):
// → transform: translateX(26px) → moves ball to right
// → 26px matches the width of slider + padding
// → This class applied when currentTheme === 'dark'
// → Transition handles smooth movement automatically

// ============================================
// LOGIC FLOW
// ============================================

// Initial render (dark mode):
// → currentTheme = 'dark'
// → Main div has id='dark' → applies dark background
// → Button has class 'switch-button switch-button-on'
// → Slider ball positioned on right (translateX applied)
// → Label shows "Dark Mode"

// User clicks button:
// → toggleTheme runs
// → currentTheme changes from 'dark' to 'light'
// → Component re-renders

// After toggle (light mode):
// → Main div id changes to 'light' → applies light background
// → Button class becomes just 'switch-button' (no 'switch-button-on')
// → Slider ball slides to left (no translateX)
// → Transition creates smooth animation
// → Label shows "Light Mode"

// Click again:
// → Toggles back to dark mode
// → Cycle repeats

// ============================================
// CSS SELECTOR BREAKDOWN
// ============================================

// .switch-button-on .slider means:
// → Find element with class 'slider'
// → That is a descendant of element with class 'switch-button-on'
// → This is how we target the slider when button is in "on" state

// Why this approach works:
// → When dark mode: button has 'switch-button-on' class
// → CSS rule applies transform to slider
// → When light mode: button doesn't have 'switch-button-on' class
// → CSS rule doesn't apply, slider returns to default position
// → Transition property animates the change

// ============================================
// KEY CONCEPTS
// ============================================

// Why Context API? → Share theme state across app without prop drilling
// Why id on main div? → Easy CSS targeting for theme-specific styles
// Why position relative on button? → Container for absolute positioned slider
// Why position absolute on slider? → Allows translateX movement within button
// Why transition on transform? → Smooth sliding animation
// Why translateX? → Moves element horizontally without layout shifts
// Why 50% border-radius on slider? → Creates perfect circle
// Why template literal for className? → Combine static and conditional classes
// Why callback in setState? → Access current state value safely
// createContext(null) → Creates context with default null value
// Provider value prop → Makes data available to consuming components`,
  },
  {
    title: '11_navigationBar',
    code: `// Inside App.jsx, we are maintaining Navbar.jsx component.

// Inside Navbar.jsx, I will start with

// - State ---> Active State logic for Mobile Mode (ex: Show Sidebar/Navbar and hide Sidebar/Navbar)
// - Funcs ---> Toggle Navbar logic for Mobile Mode
// - Static data ---> li (listItem data) with bunch of href and label

// Step 1: Return JSX part, I'll start with HTML Tag <nav></nav>

// Step 2: My nav tag is having anchor tag (single anchor tag) with HOME as BRAND

// Ex: <a href="#home">HOME</a>

// Step 3: I have an un-ordered list (<ul></ul>) and it has bunch of li, (I use map operation for list items)

// Ex:

<ul>
  {navLinks.map(({ href, label }) => (
    <li>
      <a href={href}>{label}</a>
    </li>
  ))}
</ul>;

// Step 4: I will be maintaining a div + onClick logic

// Step 5: The above div will be having 3 divs to achieve HAMBURGER

// <---- END OF JS LOGIC ----> //

// ------------------------------------------------------------------------

// <---- Start OF CSS LOGIC ----> //

// Step 1: for nav tag --> Write the same logic to center a div/content

// Step 2: for ul tag has the className called "nav__menu", as this holds li items, so you must have to write display: flex and put some gap: 3em as mandatory (rest are your choice)

// Step 3: our navToggle div has the className called "nav__toggler", which we will hide using display:none initially

// Step 4: All the divs inside nav__toggler can be targeted with the help of

// Ex: nav__toggler div{}

// To achieve HAMBURGER ICON, we have to put width, height, margin for these

// Step 5: LOGIC FOR MOBILE MODE

// Ex: @media (max-width: 768px){}

// In the mobile Mode, we change the display: none to display:block for "nav__toggler" className

// Inside the @media, for className "nav__menu", I have to make the position: fixed, with some top, right: 0, and height of this (ex: 93vh), width: 50vw, flex-direction:column, and this transform in the translateX direction with 100%

// translateX(0%) means we are showing it ---> that means it is active (Ex: nav__active)

// translateX(100%) means it is non-active or empty string -->  So basically it is hidden in our static class (nav__menu)

// Ex: <ul className={\`nav__menu \${isActive ? 'nav__active' : ''}\`}>`,
  },
  {
    title: '12_pagination',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main component with pagination logic
// Posts.jsx → displays list of posts
// Pagination.jsx → displays page number buttons
// useFetch.js → custom hook for API calls

// ============================================
// CUSTOM HOOK: useFetch
// ============================================

// Purpose: Fetch data from API

// State 1: data → useState(null) → stores API response
// State 2: loading → useState(false) → tracks loading status

// useEffect with [url] dependency:
// → Runs when url changes or on mount

// Inside useEffect:
// → Define async fetchData function
// → setLoading(true) before fetch
// → Use fetch(url) to get data
// → Convert response to JSON: await response.json()
// → setData(newData) to store result
// → catch block: handle errors, setData(null)
// → finally block: setLoading(false) always runs

// Returns: { data, loading }

// ============================================
// APP.JSX - SETUP
// ============================================

// Call custom hook:
// → const { data: posts, loading } = useFetch(url)
// → Destructure and rename data to posts
// → Get loading state

// ============================================
// STATE MANAGEMENT
// ============================================

// State: currentPage → useState(1)
// → Tracks which page user is viewing
// → Default: page 1

// Constant: postsPerPage → 10
// → How many posts to show per page
// → Not state because it never changes

// Variable: currentPosts → []
// → Holds posts for current page
// → Recalculated on each render (not state)

// ============================================
// CORE PAGINATION LOGIC
// ============================================

// Only calculate if data loaded and posts exist:
// → Condition: !loading && posts?.length > 0

// STEP 1: Calculate indexOfLastPost
// → indexOfLastPost = currentPage * postsPerPage
// → Example: page 1 → 1 * 10 = 10
// → Example: page 2 → 2 * 10 = 20

// STEP 2: Calculate indexOfFirstPost
// → indexOfFirstPost = indexOfLastPost - postsPerPage
// → Example: page 1 → 10 - 10 = 0
// → Example: page 2 → 20 - 10 = 10

// STEP 3: Slice posts array
// → currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
// → Example page 1: posts.slice(0, 10) → first 10 posts
// → Example page 2: posts.slice(10, 20) → next 10 posts
// → slice excludes end index (so indexOfLastPost is exclusive)

// ============================================
// PAGINATE FUNCTION
// ============================================

// paginateFunc accepts: pageNumber

// Logic:
// → Check if pageNumber exists (truthy check)
// → If yes: setCurrentPage(pageNumber)
// → Updates state → triggers re-render → new slice calculated

// ============================================
// APP.JSX - RENDERING
// ============================================

// Main container div with className

// Header: <h1>My Blog</h1>

// Conditional rendering:
// → Check: posts?.length > 0
// → Ensures posts exist before rendering components

// Render Posts component:
// → Props: posts={currentPosts}, loading={loading}
// → Passes only current page's posts (already sliced)

// Render Pagination component:
// → Props: postsPerPage={postsPerPage}
// → Props: totalPosts={posts?.length}
// → Props: paginateFunc={paginateFunc}

// ============================================
// POSTS.JSX COMPONENT
// ============================================

// Props: { posts, loading }

// Loading check:
// → if (loading) return <h2>Loading...</h2>
// → Early return pattern

// Render posts list:
// → Wrap in <ul> with className
// → Map over posts array: posts?.map((post) => ...)
// → Each item in <li> with key={post.id}
// → Display post.title inside li

// ============================================
// PAGINATION.JSX COMPONENT
// ============================================

// Props: { postsPerPage, totalPosts, paginateFunc }

// Create pageNumbers array:
// → const pageNumbers = []
// → Start as empty array

// Calculate total pages and populate array:
// → for loop: i = 1 to Math.ceil(totalPosts / postsPerPage)
// → Why Math.ceil? Round up for partial pages
// → Example: 95 posts ÷ 10 per page = 9.5 → rounds to 10 pages
// → Push each number: pageNumbers.push(i)
// → Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Render page buttons:
// → Wrap in <ul> with className 'pagination'
// → Map over pageNumbers: pageNumbers?.map((pageNum) => ...)
// → Each in <li> with key={pageNum}
// → Button inside li:
//   - onClick={() => paginateFunc(pageNum)}
//   - Display: {pageNum}
//   - Calls function with page number when clicked

// ============================================
// PAGINATION FLOW
// ============================================

// Initial load (page 1):
// → useFetch called, loading = true
// → Posts component shows "Loading..."
// → API returns 100 posts
// → loading = false, posts populated
// → indexOfLastPost = 1 * 10 = 10
// → indexOfFirstPost = 10 - 10 = 0
// → currentPosts = posts.slice(0, 10) → first 10 posts
// → Posts component displays 10 items
// → Pagination shows buttons 1-10 (100 posts ÷ 10)

// User clicks page 3 button:
// → paginateFunc(3) called
// → setCurrentPage(3)
// → Component re-renders
// → indexOfLastPost = 3 * 10 = 30
// → indexOfFirstPost = 30 - 10 = 20
// → currentPosts = posts.slice(20, 30) → posts 21-30
// → Posts component displays posts 21-30
// → User sees page 3 content

// User clicks page 10 (last page with 95 total posts):
// → paginateFunc(10) called
// → setCurrentPage(10)
// → indexOfLastPost = 10 * 10 = 100
// → indexOfFirstPost = 100 - 10 = 90
// → currentPosts = posts.slice(90, 100) → posts 91-95 (only 5 posts)
// → Posts component displays remaining 5 posts

// ============================================
// CSS FOR PAGINATION
// ============================================

// .pagination class:
// → display: flex
// → justify-content: center
// → Centers pagination buttons horizontally

// Optional button styling:
// → Add spacing between buttons (margin)
// → Style active page differently (separate logic needed)
// → Hover effects for better UX

// ============================================
// KEY CONCEPTS
// ============================================

// Why Math.ceil? → Handle partial last page (95 posts needs 10 pages, not 9)
// Why slice? → Extract subset of array without mutating original
// Why multiply for indexOfLastPost? → Scale up by page number
// Why subtract for indexOfFirstPost? → Get start of current page window
// Why currentPosts not state? → Derived/calculated value, no need for state
// Why check posts?.length? → Ensure data loaded before rendering
// Why optional chaining (?)? → Prevent errors if posts is null/undefined
// Why for loop starting at 1? → Page numbers displayed to user start at 1
// Why pass pageNum to function? → Tell parent which page was clicked
// slice(start, end) → end is exclusive (slice(0, 10) gets indices 0-9)
// Custom hook pattern → Reusable data fetching logic`,
  },
  {
    title: '13_progressbar',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Progressbar /> component
// Progressbar.jsx → contains all progress bar logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: filled → useState(0)
// → Tracks progress percentage (0 to 100)
// → Starts at 0

// State 2: isRunning → useState(false)
// → Tracks if progress bar is currently running
// → Starts as false (not running)

// State 3: timeoutId → useState(null)
// → Stores setTimeout id for cleanup
// → Needed to clear timeout when stopping/resetting

// ============================================
// useEffect: PROGRESS INCREMENT LOGIC
// ============================================

// Dependency array: [filled, isRunning]
// → Runs whenever filled or isRunning changes

// CONDITION 1: if (filled < 100 && isRunning)
// → Progress bar is running and hasn't reached 100%

// Inside this condition:
// → Create setTimeout that increments filled by 25 after 250ms
// → const id = setTimeout(() => setFilled((prev) => prev + 25), 250)
// → Store timeout id: setTimeoutId(id)
// → Why prev callback? Access most current state safely

// CONDITION 2: else if (filled === 100)
// → Progress reached 100%
// → setIsRunning(false) to stop the progress
// → Automatically stops when complete

// Cleanup function:
// → return () => clearTimeout(timeoutId)
// → Clears timeout when component unmounts or dependencies change
// → Prevents memory leaks and multiple timers

// ============================================
// BUTTON HANDLERS
// ============================================

// handleStart function:
// → Simply: setIsRunning(true)
// → Triggers useEffect to start incrementing

// handleStop function:
// → Simply: setIsRunning(false)
// → Stops useEffect from creating new timeouts
// → Progress stays at current value

// handleReset function:
// → clearTimeout(timeoutId) → stops any running timeout
// → setFilled(0) → resets progress to 0%
// → setIsRunning(false) → ensures stopped state

// ============================================
// JSX STRUCTURE - PROGRESS BAR DISPLAY
// ============================================

// Two main sections: progress bar + buttons

// SECTION 1: Progress Bar
// → Outer div with className 'progressbar' (container/background)
// → Inner div with className 'progressbar-filled' (colored fill)
// → Span with className 'progressPercent' (text showing percentage)

// Inner div (filled portion):
// → Dynamic inline style: style={{ width: \`\${filled}%\` }}
// → Example: filled = 50 → width: "50%"
// → CSS transition on width creates smooth animation

// Span (percentage text):
// → Display: {filled}%
// → Shows current progress as text overlay

// ============================================
// JSX STRUCTURE - BUTTONS
// ============================================

// SECTION 2: Buttons container
// → Wrap all buttons in div with className 'playBtns'

// Start button:
// → onClick={handleStart}
// → disabled={isRunning || filled === 100}
// → Disabled when: already running OR already complete

// Stop button:
// → onClick={handleStop}
// → disabled={!isRunning}
// → Disabled when: not running (can't stop if not started)

// Reset button:
// → onClick={handleReset}
// → No disabled condition (can always reset)

// ============================================
// CSS APPROACH
// ============================================

// .progressbar (outer container):
// → position: relative (for absolute positioning of inner elements)
// → width: 100% or fixed width
// → height: ~30px
// → background-color: light gray (unfilled area)
// → border-radius: for rounded corners
// → overflow: hidden (keeps inner div within bounds)

// .progressbar-filled (inner filled bar):
// → position: absolute or relative
// → height: 100% (matches parent height)
// → background-color: blue/green (filled color)
// → transition: width 0.25s ease (smooth width animation)
// → Why transition? Makes progress increase smoothly

// .progressPercent (text overlay):
// → position: absolute
// → Center it: top: 50%, left: 50%, transform: translate(-50%, -50%)
// → color: white or contrasting color
// → z-index: 1 (appears above filled bar)
// → font-weight: bold for visibility

// .playBtns (button container):
// → display: flex
// → justify-content: center or space-around
// → margin-top: spacing from progress bar
// → gap: spacing between buttons

// Button styling:
// → Padding, border-radius for appearance
// → disabled:opacity or disabled:cursor for disabled state
// → Hover effects for better UX

// ============================================
// PROGRESS BAR FLOW
// ============================================

// Initial state:
// → filled = 0, isRunning = false
// → Progress bar shows 0% (no filled portion)
// → Start button enabled, Stop/Reset buttons disabled

// User clicks Start:
// → handleStart runs
// → setIsRunning(true)
// → useEffect triggers (isRunning changed)
// → Condition: 0 < 100 && true → creates setTimeout
// → After 250ms: setFilled(0 + 25) → filled becomes 25
// → Start button disabled, Stop button enabled

// Progress continues:
// → filled = 25, isRunning = true
// → useEffect runs again (filled changed)
// → Creates new setTimeout
// → After 250ms: filled becomes 50
// → Cycle repeats: 0 → 25 → 50 → 75 → 100

// Reaches 100%:
// → filled = 100, isRunning = true
// → useEffect runs
// → First condition false (filled not < 100)
// → Second condition true (filled === 100)
// → setIsRunning(false) → automatically stops
// → Start button disabled (filled === 100)
// → Stop button disabled (!isRunning)
// → Only Reset button available

// User clicks Stop (before 100%):
// → handleStop runs
// → setIsRunning(false)
// → useEffect cleanup clears current timeout
// → No new timeouts created (isRunning is false)
// → Progress frozen at current value
// → Can click Start to resume

// User clicks Reset:
// → handleReset runs
// → clearTimeout(timeoutId) → stops any running timeout
// → setFilled(0) → progress back to 0%
// → setIsRunning(false) → ensures stopped
// → Back to initial state

// ============================================
// KEY CONCEPTS
// ============================================

// Why setTimeout not setInterval? → More control, prevents overlap
// Why store timeoutId in state? → Need reference for clearTimeout
// Why cleanup in useEffect? → Clear timeout when dependencies change
// Why prev in setFilled? → Avoid stale state in async operations
// Why disable buttons? → Prevent invalid actions (can't start if running)
// Why check filled === 100? → Auto-stop when complete
// Why inline style for width? → Dynamic value based on state
// Why transition in CSS? → Smooth visual animation as width changes
// filled + 25 every 250ms → 0 to 100 in 1 second (4 steps × 250ms)
// Dynamic width % → CSS automatically animates the width change
// Position relative + absolute → Stack text over progress bar`,
  },
  {
    title: '14_skeleton_loader',
    code: `// THIS IS 98% UI //

// Entire code is written in App.jsx

// Step 1: Inside App.jsx, I simple maintain the main div className as card

// Step 2: For showing purpose I'm using div h3 and 2 <p> tags

// Ex:

<div className='card'>
  <div className='img skeleton-loader'></div>
  <h3 className='heading skeleton-loader'></h3>
  <p className='content1 skeleton-loader'></p>
  <p className='content2 skeleton-loader'></p>
</div>;

// Step 2: Our main div className "card" must have border, padding, Using margin: 0 auto as it centers the content

// Step 3: Common class "skeleton-loader", background should be a lightGray color and margin-bottom between all these elements

// Step 4: For visual appealing, our first div height: 250px;

// Step 5: CORE Logic of the Skeleton Loader is using

// - background: linear-gradient
// - transform: translateX(-100%);
// - animation: animation-name timeDuration infinite;

// @keyframes animation-name --> At 100% transform: translateX(100%);

// i) For our constant className: skeleton-loader we are appending ::before (pseudo class)

// content is empty string, display: anything, height: 100%,
// background: linear-gradient()
// 1st property: to right
// 2nd property: transparent color
// 3rd property: white would be better color
// 4th property: transparent color

// transform: translateX(-100%) // if it is positive then it starts from right (Now it is left) ---> -100% is a good idea !!

// animation: animation-name 1s infinite

// @keyframes animation-name{

/*

100%{
transform: translateX(100%)
}

*/

// Note: PROVIDE THE animation property in pseudo class and use that animation class beside to keyframes`,
  },
  {
    title: '15_starRating',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <StarRating /> component
// StarRating.jsx → contains all star rating logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: rating → useState(0)
// → Stores the selected/clicked rating (1-5)
// → Starts at 0 (no rating selected)

// State 2: hoverRating → useState(0)
// → Stores temporary preview rating on hover
// → Starts at 0 (no hover)

// ============================================
// CURRENT RATING LOGIC
// ============================================

// const currentRating = hoverRating || rating
// → Shows hover preview when hovering
// → Falls back to actual rating when not hovering
// → OR operator: if hoverRating is 0 (falsy), uses rating

// ============================================
// RATING MESSAGES ARRAY
// ============================================

// Constant array: ratingMessages
// → ['Awful', 'Poor', 'Fair', 'Good', 'Excellent']
// → Index 0 = Awful (1 star), Index 4 = Excellent (5 stars)

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'container'

// Star rating div with className 'star-rating':
// → Contains two parts: stars + message

// PART 1: Generate 5 stars
// → Array.from({ length: 5 }, (_, index) => renderStar(index))
// → Creates array with 5 slots
// → Calls renderStar for each index (0 to 4)

// PART 2: Display rating message
// → Span element with className 'rating-message'
// → Inside: <strong>{getRatingMessage(currentRating)}</strong>
// → Shows text feedback for current rating

// ============================================
// getRatingMessage FUNCTION
// ============================================

// Purpose: Convert numeric rating to text message

// Accepts: currentRatingValue (the numeric rating)

// Logic:
// → return ratingMessages[Math.ceil(currentRatingValue) - 1]

// Why Math.ceil? → Rounds up decimal values
// → Example: 2.3 becomes 3 (Fair rating)

// Why -1? → Convert from 1-based rating to 0-based array index
// → Example: rating 1 → index 0 (Awful)
// → Example: rating 5 → index 4 (Excellent)

// ============================================
// renderStar FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Render individual star element

// Accepts: index (0 to 4)

// STEP 1: Calculate fullStar boolean
// → const fullStar = currentRating > index
// → Examples:
//   - currentRating = 3, index = 0 → 3 > 0 → true (filled)
//   - currentRating = 3, index = 2 → 3 > 2 → true (filled)
//   - currentRating = 3, index = 3 → 3 > 3 → false (empty)
//   - currentRating = 3, index = 4 → 3 > 4 → false (empty)

// STEP 2: Return span element with:

// key={index} → React key for list rendering

// className logic:
// → \`star \${fullStar ? 'full' : ''}\`
// → Base class: 'star'
// → Conditional class: 'full' added when fullStar is true

// onClick event:
// → onClick={() => handleClick(index + 1)}
// → index + 1 converts 0-4 to 1-5
// → Example: clicking first star (index 0) sets rating to 1

// onMouseOver event:
// → onMouseOver={() => handleMouseOver(index + 1)}
// → index + 1 converts 0-4 to 1-5
// → Shows preview as user hovers

// onMouseLeave event:
// → onMouseLeave={handleMouseLeave}
// → No parameter needed (always resets to 0)

// Display logic:
// → {fullStar ? '★' : '☆'}
// → Filled star (★) if fullStar is true
// → Empty star (☆) if fullStar is false

// ============================================
// EVENT HANDLERS
// ============================================

// handleClick function:
// → Accepts: value (the star number 1-5)
// → Logic: setRating(value)
// → Sets permanent rating when user clicks

// handleMouseOver function:
// → Accepts: value (the star number 1-5)
// → Logic: setHoverRating(value)
// → Shows temporary preview while hovering

// handleMouseLeave function:
// → No parameters
// → Logic: setHoverRating(0)
// → Resets hover state when mouse leaves stars
// → Returns to showing actual rating

// ============================================
// CSS APPROACH
// ============================================

// .container:
// → Center content: display flex, justify-content/align-items center

// .star-rating:
// → position: relative (for absolute positioning of message)
// → display: flex or inline-flex
// → align-items: center

// .star (base star styling):
// → cursor: pointer (shows it's clickable)
// → font-size: 2rem or larger (make stars bigger)
// → color: grey (default empty star color)
// → margin: 0 10px (spacing between stars)

// .star.full (filled star styling):
// → color: gold (or yellow for filled stars)
// → This overrides grey color when 'full' class is present

// .rating-message:
// → Optional: position absolute for placement
// → margin-left or display block for spacing
// → font-size, color for text styling

// ============================================
// STAR RATING FLOW
// ============================================

// Initial state:
// → rating = 0, hoverRating = 0
// → currentRating = 0 || 0 = 0
// → All 5 stars show empty (☆) with grey color
// → getRatingMessage(0) → ratingMessages[-1] → undefined (no message)

// User hovers over 3rd star (index 2):
// → handleMouseOver(3) called
// → setHoverRating(3)
// → currentRating = 3 || 0 = 3
// → fullStar calculation:
//   - Star 0: 3 > 0 → true → filled (★) gold
//   - Star 1: 3 > 1 → true → filled (★) gold
//   - Star 2: 3 > 2 → true → filled (★) gold
//   - Star 3: 3 > 3 → false → empty (☆) grey
//   - Star 4: 3 > 4 → false → empty (☆) grey
// → Message shows: getRatingMessage(3) → ratingMessages[3-1] → "Fair"

// User moves mouse away:
// → handleMouseLeave called
// → setHoverRating(0)
// → currentRating = 0 || 0 = 0
// → All stars return to empty (☆) grey
// → No message shown

// User hovers and clicks 4th star (index 3):
// → handleMouseOver(4) → hoverRating = 4 (preview)
// → handleClick(4) → rating = 4 (permanent)
// → currentRating = 4 || 4 = 4
// → First 4 stars filled, 5th empty
// → Message shows: "Good"

// User moves mouse away after clicking:
// → handleMouseLeave called
// → setHoverRating(0)
// → currentRating = 0 || 4 = 4
// → Rating stays at 4 (permanent)
// → First 4 stars remain filled
// → Message still shows: "Good"

// User hovers over 2nd star (index 1) after rating is 4:
// → handleMouseOver(2)
// → setHoverRating(2)
// → currentRating = 2 || 4 = 2
// → Preview shows 2 filled stars (temporary)
// → Message shows: "Poor"
// → If user doesn't click, returns to 4 stars on mouse leave

// User clicks 2nd star:
// → handleClick(2)
// → setRating(2)
// → currentRating = 0 || 2 = 2 (after mouse leave)
// → Rating updated to 2 stars permanently

// ============================================
// KEY CONCEPTS
// ============================================

// Why hoverRating || rating? → Show preview on hover, permanent on click
// Why index + 1? → Convert 0-based index to 1-based rating (1-5)
// Why currentRating > index? → Fill stars up to current rating
// Why Math.ceil? → Round up for fractional ratings (if needed)
// Why -1 in getRatingMessage? → Convert rating (1-5) to array index (0-4)
// Why reset hoverRating to 0? → Return to showing actual rating
// Why two unicode stars? → ★ filled (U+2605), ☆ empty (U+2606)
// .star.full selector → Targets elements with both classes
// OR operator short-circuit → If first truthy, uses it; otherwise second
// Greater than comparison → index 0,1,2 are < rating 3, so all filled`,
  },
];
