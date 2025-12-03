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

// Styling classes: hour-hand, min-hand, second-hand (has width and right), with right as constant (Ex: right: 50%) 
// and width varies from 30% for hour-hand and 40% for min-hand and 45% for second-hand

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

// Step 2: for ul tag has the className called "nav__menu", as this holds li items, 
// so you must have to write display: flex and put some gap: 3em as mandatory (rest are your choice)

// Step 3: our navToggle div has the className called "nav__toggler", which we will hide using display:none initially

// Step 4: All the divs inside nav__toggler can be targeted with the help of

// Ex: nav__toggler div{}

// To achieve HAMBURGER ICON, we have to put width, height, margin for these

// Step 5: LOGIC FOR MOBILE MODE

// Ex: @media (max-width: 768px){}

// In the mobile Mode, we change the display: none to display:block for "nav__toggler" className

// Inside the @media, for className "nav__menu", 
// I have to make the position: fixed, with some top, right: 0, and height of this (ex: 93vh), width: 50vw, flex-direction:column, 
// and this transform in the translateX direction with 100%

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
// Greater than comparison → index 0,1,2 are < rating 3, so all filled

`,
  },
  {
    title: '16_starRating_half_star',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <StarRating /> component
// StarRating.jsx → contains star rating with half-star support

// ============================================
// STATE MANAGEMENT
// ============================================

// State: rating → useState(0)
// → Stores selected rating (can be decimal like 2.5, 3.5, 4.5)
// → Starts at 0 (no rating selected)

// Note: No hoverRating state in this version (simpler, click-only)

// ============================================
// RATING MESSAGES ARRAY
// ============================================

// Constant: ratingMessages
// → ['Awful', 'Poor', 'Fair', 'Good', 'Excellent']
// → Same as before, index 0-4 maps to 1-5 star ratings

// ============================================
// isLeftHalf HELPER FUNCTION
// ============================================

// Purpose: Detect if click is on left or right half of star

// Accepts: event (click event object)

// STEP 1: Get element's position
// → const rect = event.currentTarget.getBoundingClientRect()
// → getBoundingClientRect() returns element's size and position

// STEP 2: Calculate click position relative to element
// → const x = event.clientX - rect.left
// → event.clientX = absolute X position of click
// → rect.left = left edge of element
// → Subtraction gives position within the element

// STEP 3: Check if in left half
// → return x < rect.width / 2
// → Example: star width 40px, click at 15px → 15 < 20 → true (left half)
// → Example: star width 40px, click at 25px → 25 < 20 → false (right half)

// ============================================
// getRatingMessage FUNCTION
// ============================================

// Same as before:
// → return ratingMessages[Math.ceil(currentRatingValue) - 1]
// → Math.ceil rounds up (2.5 becomes 3)
// → Subtract 1 for array index

// ============================================
// handleClick FUNCTION
// ============================================

// Accepts: (value, isHalf = false)
// → value: star number (1-5)
// → isHalf: boolean indicating if left half was clicked

// Logic:
// → const newRating = isHalf ? value - 0.5 : value

// Examples:
// → value = 3, isHalf = true → newRating = 3 - 0.5 = 2.5
// → value = 3, isHalf = false → newRating = 3

// Update state:
// → setRating(newRating)

// ============================================
// renderStar FUNCTION (CORE LOGIC)
// ============================================

// Accepts: index (0 to 4)

// STEP 1: Calculate fullStar
// → const fullStar = rating > index
// → Same as before, checks if star should be fully filled

// STEP 2: Calculate halfStar (NEW LOGIC)
// → const halfStar = rating > index && rating < index + 1
// → Checks if rating falls between index and index+1

// Examples:
// → rating = 2.5, index = 2 → 2.5 > 2 && 2.5 < 3 → true (3rd star is half)
// → rating = 2.5, index = 1 → 2.5 > 1 && 2.5 < 2 → false (2nd star full)
// → rating = 2.5, index = 3 → 2.5 > 3 → false (4th star empty)

// STEP 3: Create handleStarClick function (nested)
// → Detects which half of star was clicked
// → const isHalf = isLeftHalf(event)
// → Calls: handleClick(index + 1, isHalf)
// → Example: Click left of 4th star (index 3) → handleClick(4, true) → rating = 3.5

// STEP 4: Calculate CSS classes
// → Base: 'star' (always present)
// → Conditional: 'full' when fullStar && !halfStar
// → Conditional: 'half' when halfStar
// → Template: \`star \${fullStar && !halfStar ? 'full' : ''} \${halfStar ? 'half' : ''}\`

// STEP 5: Return span with conditional rendering

// Span attributes:
// → key={index}
// → className={starClasses}
// → onClick={handleStarClick}

// Display logic (3 cases):

// CASE 1: halfStar is true
// → Render composite half-star using nested spans:
// → Wrapper span with className 'star-wrapper'
// → Background: span with '☆' (empty star) and className 'star-empty'
// → Foreground: span with '★' (filled star) and className 'star-half-filled'
// → CSS will clip the filled star to show only left half

// CASE 2: fullStar is true (but not halfStar)
// → Simply render: '★'

// CASE 3: empty star (default)
// → Simply render: '☆'

// ============================================
// JSX STRUCTURE
// ============================================

// Container div with className 'container'

// Star rating wrapper div:
// → className 'star-rating-wrapper'

// Inside wrapper, two divs:

// DIV 1: Star rating div
// → className 'star-rating'
// → Contains: Array.from({ length: 5 }, (_, index) => renderStar(index))

// DIV 2: Rating message span
// → className 'rating-message'
// → Contains: <strong>{getRatingMessage(rating)}</strong>

// ============================================
// CSS APPROACH - HALF STAR DISPLAY
// ============================================

// .star (base styling):
// → Same as before: cursor pointer, font-size, color grey, margin

// .star.full (filled star):
// → color: gold

// .star-wrapper (NEW):
// → position: relative
// → display: inline-block
// → Needed for absolute positioning of inner spans

// .star-empty (NEW - background empty star):
// → position: relative or static
// → color: grey
// → This is the full empty star visible on right half

// .star-half-filled (NEW - foreground filled star, clipped):
// → position: absolute
// → top: 0, left: 0 (overlay on top of empty star)
// → color: gold
// → width: 50% (CRITICAL: only show left half)
// → overflow: hidden (clips the star to show only left portion)
// → z-index: 1 (appears above empty star)

// How it works visually:
// → Empty star (☆) displays full width in grey
// → Filled star (★) overlays on top in gold, but clipped to 50% width
// → Result: Left half gold (filled), right half grey (empty)

// ============================================
// HALF-STAR RATING FLOW
// ============================================

// Initial state:
// → rating = 0
// → All stars empty (☆) grey

// User clicks left half of 3rd star (index 2):
// → handleStarClick triggered
// → isLeftHalf(event) returns true
// → handleClick(3, true) called
// → newRating = 3 - 0.5 = 2.5
// → setRating(2.5)
// → Component re-renders

// After setting rating to 2.5:
// → Star 0 (index 0): rating 2.5 > 0 → fullStar true, halfStar false → shows ★ gold
// → Star 1 (index 1): rating 2.5 > 1 → fullStar true, halfStar false → shows ★ gold
// → Star 2 (index 2): rating 2.5 > 2 && 2.5 < 3 → halfStar true → shows composite half-star
// → Star 3 (index 3): rating 2.5 not > 3 → fullStar false → shows ☆ grey
// → Star 4 (index 4): rating 2.5 not > 4 → fullStar false → shows ☆ grey
// → Message: getRatingMessage(2.5) → Math.ceil(2.5) - 1 = 3 - 1 = 2 → "Fair"

// User clicks right half of 4th star (index 3):
// → isLeftHalf(event) returns false
// → handleClick(4, false) called
// → newRating = 4
// → setRating(4)
// → First 4 stars show ★ gold, 5th star shows ☆ grey
// → Message: "Good"

// User clicks left half of 5th star (index 4):
// → isLeftHalf(event) returns true
// → handleClick(5, true) called
// → newRating = 5 - 0.5 = 4.5
// → First 4 stars full, 5th star half-filled
// → Message: Math.ceil(4.5) - 1 = 5 - 1 = 4 → "Excellent"

// ============================================
// KEY CONCEPTS
// ============================================

// Why getBoundingClientRect? → Get element's exact position and size
// Why event.clientX - rect.left? → Convert absolute click to relative position
// Why x < rect.width / 2? → Determine if click is in left or right half
// Why rating > index && rating < index + 1? → Check if decimal rating falls in this star's range
// Why composite spans for half-star? → Layer filled over empty, clip filled to 50%
// Why position absolute on star-half-filled? → Overlay on top of empty star
// Why width 50% with overflow hidden? → Show only left half of filled star
// Why fullStar && !halfStar for 'full' class? → Exclude half-stars from full styling
// Why Math.ceil in getRatingMessage? → Round 2.5 to 3 for message lookup
// value - 0.5 → Convert full star click to half-star rating
// Two-span technique → Creates visual half-star effect without custom graphics`,
  },
  {
    title: '17_ticTacToe',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all game logic (no separate components needed)

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: squares → useState(Array(9).fill(null))
// → Array with 9 null values representing empty board
// → Example: [null, null, null, null, null, null, null, null, null]
// → Indices 0-8 map to board positions (0=top-left, 8=bottom-right)

// State 2: isXNext → useState(true)
// → Tracks whose turn it is
// → true = X's turn, false = O's turn
// → Starts as true (X always goes first)

// ============================================
// WINNING COMBINATIONS ARRAY
// ============================================

// Define all 8 possible winning patterns:
// → 3 rows: [0,1,2], [3,4,5], [6,7,8]
// → 3 columns: [0,3,6], [1,4,7], [2,5,8]
// → 2 diagonals: [0,4,8], [2,4,6]

// Store in array: winningCombinations
// → Example: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

// ============================================
// calculateWinner FUNCTION
// ============================================

// Purpose: Check if anyone has won the game

// STEP 1: Loop through all winning combinations
// → for loop: i = 0 to winningCombinations.length

// STEP 2: Destructure current combination
// → const [a, b, c] = winningCombinations[i]
// → Example: First iteration → [a, b, c] = [0, 1, 2]

// STEP 3: Check if three positions match
// → Condition: squares[a] && squares[a] === squares[b] && squares[a] === squares[c]

// Breaking down the condition:
// → squares[a] → Checks position is not null (someone played there)
// → squares[a] === squares[b] → First two positions match
// → squares[a] === squares[c] → First and third positions match
// → All three must be true for a win

// Example:
// → squares = ['X', 'X', 'X', null, null, null, null, null, null]
// → Checking [0,1,2]: squares[0]='X', squares[1]='X', squares[2]='X'
// → 'X' && 'X'==='X' && 'X'==='X' → true

// STEP 4: Return winner or null
// → If match found: return squares[a] (returns 'X' or 'O')
// → If no match after all loops: return null

// Store result in variable:
// → let winner = calculateWinner()

// ============================================
// STATUS MESSAGE LOGIC
// ============================================

// Variable: status (not state, just display message)

// Logic:
// → if (winner) → status = \`Winner is: \${winner} 🎁🎉💥\`
// → else → status = \`Next Player: \${isXNext ? 'X' : 'O'}\`

// Example outcomes:
// → "Winner is: X 🎁🎉💥"
// → "Next Player: O"

// ============================================
// handleClick FUNCTION (CORE GAME LOGIC)
// ============================================

// Accepts: i (index of clicked square, 0-8)

// STEP 1: Check if game is over
// → if (winner) return
// → Prevents moves after someone wins
// → Early return stops function execution

// STEP 2: Create copy of squares array
// → const newSquares = [...squares]
// → Why copy? Never mutate state directly
// → Spread operator creates new array with same values

// STEP 3: Update clicked square
// → newSquares[i] = isXNext ? 'X' : 'O'
// → If X's turn, place 'X'; if O's turn, place 'O'
// → Example: isXNext=true, i=4 → newSquares[4] = 'X'

// STEP 4: Update board state
// → setSquares(newSquares)
// → Triggers re-render with new board configuration

// STEP 5: Toggle player turn
// → setIsXNext(!isXNext)
// → Flips between true and false
// → Example: true → false (X's turn → O's turn)

// ============================================
// renderSquare FUNCTION
// ============================================

// Purpose: Render individual square button

// Accepts: i (square index 0-8)

// Returns button element with:
// → className='square' for styling
// → onClick={() => handleClick(i)} → passes index to handler
// → Display: {squares[i]} → shows 'X', 'O', or nothing (null)

// Example:
// → renderSquare(0) → button for top-left corner
// → If squares[0] = 'X', button shows 'X'

// ============================================
// resetGame FUNCTION
// ============================================

// Purpose: Reset game to initial state

// STEP 1: Reset turn to X
// → setIsXNext(true)
// → X always starts

// STEP 2: Clear the board
// → setSquares(Array(9).fill(null))
// → Creates new array of 9 nulls
// → All squares become empty

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'app_container'

// SECTION 1: Status display
// → div with className 'status'
// → Shows: {status} (winner message or next player)

// SECTION 2: Game board (3x3 grid using nested maps)
// → Outer map: [0, 1, 2].map((row) => ...)
// → Creates 3 rows (row = 0, 1, 2)

// Each row is a div with:
// → key={row} for React list rendering
// → className='row' for styling

// Inner map inside each row: [0, 1, 2].map((col) => ...)
// → Creates 3 columns per row (col = 0, 1, 2)
// → Calls: renderSquare(row * 3 + col)

// Index calculation: row * 3 + col
// → Row 0: 0*3+0=0, 0*3+1=1, 0*3+2=2 (squares 0,1,2)
// → Row 1: 1*3+0=3, 1*3+1=4, 1*3+2=5 (squares 3,4,5)
// → Row 2: 2*3+0=6, 2*3+1=7, 2*3+2=8 (squares 6,7,8)

// SECTION 3: Reset button
// → button with className 'resetGame'
// → onClick={resetGame}
// → Text: "Reset Game"

// ============================================
// GAME FLOW EXAMPLE
// ============================================

// Initial state:
// → squares = [null, null, null, null, null, null, null, null, null]
// → isXNext = true
// → winner = null
// → status = "Next Player: X"
// → All squares empty

// Player X clicks center square (index 4):
// → handleClick(4) called
// → winner check: null → continue
// → newSquares = [...squares]
// → newSquares[4] = 'X' (isXNext is true)
// → setSquares(newSquares) → squares[4] now 'X'
// → setIsXNext(false) → O's turn
// → Re-render shows X in center
// → status = "Next Player: O"

// Player O clicks top-left (index 0):
// → handleClick(0) called
// → newSquares[0] = 'O' (isXNext is false)
// → setSquares updates
// → setIsXNext(true) → X's turn
// → status = "Next Player: X"

// Continuing play... X gets winning pattern [0,1,2]:
// → squares = ['X', 'X', 'X', 'O', 'X', null, 'O', null, null]
// → calculateWinner checks [0,1,2]
// → squares[0]='X', squares[1]='X', squares[2]='X'
// → All match → returns 'X'
// → winner = 'X'
// → status = "Winner is: X 🎁🎉💥"
// → Further clicks ignored (if winner check in handleClick)

// Player clicks Reset:
// → resetGame called
// → setIsXNext(true) → back to X's turn
// → setSquares(Array(9).fill(null)) → clear board
// → winner = null
// → status = "Next Player: X"
// → Game ready for new round

// ============================================
// CSS GRID LAYOUT
// ============================================

// .app_container:
// → display: flex, flex-direction: column
// → align-items: center
// → Centers game board on page

// .row:
// → display: flex
// → Creates horizontal row of squares

// .square:
// → width and height: 80px or similar
// → font-size: large (40px+)
// → border, background-color for visibility
// → cursor: pointer for clickability
// → Creates clickable game squares

// .status:
// → font-size, margin for visibility
// → Shows game status clearly

// .resetGame:
// → margin-top for spacing
// → padding, styling for button appearance

// ============================================
// KEY CONCEPTS
// ============================================

// Why Array(9).fill(null)? → Create array of specific length with default values
// Why spread operator for newSquares? → Immutability, never mutate state
// Why isXNext toggle? → Simple boolean flip between two players
// Why row * 3 + col? → Convert 2D grid coordinates to 1D array index
// Why check winner before move? → Prevent moves after game ends
// Why nested map for board? → Create 3x3 grid structure dynamically
// Why destructuring in calculateWinner? → Clean access to array values
// Why squares[a] in condition? → Ensure position is not null (has been played)
// Why return in handleClick if winner? → Stop execution, prevent further moves
// 3x3 grid positions: top-left=0, center=4, bottom-right=8
// Winning check logic: All three positions non-null and equal`,
  },
  {
    title: '18_toastPopup',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <ToastNotification /> component
// ToastNotification.jsx → contains all toast logic and configuration

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: horizontalPosition → useState('left')
// → Controls left or right placement
// → Options: 'left' or 'right'

// State 2: verticalPosition → useState('top')
// → Controls top or bottom placement
// → Options: 'top' or 'bottom'

// State 3: toastType → useState('success')
// → Controls toast styling/color
// → Options: 'success', 'error', 'warning', 'info'

// State 4: message → useState('This is a toast message!')
// → The text to display in toast
// → User can customize this

// State 5: duration → useState(5)
// → How long toast stays visible (in seconds)
// → Range: 3-10 seconds

// State 6: toasts → useState([])
// → Array storing all active toasts
// → Each toast is object: { message, toastType, horizontalPosition, verticalPosition, time }

// ============================================
// useEffect: AUTO-REMOVE TOASTS
// ============================================

// Dependency array: [duration]
// → Re-runs when duration changes

// STEP 1: Create interval that runs every 1000ms (1 second)
// → const timer = setInterval(() => { ... }, 1000)

// STEP 2: Inside interval, filter toasts array
// → setToasts((currentToasts) => currentToasts.filter(...))

// STEP 3: Filter logic - calculate toast age
// → const toastAge = Date.now() - toast.time
// → Date.now() = current timestamp in milliseconds
// → toast.time = timestamp when toast was created
// → Subtraction gives age in milliseconds

// Example calculation:
// → toast.time = 1634567890000 (creation time)
// → Date.now() = 1634567896000 (current time)
// → toastAge = 6000ms (6 seconds old)

// STEP 4: Keep toast if younger than duration
// → return toastAge < duration * 1000
// → duration * 1000 converts seconds to milliseconds
// → Example: duration = 5 → 5000ms
// → If toastAge = 4000ms → 4000 < 5000 → true (keep it)
// → If toastAge = 6000ms → 6000 < 5000 → false (remove it)

// STEP 5: Cleanup function
// → return () => clearInterval(timer)
// → Prevents memory leaks when component unmounts
// → Also clears when duration changes (new interval created)

// ============================================
// showToast FUNCTION
// ============================================

// Purpose: Add new toast to toasts array

// Logic:
// → setToasts([...toasts, newToastObject])
// → Spread existing toasts, add new one at end

// New toast object structure:
// → { message, toastType, horizontalPosition, verticalPosition, time: Date.now() }
// → Uses current state values for all properties
// → time: Date.now() → timestamp for tracking age

// Example:
// → { message: 'Success!', toastType: 'success', horizontalPosition: 'right', verticalPosition: 'bottom', time: 1634567890123 }

// ============================================
// removeToast FUNCTION
// ============================================

// Purpose: Manually remove specific toast

// Accepts: time (timestamp of toast to remove)

// Logic:
// → setToasts((currentToasts) => currentToasts.filter((toast) => toast.time !== time))
// → Filter out toast with matching timestamp
// → Keep all toasts where time doesn't match

// Example:
// → removeToast(1634567890123)
// → Removes toast with time: 1634567890123
// → All other toasts remain

// ============================================
// JSX STRUCTURE - FORM SECTION
// ============================================

// Main container div with className 'container text-center'

// Form element with className 'flex'

// SECTION 1: Configuration inputs

// Select 1 - Horizontal Position:
// → value={horizontalPosition}
// → onChange={(e) => setHorizontalPosition(e.target.value)}
// → Options: 'left', 'right'

// Select 2 - Vertical Position:
// → value={verticalPosition}
// → onChange={(e) => setVerticalPosition(e.target.value)}
// → Options: 'top', 'bottom'

// Select 3 - Toast Type:
// → value={toastType}
// → onChange={(e) => setToastType(e.target.value)}
// → Options: 'success', 'error', 'warning', 'info'

// Input - Message:
// → type='text'
// → value={message}
// → onChange={(e) => setMessage(e.target.value)}
// → placeholder='Message'

// Input - Duration Slider:
// → type='range'
// → value={duration}
// → onChange={(e) => setDuration(e.target.value)}
// → min='3', max='10'
// → Wrapped in label with text 'Duration'

// Button - Show Toast:
// → type='button'
// → onClick={showToast}
// → Text: 'Show Toast'

// ============================================
// JSX STRUCTURE - TOAST DISPLAY SECTION
// ============================================

// Toast container div:
// → Dynamic className: \`toast-container tc-\${horizontalPosition}-\${verticalPosition}\`
// → Example: 'toast-container tc-left-top'
// → Example: 'toast-container tc-right-bottom'

// Map over toasts array:
// → toasts.map((toast, index) => ...)

// For each toast, render div:
// → key={index} for React list rendering
// → className={\`toast \${toast.toastType}\`}
// → Base class: 'toast'
// → Type class: toast's toastType ('success', 'error', 'warning', 'info')

// Inside toast div:

// Span for message:
// → className='toast-message'
// → Display: {toast.message}

// Button to remove:
// → className='remove'
// → onClick={() => removeToast(toast.time)}
// → Display: &#x2715; (Unicode for ✕ symbol)

// ============================================
// CSS APPROACH - POSITIONING
// ============================================

// .toast-container:
// → position: fixed (stays in place when scrolling)
// → z-index: high value (appears above other content)
// → pointer-events: none (allows clicks through container)

// Position-specific classes (using template literal):

// .tc-left-top:
// → top: 1rem
// → left: 1rem
// → Toasts appear in top-left corner

// .tc-left-bottom:
// → bottom: 1rem
// → left: 1rem
// → Toasts appear in bottom-left corner

// .tc-right-top:
// → top: 1rem
// → right: 1rem
// → Toasts appear in top-right corner

// .tc-right-bottom:
// → bottom: 1rem
// → right: 1rem
// → Toasts appear in bottom-right corner

// ============================================
// CSS APPROACH - TOAST STYLING
// ============================================

// .toast (base styling):
// → display: flex, justify-content: space-between
// → padding: 1rem
// → margin-bottom: 0.5rem (spacing between toasts)
// → border-radius: for rounded corners
// → pointer-events: auto (clickable, overrides container)
// → animation: slide-in or fade-in for entrance effect

// Type-specific colors:

// .toast.success:
// → background-color: green shade
// → color: white

// .toast.error:
// → background-color: red shade
// → color: white

// .toast.warning:
// → background-color: orange/yellow shade
// → color: dark text

// .toast.info:
// → background-color: blue shade
// → color: white

// .remove button:
// → background: transparent
// → border: none
// → cursor: pointer
// → font-size: larger for visibility
// → Hover effect for better UX

// ============================================
// TOAST NOTIFICATION FLOW
// ============================================

// Initial state:
// → horizontalPosition = 'left'
// → verticalPosition = 'top'
// → toastType = 'success'
// → message = 'This is a toast message!'
// → duration = 5
// → toasts = []
// → No toasts visible

// User configures settings:
// → Selects horizontalPosition = 'right'
// → Selects verticalPosition = 'bottom'
// → Selects toastType = 'error'
// → Types message = 'Something went wrong!'
// → Adjusts duration slider to 7

// User clicks "Show Toast":
// → showToast() called
// → New toast object created with current settings
// → Toast appears in bottom-right corner with red styling
// → Message displays: "Something went wrong!"

// useEffect interval running (every 1 second):
// → Checks all toasts in array
// → Calculates age of each toast
// → Toast created at 1634567890123, current time 1634567893123
// → Age = 3000ms (3 seconds)
// → Duration = 7 seconds (7000ms)
// → 3000 < 7000 → true → toast stays

// After 7 seconds:
// → Current time 1634567897123
// → Age = 7000ms
// → 7000 < 7000 → false → toast removed automatically
// → Toast disappears from screen

// User clicks ✕ button manually (before duration expires):
// → removeToast(1634567890123) called
// → Filters out toast with matching time
// → Toast immediately removed from array
// → Toast disappears from screen

// Multiple toasts:
// → User clicks "Show Toast" 3 times quickly
// → 3 toasts added to array with different timestamps
// → All appear stacked (margin between them)
// → Each auto-removes after 7 seconds from its creation
// → Or can be manually removed individually

// ============================================
// KEY CONCEPTS
// ============================================

// Why Date.now()? → Unique timestamp for each toast, tracks creation time
// Why setInterval? → Continuously check and remove old toasts
// Why filter in interval? → Remove toasts older than duration
// Why toastAge calculation? → Determine how long toast has been visible
// Why duration * 1000? → Convert seconds to milliseconds for comparison
// Why cleanup in useEffect? → Prevent memory leaks from running intervals
// Why spread operator in showToast? → Preserve existing toasts, add new one
// Why timestamp as key for removal? → Unique identifier for each toast
// Why fixed position? → Toast stays in same screen position when scrolling
// Why pointer-events? → Container non-clickable, but toasts are clickable
// Why template literal for className? → Dynamic positioning based on state
// filter returns new array → Immutability, keeps only matching items
// index as key in map → Simple approach when items don't reorder`,
  },
  {
    title: '19_todoList',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <TodoList /> component
// TodoList.jsx → contains all todo list logic
// data.js → initial todo items array

// ============================================
// DATA STRUCTURE
// ============================================

// initialItems from data.js:
// → Array of todo objects
// → Each object has 3 properties:
//   - id: unique identifier (string)
//   - text: todo item text (string)
//   - isEditing: editing mode flag (boolean, default false)

// Example:
// → [{ id: '1', text: 'Buy groceries', isEditing: false }, ...]

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: todoItems → useState(initialItems)
// → Stores all todo items
// → Initialized with data from data.js file
// → Each item has: id, text, isEditing

// State 2: inputValue → useState('')
// → Tracks value in add todo input field
// → Starts as empty string

// ============================================
// JSX STRUCTURE
// ============================================

// Main container div with className 'container text-center'

// SECTION 1: Form (for adding new todos)
// → Form element with:
//   - id='todoForm'
//   - onSubmit={handleSubmit}

// Inside form:
// → Input field with:
//   - type='text'
//   - value={inputValue}
//   - onChange={(e) => setInputValue(e.target.value)}
//   - placeholder='Add a new item'
//   - autoComplete='off'

// SECTION 2: Todo list (ul element)
// → ul with id='listContainer' and className='list-container'
// → Map over todoItems: todoItems.map((item) => ...)

// For each todo item, render li:
// → key={item.id}

// Inside li, three parts:

// PART 1: Conditional display (edit mode vs view mode)
// → Ternary: {item.isEditing ? ... : ...}

// If isEditing is true:
// → Input field with:
//   - type='text'
//   - value={item.text}
//   - onChange={(e) => handleEditChange(e, item.id)}

// If isEditing is false:
// → Span with className='text'
//   - Display: {item.text}

// PART 2: Edit/Save button
// → onClick={() => handleEdit(item.id)}
// → Dynamic icon: {item.isEditing ? '💾' : '✏️'}
// → Shows save icon (💾) when editing, pencil (✏️) otherwise

// PART 3: Delete button
// → className='delete'
// → onClick={() => handleDelete(item.id)}
// → Display: 🗑️ (trash icon)

// SECTION 3: Empty state message
// → Conditional: {todoItems.length === 0 && ...}
// → Shows: "Ooops! List is empty" when no todos

// ============================================
// addTodoItem FUNCTION
// ============================================

// Purpose: Add new todo to list

// Accepts: item (the text for new todo)

// Logic:
// → setTodoItems((prevItems) => [...prevItems, newTodoObject])
// → Spread existing items, add new one at end

// New todo object structure:
// → { id: \`\${item}-\${Date.now()}\`, text: item, isEditing: false }

// Why this id format?
// → Combines item text with timestamp
// → Ensures uniqueness (Date.now() gives unique milliseconds)
// → Example: 'Buy milk-1634567890123'

// isEditing defaults to false → new items not in edit mode

// ============================================
// handleDelete FUNCTION
// ============================================

// Purpose: Remove todo from list

// Accepts: id (id of todo to delete)

// Logic:
// → setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id))
// → Keep all todos where id doesn't match
// → Filter out the matching todo

// Example:
// → handleDelete('1')
// → Removes todo with id: '1'
// → All other todos remain

// ============================================
// handleEdit FUNCTION
// ============================================

// Purpose: Toggle edit mode for specific todo

// Accepts: id (id of todo to edit)

// Logic:
// → setTodoItems((prevItems) => prevItems.map(...))
// → Map over all items

// For each item:
// → Check: item.id === id
// → If match: { ...item, isEditing: !item.isEditing }
//   - Spread item properties
//   - Toggle isEditing (true → false, false → true)
// → If no match: return item unchanged

// Example:
// → Todo has isEditing: false
// → Click edit button → handleEdit('1')
// → isEditing becomes true
// → Input field appears for editing
// → Click save button → handleEdit('1')
// → isEditing becomes false
// → Span with text appears

// ============================================
// handleEditChange FUNCTION
// ============================================

// Purpose: Update todo text while editing

// Accepts: (e, id)
// → e: event object
// → id: id of todo being edited

// STEP 1: Get new value from input
// → const newValue = e.target.value
// → User's typed text

// STEP 2: Update todos array
// → setTodoItems((prevItems) => prevItems.map(...))
// → Map over all items

// For each item:
// → Check: item.id === id
// → If match: { ...item, text: newValue }
//   - Spread item properties
//   - Replace text with newValue
// → If no match: return item unchanged

// Example:
// → User types in edit input
// → Every keystroke triggers onChange
// → handleEditChange updates text in state
// → Input reflects new text immediately (controlled component)

// ============================================
// handleSubmit FUNCTION (ADD TODO)
// ============================================

// Purpose: Handle form submission to add new todo

// Accepts: e (event object)

// STEP 1: Prevent default form behavior
// → e.preventDefault()
// → Stops page refresh on submit

// STEP 2: Check if input has value
// → if (inputValue)
// → Only proceed if not empty string

// STEP 3: Add new todo
// → addTodoItem(inputValue)
// → Passes current input value

// STEP 4: Clear input field
// → setInputValue('')
// → Resets to empty string
// → Ready for next todo

// Trigger: User presses Enter key or submits form

// ============================================
// TODO LIST FLOW
// ============================================

// Initial state:
// → todoItems = initialItems from data.js
// → inputValue = ''
// → List displays all initial todos
// → All todos in view mode (not editing)

// User types in add input:
// → inputValue updates with each keystroke
// → Controlled input reflects state

// User presses Enter (submit form):
// → handleSubmit called
// → e.preventDefault() stops page refresh
// → Check: inputValue not empty
// → addTodoItem(inputValue) adds new todo
// → New todo object: { id: 'text-timestamp', text: inputValue, isEditing: false }
// → Added to todoItems array
// → setInputValue('') clears input
// → New todo appears in list

// User clicks edit button (✏️):
// → handleEdit(item.id) called
// → Maps through todos, finds matching id
// → Toggles isEditing from false to true
// → Conditional rendering switches to input field
// → User can now edit text
// → Button changes to save icon (💾)

// User edits text in edit input:
// → handleEditChange(e, item.id) called on each keystroke
// → newValue = e.target.value
// → Maps through todos, finds matching id
// → Updates text property with newValue
// → Input reflects changes immediately

// User clicks save button (💾):
// → handleEdit(item.id) called again
// → Toggles isEditing from true to false
// → Conditional rendering switches to span
// → Updated text displayed
// → Button changes back to edit icon (✏️)

// User clicks delete button (🗑️):
// → handleDelete(item.id) called
// → Filters out todo with matching id
// → Todo removed from list
// → Remaining todos displayed

// All todos deleted:
// → todoItems.length === 0
// → Conditional message appears: "Ooops! List is empty"

// ============================================
// CSS APPROACH
// ============================================

// .container:
// → Center content on page
// → display: flex, flex-direction: column
// → align-items: center

// #todoForm:
// → Margin bottom for spacing
// → Width for form size

// Input fields:
// → Padding, border, border-radius for appearance
// → Focus styles for better UX

// .list-container:
// → list-style: none (no bullet points)
// → padding: 0

// li (todo item):
// → display: flex
// → justify-content: space-between
// → align-items: center
// → padding, margin for spacing
// → border or background for visibility

// .text (todo text span):
// → flex: 1 (takes available space)
// → text-align: left

// Buttons (.edit, .delete):
// → Padding, margin for spacing
// → cursor: pointer
// → background, border styling
// → Hover effects for better UX
// → Font size for emoji visibility

// .no-elements (empty state):
// → Font styling, color
// → Center alignment
// → Padding for spacing

// ============================================
// KEY CONCEPTS
// ============================================

// Why isEditing property? → Track which todos are in edit mode
// Why controlled inputs? → React controls value, enables validation
// Why e.preventDefault()? → Prevent page refresh on form submit
// Why Date.now() in id? → Create unique timestamps for ids
// Why map for updates? → Immutability, create new array with changes
// Why filter for delete? → Create new array without deleted item
// Why spread operator? → Preserve other properties when updating
// Why conditional rendering? → Show input or span based on mode
// Why dynamic button icon? → Visual feedback for current state
// Why clear input after submit? → Better UX, ready for next input
// Why check inputValue in submit? → Prevent adding empty todos
// Template literal for id → Combine text and timestamp
// Ternary operator → Concise conditional rendering
// Map returns new array → Immutability principle in React`,
  },
  {
    title: '20_typeahead',
    code: `// In App.jsx, I will simply write TypeAhead.jsx
// In TypeAhead.jsx component
// Step 1: useState declaration 
// i) 1st useState variable --> is for query that user types
// ii) 2nd useState variable --> is for results array (API Call results)
// iii) 3rd useState variable ---> is for loading (API Call loading)

// Step 2: If I directly jump on return jsx part, then 
// i) I will be maintaining input with type text, onChange of setQuery(e.target.value)
// ii) inside ul, I will be doing apiResultsArrVariable.map and I want to show img and anchor tag for routing to user github page

// Step 3: CORE logic of typeAhead
// i) I will be maintaining a minLength variable to avoid api calls (ex: 3 should be the min no. of characters that user has to type to trigger an API call)
// ii) My logic is placed inside setTimeout
// iii) if query.length >= minLength then setLoading to true, fetchUsersFunc(queryParam, signalParam).then().catch()
// iv) else, setResults array to [] and setLoading to false
// v) additionally we are using AbortController to cancel api calls`,
  },
  {
    title: '21_wrapperComponent',
    code: `// In App.jsx, I will be wrapping my ClickCounterWrapper component with open and close braces
// And inside to this component, I will be maintaining ChildButton component

// Ex:

<ClickCounterWrapper>
    <ChildButton/>
</ClickCounterWrapper>

// Step 1: Inside ClickCounterWrapper.jsx
// i) creating a context

const ClickContext = createContext(null);

// ii) our ClickCounterWrapper component accepts {children} as param
// iii) Inside to our ClickCounterWrapper, we are simply maintaining a count useState variable
// iv) an incrementClickCounterFunc
// v) return part is Context.Provider with value={incrementClickCounterFunc} and inside to the Provider we are showing count

<div>Click Count: {count}</div>
{children}

// vi) CORE LOGIC is our useContext logic
// vii) whatever the component is inside to the ClickCounterWrapper --> I mean as a children --> Below is the code

const handleClick = useContext(ClickContextVariable)
return <button onClick={handleClick}>Click Me</button>`,
  },
  {
    title: '22_emailTemplates',
    code: `// In App.jsx, I will be returning EmailTemplates component

// Step 1: Inside EmailTemplates.jsx component, 
// i) useState declaration
// one for template (ex: jobSelection, jobResignation are two we are using here)
// one for companyName
// one for employeeName
// one for effectiveDate
// one for lastDate

// Step 2: 
// i) handleTemplateChangeFunc which accepts setState as a param which turns obviously returns e => setterParam(e.target.value)

// Ex:
const handleTemplateChange = (setter) => (e) => setter(e.target.value);

// Step 3: Let me jump on to return jsx template
// i) I will be having form element which has all the InputFields and a div element to show our CORE LOGIC (Ex: getMessage())
// ii) Inside to form tag, I will be maintaining several InputFields 
// iii) Ex: one for Template --> type select, provide options here in array of objects format, value and onChange
// iv) one for Employee Name --> type text, value and onChange
// iv) one for Company Name --> type text, value and onChange
// iv) one for Effective Date --> type date, value and onChange
// iv) one for Last Date --> type date, value and onChange

// Step 4: Inside the getMessageFunc()
// i) I have if and elseif conditions
// Ex: if template is jobResignation --> then return ResignationTemplate component and pass the required props like (companyName, effectiveDate, lastDate, employeeName)
// Ex: elseif template is jobSelection --> then return JobSelectionTemplate component and pass the required props like (companyName, employeeName)

// Step 5: Inside InputField Component
// i) This component accepts bunch of props like (label, type, value, onChange, options)
// ii) As select is having options and rest are straight forward input fields so we are writing the logic in ternary operator way
// Ex: type === "select" ? <select> {options.map} </select>
// or <input type={type} value={value} onChange={onChange}/>

// Step 6: Inside TemplatesComponent.jsx component
// i) Maintaining logic for Two components (ResignationTemplate, JobSelectionTemplate)
// ii) Simply accept the props and write your own paragraphs with <p> tags`,
  },
  {
    title: '23_stopWatch',
    code: `
// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains entire stopwatch logic (no separate components)

// ============================================
// REF VARIABLES (useRef)
// ============================================

// Ref 1: animationFrameRef → useRef(0)
// → Stores requestAnimationFrame ID
// → Needed to cancel animation when stopping/resetting
// → Persists across re-renders without causing re-renders

// Ref 2: lastTimer → useRef(Date.now())
// → Stores timestamp when timer last started/reset
// → Used to calculate elapsed time
// → Initial value: current timestamp in milliseconds

// Why useRef instead of useState?
// → Changing ref doesn't trigger re-render
// → Animation frame ID doesn't need to cause UI updates
// → Timestamp reference should persist but not re-render

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: timerString → useState(['00', '00', '00'])
// → Array with 3 elements: [minutes, seconds, milliseconds]
// → Format: ['00', '00', '00'] displays as 00:00:00
// → Updates every animation frame when running

// State 2: isTimerRunning → useState(false)
// → Boolean tracking if stopwatch is active
// → Controls button disabled states
// → Starts as false (stopped)

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'watch-container'

// Inner div with className 'watch'

// Inside watch div, 3 sections:

// SECTION 1: Heading
// → div with className 'watch-heading'
// → Text: "Stopwatch"

// SECTION 2: Timer Display
// → div with className 'watch-timer'
// → Example display: "02:45:123" (2 min, 45 sec, 123 ms)

// SECTION 3: Buttons Container
// → div with className 'watch-btn__container'

// Button 1 - Start:
// → onClick={onStart}
// → disabled={isTimerRunning} → disabled when already running
// → className='watch-btn'
// → Text: "Start"

// Button 2 - Stop:
// → onClick={onStop}
// → disabled={!isTimerRunning} → disabled when not running
// → className='watch-btn'
// → Text: "Stop"

// Button 3 - Reset:
// → onClick={onReset}
// → No disabled condition (always clickable)
// → className='watch-btn'
// → Text: "Reset"

// ============================================
// ONSTART FUNCTION
// ============================================

// Purpose: Start the stopwatch timer

// STEP 1: Set running state to true
// → setIsTimerRunning(true)

// STEP 2: Start animation loop
// → animationFrameRef.current = requestAnimationFrame(timerFn)
// → requestAnimationFrame calls timerFn before next repaint
// → Stores frame ID in ref for later cancellation

// ============================================
// ONSTOP FUNCTION
// ============================================

// Purpose: Pause the stopwatch timer

// STEP 1: Set running state to false
// → setIsTimerRunning(false)

// STEP 2: Cancel animation loop
// → cancelAnimationFrame(animationFrameRef.current)
// → Stops timerFn from being called
// → Timer pauses at current value

// ============================================
// ONRESET FUNCTION
// ============================================

// Purpose: Reset stopwatch to 00:00:00

// STEP 1: Set running state to false
// → setIsTimerRunning(false)

// STEP 2: Reset timer display
// → updateTime(['00', '00', '00'])
// → Back to initial state

// STEP 3: Cancel animation loop
// → cancelAnimationFrame(animationFrameRef.current)
// → Stops any running animation

// STEP 4: Reset timestamp reference
// → lastTimer.current = Date.now()
// → Sets new starting point for next run
// → Ensures timer starts from 0 when started again

// ============================================
// timerFn FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Calculate and update elapsed time

// Called by: requestAnimationFrame (runs every frame ~60fps)

// STEP 1: Calculate milliseconds elapsed
// → const milliSecondElapsed = Date.now() - lastTimer.current
// → Date.now() = current timestamp
// → lastTimer.current = timestamp when timer started/reset
// → Result: milliseconds since start

// Example:
// → lastTimer.current = 1634567890000
// → Date.now() = 1634567895123
// → milliSecondElapsed = 5123ms (5.123 seconds)

// STEP 2: Calculate seconds elapsed
// → const secondsElapsed = Math.floor(milliSecondElapsed / 1000)
// → Divide by 1000 to convert ms to seconds
// → Math.floor removes decimal part
// → Example: 5123 / 1000 = 5.123 → Math.floor = 5 seconds

// STEP 3: Calculate minutes elapsed
// → const minutesElapsed = Math.floor(secondsElapsed / 60)
// → Divide seconds by 60 to get minutes
// → Math.floor removes decimal part
// → Example: 125 / 60 = 2.083 → Math.floor = 2 minutes

// STEP 4: Format milliseconds for display
// → const milliSeconds = (milliSecondElapsed % 1000).toString().padStart(3, '0')

// Breaking down the logic:
// → milliSecondElapsed % 1000 → gets remainder (last 3 digits)
// → Example: 5123 % 1000 = 123
// → .toString() → converts to string
// → .padStart(3, '0') → pads with leading zeros if less than 3 digits
// → Example: 23 → "023", 5 → "005"

// STEP 5: Format seconds for display
// → const seconds = (secondsElapsed % 60).toString().padStart(2, '0')

// Breaking down:
// → secondsElapsed % 60 → gets remainder (seconds within current minute)
// → Example: 125 % 60 = 5 (2 minutes and 5 seconds)
// → .padStart(2, '0') → ensures 2 digits
// → Example: 5 → "05", 45 → "45"

// STEP 6: Format minutes for display
// → const minutes = minutesElapsed.toString().padStart(2, '0')

// Breaking down:
// → Use minutesElapsed directly (no modulo needed for display)
// → .padStart(2, '0') → ensures 2 digits
// → Example: 2 → "02", 15 → "15"

// STEP 7: Update timer display
// → updateTime([minutes, seconds, milliSeconds])
// → Sets state with formatted time array
// → Triggers re-render to show new time

// STEP 8: Request next animation frame
// → animationFrameRef.current = requestAnimationFrame(timerFn)
// → Creates loop by calling timerFn again
// → Runs before next browser repaint (~60fps)

// ============================================
// useEffect: CLEANUP ON UNMOUNT
// ============================================

// Dependency array: [] (empty, runs once on mount)

// Cleanup function:
// → return () => cancelAnimationFrame(animationFrameRef.current)
// → Runs when component unmounts
// → Cancels any running animation
// → Prevents memory leaks

// ============================================
// STOPWATCH FLOW
// ============================================

// Initial state:
// → timerString = ['00', '00', '00']
// → isTimerRunning = false
// → Display shows: "00:00:00"
// → Start button enabled, Stop button disabled

// User clicks Start button:
// → onStart() called
// → setIsTimerRunning(true)
// → Start button disabled, Stop button enabled
// → requestAnimationFrame(timerFn) starts loop
// → lastTimer.current already set (from initial or last reset)

// First timerFn execution:
// → Date.now() - lastTimer.current = small number (few ms)
// → Calculates: milliSecondElapsed, secondsElapsed, minutesElapsed
// → Formats all three values with padding
// → updateTime updates state
// → Display shows: "00:00:016" (example: 16ms)
// → Requests next frame

// Subsequent frames (every ~16ms at 60fps):
// → timerFn keeps running
// → Elapsed time increases
// → Display updates: "00:00:123" → "00:01:456" → "00:15:789"
// → Pattern continues until stopped

// After 1 minute 25 seconds:
// → milliSecondElapsed = 85123ms
// → secondsElapsed = Math.floor(85123/1000) = 85
// → minutesElapsed = Math.floor(85/60) = 1
// → milliSeconds = 85123 % 1000 = 123 → "123"
// → seconds = 85 % 60 = 25 → "25"
// → minutes = 1 → "01"
// → Display shows: "01:25:123"

// User clicks Stop button:
// → onStop() called
// → setIsTimerRunning(false)
// → Stop button disabled, Start button enabled
// → cancelAnimationFrame stops loop
// → Timer pauses at current value (e.g., "01:25:123")
// → lastTimer.current unchanged (keeps reference)

// User clicks Start again (resume):
// → onStart() called
// → But lastTimer.current still has old timestamp
// → Timer continues from paused value
// → Example: Was at 01:25:123, continues to 01:25:456...

// User clicks Reset button:
// → onReset() called
// → setIsTimerRunning(false)
// → updateTime(['00', '00', '00']) → display shows "00:00:00"
// → cancelAnimationFrame stops any running animation
// → lastTimer.current = Date.now() → new reference point
// → Next start begins from 00:00:00

// ============================================
// CSS APPROACH
// ============================================

// .watch-container:
// → Center the stopwatch on page
// → display: flex, justify-content: center, align-items: center
// → min-height: 100vh (full viewport height)

// .watch:
// → Background, border, border-radius for card appearance
// → Padding for internal spacing
// → Box shadow for depth

// .watch-heading:
// → Font size, weight for title
// → Text alignment, margin for spacing

// .watch-timer:
// → Large font size (40px+) for visibility
// → Monospace font family for aligned digits
// → Text alignment center
// → Margin for spacing
// → Letter spacing for readability

// .watch-btn__container:
// → display: flex
// → justify-content: space-around or gap for spacing
// → margin-top for separation from timer

// .watch-btn:
// → Padding, font-size for button size
// → Border, border-radius for appearance
// → cursor: pointer
// → Background color, hover effects
// → disabled:opacity for disabled state
// → disabled:cursor: not-allowed

// ============================================
// KEY CONCEPTS
// ============================================

// Why requestAnimationFrame? → Smooth 60fps updates, browser-optimized
// Why useRef for animationFrameRef? → Persist ID without re-renders
// Why useRef for lastTimer? → Timestamp reference, no re-renders needed
// Why Date.now()? → Current timestamp in milliseconds
// Why subtract timestamps? → Calculate elapsed time
// Why Math.floor? → Remove decimals, get whole numbers
// Why modulo (%)? → Get remainder (seconds in minute, ms in second)
// Why padStart? → Ensure consistent digit count (05 not 5)
// Why array for timerString? → Separate storage of min, sec, ms
// Why cancelAnimationFrame? → Stop animation loop, prevent memory leaks
// Why cleanup in useEffect? → Cancel on unmount, avoid leaks
// requestAnimationFrame creates loop → Each call requests next call
// 60fps = ~16ms between frames → Very smooth timer updates
// padStart(2, '0') → "5" becomes "05", "45" stays "45"
// padStart(3, '0') → "5" becomes "005", "123" stays "123"
    `,
  },
  {
    title: '24_apiIntegration_cocktailDb',
    code: `// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Router setup and configuration
// Pages:
// → HomeLayout.jsx → Layout wrapper with Navbar
// → Landing.jsx → Main search page with cocktail list
// → Cocktail.jsx → Individual cocktail details page
// → About.jsx → Static about page
// Components:
// → Navbar.jsx → Navigation links
// → SearchForm.jsx → Search input form
// → CocktailList.jsx → Renders list of cocktail cards
// → CocktailCard.jsx → Individual cocktail card display

// ============================================
// APP.JSX - ROUTER SETUP
// ============================================

// Import: createBrowserRouter, RouterProvider from react-router-dom

// Create router using createBrowserRouter:
// → Accepts array of route objects
// → Each route has: path, element, children (optional)

// Root route structure:
// → path: '/'
// → element: <HomeLayout /> (parent wrapper)
// → children: array of nested routes

// Child routes:

// Route 1 - Index route (Landing page):
// → index: true (renders at exact '/' path)
// → element: <Landing />

// Route 2 - Dynamic cocktail details:
// → path: 'cocktail/:id' (colon makes 'id' a URL parameter)
// → element: <Cocktail />
// → Example URL: '/cocktail/11022'

// Route 3 - Static about page:
// → path: 'about'
// → element: <About />

// Return: <RouterProvider router={router} />
// → Provides routing to entire app

// ============================================
// HOMELAYOUT.JSX - LAYOUT WRAPPER
// ============================================

// Purpose: Common layout for all home routes

// Import: Outlet, useNavigation from react-router-dom

// useNavigation hook:
// → const navigation = useNavigation()
// → Returns navigation state object
// → navigation.state values: 'idle', 'loading', 'submitting'

// Check loading state:
// → const isPageLoading = navigation.state === 'loading'
// → True when navigating between routes

// Optional context value:
// → const value = 'some value'
// → Can be accessed in child routes via useOutletContext()

// JSX structure:

// Navbar component → Always visible at top

// Main section with className 'page':
// → Conditional rendering based on isPageLoading

// If loading:
// → <div className='loading' /> (CSS spinner)

// If not loading:
// → <Outlet context={{ value }} />
// → Renders matched child route component
// → Passes context to children

// ============================================
// LANDING.JSX - MAIN SEARCH PAGE
// ============================================

// Purpose: Search cocktails and display results

// Imports: useSearchParams, axios

// API endpoint:
// → const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// useSearchParams hook:
// → const [searchParams, setSearchParams] = useSearchParams()
// → Read/write URL query parameters
// → Example: ?search=margarita

// Extract search term:
// → const searchTerm = searchParams.get('search') || 'margarita'
// → Get 'search' param from URL or default to 'margarita'

// State management:

// State 1: drinks → useState([])
// → Stores fetched cocktail data array

// State 2: loading → useState(true)
// → Tracks API loading state

// ============================================
// FETCHCOCKTAILS FUNCTION (LANDING.JSX)
// ============================================

// Purpose: Fetch cocktails from API

// Async function logic:

// STEP 1: Set loading to true
// → setLoading(true)

// STEP 2: Make API request
// → Appends searchTerm to URL
// → Example: searchTerm = 'vodka' → URL ends with 's=vodka'

// STEP 3: Update drinks state
// → setDrinks(data.drinks || [])
// → Sets drinks array or empty array if none found

// STEP 4: Error handling
// → catch block logs error
// → setDrinks([]) on error

// STEP 5: Finally block
// → setLoading(false) always runs
// → Hides loading indicator

// useEffect with dependency:
// → useEffect(() => { fetchCocktails() }, [searchTerm])
// → Runs whenever searchTerm changes
// → Automatically fetches new results

// JSX rendering:

// SearchForm component:
// → Props: searchTerm, setSearchParams
// → Handles user input for search

// Conditional rendering:
// → If loading: show "Loading..." message
// → If not loading: render <CocktailList drinks={drinks} />

// ============================================
// SEARCHFORM.JSX - SEARCH INPUT
// ============================================

// Purpose: Handle cocktail search input

// Props: { searchTerm, setSearchParams }

// handleSubmit function:

// STEP 1: Prevent default
// → e.preventDefault()
// → Stops page reload

// STEP 2: Get input value
// → const value = e.target.elements.search.value
// → Access form input by name attribute 'search'

// STEP 3: Update URL params
// → setSearchParams({ search: value })
// → Updates URL to ?search=value
// → Triggers re-render in Landing (searchTerm changes)

// JSX structure:

// Form element:
// → onSubmit={handleSubmit}

// Input field:
// → type='search'
// → name='search' (used in handleSubmit)
// → defaultValue={searchTerm}
// → Pre-fills with current search term

// Submit button:
// → type='submit'
// → Text: "search"

// ============================================
// COCKTAILLIST.JSX - DISPLAY LIST
// ============================================

// Purpose: Render list of cocktail cards

// Props: { drinks }

// Empty state check:
// → if (!drinks || drinks.length === 0)
// → Return message: "No matching cocktails found..."

// Format drinks data:
// → const formattedDrinks = drinks.map(({ ... }) => ({ ... }))

// API response format → Component format:
// → idDrink → id
// → strDrink → name
// → strDrinkThumb → image
// → strAlcoholic → info
// → strGlass → glass

// Example transformation:
// → { idDrink: '11022', strDrink: 'Margarita', ... }
// → { id: '11022', name: 'Margarita', ... }

// JSX rendering:

// Container div with className 'cocktail-list'

// Map over formattedDrinks:
// → formattedDrinks.map((item) => <CocktailCard key={item.id} {...item} />)
// → Spread operator passes all properties as props

// ============================================
// COCKTAILCARD.JSX - INDIVIDUAL CARD
// ============================================

// Purpose: Display single cocktail preview

// Props: { image, name, id, info, glass }

// JSX structure:

// Main div with className 'cocktail-card'

// Image container:
// → div with className 'img-container'
// → img with src={image}, alt={name}

// Footer section:
// → h4 with cocktail name
// → h5 with glass type
// → p with info (alcoholic/non-alcoholic)

// Link to details:
// → Template literal creates dynamic URL
// → Example: id='11022' → '/cocktail/11022'
// → Navigates to Cocktail component

// ============================================
// COCKTAIL.JSX - DETAILS PAGE
// ============================================

// Purpose: Display full cocktail details

// Imports: useParams, useNavigate, axios

// API endpoint:
// → const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

// useParams hook:
// → const { id } = useParams()
// → Extracts 'id' from URL parameter
// → Example: '/cocktail/11022' → id = '11022'

// useNavigate hook:
// → const navigate = useNavigate()
// → Programmatic navigation function

// State management:

// State 1: drink → useState(null)
// → Stores single cocktail object

// State 2: loading → useState(true)
// → Loading state for fetch

// ============================================
// FETCHDRINK FUNCTION (COCKTAIL.JSX)
// ============================================

// Purpose: Fetch single cocktail by ID

// useEffect with [id] dependency:
// → Runs on mount and when id changes

// Async fetchDrink function:

// STEP 1: Set loading to true
// → setLoading(true)

// STEP 2: API request
// → Appends id to URL
// → Example: id='11022' → URL ends with 'i=11022'

// STEP 3: Set drink data
// → setDrink(data.drinks?.[0] || null)
// → Optional chaining with [0] gets first item
// → Sets null if not found

// STEP 4: Error handling
// → catch block logs error

// STEP 5: Finally block
// → setLoading(false)

// Early returns:

// Loading check:
// → if (loading) return <h4>Loading...</h4>

// No drink check:
// → if (!drink) return <h4>No cocktail found...</h4>

// Destructure drink properties:
// → Rename API fields to cleaner names
// → strDrink → name
// → strDrinkThumb → image
// → strAlcoholic → info
// → strCategory → category
// → strGlass → glass
// → strInstructions → instructions

// JSX structure:

// Main section with className 'cocktail-page'

// Header section:
// → Back button:
//   - onClick={() => navigate(-1)}
//   - Goes to previous page in history
// → h3 with cocktail name

// Drink details div:
// → img with cocktail image
// → div with className 'drink-info'

// Info paragraphs:
// → Each with span.drink-data label
// → Displays: name, category, info, glass, instructions

// Optional ingredients logic (commented):
// → Filter object keys starting with 'strIngredient'
// → Map to extract ingredient values
// → Display as comma-separated list

// ============================================
// NAVBAR.JSX - NAVIGATION
// ============================================

// Purpose: Site navigation links

// Import: NavLink from react-router-dom

// JSX structure:

// nav with className 'navbar'

// Two NavLink components:
// → NavLink to='/' → Home link
// → NavLink to='/about' → About link

// NavLink vs Link:
// → NavLink automatically adds 'active' class to current route
// → Useful for styling active navigation items

// ============================================
// ABOUT.JSX - STATIC PAGE
// ============================================

// Purpose: Display app information

// Simple component with static content

// JSX structure:
// → section with className 'about-page'
// → h3 heading
// → p with description text

// ============================================
// KEY CONCEPTS
// ============================================

// Why createBrowserRouter? → Modern router setup with data APIs
// Why Outlet? → Renders matched child route in parent layout
// Why useParams? → Access dynamic URL parameters
// Why useNavigate? → Programmatic navigation (go back, redirect)
// Why useSearchParams? → Read/write URL query strings
// Why NavLink vs Link? → NavLink adds 'active' class for current route
// Why useNavigation? → Track route transition states (loading)
// Why index route? → Default child at parent's exact path
// Why dynamic routes (:id)? → Handle variable URL segments
// Why optional chaining (?.)? → Safe property access, avoid errors
// Why defaultValue vs value? → Uncontrolled input with initial value
// Why e.target.elements? → Access form controls by name
// Why destructuring in map? → Extract and rename object properties
// Why spread in props? → Pass all object properties as individual props
// navigate(-1) → Go back one entry in history stack
// Template literals in routes → Create dynamic paths with variables
// children array in routes → Nested route configuration`,
  },
  {
    title: '25_json_accordionWithFilters',
    code: `// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Main component with data fetching and rendering
// CategoryFilter.jsx → Dropdown for category selection

// ============================================
// DATA STRUCTURE UNDERSTANDING
// ============================================

// API Response structure:
// → Array of objects with properties: id, title, category, parent_objective_id

// Parent Objective (no parent):
// → { id: 'O1', title: 'Increase Sales', category: 'Sales', parent_objective_id: '' }

// Key Result (has parent):
// → { id: 'KR1', title: 'Increase revenue by 10%', category: 'Sales', parent_objective_id: 'O1' }

// Processed structure (after processData):
// → Parent with added properties:
// → { id: 'O1', title: '...', keyResults: [...], visible: true }

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State 1: data → useState([])
// → Stores processed objectives with key results
// → Each objective has: original properties + keyResults array + visible boolean

// State 2: filter → useState('All')
// → Current selected category filter
// → Values: 'All', 'Sales', 'Marketing', etc.

// State 3: categories → useState([])
// → Unique category list for dropdown
// → Example: ['All', 'Sales', 'Marketing', 'Engineering']

// ============================================
// useEffect: FETCH AND PROCESS DATA
// ============================================

// Dependency array: [filter]
// → Runs on mount and whenever filter changes
// → Note: Re-fetches API on every filter change (could be optimized)

// API endpoint:
// → fetch('https://okrcentral.github.io/sample-okrs/db.json')

// STEP 1: Fetch data
// → .then((response) => response.json())
// → Converts response to JSON

// STEP 2: Extract unique categories
// → const uniqueCategories = new Set(json.data.map((item) => item.category))
// → map extracts all category values
// → Set removes duplicates
// → Example: [{ category: 'Sales' }, { category: 'Sales' }] → Set {'Sales'}

// STEP 3: Set categories state
// → setCategories(['All', ...Array.from(uniqueCategories)])
// → Adds 'All' as first option
// → Spreads Set converted to array
// → Example: ['All', 'Sales', 'Marketing']

// STEP 4: Process and set data
// → setData(processData(json.data))
// → Calls processData function with raw API data
// → Sets result in data state

// STEP 5: Error handling
// → .catch((error) => console.error(...))
// → Logs fetch errors

// ============================================
// PROCESSDATA FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Transform flat API data into hierarchical structure

// Accepts: data (raw API response array)

// Returns: Array of parent objectives with keyResults and visible properties

// STEP 1: Initial data copy
// → let filteredData = data
// → Starts with all data

// STEP 2: Apply category filter
// → if (filter !== 'All')
// → Only process if specific category selected

// Filter logic:
// → filteredData = data.filter((item) => item.category === filter)
// → Example: filter = 'Sales' → only Sales category items

// STEP 3: Extract parent objectives
// → const objectives = filteredData.filter((item) => item.parent_objective_id === '')
// → Filter items without parent (empty string means no parent)
// → These are top-level objectives

// Example:
// → filteredData = [{ id: 'O1', parent_objective_id: '' }, { id: 'KR1', parent_objective_id: 'O1' }]
// → objectives = [{ id: 'O1', parent_objective_id: '' }]

// STEP 4: Add keyResults and visible to each parent
// → objectives.forEach((obj) => { ... })
// → Iterate over each parent objective

// For each parent:

// Sub-step A: Find matching key results
// → obj.keyResults = filteredData.filter((item) => item.parent_objective_id === obj.id)
// → Filter children where parent_objective_id matches parent's id
// → Adds keyResults array property to parent

// Example:
// → Parent: { id: 'O1', ... }
// → Children in filteredData: [{ parent_objective_id: 'O1' }, { parent_objective_id: 'O1' }]
// → Result: obj.keyResults = [child1, child2]

// Sub-step B: Set default visibility
// → obj.visible = true
// → All objectives start expanded (key results visible)

// STEP 5: Return processed objectives
// → return objectives
// → Array of parents with keyResults and visible properties

// ============================================
// handleFilterChange FUNCTION
// ============================================

// Purpose: Update filter when category selected

// Accepts: newFilter (string from dropdown)

// Logic:
// → setFilter(newFilter)
// → Updates filter state
// → Triggers useEffect (dependency on filter)
// → Re-fetches and processes data

// Example flow:
// → User selects 'Marketing' in dropdown
// → handleFilterChange('Marketing') called
// → setFilter('Marketing')
// → useEffect runs with filter = 'Marketing'
// → Data filtered to show only Marketing objectives

// ============================================
// toggleVisibility FUNCTION
// ============================================

// Purpose: Show/hide key results for specific objective

// Accepts: id (string, objective id to toggle)

// Logic:
// → Map over data array
// → Find objective with matching id
// → Toggle its visible property

// STEP 1: Map and mutate
// → const newData = data.map((obj) => { ... })

// STEP 2: Check for match
// → if (obj.id === id)

// STEP 3: Toggle visible flag
// → obj.visible = !obj.visible
// → true → false (collapse)
// → false → true (expand)

// STEP 4: Return object
// → return obj
// → Returns modified or unchanged object

// STEP 5: Update state
// → setData(newData)
// → Triggers re-render with new visibility

// Example:
// → Objective O1 has visible: true (expanded)
// → User clicks toggle icon
// → toggleVisibility('O1') called
// → obj.visible becomes false
// → Key results hidden

// ============================================
// renderObjective FUNCTION
// ============================================

// Purpose: Render single objective with key results

// Accepts: (objective, index)
// → objective: parent object with keyResults and visible
// → index: position in array (for numbering)

// Returns: JSX for objective container

// JSX Structure:

// Main container:
// → div with key={index} and className 'objective-container'

// SECTION 1: Objective header
// → div with className 'objective-header'

// Part A: Toggle icon (span)
// → className 'toggle-icon'
// → onClick={() => toggleVisibility(objective.id)}
// → Conditional icon:
//   - If objective.visible: faChevronDown (▼)
//   - If not visible: faChevronRight (▶)

// Part B: User icon
// → FontAwesomeIcon with icon={faUser}
// → className 'user-icon'

// Part C: Objective title
// → span with className 'objective-title'
// → Display: {index + 1}. {objective.title}
// → Example: "1. Increase Sales"

// SECTION 2: Key results (conditional)
// → Conditional: {objective.visible && ...}
// → Only renders if objective.visible is true

// Key results container:
// → div with className 'key-results'

// Map over keyResults:
// → objective.keyResults.map((kr, krIndex) => ...)

// For each key result:
// → div with key={krIndex} and className 'key-result'
// → FontAwesomeIcon with user icon
// → Display: {kr.title}

// Optional alphabetical prefix (commented):
// → {String.fromCharCode(97 + krIndex)}. {kr.title}
// → Would display: a. First KR, b. Second KR, etc.

// ============================================
// JSX STRUCTURE (APP.JSX)
// ============================================

// Main container: div with className 'App'

// Component 1: CategoryFilter
// → Props:
//   - categories={categories} → dropdown options
//   - onFilterChange={handleFilterChange} → callback function

// Component 2: Objectives list
// → {data.map(renderObjective)}
// → Maps over processed objectives
// → Renders each using renderObjective function

// ============================================
// CategoryFilter.JSX COMPONENT
// ============================================

// Purpose: Dropdown for category selection

// Props: { categories, onFilterChange }

// JSX Structure:

// Select element:
// → onChange={(e) => onFilterChange(e.target.value)}
// → Triggers callback with selected value
// → defaultValue='All' → starts with 'All' selected

// Map over categories:
// → categories.map((category) => ...)

// For each category:
// → option element with:
//   - key={category}
//   - value={category}
//   - Display: {category}

// Example:
// → categories = ['All', 'Sales', 'Marketing']
// → Renders 3 option elements

// ============================================
// APPLICATION FLOW
// ============================================

// Initial load:
// → Component mounts
// → useEffect runs (filter = 'All')
// → Fetches API data
// → Extracts categories: ['All', 'Sales', 'Marketing', ...]
// → Processes data with processData('All')
// → All objectives from all categories included
// → Each objective gets keyResults array and visible: true
// → CategoryFilter displays all categories
// → All objectives displayed with key results expanded

// User selects 'Sales' category:
// → CategoryFilter onChange triggered
// → onFilterChange('Sales') called
// → handleFilterChange updates filter to 'Sales'
// → useEffect runs (dependency changed)
// → Fetches API data again
// → processData runs with filter = 'Sales'
// → filteredData contains only Sales items
// → objectives filtered to Sales parents only
// → keyResults filtered to Sales children only
// → Component re-renders with Sales data only

// User clicks toggle icon on first objective:
// → toggleVisibility(objective.id) called
// → Maps through data array
// → Finds matching objective
// → Toggles visible from true to false
// → setData updates state
// → Component re-renders
// → Conditional {objective.visible && ...} is false
// → Key results hidden
// → Icon changes to faChevronRight (▶)

// User clicks toggle again:
// → visible toggles from false to true
// → Key results appear
// → Icon changes to faChevronDown (▼)

// ============================================
// DATA TRANSFORMATION EXAMPLE
// ============================================

// Raw API data:
// [
//   { id: 'O1', title: 'Increase Sales', category: 'Sales', parent_objective_id: '' },
//   { id: 'KR1', title: 'Revenue +10%', category: 'Sales', parent_objective_id: 'O1' },
//   { id: 'KR2', title: 'New clients +5', category: 'Sales', parent_objective_id: 'O1' },
//   { id: 'O2', title: 'Improve Marketing', category: 'Marketing', parent_objective_id: '' }
// ]

// After processData (filter = 'Sales'):
// [
//   {
//     id: 'O1',
//     title: 'Increase Sales',
//     category: 'Sales',
//     parent_objective_id: '',
//     keyResults: [
//       { id: 'KR1', title: 'Revenue +10%', category: 'Sales', parent_objective_id: 'O1' },
//       { id: 'KR2', title: 'New clients +5', category: 'Sales', parent_objective_id: 'O1' }
//     ],
//     visible: true
//   }
// ]

// After processData (filter = 'All'):
// [
//   { id: 'O1', ..., keyResults: [KR1, KR2], visible: true },
//   { id: 'O2', ..., keyResults: [], visible: true }
// ]

// ============================================
// KEY CONCEPTS
// ============================================

// Why Set for categories? → Automatic deduplication of category names
// Why Array.from? → Convert Set to array for mapping
// Why empty string check? → API uses '' for no parent (root objectives)
// Why forEach to mutate? → Adding properties to existing objects
// Why filter twice? → First for category, then for parent-child relationship
// Why visible property? → Track expand/collapse state per objective
// Why map in toggleVisibility? → Create new array with updated visibility
// Why index in renderObjective? → Numbering objectives (1., 2., 3.)
// Why conditional rendering? → Show/hide key results based on visible flag
// Why re-fetch on filter change? → Current implementation (could be optimized)
// parent_objective_id = '' → Root level objective (parent)
// parent_objective_id = 'O1' → Child of objective with id 'O1'
// New Set → Creates collection of unique values only
// obj.keyResults = [...] → Mutation adds new property to object
// !obj.visible → Boolean toggle (flip between true/false)`,
  },
  {
    title: '26_holyGrailLayout',
    code: `// Step 1: Inside App.jsx,
// I'm directly returning a simple div with className as "container"
// inside this container div,
// - I have a header tag
// - div with className as "left-sidebar"
// main tag
// - div with className as "right-sidebar"
// footer

// ---------------------- CORE LOGIC STARTS FROM HERE :)  ---------------------- //

// i) for container div, I'm providing height, width, display as grid,
// ii) grid-template-rows: fixed_px, flexible, fixed_px --> height
// iii) grid-template-columns: fixed_px, flexible, fixed_px ---> width

// CORE LOGIC: DESKTOP

// header: I want header to span all columns ---> grid-column: 1/4
// left-sidebar (nav): I want only for one column ----> grid-column: 1/2
// main: As I'm the 2nd row and I want to span till 3rd column (Exclusive) ---> grid-column: 2/3
// right-sidebar (aside): As I'm the 3rd row, ---> grid-column: 3/4
// footer: grid-column: 1/4

// Desktop View (width > 768px):
// +-------------------+-------------------+-------------------+
// |       HEADER      |       HEADER      |       HEADER      |
// +-------------------+-------------------+-------------------+
// |   LEFT SIDEBAR   |     MAIN CONTENT  |   RIGHT SIDEBAR   |
// +-------------------+-------------------+-------------------+
// |       FOOTER      |       FOOTER      |       FOOTER      |
// +-------------------+-------------------+-------------------+

// Mobile View (width ≤ 768px):

// CORE LOGIC:

// i) inside container, make grid rows to repeat 5 with all the space (Ex: 1fr ---> 5 times)
// ii) grid-template-columns to take only 1fr (because only 1 column)
// iii) for all the tags/classNames, make grid-column: 1/2

// +-------------------+
// |       HEADER      |
// +-------------------+
// |   LEFT SIDEBAR   |
// +-------------------+
// |     MAIN CONTENT  |
// +-------------------+
// |   RIGHT SIDEBAR   |
// +-------------------+
// |       FOOTER      |
// +-------------------+
`,
  },
  {
    title: '27_tabComponentWithNavigation',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Tabs /> component
// Tabs.jsx → main component managing active tab state
// Tab.jsx → individual tab button component

// ============================================
// TABS.JSX - STATE MANAGEMENT
// ============================================

// State: activeTab → useState(1)
// → Tracks which tab is currently active
// → Stores tab ID (1, 2, or 3)
// → Default: 1 (first tab active on load)

// ============================================
// CONTENT OBJECT
// ============================================

// Purpose: Map tab IDs to their content

// Structure:
// → const content = { 1: 'Content for tab 1', 2: 'Content for tab 2', 3: 'Content for tab 3' }
// → Keys are tab IDs (numbers)
// → Values are content strings

// Access pattern:
// → content[activeTab]
// → Example: activeTab = 2 → content[2] → 'Content for tab 2'

// Note: Could be expanded to JSX content instead of strings
// → Example: { 1: <div>Complex JSX here</div>, ... }

// ============================================
// JSX STRUCTURE (TABS.JSX)
// ============================================

// Main container: div with className 'container'

// Inner wrapper div

// SECTION 1: Tabs header
// → div with className 'tabs-header'
// → Contains all Tab button components

// Tab components (3 instances):

// Tab 1:
// → Props: label='Tab 1', id={1}, activeTab={activeTab}, setActiveTab={setActiveTab}

// Tab 2:
// → Props: label='Tab 2', id={2}, activeTab={activeTab}, setActiveTab={setActiveTab}

// Tab 3:
// → Props: label='Tab 3', id={3}, activeTab={activeTab}, setActiveTab={setActiveTab}

// Why pass activeTab and setActiveTab to each?
// → Each Tab needs to know if it's active (for styling)
// → Each Tab needs ability to update active state (on click)

// SECTION 2: Content display
// → div with className 'tab-content'
// → Display: {content[activeTab]}
// → Dynamically shows content based on active tab
// → Example: activeTab = 1 → shows 'Content for tab 1'

// ============================================
// TAB.JSX - INDIVIDUAL TAB COMPONENT
// ============================================

// Purpose: Render single tab button with active styling

// Props: { label, id, activeTab, setActiveTab }
// → label: button text (e.g., 'Tab 1')
// → id: unique tab identifier (1, 2, or 3)
// → activeTab: current active tab ID from parent
// → setActiveTab: function to update active tab

// ============================================
// HANDLECLICK FUNCTION (TAB.JSX)
// ============================================

// Purpose: Update active tab when button clicked

// Logic:
// → const handleClick = () => { setActiveTab(id) }
// → Simply calls parent's setActiveTab with this tab's id

// Example:
// → User clicks Tab 2 (id = 2)
// → handleClick runs
// → setActiveTab(2) called
// → Parent's activeTab state becomes 2
// → All Tab components re-render with new activeTab prop

// ============================================
// ISACTIVE CALCULATION (TAB.JSX)
// ============================================

// Purpose: Determine if this tab is currently active

// Logic:
// → const isActive = activeTab === id
// → Compares parent's activeTab with this tab's id
// → Returns boolean

// Example:
// → Tab id = 2, activeTab = 2 → isActive = true
// → Tab id = 1, activeTab = 2 → isActive = false

// ============================================
// JSX STRUCTURE (TAB.JSX)
// ============================================

// Wrapper div (could be fragment)

// Button element:
// → onClick={handleClick} → triggers tab change
// → tabIndex={0} → makes keyboard accessible
//   - Base class: 'tab-button' (always present)
//   - Conditional class: 'active' (only when isActive is true)
// → Display: {label}

// Example className values:
// → isActive = true → 'tab-button active'
// → isActive = false → 'tab-button'

// ============================================
// TABS FLOW
// ============================================

// Initial render:
// → activeTab = 1 (default state)
// → Content displays: 'Content for tab 1'
// → Tab 1: id=1, activeTab=1 → isActive=true → className='tab-button active'
// → Tab 2: id=2, activeTab=1 → isActive=false → className='tab-button'
// → Tab 3: id=3, activeTab=1 → isActive=false → className='tab-button'

// User clicks Tab 2 button:
// → Tab 2's handleClick triggered
// → setActiveTab(2) called
// → Tabs component's activeTab state updates to 2
// → Tabs component re-renders

// After re-render:
// → activeTab = 2
// → Content displays: 'Content for tab 2'
// → Tab 1: id=1, activeTab=2 → isActive=false → className='tab-button'
// → Tab 2: id=2, activeTab=2 → isActive=true → className='tab-button active'
// → Tab 3: id=3, activeTab=2 → isActive=false → className='tab-button'

// User clicks Tab 3 button:
// → setActiveTab(3)
// → activeTab = 3
// → Content displays: 'Content for tab 3'
// → Tab 3 becomes active, others inactive

// User clicks already active tab (Tab 3):
// → handleClick still runs
// → setActiveTab(3) called again
// → activeTab stays 3
// → No visible change (already active)

// ============================================
// CSS APPROACH
// ============================================

// .container:
// → Center content on page
// → Padding, max-width for layout

// .tabs-header:
// → display: flex
// → flex-direction: row (horizontal tabs)
// → border-bottom or similar for tab bar appearance

// .tab-button (base styling):
// → padding: for button size
// → border: style tab borders
// → background-color: default inactive color
// → cursor: pointer
// → transition: for smooth style changes
// → border-bottom: none or transparent (merges with content)

// .tab-button.active (active state):
// → background-color: different color (highlight active)
// → border-bottom: solid color matching content area
// → font-weight: bold (make text stand out)
// → color: different text color if needed

// Example styling pattern:
// → Inactive tabs: grey background, normal text
// → Active tab: white background, bold text, bottom border removed
// → Creates effect of active tab "connecting" to content area

// .tab-content:
// → padding: space around content
// → border: matches tab styling
// → background-color: matches active tab
// → min-height: prevents layout shift when switching

// ============================================
// ALTERNATIVE IMPLEMENTATIONS
// ============================================

// Dynamic tab generation (instead of hardcoding 3 tabs):
// → Define tabs array: const tabs = [{ id: 1, label: 'Tab 1' }, ...]
// → Map over array: tabs.map((tab) => <Tab key={tab.id} {...tab} ... />)

// Content as props instead of object:
// → Pass content directly to each Tab
// → Tab stores its own content
// → Display content of active tab differently

// Using React Context (for deeply nested tabs):
// → Create TabsContext with activeTab and setActiveTab
// → Avoid prop drilling through multiple levels
// → Useful if Tab components are nested deeper

// Controlled vs Uncontrolled:
// → Current: Controlled (parent manages state)
// → Could be: Uncontrolled (Tabs manages own state internally)
// → Controlled is better for parent needing access to active tab

// ============================================
// ACCESSIBILITY CONSIDERATIONS
// ============================================

// tabIndex={0}:
// → Makes button keyboard focusable
// → Already accessible as button element, but explicit is clear

// Could add:
// → role='tab' on buttons
// → role='tablist' on tabs-header
// → role='tabpanel' on tab-content
// → aria-selected={isActive} on buttons
// → aria-controls linking button to content panel
// → Keyboard navigation (Arrow keys to switch tabs)

// ============================================
// KEY CONCEPTS
// ============================================

// Why single state in parent? → Single source of truth, easier to manage
// Why pass both activeTab and setActiveTab? → Tab needs to read and write state
// Why id prop on each Tab? → Identify which tab was clicked
// Why template literal for className? → Combine base and conditional classes
// Why content object with numeric keys? → Map IDs directly to content
// Why tabIndex={0}? → Explicit keyboard accessibility
// Why comparison for isActive? → Simple boolean check for styling
// Why not useState in Tab? → Parent controls which tab is active
// Prop drilling → Passing props through component tree (activeTab, setActiveTab)
// Lifting state up → State in parent, not in children
// content[activeTab] → Dynamic object property access using variable
// Template literal className → Combines static and dynamic class names
// === comparison → Strict equality check for active state
`,
  },
  {
    title: '28_nestedComments',
    code: `// ============================================
// APPLICATION STRUCTURE
// ============================================

// App.jsx → Root component with comment tree state
// Comment.jsx → Recursive component rendering comments/replies
// Action.jsx → Simple button wrapper component
// useNode.js → Custom hook with tree manipulation logic
// Assets: UpArrow.jsx, DownArrow.jsx → SVG icons

// ============================================
// DATA STRUCTURE (TREE)
// ============================================

// Comment structure:
// → { id: number, name: string, items: array }

// Root comment:
// → { id: 1, items: [] }
// → id: 1 is special (initial input, not a comment)
// → items: array of child comments

// Nested comment example:
// {
//   id: 1,
//   items: [
//     {
//       id: 1634567890123,
//       name: 'First comment',
//       items: [
//         { id: 1634567891234, name: 'Reply to first', items: [] },
//         { id: 1634567892345, name: 'Another reply', items: [] }
//       ]
//     }
//   ]
// }

// Tree structure: Each comment can have nested replies infinitely deep

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// Initial data:
// → const comments = { id: 1, items: [] }
// → Root node with empty replies array

// State: commentsData → useState(comments)
// → Stores entire comment tree
// → Single source of truth for all comments

// Custom hook: useNode()
// → const { insertNode, editNode, deleteNode } = useNode()
// → Three utility functions for tree manipulation

// ============================================
// APP.JSX - HANDLER FUNCTIONS
// ============================================

// handleInsertNode function:
// → Accepts: (commentId, item)
// → commentId: parent comment where reply is added
// → item: text content of new reply

// Logic:
// → const finalStructure = insertNode(commentsData, commentId, item)
// → Calls insertNode utility with current tree, target id, new text
// → setCommentsData(finalStructure)
// → Updates state with modified tree

// handleEditNode function:
// → Accepts: (commentId, value)
// → commentId: comment being edited
// → value: new text content

// Logic:
// → const finalStructure = editNode(commentsData, commentId, value)
// → Calls editNode utility
// → setCommentsData(finalStructure)

// handleDeleteNode function:
// → Accepts: (commentId)
// → commentId: comment to delete

// Logic:
// → const finalStructure = deleteNode(commentsData, commentId)
// → Calls deleteNode utility
// → setCommentsData({ ...finalStructure })
// → Spread operator ensures React detects change

// ============================================
// APP.JSX - RENDERING
// ============================================

// Render single Comment component:
// → Props passed:
//   - handleInsertNode={handleInsertNode}
//   - handleEditNode={handleEditNode}
//   - handleDeleteNode={handleDeleteNode}
//   - comment={commentsData}

// Why pass root?
// → Comment component recursively renders itself
// → Starting with root renders entire tree

// ============================================
// COMMENT.JSX - STATE MANAGEMENT
// ============================================

// State 1: input → useState('')
// → Stores text for new comment/reply
// → Used in input fields

// State 2: editMode → useState(false)
// → Boolean tracking if comment is being edited
// → Changes UI to show Save/Cancel instead of Reply/Edit/Delete

// State 3: showInput → useState(false)
// → Boolean controlling reply input visibility
// → Shows/hides input field for adding reply

// State 4: expand → useState(false)
// → Boolean controlling visibility of replies
// → Expands/collapses nested comments

// Ref: inputRef → useRef(null)
// → References editable span element
// → Used to focus on edit mode
// → Access edited text via innerText

// ============================================
// COMMENT.JSX - useEffect
// ============================================

// Dependency: [editMode]
// → Runs when editMode changes

// Logic:
// → inputRef?.current?.focus()
// → Auto-focuses span when entering edit mode
// → Optional chaining prevents errors if ref not set

// ============================================
// COMMENT.JSX - handleNewComment
// ============================================

// Purpose: Handle Reply button click

// Logic:
// → setExpand(!expand)
// → Toggle expansion (show/hide replies)
// → setShowInput(true)
// → Show input field for typing reply

// ============================================
// COMMENT.JSX - onAddComment
// ============================================

// Purpose: Handle adding new comment or saving edit

// Two modes: edit or add reply

// EDIT MODE (editMode is true):
// → handleEditNode(comment.id, inputRef?.current?.innerText)
// → Gets edited text from span's innerText
// → Calls parent's edit handler

// ADD REPLY MODE (editMode is false):
// → setExpand(true)
// → Ensure replies are visible
// → handleInsertNode(comment.id, input)
// → Adds new reply to current comment
// → setShowInput(false), setInput('')
// → Hide input and clear text

// After both:
// → if (editMode) setEditMode(false)
// → Exit edit mode if was editing

// ============================================
// COMMENT.JSX - HANDLEDELETE
// ============================================

// Purpose: Delete current comment

// Logic:
// → handleDeleteNode(comment.id)
// → Calls parent's delete handler with comment's id

// ============================================
// COMMENT.JSX - JSX STRUCTURE
// ============================================

// Main wrapper: outer div

// SECTION 1: Comment display container
// → div with dynamic className:
//   - 'inputContainer' if comment.id === 1 (root)
//   - 'commentContainer' otherwise

// Conditional rendering: {comment.id === 1 ? ... : ...}

// IF ROOT (id === 1):

// Input field:
// → type='text'
// → autoFocus
// → value={input}
// → onChange={(e) => setInput(e.target.value)}
// → placeholder='type...'

// Action button:
// → type='COMMENT'
// → handleClick={onAddComment}

// ELSE (nested comment):

// Comment text display:
// → span element with:
//   - contentEditable={editMode}
//   - Makes span editable when editMode true
//   - suppressContentEditableWarning={editMode}
//   - Prevents React warning about children in editable element
//   - ref={inputRef}
//   - Access for reading edited text
//   - Display: {comment.name}

// Actions container:
// → div with styles

// IF EDIT MODE:

// Save button:
// → Action with type='SAVE'
// → handleClick={onAddComment}
// → Saves edited text

// Cancel button:
// → Action with type='CANCEL'
// → handleClick resets text and exits edit mode:
//   - if (inputRef.current) inputRef.current.innerText = comment.name
//   - setEditMode(false)

// ELSE (normal mode):

// Reply button:
// → Action with dynamic icon:
//   - Shows UpArrow if expand is true
//   - Shows DownArrow if expand is false
//   - Text: 'REPLY'
// → handleClick={handleNewComment}

// Edit button:
// → Action with type='EDIT'
// → handleClick={() => setEditMode(true)}

// Delete button:
// → Action with type='DELETE'
// → handleClick={handleDelete}

// SECTION 2: Replies container
// → div with conditional display:
//   - display: expand ? 'block' : 'none'
//   - paddingLeft: 25 (indent replies)

// Reply input (conditional):
// → {showInput && ...}

// Input field:
// → type='text'
// → autoFocus
// → onChange={(e) => setInput(e.target.value)}

// Reply action button:
// → type='REPLY'
// → handleClick={onAddComment}

// Cancel action button:
// → type='CANCEL'
// → handleClick logic:
//   - setShowInput(false)
//   - if (!comment?.items?.length) setExpand(false)
//   - Collapse if no existing replies

// Recursive comment rendering:
// → {comment?.items?.map((cmnt) => ...)}
// → Map over items (child comments)

// For each child:
// → <Comment
//     key={cmnt.id}
//     handleInsertNode={handleInsertNode}
//     handleEditNode={handleEditNode}
//     handleDeleteNode={handleDeleteNode}
//     comment={cmnt}
//   />
// → Recursively renders Comment component
// → Passes same handlers down
// → Passes child comment as prop

// ============================================
// ACTION.JSX - SIMPLE WRAPPER
// ============================================

// Purpose: Reusable clickable element

// Props: { handleClick, type, className }

// Returns:
// → div with className={className}
// → onClick={handleClick}
// → Display: {type}

// Why separate component?
// → Reusability across different action buttons
// → Consistent styling via className

// ============================================
// useNode HOOK - insertNode FUNCTION
// ============================================

// Purpose: Add new reply to tree

// Accepts: (tree, commentId, item)
// → tree: current comment tree structure
// → commentId: parent comment id
// → item: new reply text

// Recursive logic:

// BASE CASE: if (tree.id === commentId)
// → Found the parent comment

// Action:
// → tree.items.push({ id: Date.now(), name: item, items: [] })
// → Add new comment object to parent's items array
// → id: Date.now() creates unique timestamp
// → name: reply text
// → items: empty array for nested replies
// → return tree

// RECURSIVE CASE: else
// → Search child comments

// Logic:
// → let latestNode = tree.items.map((ob) => insertNode(ob, commentId, item))
// → Recursively call insertNode on each child
// → Each child returns updated version
// → return { ...tree, items: latestNode }
// → Return tree with updated items array

// Example flow:
// → Looking for commentId in nested structure
// → If current node matches → add reply here
// → If not → check all children recursively
// → Rebuild tree from bottom up with new reply

// ============================================
// useNode HOOK - EDITNODE FUNCTION
// ============================================

// Purpose: Update comment text

// Accepts: (tree, commentId, value)
// → tree: comment tree
// → commentId: comment to edit
// → value: new text

// Recursive logic:

// BASE CASE: if (tree.id === commentId)
// → Found comment to edit
// → tree.name = value
// → Update comment text
// → return tree

// RECURSIVE CASE: else
// → Search children
// → tree.items.map((ob) => editNode(ob, commentId, value))
// → Recursively search and edit
// → return { ...tree }
// → Return updated tree

// Note: map doesn't reassign items, relies on mutation
// Spread operator creates new object reference for React

// ============================================
// useNode HOOK - DELETENODE FUNCTION
// ============================================

// Purpose: Remove comment from tree

// Accepts: (tree, id)
// → tree: comment tree
// → id: comment to delete

// Iterative + recursive approach:

// Loop through items:
// → for (let i = 0; i < tree.items.length; i++)

// For each item:
// → const currentItem = tree.items[i]

// Check if match:
// → if (currentItem.id === id)

// If found:
// → tree.items.splice(i, 1)
// → Remove from array (mutation)
// → return tree

// If not found:
// → deleteNode(currentItem, id)
// → Recurse into child
// → Search deeper in tree

// After loop:
// → return tree
// → Return potentially modified tree

// ============================================
// RECURSION VISUALIZATION
// ============================================

// Tree structure after several comments:
// {
//   id: 1,
//   items: [
//     {
//       id: 100,
//       name: 'First',
//       items: [
//         { id: 101, name: 'Reply 1', items: [] },
//         { id: 102, name: 'Reply 2', items: [
//           { id: 103, name: 'Nested reply', items: [] }
//         ]}
//       ]
//     },
//     { id: 104, name: 'Second', items: [] }
//   ]
// }

// Component tree rendering (recursive):
// <Comment comment={id:1}>              // Root
//   <Comment comment={id:100}>          // "First"
//     <Comment comment={id:101} />      // "Reply 1"
//     <Comment comment={id:102}>        // "Reply 2"
//       <Comment comment={id:103} />    // "Nested reply"
//     </Comment>
//   </Comment>
//   <Comment comment={id:104} />        // "Second"
// </Comment>

// Each Comment component:
// → Renders its own text and actions
// → Maps over comment.items
// → Recursively renders Comment for each child
// → Creates nested indented structure

// ============================================
// KEY CONCEPTS
// ============================================

// Why tree structure? → Unlimited nesting depth for replies
// Why recursive component? → Component renders itself for children
// Why single state in root? → Entire tree in one place, easier updates
// Why useNode hook? → Separate data manipulation logic from UI
// Why Date.now() for id? → Simple unique identifier using timestamp
// Why contentEditable? → Inline editing without input element
// Why innerText? → Access edited text from editable span
// Why splice? → Mutate array to remove element (then trigger re-render)
// Why spread in return? → Create new object reference for React
// Why map in recursive functions? → Process each child, return updated versions
// Why inputRef? → Access DOM element for focus and text content
// Why optional chaining? → Safe access to potentially undefined values
// Recursion base case → When condition met, stop recursing (found target)
// Recursion recursive case → Keep searching children until base case
// tree.items.push() → Mutation adds to array
// { ...tree, items: latestNode } → Immutable update pattern
// contentEditable="true" → Makes HTML element editable like input`,
  },
  {
    title: '29_signupFormWithValidation',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <Register /> component
// Register.jsx → complete registration form with validation

// ============================================
// REGISTER.JSX - STATE MANAGEMENT
// ============================================

// USERNAME STATES:

// State 1: userName → useState('')
// → Stores username input value

// State 2: validName → useState(false)
// → Boolean tracking if username meets validation rules
// → Updated by useEffect whenever userName changes

// State 3: userFocus → useState(false)
// → Tracks if username input is focused
// → Controls visibility of instruction message

// PASSWORD STATES:

// State 4: password → useState('')
// → Stores password input value

// State 5: validPassword → useState(false)
// → Boolean tracking if password meets validation rules
// → Updated by useEffect whenever password changes

// State 6: passwordFocus → useState(false)
// → Tracks if password input is focused
// → Controls visibility of instruction message

// CONFIRM PASSWORD STATES:

// State 7: confirmPassword → useState('')
// → Stores confirm password input value

// State 8: validMatch → useState(false)
// → Boolean tracking if confirmPassword matches password
// → Updated by useEffect

// State 9: matchFocus → useState(false)
// → Tracks if confirm password input is focused
// → Controls visibility of instruction message

// SUCCESS STATE:

// State 10: success → useState(false)
// → Boolean tracking successful registration
// → Switches UI to success message

// ============================================
// VALIDATION FUNCTIONS
// ============================================

// isValidUsername function:
// → Accepts: username (string)
// → Returns: boolean (true if valid, false if not)

// Validation rules:

// RULE 1: Length check
// → if (username.length < 4 || username.length > 24) return false
// → Must be between 4-24 characters

// RULE 2: First character check
// → if (!username.match(/^[A-Za-z]/)) return false
// → /^[A-Za-z]/ → regex checks first character is letter
// → ^ means start of string
// → [A-Za-z] means uppercase or lowercase letter
// → Returns false if first character not a letter

// RULE 3: Allowed characters check
// → if (!username.match(/^[A-Za-z0-9-_]+$/)) return false
// → /^[A-Za-z0-9-_]+$/ → only letters, numbers, hyphens, underscores
// → + means one or more characters
// → $ means end of string
// → Returns false if contains invalid characters

// RULE 4: All checks passed
// → return true

// Example validations:
// → "john123" → true (valid)
// → "jo" → false (too short)
// → "1john" → false (starts with number)
// → "john@123" → false (invalid character @)

// ============================================
// PASSWORD VALIDATION FUNCTION
// ============================================

// isValidPassword function:
// → Accepts: password (string)
// → Returns: boolean

// Validation rules:

// RULE 1: Length check
// → if (password.length < 8 || password.length > 24) return false
// → Must be 8-24 characters

// RULE 2: Lowercase check
// → if (!password.match(/[a-z]/)) return false
// → /[a-z]/ → at least one lowercase letter
// → Returns false if no lowercase

// RULE 3: Uppercase check
// → if (!password.match(/[A-Z]/)) return false
// → /[A-Z]/ → at least one uppercase letter

// RULE 4: Number check
// → if (!password.match(/[0-9]/)) return false
// → /[0-9]/ → at least one digit

// RULE 5: Special character check
// → if (!password.match(/[!@#$%]/)) return false
// → /[!@#$%]/ → at least one of these special characters
// → Only these 5 special characters allowed

// RULE 6: All checks passed
// → return true

// Example validations:
// → "Pass123!" → true (valid)
// → "pass123!" → false (no uppercase)
// → "PASSWORD!" → false (no lowercase, no number)
// → "Pass123" → false (no special character)

// ============================================
// useEffect: USERNAME VALIDATION
// ============================================

// Dependency: [userName]
// → Runs whenever userName state changes

// Logic:
// → setValidName(isValidUsername(userName))
// → Calls validation function
// → Updates validName state with result

// Why useEffect?
// → Real-time validation as user types
// → Separates validation logic from input handler

// Alternative (commented):
// → setValidName(USER_REGEX.test(userName))
// → Using regex directly instead of function

// ============================================
// useEffect: PASSWORD VALIDATION
// ============================================

// Dependency: [password, confirmPassword]
// → Runs when either password or confirmPassword changes

// Logic:

// STEP 1: Validate password strength
// → setValidPassword(isValidPassword(password))
// → Checks password meets all requirements

// STEP 2: Check password match
// → setValidMatch(password === confirmPassword)
// → Simple equality check
// → Both must be identical strings

// Why both dependencies?
// → Changing password → revalidate strength and match
// → Changing confirmPassword → only revalidate match

// ============================================
// HANDLESUBMIT FUNCTION
// ============================================

// Purpose: Process form submission

// Accepts: e (event object)

// Logic:

// STEP 1: Prevent default
// → e.preventDefault()
// → Stops page reload

// STEP 2: Set success state
// → setSuccess(true)
// → Triggers success message UI

// STEP 3: Clear all inputs
// → setUserName('')
// → setPassword('')
// → setConfirmPassword('')
// → Resets form for new user

// Note: No validation check in handleSubmit
// → Why? Button is disabled if validation fails
// → Button only clickable when all validations pass

// ============================================
// JSX STRUCTURE - CONDITIONAL RENDERING
// ============================================

// Root: Fragment (<> </>)

// Top-level conditional: {success ? ... : ...}

// IF SUCCESS (success is true):

// Success section:
// → h1 with className 'success-text'
// → Text: "Success!"
// → Link: <a href='/'>Back to Home</a>

// ELSE (success is false):

// Registration form section:
// → h1 with text "Register"
// → Form element with onSubmit={handleSubmit}

// ============================================
// FORM FIELDS - USERNAME INPUT
// ============================================

// Label:
// → htmlFor='username'
// → Text: "Username:"

// Input field:
// → type='text'
// → id='username'
// → autoComplete='off' → prevents browser autofill
// → value={userName} → controlled input
// → onChange={(e) => setUserName(e.target.value)}
// → required → HTML5 validation

// Dynamic className:
// → className={validName ? 'valid-name' : 'invalid-name'}
// → Changes styling based on validation

// Accessibility attributes:
// → aria-invalid={validName ? 'false' : 'true'}
// → Tells screen readers if input is invalid
// → aria-describedby='uidnote'
// → Links to instruction paragraph

// Focus handlers:
// → onFocus={() => setUserFocus(true)}
// → onBlur={() => setUserFocus(false)}
// → Track focus state for showing instructions

// Instruction paragraph:
// → id='uidnote' (matches aria-describedby)
// → Dynamic className:
//   - userFocus && !validName ? 'instructions' : 'offscreen'
//   - Show instructions when: focused AND invalid
//   - Hide when: not focused OR valid
// → Content: validation rules text with <br /> tags

// ============================================
// FORM FIELDS - PASSWORD INPUT
// ============================================

// Label:
// → htmlFor='password'
// → Text: "Password:"

// Input field:
// → type='password' → masks input
// → id='password'
// → value={password}
// → onChange={(e) => setPassword(e.target.value)}
// → required

// Dynamic className:
// → className={validPassword ? 'valid-password' : 'invalid-password'}

// Accessibility:
// → aria-invalid={!validPassword}
// → Boolean value (true if invalid)

// Focus handlers:
// → onFocus={() => setPasswordFocus(true)}
// → onBlur={() => setPasswordFocus(false)}

// Instruction paragraph:
// → id='pwdnote'
// → Dynamic className:
//   - passwordFocus && !validPassword ? 'instructions' : 'offscreen'
// → Content: password requirements
// → Special character hints with aria-label:
//   - <span aria-label='exclamation mark'>!</span>
//   - Screen reader announces label instead of symbol

// ============================================
// FORM FIELDS - CONFIRM PASSWORD INPUT
// ============================================

// Label:
// → htmlFor='confirm_pwd'
// → Text: "Confirm Password:"

// Input field:
// → type='password'
// → id='confirm_pwd'
// → value={confirmPassword}
// → onChange={(e) => setConfirmPassword(e.target.value)}
// → required

// Dynamic className (complex logic):
// → className={validPassword && confirmPassword === password ? 'confirmed-password' : 'invalid-password'}
// → Green/confirmed style when:
//   - Password is valid AND
//   - Confirm password matches password
// → Invalid style otherwise

// Accessibility:
// → aria-invalid={validMatch ? 'false' : 'true'}
// → aria-describedby='confirmnote'

// Focus handlers:
// → onFocus={() => setMatchFocus(true)}
// → onBlur={() => setMatchFocus(false)}

// Instruction paragraph:
// → id='confirmnote'
// → Dynamic className:
//   - matchFocus && !validMatch ? 'instructions' : 'offscreen'
// → Content: "Must match the above password input field."

// ============================================
// SUBMIT BUTTON
// ============================================

// Button element:
// → Text: "Sign Up"
// → type='submit' (implicit, triggers form onSubmit)

// Disabled logic:
// → disabled={!validName || !validPassword || !validMatch ? true : false}
// → Can simplify to: disabled={!validName || !validPassword || !validMatch}

// Button disabled when:
// → Username invalid OR
// → Password invalid OR
// → Passwords don't match

// Button enabled when:
// → All three validations pass

// Why controlled inputs? → React state controls value, easier validation
// Why real-time validation? → Immediate feedback improves UX
// Why focus states? → Show hints only when needed, cleaner UI
// Why disabled button? → Prevent invalid submission, clear feedback
// Why clear on success? → Reset for next user, fresh state
// Why separate validation functions? → Reusable, testable, readable
// Why useEffect for validation? → Automatic updates, separation of concerns
// Why multiple states? → Track each field independently
// .match() method → Tests string against regex, returns match or null
// Truthy/falsy → !username.match() checks if null (no match)
// aria attributes → Accessibility for screen readers
// onFocus/onBlur → Standard events for input focus tracking
// e.preventDefault() → Stops default form submission behavior
`,
  },
  {
    title: '30_api_integration_with_filter_logic',
    code: `// Step 1: Inside App.jsx component, I will simply use FilterList.jsx component
// Step 2: I have a custom debounce function and I'm using this in onChange

const handleInputChange = useCallback(
  (debounce((value) => {
    setInput(value);
  }, 300),
  [])
);

// CORE LOGIC is to whatever we are typing we have to filter the savedPokemons

// Ex: const filteredPokemons = pokemons.filter((pokemon)=> pokemon.name.toLowerCase().includes(input.toLowerCase()))
// And simply map this filteredPokemons and return an li of each pokemon

// API Call logic --> We are using localStorage ---> Optional Enhancement
// 1st attempt to check if (dataIsInLocalStorage) --> If yes ---> setPokemons(JSON.parse(dataIsInLocalStorage))
// else to perform an API call and localStorage.setItem ---> and setPokemons(data.results)
`,
  },
  {
    title: '31_grid_lights',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <LightGrid /> component
// LightGrid.jsx → complete grid game with activation/deactivation logic

// ============================================
// GRID LAYOUT CONCEPT
// ============================================

// 3x3 grid with center cell omitted:
// [0] [1] [2]
// [3] [X] [4]  ← X represents empty center (not clickable)
// [5] [6] [7]

// Total: 8 clickable cells numbered 0-7
// Cell IDs stored as strings: "row-col" format
// Examples: "0-0", "0-1", "1-2", "2-1"

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: activeCells → useState({})
// → Object storing active state of each cell
// → Structure: { "0-0": true, "0-1": false, "1-0": true }
// → Key: cellId string ("row-col")
// → Value: boolean (true = active/green, false = inactive/white)

// State 2: activationOrder → useState([])
// → Array tracking chronological click sequence
// → Stores cellId strings in order clicked
// → Example: ["0-0", "1-0", "2-2", "0-1"]
// → Used for reverse deactivation sequence

// State 3: isDeactivating → useState(false)
// → Boolean flag to prevent clicks during animation
// → true: deactivation sequence running, block all clicks
// → false: normal state, clicks allowed

// ============================================
// CELL ID TO INDEX MAPPING
// ============================================

// cellIdToIndex function:
// → Purpose: Convert internal cellId to display number (0-7)

// Accepts: cellId (string like "1-2")

// STEP 1: Parse cellId
// → const [row, col] = cellId.split('-').map(Number)
// → split('-') creates array: ["1", "2"]
// → map(Number) converts to numbers: [1, 2]

// STEP 2: Map to display number

// Row 0 (top row):
// → if (row === 0) return col
// → col 0 → 0, col 1 → 1, col 2 → 2
// → Direct mapping

// Row 1 (middle row):
// → if (row === 1) return col === 0 ? 3 : 4
// → col 0 → 3
// → col 2 → 4
// → col 1 skipped (center cell)

// Row 2 (bottom row):
// → if (row === 2) return col + 5
// → col 0 → 5, col 1 → 6, col 2 → 7
// → Offset by 5

// Examples:
// → cellIdToIndex("0-1") → 1
// → cellIdToIndex("1-0") → 3
// → cellIdToIndex("2-2") → 7

// ============================================
// handleCellClick FUNCTION
// ============================================

// Purpose: Activate cell when clicked and track order

// Accepts: cellId (string like "0-2")

// GUARD 1: Check if animation running
// → if (isDeactivating) return
// → Prevents interference with deactivation sequence
// → Early return stops execution

// GUARD 2: Check if cell already active
// → if (activeCells[cellId]) return
// → Prevents double-clicking same cell
// → Maintains exactly 8 activations max

// STEP 1: Activate the cell
// → setActiveCells((prev) => ({ ...prev, [cellId]: true }))
// → Functional update with previous state
// → Spread operator maintains other cells' states
// → Computed property [cellId] sets dynamic key
// → Example: { "0-0": true, [cellId]: true } → { "0-0": true, "0-1": true }

// STEP 2: Add to activation order
// → setActivationOrder((prev) => [...prev, cellId])
// → Spread previous array, append new cellId
// → Maintains chronological sequence
// → Example: ["0-0", "1-0"] → ["0-0", "1-0", "0-1"]

// ============================================
// renderCell FUNCTION
// ============================================

// Purpose: Render individual cell with number

// Accepts: cellId (string)

// STEP 1: Get active state
// → const isActive = activeCells[cellId] || false
// → Looks up cellId in activeCells object
// → Default to false if undefined (not yet activated)

// STEP 2: Get display number
// → const cellIndex = cellIdToIndex(cellId)
// → Converts cellId to user-friendly number (0-7)

// STEP 3: Return cell div
// → key={cellId} for React list rendering
//   - Base: 'cell'
//   - Conditional: 'active' added when isActive is true
//   - CSS handles green background for .cell.active
// → onClick={() => handleCellClick(cellId)}
//   - Arrow function passes cellId to handler
// → Display: {cellIndex}
//   - Shows 0-7 number inside cell

// ============================================
// renderGrid FUNCTION
// ============================================

// Purpose: Build complete 3x3 grid layout

// STEP 1: Initialize empty array
// → const grid = []
// → Will hold all cell elements

// STEP 2: Nested loops for 3x3 grid
// → for (let row = 0; row < 3; row++)
//   → Outer loop: rows 0, 1, 2
// → for (let col = 0; col < 3; col++)
//   → Inner loop: columns 0, 1, 2

// STEP 3: Generate cellId for position
// → Template literal creates string
// → Example: row=1, col=2 → "1-2"

// STEP 4: Handle center cell (special case)
// → if (row === 1 && col === 1)
//   → Center position check
// → grid.push(<div key={cellId} className='cell-empty' />)
//   → Empty placeholder div
//   - Maintains grid structure
//   - Same size as regular cells
//   - Not clickable

// STEP 5: Handle regular cells
// → else block
// → grid.push(renderCell(cellId))
//   → Calls renderCell to create clickable cell
//   → Adds to grid array

// STEP 6: Return grid array
// → return grid
// → React renders all elements in order

// Result: 9 elements total (8 cells + 1 empty)

// ============================================
// useEffect: DEACTIVATION TRIGGER
// ============================================

// Dependency array: [activeCells, activationOrder, isDeactivating]
// → Runs when any of these change

// STEP 1: Count active cells
// → const activeCount = Object.keys(activeCells).filter((key) => activeCells[key]).length

// Breaking down:
// → Object.keys(activeCells) → array of all cellId keys
// → .filter((key) => activeCells[key]) → keep only true values
// → .length → count of active cells

// Example:
// → activeCells = { "0-0": true, "0-1": true, "1-0": false }
// → Object.keys → ["0-0", "0-1", "1-0"]
// → filter → ["0-0", "0-1"]
// → length → 2

// STEP 2: Check trigger condition
// → if (activeCount === 8 && !isDeactivating)
// → All 8 cells active AND not already deactivating

// STEP 3: Set deactivating flag
// → setIsDeactivating(true)
// → Blocks new clicks during animation

// STEP 4: Initial delay (200ms)
// → setTimeout(() => { ... }, 200)
// → Brief pause to show last cell turn green
// → Prevents jarring instant reversal

// STEP 5: Create reverse order
// → const reverseOrder = [...activationOrder].reverse()
// → Spread creates copy (avoid mutation)
// → reverse() flips array
// → Example: [1st, 2nd, 3rd] → [3rd, 2nd, 1st]

// STEP 6: Iterate with staggered timing
// → reverseOrder.forEach((cellId, index) => { ... })
// → Loop through each cellId in reverse
// → index used for timing calculation

// STEP 7: Schedule individual deactivations
// → setTimeout(() => { ... }, index * 1800)
// → Each cell gets own timeout
// → Timing: 0ms, 1800ms, 3600ms, 5400ms, etc.
// → Creates staggered animation effect

// Inside each timeout:

// Sub-step A: Deactivate cell
// → setActiveCells((prev) => ({ ...prev, [cellId]: false }))
// → Functional update
// → Sets specific cell to false
// → Spread maintains other cells

// Sub-step B: Remove from order array
// → setActivationOrder((prev) => prev.filter((id) => id !== cellId))
// → filter creates new array without deactivated cellId
// → Maintains remaining order
// → Creates "pop" effect in order display

// STEP 8: Cleanup after last cell
// → if (index === reverseOrder.length - 1)
// → Check if this is the last cell
// → setTimeout(() => { reset logic }, 100)
//   - Brief delay ensures visual update completes
//   - setActivationOrder([]) → empty array
//   - setIsDeactivating(false) → allow clicks again

// ============================================
// JSX STRUCTURE
// ============================================

// Main wrapper: div with className 'light-grid-container'

// SECTION 1: Title
// → <h2>Light Grid Game</h2>

// SECTION 2: Instructions
// → Paragraph explaining game rules
// → Text: "Click cells to turn them green..."

// SECTION 3: Grid display
// → div with className 'grid'
// → Contains: {renderGrid()}
// → Renders all 9 elements (8 cells + 1 empty)

// SECTION 4: Status message (conditional)
// → {isDeactivating && <p className='status'>...</p>}
// → Only shows during deactivation
// → Text: "Deactivating in reverse order..."

// SECTION 5: Order display
// → div with className 'order-display'
// → Shows current activation sequence

// Order array display:
// → activationOrder.map((cellId) => cellIdToIndex(cellId)).join(', ')
// → Converts cellIds to numbers
// → Joins with commas
// → Example: "0, 3, 6, 7"

// Empty state hint:
// → {activationOrder.length === 0 && !isDeactivating && <span>...</span>}
// → Only shows when no cells clicked and not animating
// → Text: "(click cells to build order)"

// ============================================
// KEY CONCEPTS
// ============================================

// Why object for activeCells? → Fast lookup by cellId, O(1) access
// Why array for activationOrder? → Maintain sequence, easy to reverse
// Why string cellId format? → Unique, easy to generate, split for parsing
// Why computed property [cellId]? → Dynamic object keys
// Why spread operator? → Immutability, React change detection
// Why functional updates? → Avoid stale closures with async operations
// Why filter for removal? → Immutable array modification
// Why forEach with index? → Staggered timing calculation
// Why reverse copy? → Preserve original order for display
// Object.keys → Get array of object keys
// .split('-').map(Number) → Parse string to numbers
// Template literal className → Combine static and dynamic classes
// Guard clauses → Early returns for cleaner code
`,
  },
  {
    title: '33_fetchApiCountriesList',
    code: `// Step 1: Inside App.jsx component, I simply mention the CountriesPage.jsx component
// Step 2: Inside CountriesPage Component,
// useState Declaration:
// i) countries,
// ii) filter

// Step 3: return jsx part, which has input type='text', onChange = {handleFilterChange}
const handleFilterChange = (e) => {
  setFilter(e.target.value);
};

// CORE Logic is to perform .map operation on filteredCountries
// Ex:
{
  filteredCountries.map((country, index) => (
    <Country
      key={index}
      name={country.name.common}
      capital={country.capital?.[0]}
    />
  ));
}

// You can get this filteredCountries with the help of countriesVar.filter logic
// Ex;
const filteredCountries = countries.filter((country) =>
  country.capital?.[0].toLowerCase().includes(filter.toLowerCase())
);

// We have an empty dependency array --> useEffect to fetch the api call and setCountries(data)

// ----- Basic Component //

function Country({ name, capital }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{capital}</p>
    </div>
  );
}
`,
  },
  {
    title: '34_transfer_list',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <TransferList /> component
// TransferList.jsx → main component managing two lists
// ListComponent.jsx → reusable list display component
// data.js → initial data array

// ============================================
// DATA STRUCTURE
// ============================================

// Initial data format:
// → Array of objects with 3 properties
// → { id: number, name: string, checked: boolean }

// Example:
// [
//   { id: 1, name: 'Apple', checked: false },
//   { id: 2, name: 'Strawberry', checked: false }
// ]

// Why checked property?
// → Track checkbox state for each item
// → Determines which items to transfer
// → Boolean: true = selected, false = not selected

// ============================================
// TRANSFERLIST.JSX - STATE MANAGEMENT
// ============================================

// State 1: listA → useState(data)
// → Left list, starts with all initial data
// → Array of item objects

// State 2: listB → useState([])
// → Right list, starts empty
// → Items transferred from listA appear here

// Visual representation:
// List A (Source)    →→    List B (Destination)
// [All items]              [Empty initially]

// ============================================
// HANDLECHANGE FUNCTION
// ============================================

// Purpose: Toggle checkbox state for individual item

// Accepts: (id, listName)
// → id: unique identifier of item to toggle
// → listName: which list ('A' or 'B')

// STEP 1: Determine which setState to use
// → const setList = listName === 'A' ? setListA : setListB
// → Ternary picks correct setter based on listName
// → Dynamic function selection

// STEP 2: Update the list with functional update
// → setList((prevList) => prevList.map(...))

// Map logic:
// → prevList.map((item) => ...)
// → Check each item

// Conditional update:
// → item.id === id ? { ...item, checked: !item.checked } : item

// Breaking down:
// → If item.id matches parameter id:
//   - Spread item properties: { ...item }
//   - Toggle checked: checked: !item.checked
//   - Return new object with flipped checked value
// → If no match:
//   - Return item unchanged

// Example:
// → List: [{ id: 1, name: 'Apple', checked: false }, { id: 2, name: 'Strawberry', checked: false }]
// → handleChange(1, 'A')
// → Result: [{ id: 1, name: 'Apple', checked: true }, { id: 2, name: 'Strawberry', checked: false }]

// ============================================
// TRANSFER FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Move checked items from source to destination list

// Accepts: (sourceList, setSource, setDestination)
// → sourceList: array of items to transfer from
// → setSource: setState function for source list
// → setDestination: setState function for destination list

// Why pass setState functions?
// → Makes function reusable for both directions
// → A→B uses (listA, setListA, setListB)
// → B→A uses (listB, setListB, setListA)

// STEP 1: Filter and prepare items to transfer
// → const toTransfer = sourceList.filter(...).map(...)

// Filter logic:
// → sourceList.filter((item) => item.checked)
// → Keep only items where checked is true
// → These are the selected items

// Map logic:
// → .map((mappedItem) => ({ ...mappedItem, checked: false }))
// → Create new object for each selected item
// → Spread all properties: { ...mappedItem }
// → Reset checked to false: checked: false
// → Why reset? Items shouldn't be pre-selected in destination

// Example:
// → sourceList: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 2, name: 'Strawberry', checked: false },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → After filter: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → After map (toTransfer): [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// STEP 2: Add items to destination list
// → setDestination((dest) => dest.concat(toTransfer))
// → Functional update with previous destination
// → concat creates new array with existing + new items
// → Returns: [...existingItems, ...newItems]

// Example:
// → dest before: [{ id: 4, name: 'Blueberry', checked: false }]
// → toTransfer: [{ id: 1, name: 'Apple', checked: false }]
// → dest after: [{ id: 4, name: 'Blueberry', checked: false }, { id: 1, name: 'Apple', checked: false }]

// STEP 3: Remove transferred items from source
// → setSource((source) => source.filter((item) => !item.checked))
// → Functional update with previous source
// → Filter keeps only items where checked is false
// → Removes all checked items

// Example:
// → source before: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 2, name: 'Strawberry', checked: false }
//   ]
// → After filter: [{ id: 2, name: 'Strawberry', checked: false }]
// → Checked items removed

// ============================================
// JSX STRUCTURE (TRANSFERLIST.JSX)
// ============================================

// Main wrapper: div with className 'transfer-list'

// SECTION 1: List A (left side)
// → <ListComponent
//     listData={listA}
//     listType='A'
//     handleChange={handleChange}
//   />

// SECTION 2: Transfer controls (center buttons)
// → div with className 'transfer-controls'

// Button 1 - Transfer A to B (right arrow):
// → onClick={() => transfer(listA, setListA, setListB)}
// → Passes List A as source, List B as destination
// → Symbol: &gt; (HTML entity for >)

// Button 2 - Transfer B to A (left arrow):
// → onClick={() => transfer(listB, setListB, setListA)}
// → Passes List B as source, List A as destination
// → Symbol: &lt; (HTML entity for <)

// SECTION 3: List B (right side)
// → <ListComponent
//     listData={listB}
//     listType='B'
//     handleChange={handleChange}
//   />

// ============================================
// LISTCOMPONENT.JSX - REUSABLE LIST
// ============================================

// Purpose: Display list with checkboxes

// Props: { listData, listType, handleChange }
// → listData: array of items to display
// → listType: 'A' or 'B' for identification
// → handleChange: callback for checkbox changes

// JSX Structure:

// Wrapper: div with className 'list-box'

// Header:
// → Template literal: "List A" or "List B"

// List container:
// → <ul> element

// Map over items:
// → {listData.map((item) => ...)}

// For each item:

// List item:
// → <li key={item.id}>
// → Unique key for React

// Label wrapper:
// → <label> wraps checkbox and text
// → Clicking text toggles checkbox

// Checkbox input:
// → type='checkbox'
// → onChange={() => handleChange(item.id, listType)}
//   - Calls parent handler with item id and list type
// → checked={item.checked}
//   - Controlled input, reflects state

// Item name:
// → {item.name}
// → Displays after checkbox

// ============================================
// TRANSFER LIST FLOW
// ============================================

// Initial state:
// → listA = [6 items with checked: false]
// → listB = []
// → Both lists rendered
// → All items in List A
// → List B empty

// User checks "Apple" in List A:
// → Checkbox onChange fires
// → handleChange(1, 'A') called
// → setList is setListA (listName === 'A')
// → Map finds item with id: 1
// → Updates: { id: 1, name: 'Apple', checked: true }
// → List A re-renders
// → "Apple" checkbox now checked

// User checks "Pineapple" in List A:
// → handleChange(3, 'A') called
// → Map finds item with id: 3
// → Updates: { id: 3, name: 'Pineapple', checked: true }
// → List A re-renders
// → Both "Apple" and "Pineapple" checked

// User clicks right arrow button (→):
// → onClick triggers
// → transfer(listA, setListA, setListB) called

// Transfer execution:

// Step 1 - Filter and map:
// → sourceList (listA) filters checked items
// → Found: [
//     { id: 1, name: 'Apple', checked: true },
//     { id: 3, name: 'Pineapple', checked: true }
//   ]
// → Map resets checked to false:
// → toTransfer = [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// Step 2 - Add to destination:
// → setListB called with concat
// → listB was [] (empty)
// → Now: [
//     { id: 1, name: 'Apple', checked: false },
//     { id: 3, name: 'Pineapple', checked: false }
//   ]

// Step 3 - Remove from source:
// → setListA called with filter
// → Removes items where checked is true
// → listA now: [
//     { id: 2, name: 'Strawberry', checked: false },
//     { id: 4, name: 'Blueberry', checked: false },
//     { id: 5, name: 'Mango', checked: false },
//     { id: 6, name: 'Chocolate', checked: false }
//   ]

// After transfer:
// → List A shows 4 items (remaining)
// → List B shows 2 items (transferred)
// → No items are checked

// User checks "Apple" in List B:
// → handleChange(1, 'B') called
// → setList is setListB (listName === 'B')
// → "Apple" checkbox checked in List B

// User clicks left arrow button (←):
// → transfer(listB, setListB, setListA) called
// → "Apple" transferred back to List A
// → Removed from List B

// Final state after moving back:
// → List A has 5 items (4 original + Apple returned)
// → List B has 1 item (Pineapple remaining)

// ============================================
// BIDIRECTIONAL TRANSFER
// ============================================

// Transfer A → B:
// → Button: onClick={() => transfer(listA, setListA, setListB)}
// → sourceList = listA (current items in left list)
// → setSource = setListA (update left list)
// → setDestination = setListB (update right list)
// → Effect: Checked items move from left to right

// Transfer B → A:
// → Button: onClick={() => transfer(listB, setListB, setListA)}
// → sourceList = listB (current items in right list)
// → setSource = setListB (update right list)
// → setDestination = setListA (update left list)
// → Effect: Checked items move from right to left

// Why same function works both ways?
// → Parameters are generic (source/destination)
// → No hardcoded list references
// → Function logic doesn't depend on direction
// → Completely reusable

// ============================================
// STATE UPDATE PATTERNS
// ============================================

// Immutability maintained:
// → map creates new array
// → { ...item } creates new object
// → concat creates new array
// → filter creates new array
// → Never mutate state directly

// Functional updates used:
// → setList((prevList) => ...)
// → setDestination((dest) => ...)
// → setSource((source) => ...)
// → Ensures latest state access
// → Critical with multiple state updates

// Controlled inputs:
// → checked={item.checked}
// → State controls checkbox
// → onChange syncs user action to state
// → React single source of truth

// ============================================
// CSS STRUCTURE (EXPECTED)
// ============================================

// .App:
// → Main app container
// → Centering, padding

// .transfer-list:
// → display: flex
// → justify-content: center
// → align-items: flex-start
// → gap: 20px (spacing between sections)
// → Creates horizontal layout

// .list-box:
// → border: 1px solid #ccc
// → padding: 20px
// → min-width: 200px
// → min-height: 300px
// → background: white

// .list-box h3:
// → margin-top: 0
// → text-align: center

// .list-box ul:
// → list-style: none
// → padding: 0

// .list-box li:
// → margin: 10px 0
// → padding: 5px

// .list-box label:
// → display: flex
// → align-items: center
// → cursor: pointer

// .list-box input[type='checkbox']:
// → margin-right: 10px
// → cursor: pointer

// .transfer-controls:
// → display: flex
// → flex-direction: column
// → gap: 10px
// → justify-content: center
// → Vertical button stack

// .transfer-controls button:
// → padding: 10px 20px
// → font-size: 20px
// → cursor: pointer
// → border: 1px solid #333
// → background: #f0f0f0
// → border-radius: 4px

// .transfer-controls button:hover:
// → background: #e0e0e0

// ============================================
// EDGE CASES HANDLED
// ============================================

// No items checked:
// → filter returns empty array
// → concat with empty array does nothing
// → Source filter removes nothing
// → No visual change (expected behavior)

// All items checked:
// → All items transferred
// → Source becomes empty
// → Destination receives all
// → Empty list shows header only

// Check and uncheck:
// → handleChange toggles back to false
// → Item not included in transfer
// → Works as expected

// Multiple transfers:
// → Items can move back and forth
// → State updates correctly each time
// → No data loss

// Empty list operations:
// → Transfer from empty list does nothing
// → Filter/map on empty array returns empty array
// → No errors

// ============================================
// REUSABILITY BENEFITS
// ============================================

// ListComponent reused:
// → Same component for both lists
// → Props customize behavior
// → DRY principle (Don't Repeat Yourself)

// Transfer function generic:
// → Works for any direction
// → No duplicate logic
// → Easy to maintain

// Scalability:
// → Easy to add List C, D, etc.
// → Just add new state and buttons
// → Transfer function handles any source/destination

// ============================================
// KEY CONCEPTS
// ============================================

// Why filter + map? → Select items, transform properties
// Why concat? → Immutably combine arrays
// Why functional updates? → Access latest state in async operations
// Why spread operator? → Create new objects/arrays, maintain immutability
// Why controlled inputs? → React state as single source of truth
// Why pass setState? → Makes function reusable, direction-agnostic
// Why reset checked? → Clean state in destination, prevent confusion
// Why listType prop? → Identify which list triggered change
// .filter() → Create new array with matching elements
// .map() → Transform each element, create new array
// .concat() → Combine arrays without mutation
// Ternary operator → Inline conditional (condition ? ifTrue : ifFalse)
// HTML entities → &gt; (>), &lt; (<) for special characters
// Controlled component → Value controlled by React state`,
  },
  {
    title: '35_filter_on_multiSelectDropdown',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → main component with data and filter logic
// MultiSelectDropdown.jsx → reusable dropdown component

// ============================================
// DATA STRUCTURE
// ============================================

// Sample data format:
// → Array of objects with properties: id, category, name
// → { id: number, category: string, name: string }

// Example:
// [
//   { id: 1, category: 'electronics', name: 'Laptop' },
//   { id: 2, category: 'books', name: 'Novel' },
//   { id: 3, category: 'electronics', name: 'Smartphone' }
// ]

// Options format for dropdown:
// → Array of objects with value and label
// → { value: string, label: string }

// Example:
// [
//   { value: 'electronics', label: 'Electronics' },
//   { value: 'books', label: 'Books' }
// ]

// Why separate value and label?
// → value: internal identifier (matches data.category)
// → label: user-friendly display text

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// Hardcoded data:
// → const data = [array of items]
// → Could be from API or props
// → Source of truth for all items

// State 1: filters → useState([])
// → Array of selected filter values
// → Example: ['electronics', 'books']
// → Empty array means no filters (show all)

// State 2: filteredData → useState(data)
// → Array of items after applying filters
// → Initially shows all data
// → Updates based on filters state

// Options array:
// → const options = [dropdown choices]
// → Defines available filter categories
// → Maps to data.category values

// ============================================
// useEffect: FILTER DATA LOGIC
// ============================================

// Dependency: [filters]
// → Runs whenever filters array changes

// STEP 1: Check if no filters selected
// → if (filters.length === 0)
// → Empty array means show everything

// If no filters:
// → setFilteredData(data)
// → Display all original data
// → Reset to initial state

// STEP 2: Apply filters (else block)
// → Filter data based on selected categories

// Filter logic:
// → setFilteredData(data.filter((item) => filters.includes(item.category)))

// Breaking down:
// → data.filter((item) => ...)
// → Check each item

// Condition:
// → filters.includes(item.category)
// → Check if item's category is in selected filters
// → Returns true if match, false otherwise

// Example:
// → filters = ['electronics', 'books']
// → data = [
//     { id: 1, category: 'electronics', name: 'Laptop' },
//     { id: 2, category: 'books', name: 'Novel' },
//     { id: 3, category: 'clothing', name: 'Shirt' }
//   ]
// → Result: [
//     { id: 1, category: 'electronics', name: 'Laptop' },
//     { id: 2, category: 'books', name: 'Novel' }
//   ]
// → 'Shirt' excluded (clothing not in filters)

// Why useEffect?
// → Reactive updates when filters change
// → Separation of concerns (filtering logic isolated)
// → Automatic synchronization

// ============================================
// HANDLEFILTERCHANGE FUNCTION
// ============================================

// Purpose: Update filters when dropdown changes

// Accepts: selectedFilters (array of strings)
// → Example: ['electronics', 'books']

// Logic:
// → setFilters(selectedFilters)
// → Updates filters state
// → Triggers useEffect
// → Data gets filtered

// Why separate handler?
// → Clean callback for child component
// → Could add validation or logging here
// → Abstraction layer

// ============================================
// APP.JSX - JSX STRUCTURE
// ============================================

// Main wrapper: div with className 'App'

// SECTION 1: Dropdown component
// → <MultiSelectDropdown
//     options={options}
//     onChange={handleFilterChange}
//   />
// → Props:
//   - options: array of filter choices
//   - onChange: callback function

// SECTION 2: Filtered results list
// → <ul> element

// Map over filteredData:
// → {filteredData.map((item) => ...)}

// For each item:
// → <li key={item.id}>{item.name}</li>
// → key for React list rendering
// → Display item name

// ============================================
// MULTISELECTDROPDOWN.JSX - STATE
// ============================================

// State: selectedOptions → useState([])
// → Array of currently selected values
// → Example: ['electronics', 'books']
// → Empty initially (nothing selected)

// Props: { options, onChange }
// → options: array of available choices
// → onChange: callback to notify parent

// ============================================
// HANDLECHANGE FUNCTION (DROPDOWN)
// ============================================

// Purpose: Handle multi-select changes

// Accepts: event (change event object)

// STEP 1: Extract selected values from event
// → const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value)

// Breaking down Array.from:
// → First argument: event.target.selectedOptions
//   - HTMLCollection of selected <option> elements
//   - Not a real array (array-like object)
// → Second argument: mapping function
//   - (option) => option.value
//   - Extracts value from each option element

// Example:
// → User selects "Electronics" and "Books"
// → event.target.selectedOptions = [
//     <option value="electronics">Electronics</option>,
//     <option value="books">Books</option>
//   ]
// → Array.from transforms to: ['electronics', 'books']

// Why Array.from?
// → Converts array-like object to real array
// → Allows mapping in single operation
// → Clean, functional approach

// STEP 2: Update local state
// → setSelectedOptions(selectedValues)
// → Maintains controlled input

// STEP 3: Notify parent
// → onChange(selectedValues)
// → Calls parent's handleFilterChange
// → Parent updates filters state
// → Triggers filtering in parent

// ============================================
// MULTISELECTDROPDOWN.JSX - JSX
// ============================================

// Select element:
// → <select multiple ... />
// → multiple attribute enables multi-select
// → Allows selecting multiple options with Ctrl/Cmd+Click

// Select attributes:

// multiple:
// → HTML attribute for multi-selection
// → Browser shows scrollable list
// → Different from single-select dropdown

// value={selectedOptions}:
// → Controlled input
// → Array of selected values
// → React syncs with state

// onChange={handleChange}:
// → Triggers on selection change
// → Updates state and notifies parent

// className='custom-multi-select':
// → For custom CSS styling

// Map options:
// → {options.map((option) => ...)}

// For each option:
// → <option key={option.value} value={option.value}>
//     {option.label}
//   </option>
// → key: unique identifier
// → value: internal value (used in filtering)
// → Display: label (user-friendly text)

// ============================================
// CONTROLLED VS UNCONTROLLED
// ============================================

// Controlled select element:
// → value={selectedOptions}
// → State controls which options selected
// → onChange updates state
// → React single source of truth

// Why controlled?
// → Parent can programmatically set selection
// → Easy to reset/clear
// → Predictable behavior
// → State always in sync with UI

// ============================================
// PARENT-CHILD COMMUNICATION
// ============================================

// Data flow: Parent → Child (props)
// → options prop: available choices
// → onChange prop: callback function

// Data flow: Child → Parent (callback)
// → onChange(selectedValues) called
// → Parent receives array of selections
// → Parent updates its state
// → Triggers filtering

// Unidirectional data flow:
// → Parent owns filter state
// → Child reports selections
// → Parent processes and filters
// → Clear responsibility separation


// ============================================
// KEY CONCEPTS
// ============================================

// Why Array.from? → Convert HTMLCollection to array with mapping
// Why multiple attribute? → Enable multi-selection in select element
// Why controlled select? → State as single source of truth
// Why onChange callback? → Parent-child communication pattern
// Why filters array? → Track multiple selected categories
// Why includes()? → Check if item's category matches any filter
// Array.from(arrayLike, mapFn) → Convert + map in one operation
// event.target.selectedOptions → HTMLCollection of selected <option> elements
// Controlled input → value prop synced with state
// Callback pattern → Child notifies parent via function prop`,
  },
  {
    title: '36_checkboxes_selectAll',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <CheckboxList /> component
// CheckboxList.jsx → contains all checkbox logic

// ============================================
// DATA STRUCTURE
// ============================================

// Checkbox object format:
// → { id: number, checked: boolean, color: string }

// Example:
// { id: 1, checked: false, color: 'blue' }

// Why this structure?
// → id: unique identifier for each checkbox
// → checked: current state (selected/unselected)
// → color: display label (could be any property)

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: checkboxes → useState([...])
// → Array of checkbox objects
// → Initial state: all unchecked (checked: false)
// → Example:
//   [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: false, color: 'yellow' },
//     { id: 3, checked: false, color: 'red' }
//   ]

// State 2: parentChecked → useState(false)
// → Boolean tracking parent/master checkbox state
// → true: all children selected (or parent checked)
// → false: not all children selected
// → Acts as "Select All" switch

// ============================================
// handleParentChange FUNCTION
// ============================================

// Purpose: Handle "Select All" checkbox click

// Accepts: e (event object)

// STEP 1: Get checkbox state
// → const checked = e.target.checked
// → Boolean: true if checked, false if unchecked
// → User's action on parent checkbox

// STEP 2: Update parent state
// → setParentChecked(checked)
// → Syncs parent checkbox state

// STEP 3: Update all children to match parent
// → setCheckboxes(checkboxes.map((checkbox) => ({ ...checkbox, checked })))

// Breaking down the map:
// → checkboxes.map((checkbox) => ...)
// → Iterate over each checkbox

// For each checkbox:
// → { ...checkbox, checked }
// → Spread all properties: { ...checkbox }
// → Override checked property with parent's state
// → All checkboxes get same checked value

// Example:
// → Parent checked to true
// → All checkboxes become: { id: X, checked: true, color: 'X' }

// → Parent unchecked to false
// → All checkboxes become: { id: X, checked: false, color: 'X' }

// Effect:
// → Click parent ON → all children turn ON
// → Click parent OFF → all children turn OFF
// → Master control behavior

// ============================================
// handleChildChange FUNCTION
// ============================================

// Purpose: Handle individual child checkbox click

// Curried function pattern:
// → (id) => (e) => { ... }
// → First call accepts id
// → Returns function that accepts event
// → Allows passing checkbox id to handler

// Why curried?
// → onChange needs function reference
// → Need to know which checkbox was clicked
// → Currying provides closure over id

// Accepts: id (checkbox identifier)
// Returns: event handler function

// Inner function accepts: e (event object)

// STEP 1: Update specific checkbox
// → const updatedCheckboxes = checkboxes.map((checkbox) => ...)

// Map logic:
// → Check each checkbox: checkbox.id === id
// → If match: { ...checkbox, checked: e.target.checked }
//   - Spread existing properties
//   - Update checked to new value
// → If no match: checkbox
//   - Return unchanged

// Example:
// → Click checkbox id: 2
// → Original: [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: false, color: 'yellow' },
//     { id: 3, checked: false, color: 'red' }
//   ]
// → Result: [
//     { id: 1, checked: false, color: 'blue' },
//     { id: 2, checked: true, color: 'yellow' },  ← only this changed
//     { id: 3, checked: false, color: 'red' }
//   ]

// STEP 2: Update checkboxes state
// → setCheckboxes(updatedCheckboxes)
// → Saves modified array

// STEP 3: Check if all children are now checked
// → setParentChecked(updatedCheckboxes.every((checkbox) => checkbox.checked))

// .every() method:
// → Tests if ALL elements pass condition
// → Returns true only if every checkbox.checked is true
// → Returns false if any checkbox.checked is false

// Example 1 - All checked:
// → updatedCheckboxes = [
//     { id: 1, checked: true, ... },
//     { id: 2, checked: true, ... },
//     { id: 3, checked: true, ... }
//   ]
// → .every((checkbox) => checkbox.checked) → true
// → setParentChecked(true) → parent checkbox automatically checked

// Example 2 - Some unchecked:
// → updatedCheckboxes = [
//     { id: 1, checked: true, ... },
//     { id: 2, checked: false, ... },  ← this one false
//     { id: 3, checked: true, ... }
//   ]
// → .every((checkbox) => checkbox.checked) → false
// → setParentChecked(false) → parent checkbox automatically unchecked

// Effect:
// → When last child checked → parent auto-checks
// → When any child unchecked → parent auto-unchecks
// → Maintains sync between parent and children

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'container'

// SECTION 1: Parent checkbox
// → label with className 'checkbox parent-checkbox'

// Parent input:
// → type='checkbox'
// → checked={parentChecked}
//   - Controlled input
//   - State determines if checked
// → onChange={handleParentChange}
//   - Triggers when clicked

// Checkmark span:
// → <span className='checkmark'></span>
//   - Custom styled checkbox visual
//   - CSS creates custom appearance

// Label text:
// → "Select All"
//   - User-friendly text

// SECTION 2: Child checkboxes
// → div with className 'checkbox-group'
//   - Groups all child checkboxes

// Map over checkboxes:
// → {checkboxes.map((checkbox) => ...)}

// For each checkbox:

// Label wrapper:
// → label with className 'checkbox'
// → key={checkbox.id}
//   - Required for React list rendering

// Child input:
// → type='checkbox'
// → checked={checkbox.checked}
//   - Controlled input
//   - Individual state from array
// → onChange={handleChildChange(checkbox.id)}
//   - Curried function
//   - First call passes id
//   - Returns event handler

// Checkmark span:
// → <span className='checkmark'></span>
//   - Custom styled visual

// Label text:
// → {checkbox.color}
//   - Displays color name
//   - Could be any property


// ============================================
// KEY CONCEPTS
// ============================================

// Why curried function? → Pass id to handler while maintaining function reference
// Why .every()? → Check if all children match condition
// Why spread operator? → Create new objects/arrays, immutability
// Why controlled inputs? → React state as single source of truth
// Why map for updates? → Transform array immutably
// Why parent state separate? → Track "Select All" independently
// Currying → (arg1) => (arg2) => result, creates closure
// .every(predicate) → Returns true only if all elements pass test
// Controlled component → value/checked prop synced with state
// Immutable update → map/spread create new references
// Closure → Inner function accesses outer function's variables
// Event handler → Function called when event occurs`,
  },
  {
    title: '37_password_generator',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → contains all password generator logic
// No separate components needed for this implementation

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: passwordLength → useState(7)
// → Controls how many characters in password
// → Default: 7 characters
// → Range: 1-20 (configurable via slider)

// State 2: includeUppercase → useState(false)
// → Boolean flag for uppercase letters (A-Z)
// → Default: false (not included initially)

// State 3: includeLowercase → useState(true)
// → Boolean flag for lowercase letters (a-z)
// → Default: true (included by default)

// State 4: includeNumbers → useState(false)
// → Boolean flag for numbers (0-9)
// → Default: false (not included initially)

// State 5: includeSymbols → useState(true)
// → Boolean flag for special characters (!@#$%...)
// → Default: true (included by default)

// State 6: password → useState('')
// → Stores generated password to display
// → Initially empty string
// → Updates when "Generate Password" clicked

// ============================================
// CHARACTER SETS (CONSTANTS)
// ============================================

// Inside generatePassword function:

// Uppercase characters:
// → const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// → 26 characters total
// → Capital letters only

// Lowercase characters:
// → const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
// → 26 characters total
// → Small letters only

// Number characters:
// → const numberChars = '0123456789'
// → 10 digits
// → All numeric characters

// Symbol characters:
// → const symbolChars = '!@#$%^&*_-'
// → 10 special characters
// → Common password symbols

// ============================================
// GENERATEPASSWORD FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Create random password based on user preferences

// STEP 1: Define character sets (as above)

// STEP 2: Build available characters pool
// → let chars = ''
// → Empty string to accumulate selected character sets

// Conditional concatenation:
// → if (includeUppercase) chars += uppercaseChars
// → if (includeLowercase) chars += lowercaseChars
// → if (includeNumbers) chars += numberChars
// → if (includeSymbols) chars += symbolChars

// How it works:
// → Each if statement checks checkbox state
// → If true, adds that character set to pool
// → += operator appends to existing string

// Example with all selected:
// → chars = ''
// → includeUppercase true → chars = 'ABCD...XYZ'
// → includeLowercase true → chars = 'ABCD...XYZabcd...xyz'
// → includeNumbers true → chars = 'ABCD...XYZabcd...xyz0123456789'
// → includeSymbols true → chars = 'ABCD...XYZabcd...xyz0123456789!@#$%^&*_-'
// → Total pool: 72 characters (26+26+10+10)

// Example with only lowercase and numbers:
// → chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
// → Total pool: 36 characters

// STEP 3: Initialize password variable
// → let finalGeneratedPassword = ''
// → Empty string to build password

// STEP 4: Loop to generate password
// → for (let i = 0; i < passwordLength; i++)
// → Runs passwordLength times
// → Example: passwordLength = 10 → loop runs 10 times

// Inside loop - pick random character:
// → finalGeneratedPassword += chars.charAt(Math.floor(Math.random() * chars.length))

// Breaking down random selection:

// Math.random():
// → Returns decimal between 0 and 0.999...
// → Example: 0.7234

// Math.random() * chars.length:
// → Multiplies by total available characters
// → Example: 0.7234 * 72 = 52.0848

// Math.floor(...):
// → Rounds down to integer
// → Example: Math.floor(52.0848) = 52

// chars.charAt(index):
// → Gets character at specific position
// → Example: chars.charAt(52) might return 'w'

// += operator:
// → Appends character to password
// → Builds password one character at a time

// Loop example with passwordLength = 3:
// → Loop 0: Random index 15 → picks 'P' → password = 'P'
// → Loop 1: Random index 48 → picks 'v' → password = 'Pv'
// → Loop 2: Random index 67 → picks '#' → password = 'Pv#'

// STEP 5: Update state with generated password
// → setPassword(finalGeneratedPassword)
// → Triggers re-render
// → Password appears in display

// ============================================
// JSX STRUCTURE
// ============================================

// Main container: div with className 'password-generator'

// SECTION 1: Slider for password length
// → div with className 'slider-container'

// Range input:
// → type='range'
//   - Creates slider UI element
// → min='1'
//   - Minimum password length: 1 character
// → max='20'
//   - Maximum password length: 20 characters
// → value={passwordLength}
//   - Controlled input, state determines position
// → onChange={(e) => setPasswordLength(Number(e.target.value))}
//   - Updates state on slider move
//   - Number() converts string to number
//   - e.target.value is string from input

// Current value display:
// → <span className='slider-value'>{passwordLength}</span>
// → Shows current length number
// → Updates as slider moves

// SECTION 2: Checkboxes for character types
// → div with className 'options-container'

// Four checkbox labels (similar pattern for each):

// Uppercase checkbox:
// → <label> wrapper
// → <input type='checkbox'
//     checked={includeUppercase}
//     onChange={(e) => setIncludeUppercase(e.target.checked)}
//   />
// → Controlled checkbox
// → e.target.checked is boolean (true/false)
// → Text: "Include Uppercase Letters"

// Lowercase checkbox:
// → checked={includeLowercase}
// → onChange={(e) => setIncludeLowercase(e.target.checked)}
// → Text: "Include Lowercase Letters"

// Numbers checkbox:
// → checked={includeNumbers}
// → onChange={(e) => setIncludeNumbers(e.target.checked)}
// → Text: "Include Numbers"

// Symbols checkbox:
// → checked={includeSymbols}
// → onChange={(e) => setIncludeSymbols(e.target.checked)}
// → Text: "Include Symbols"

// SECTION 3: Generate button
// → <button className='generate-btn' onClick={generatePassword}>
// → Triggers password generation
// → Text: "Generate Password"

// SECTION 4: Password display
// → <div className='password-display'>{password}</div>
// → Shows generated password
// → Empty initially
// → Updates after clicking generate button

// ============================================
// KEY CONCEPTS
// ============================================

// Why 6 state variables? → Each control needs independent state
// Why strings for char sets? → Easy concatenation and charAt access
// Why += for chars? → Build pool from selected character sets
// Why Math.random()? → Generate unpredictable characters
// Why Math.floor()? → Convert decimal to integer index
// Why for loop? → Repeat random selection for desired length
// Why Number() conversion? → Range input returns string value
// Why controlled inputs? → React state controls all form elements
// Why empty string initial? → No password until generate clicked
// Math.random() → Returns 0 ≤ n < 1
// charAt(index) → Get character at specific position in string
// += operator → Append to string (concatenation assignment)
// e.target.value → String value from input element
// e.target.checked → Boolean from checkbox element
// Controlled component → Form element controlled by React state`,
  },
  {
    title: '38_password_strength_checker',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <PasswordInput /> component
// PasswordInput.jsx → contains password strength evaluation logic

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: password → useState('')
// → Stores current password input value
// → Empty string initially
// → Updates with each keystroke

// State 2: strength → useState('')
// → Stores evaluated strength level
// → Values: 'Weak', 'Moderate', 'Strong', or '' (empty)
// → Initially empty (no password entered)
// → Updates automatically as password changes

// ============================================
// EVALUATESTRENGTH FUNCTION (CORE LOGIC)
// ============================================

// Purpose: Calculate password strength based on rules

// Accepts: password (string)
// Returns: 'Weak', 'Moderate', or 'Strong'

// STEP 1: Initialize score
// → let score = 0
// → Starting point for evaluation
// → Will be increased/decreased by rules

// STEP 2: Define scoring rules array
// → const rules = [array of rule objects]
// → Each rule has: regex pattern and score value

// Rules breakdown:

// RULE 1: Length > 8 characters
// → { regex: /.{9,}/, score: 2 }
// → /.{9,}/ matches 9 or more of any character
// → .{9,} means "any character, 9 or more times"
// → Reward: +2 points
// → Example: "password1" (9 chars) matches → +2

// RULE 2: Length > 12 characters
// → { regex: /.{13,}/, score: 2 }
// → /.{13,}/ matches 13 or more characters
// → Additional length bonus on top of Rule 1
// → Reward: +2 points (cumulative with Rule 1)
// → Example: "password12345" (13 chars) → +2 (total +4 from both length rules)

// RULE 3: Contains lowercase letters
// → { regex: /[a-z]/, score: 1 }
// → /[a-z]/ matches any lowercase letter a-z
// → Reward: +1 point
// → Example: "Password" has 'a','s','s','w','o','r','d' → +1

// RULE 4: Contains uppercase letters
// → { regex: /[A-Z]/, score: 1 }
// → /[A-Z]/ matches any uppercase letter A-Z
// → Reward: +1 point
// → Example: "Password" has 'P' → +1

// RULE 5: Contains digits
// → { regex: /[0-9]/, score: 1 }
// → /[0-9]/ matches any digit 0-9
// → Reward: +1 point
// → Example: "Pass123" has '1','2','3' → +1

// RULE 6: Contains special characters
// → { regex: /[^A-Za-z0-9]/, score: 1 }
// → /[^A-Za-z0-9]/ matches anything NOT letter or digit
// → ^ inside [] means "NOT" (negation)
    // → Reward: +1 point
    // → Example: "Pass@123" has '@' → +1

    // RULE 7: Penalize bad patterns (NEGATIVE SCORE)
    // → Complex regex with 3 patterns using | (OR operator)
    // → Penalty: -1 point

    // Breaking down Rule 7 patterns:

    // Pattern A: (\d{3,})
    // → \d{3,} means "3 or more digits in a row"
    // → Example: "123" in "pass123" → matches
    // → Example: "12" doesn't match (only 2 digits)
    // → Why penalize? Predictable number sequences

    // Pattern B: ([a-zA-Z]{3,})
    // → [a-zA-Z]{3,} means "3 or more letters in a row"
    // → Example: "abc" or "ABC" or "AbC"
    // → Example: "password" has many letters in row → matches
    // → Why penalize? Long letter sequences are common words

    // → (.) captures any single character
    // → {2,} means "2 or more additional times"
    // → Total: same character 3+ times in row
    // → Example: "aaa", "111", "!!!"
    // → Example: "Pass" has no triple → doesn't match
    // → Why penalize? Character repetition is weak

    // Examples of Rule 7 matches:
    // → "pass123word" → matches (\d{3,}) → "123"
    // → "password" → matches ([a-zA-Z]{3,}) → "password"

    // STEP 3: Iterate through rules and calculate score
    // → rules.forEach((rule) => { ... })
    // → Check each rule sequentially

    // For each rule:
    // → if (rule.regex.test(password))
    // → .test() method returns true if pattern matches
    // → If match: score += rule.score
    // → Adds positive or negative points

    // Example scoring process for "Pass@123":
    // → Start: score = 0
    // → Rule 1 (/.{9,}/): "Pass@123" is 8 chars → no match → score = 0
    // → Rule 2 (/.{13,}/): 8 chars < 13 → no match → score = 0
    // → Rule 3 (/[a-z]/): has 'a','s','s' → match → score = 1
    // → Rule 4 (/[A-Z]/): has 'P' → match → score = 2
    // → Rule 5 (/[0-9]/): has '1','2','3' → match → score = 3
    // → Rule 6 (/[^A-Za-z0-9]/): has '@' → match → score = 4
    // → Rule 7: "123" matches (\d{3,}) → penalty → score = 3
    // → Final score: 3

    // STEP 4: Convert score to strength label
    // → if (score <= 3) return 'Weak'
    // → if (score <= 5) return 'Moderate'
    // → return 'Strong'

    // Score ranges:
    // → 0-3 points: Weak
    // → 4-5 points: Moderate
    // → 6+ points: Strong

    // Maximum possible score: 8
    // → +2 (length > 8)
    // → +2 (length > 12)
    // → +1 (lowercase)
    // → +1 (uppercase)
    // → +1 (digits)
    // → +1 (special chars)
    // → -1 (bad patterns - assuming they exist)
    // → Total: 7 points (if all rules pass except bad patterns)

    // Without bad patterns: 8 points max
    // With bad patterns: 7 points max

    // ============================================
    // HANDLEINPUTCHANGE FUNCTION
    // ============================================

    // Purpose: Update password and evaluate strength on input

    // Accepts: e (event object)

    // STEP 1: Get new password value
    // → const newPassword = e.target.value
    // → Extracts current input value
    // → String from input element

    // STEP 2: Update password state
    // → setPassword(newPassword)
    // → Saves typed value
    // → Controlled input pattern

    // STEP 3: Evaluate and update strength
    // → setStrength(evaluateStrength(newPassword))
    // → Calls evaluateStrength with new password
    // → Receives 'Weak', 'Moderate', or 'Strong'
    // → Updates strength state
    // → Triggers re-render

    // Effect:
    // → Every keystroke triggers evaluation
    // → Real-time feedback
    // → Instant visual update

    // ============================================
    // JSX STRUCTURE
    // ============================================

    // Main wrapper: div (no specific className)

    // SECTION 1: Password input
    // → <input type='text' ... />

    // Input attributes:
    // → type='text'
    //   - Shows characters (not masked)
    //   - Could use type='password' to mask
    // → value={password}
    //   - Controlled input
    //   - State determines display
    // → onChange={handleInputChange}
    //   - Triggers on every keystroke
    // → placeholder='Enter password'
    //   - Hint text when empty

    // SECTION 2: Strength display

    // Dynamic className:
    // → Template literal combines classes
    // → Base: 'password-strength'
    // → Dynamic: strength.toLowerCase()
    //   - 'Weak' → 'weak'
    //   - 'Moderate' → 'moderate'
    //   - 'Strong' → 'strong'
    //   - '' (empty) → no additional class

    // Example classNames:
    // → Empty password: 'password-strength'
    // → Weak: 'password-strength weak'
    // → Moderate: 'password-strength moderate'
    // → Strong: 'password-strength strong'

    // Display content:
    // → {strength}
    // → Shows: 'Weak', 'Moderate', 'Strong', or nothing

    // ============================================
    // PASSWORD STRENGTH CHECKER FLOW
    // ============================================

    // Initial state:
    // → password = ''
    // → strength = ''
    // → Input empty
    // → Strength display empty

    // User types "a":
    // → onChange fires
    // → newPassword = 'a'
    // → setPassword('a')
    // → evaluateStrength('a') called:
    //   - score = 0
    //   - /.{9,}/ → no (only 1 char) → 0
    //   - /.{13,}/ → no → 0
    //   - /[a-z]/ → yes → 1
    //   - /[A-Z]/ → no → 1
    //   - /[0-9]/ → no → 1
    //   - /[^A-Za-z0-9]/ → no → 1
    //   - Bad patterns → "a" matches ([a-zA-Z]{3,})? No (only 1 letter) → 1
    //   - Final score: 1
    //   - Returns: 'Weak'
    // → setStrength('Weak')
    // → Display shows: "Weak"
    // → className: 'password-strength weak'

    // User continues typing "abc":
    // → newPassword = 'abc'
    // → evaluateStrength('abc'):
    //   - score = 0
    //   - Length rules: no → 0
    //   - /[a-z]/ → yes → 1
    //   - Others: no → 1
    //   - Bad patterns: "abc" matches ([a-zA-Z]{3,}) → penalty → 0
    //   - Final score: 0
    //   - Returns: 'Weak'
    // → Display: "Weak"

    // User types "Abc":
    // → evaluateStrength('Abc'):
    //   - /[a-z]/ → yes ('b','c') → 1
    //   - /[A-Z]/ → yes ('A') → 2
    //   - Bad patterns: "Abc" matches ([a-zA-Z]{3,}) → penalty → 1
    //   - Final score: 1
    //   - Returns: 'Weak'

    // User types "Abc123":
    // → evaluateStrength('Abc123'):
    //   - /[a-z]/ → yes → 1
    //   - /[A-Z]/ → yes → 2
    //   - /[0-9]/ → yes → 3
    //   - Bad patterns: matches both ([a-zA-Z]{3,}) and (\d{3,}) → -1 → 2
    //   - Final score: 2
    //   - Returns: 'Weak'

    // User types "Abc@123":
    // → evaluateStrength('Abc@123'):
    //   - /[a-z]/ → yes → 1
    //   - /[A-Z]/ → yes → 2
    //   - /[0-9]/ → yes → 3
    //   - /[^A-Za-z0-9]/ → yes ('@') → 4
    //   - Bad patterns: "123" matches (\d{3,}) → -1 → 3
    //   - Final score: 3
    //   - Returns: 'Weak' (score ≤ 3)

    // User types "Abc@12Xy":
    // → evaluateStrength('Abc@12Xy'):
    //   - Length > 8: no (8 chars exactly) → 0
    //   - /[a-z]/ → yes → 1
    //   - /[A-Z]/ → yes → 2
    //   - /[0-9]/ → yes → 3
    //   - /[^A-Za-z0-9]/ → yes → 4
    //   - Bad patterns: "Abc" matches but only 3 letters, "12" only 2 digits → no penalty → 4
    //   - Final score: 4
    //   - Returns: 'Moderate' (4 ≤ score ≤ 5)
    // → Display: "Moderate"
    // → className: 'password-strength moderate'

    // User types "Abc@12XyZq":
    // → evaluateStrength('Abc@12XyZq'):
    //   - /.{9,}/ → yes (10 chars) → 2
    //   - /[a-z]/ → yes → 3
    //   - /[A-Z]/ → yes → 4
    //   - /[0-9]/ → yes → 5
    //   - /[^A-Za-z0-9]/ → yes → 6
    //   - Bad patterns: no consecutive 3+ of same type → 6
    //   - Final score: 6
    //   - Returns: 'Strong' (score > 5)
    // → Display: "Strong"
    // → className: 'password-strength strong'

    // User types "Abc@12XyZq1234":
    // → evaluateStrength('Abc@12XyZq1234'):
    //   - /.{9,}/ → yes → 2
    //   - /.{13,}/ → yes (14 chars) → 4
    //   - /[a-z]/ → yes → 5
    //   - /[A-Z]/ → yes → 6
    //   - /[0-9]/ → yes → 7
    //   - /[^A-Za-z0-9]/ → yes → 8
    //   - Bad patterns: "1234" matches (\d{3,}) → -1 → 7
    //   - Final score: 7
    //   - Returns: 'Strong'
    // → Display: "Strong"

    // ============================================
    // REGEX PATTERNS EXPLAINED
    // ============================================

    // Length patterns:

    // /.{9,}/:
    // → . (dot) matches any character
    // → {9,} quantifier means "9 or more"
    // → Checks minimum 9 characters

    // /.{13,}/:
    // → Same as above but 13 or more
    // → Cumulative with first length check

    // Character class patterns:

    // /[a-z]/:
    // → Square brackets define character class
    // → a-z is range from 'a' to 'z'
    // → Matches any single lowercase letter

    // /[A-Z]/:
    // → A-Z range from 'A' to 'Z'
    // → Matches any single uppercase letter

    // /[0-9]/:
    // → 0-9 range from '0' to '9'
    // → Matches any single digit

    // /[^A-Za-z0-9]/:
    // → ^ inside [] means negation (NOT)
    // → A-Za-z0-9 are all alphanumeric
    // → [^...] matches anything NOT alphanumeric
    // → Effectively matches special characters

    // Complex penalty pattern:

    // → Three sub-patterns connected with | (OR)
    // → Matches if ANY sub-pattern matches

    // Sub-pattern 2: ([a-zA-Z]{3,})
    // → () capture group
    // → [a-zA-Z] any letter
    // → {3,} three or more
    // → Matches: "abc", "ABC", "Password"


    // ============================================
    // CSS STRUCTURE (EXPECTED)
    // ============================================

    // Container styling:
    // → Center input and display
    // → Padding, margins for spacing

    // Input styling:
    // → padding: 10px
    // → font-size: 16px
    // → border: 1px solid #ccc
    // → border-radius: 4px
    // → width: 300px
    // → margin-bottom: 10px

    // .password-strength (base class):
    // → padding: 10px
    // → border-radius: 4px
    // → text-align: center
    // → font-weight: bold
    // → transition: all 0.3s ease
    // → Default: no background, no text

    // .password-strength.weak:
    // → background-color: #ffcccc (light red)
    // → color: #cc0000 (dark red)
    // → border: 2px solid #ff0000

    // .password-strength.moderate:
    // → background-color: #ffffcc (light yellow)
    // → color: #cc9900 (dark yellow/orange)
    // → border: 2px solid #ffcc00

    // .password-strength.strong:
    // → background-color: #ccffcc (light green)
    // → color: #00cc00 (dark green)
    // → border: 2px solid #00ff00

    // Visual progression:
    // → Red → Yellow → Green
    // → Weak → Moderate → Strong
    // → Intuitive color coding

    // ============================================
    // .TEST() METHOD EXPLAINED
    // ============================================

    // Syntax:
    // → regex.test(string)

    // Returns:
    // → true if pattern matches
    // → false if no match

    // Examples:
    // → /[a-z]/.test('Hello') → true ('e', 'l', 'o')
    // → /[a-z]/.test('HELLO') → false (no lowercase)
    // → /[0-9]/.test('abc123') → true ('1', '2', '3')
    // → /[0-9]/.test('abc') → false (no digits)

    // Why .test()?
    // → Fast boolean check
    // → Don't need match details
    // → Perfect for validation
    // → More efficient than .match()

    // ============================================
    // BACKREFERENCE PATTERN EXPLAINED
    // ============================================

    // ============================================
    // REAL-TIME EVALUATION
    // ============================================

    // Every keystroke:
    // → onChange handler fires
    // → handleInputChange executes
    // → evaluateStrength runs
    // → Score calculated
    // → Strength label determined
    // → State updated
    // → Component re-renders
    // → Display updates

    // Performance:
    // → Regex operations are fast
    // → 7 regex tests per keystroke
    // → Negligible performance impact
    // → Smooth user experience

    // Why real-time?
    // → Immediate feedback
    // → Guides user to stronger passwords
    // → Better UX than submit-time validation
    // → Encourages good password practices

    // ============================================
    // CONTROLLED INPUT PATTERN
    // ============================================

    // Input characteristics:
    // → value={password}
    //   - State controls display
    // → onChange={handleInputChange}
    //   - User input updates state
    // → Two-way binding

    // Benefits:
    // → React manages input state
    // → Can programmatically set value
    // → Easy to clear/reset
    // → Predictable behavior

    // Alternative (uncontrolled):
    // → No value prop
    // → Use ref to read value
    // → DOM manages state
    // → Less React-like

    // ============================================
    // ENHANCEMENTS (OPTIONAL)
    // ============================================

    // Password visibility toggle:
    // → Switch between type='text' and type='password'
    // → Show/hide password button
    // → Better UX

    // Progress bar:
    // → Visual bar showing strength
    // → Length proportional to score
    // → Color-coded segments

    // Specific requirements list:
    // → Checklist of requirements
    // → Check/cross for each rule
    // → More detailed feedback

    // Password suggestions:
    // → Show common password mistakes
    // → Suggest improvements
    // → Educational component

    // Minimum length requirement:
    // → Enforce minimum (e.g., 8 chars)
    // → Disable submit until met
    // → Clear validation

    // Confirmation field:
    // → Second input to confirm
    // → Match validation
    // → Prevent typos

    // ============================================
    // EDGE CASES
    // ============================================

    // Empty password:
    // → score = 0
    // → Returns: 'Weak'
    // → Display: "Weak"
    // → Could handle specially (show nothing)

    // Very long password:
    // → All rules might match
    // → Maximum score achieved
    // → Returns: 'Strong'
    // → Works as expected

    // Only special characters:
    // → "!@#$%^&*"
    // → Gets special char points
    // → Might get length points
    // → No lowercase/uppercase/digit points
    // → Likely 'Weak' or 'Moderate'

    // All same character:
    // → "aaaaaaaaaaa"
    // → Gets length points
    // → Gets lowercase points
    // → Likely 'Weak'

    // Common patterns:
    // → "password123"
    // → Gets various points
    // → Penalty for patterns
    // → Likely 'Weak' or 'Moderate'

    // ============================================
    // KEY CONCEPTS
    // ============================================

    // Why forEach instead of map? → Not returning new array, just calculating
    // Why += operator? → Accumulate score from multiple rules
    // Why negative score possible? → Penalize weak patterns
    // Why regex for validation? → Powerful pattern matching
    // Why real-time checking? → Immediate user feedback
    // Why controlled input? → React state management
    // Why lowercase className? → CSS naming convention
    // .test() → Boolean check if regex matches
    // Template literal className → Combine static and dynamic classes
    // forEach → Execute function for each array element
    // Ternary returns → Concise conditional logic
    // score += value → Add to accumulator (positive or negative)`,
  },
  {
    title: '39_contactForm',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → form component (uncontrolled)
// submitForm.js → separate file for submission logic

// ============================================
// STATE MANAGEMENT
// ============================================

// NO STATE NEEDED
// → Uncontrolled form (no useState)
// → Native HTML form handles input values
// → FormData API extracts values on submit

// ============================================
// APP.JSX - FORM STRUCTURE
// ============================================

// Form attributes:
// → onSubmit={submitForm} - custom submit handler
// → action='URL' - API endpoint
// → method='post' - HTTP method

// Field pattern (repeated for each input):
// → label with htmlFor='input-id'
// → input with id='input-id' and name='fieldname'
// → name attribute is key for FormData extraction

// Fields:
// 1. Name: id='name-input', name='name', type='text'
// 2. Email: id='email-input', name='email', type='email'
// 3. Message: id='message-input', name='message', <textarea>
// 4. Submit: <button>Send</button>

// ============================================
// SUBMITFORM.JS - SUBMISSION LOGIC
// ============================================

// Constant:
// → const SUBMIT_URL - API endpoint stored for validation

// async function submitForm(event):

// STEP 1: Prevent default form behavior
// → event.preventDefault()
// → Stops page reload
// → Allows custom handling

// STEP 2: Get form element
// → const form = event.target
// → Reference to form DOM element

// STEP 3: Validation checks (inside try block)
// → if (form.action !== SUBMIT_URL) - verify action attribute
// → if (form.method.toLowerCase() !== 'post') - verify method
// → Alert user and return if validation fails

// STEP 4: Extract form data
// → const formData = new FormData(form)
// → Creates FormData object from form
// → Automatically collects all input values by name attribute

// STEP 5: Send API request
// → await fetch(SUBMIT_URL, { config })
// → method: 'POST'
// → headers: { 'Content-Type': 'application/json' }
// → body: JSON.stringify({ object })

// STEP 6: Build request body
// → formData.get('name') - extracts value by name attribute
// → formData.get('email')
// → formData.get('message')
// → Matches name attributes from inputs

// STEP 7: Handle response
// → const text = await response.text()
// → Extract response message
// → alert(text) - show to user

// STEP 8: Error handling (catch block)
// → catch (_) - ignore error details
// → alert('Error submitting form!')
// → Generic error message

// ============================================
// KEY CONCEPTS
// ============================================

// Uncontrolled form → No React state, DOM manages values
// event.preventDefault() → Stop default form submission/page reload
// FormData API → Extract form values automatically by name attribute
// formData.get('name') → Get value by input's name attribute
// JSON.stringify() → Convert JS object to JSON string
// form.action → Gets action attribute from form element
// form.method → Gets method attribute from form element
// await response.text() → Extract text response from server
// htmlFor → React attribute (equals 'for' in HTML)
// name attribute → Key for FormData extraction, must match formData.get()
// Content-Type header → Tells server we're sending JSON
// HTTP POST → Method for sending data to server`,
  },
  {
    title: '40_dataTable_with_search_and_sort',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → renders <DataTable />
// DataTable.jsx → main component with search, sort, pagination
// constants.js → initialData array

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: data → useState(initialData)
// → Current dataset (filtered/sorted)
// → Modified by search and sort operations

// State 2: searchTerm → useState('')
// → Current search input value
// → Controlled input for search box

// State 3: sortConfig → useState(null)
// → { key: 'firstName', direction: 'ascending' } or null
// → Tracks current sort column and direction

// State 4: currentPage → useState(1)
// → Current page number (1-indexed)
// → Changes with prev/next buttons

// State 5: rowsPerPage → useState(5)
// → Number of rows to display per page
// → Default 5, options: 5, 10, 15, 20

// ============================================
// MATCHESSEARCHTERM HELPER FUNCTION
// ============================================

// Purpose: Check if item matches search term in any field

// Parameters: (item, term)
// → item: data object with fields
// → term: search string

// Logic:
// → searchFields array defines searchable columns
// → Convert term to lowercase: term.toLowerCase()
// → Use .some() to check if ANY field matches
// → item[field].toLowerCase().includes(lowerCaseTerm)
// → Returns true if match found in any field

// ============================================
// HANDLESEARCH FUNCTION
// ============================================

// Purpose: Filter data based on search term

// STEP 1: Update search term state
// → setSearchTerm(term)

// STEP 2: Reset to first page
// → setCurrentPage(1)
// → Prevents showing empty page after filtering

// STEP 3: Check if term is empty
// → if (!term) reset to initialData and return

// STEP 4: Filter data
// → data.filter((item) => matchesSearchTerm(item, term))
// → Keep only matching items
// → setData(filteredData)

// ============================================
// HANDLESORT FUNCTION
// ============================================

// Purpose: Sort data by column (toggle ascending/descending)

// STEP 1: Determine sort direction
// → Default: 'ascending'
// → If clicking same column already sorted ascending → 'descending'
// → Check: sortConfig.key === key && sortConfig.direction === 'ascending'

// STEP 2: Sort data
// → [...data].sort() - shallow copy to avoid mutation
// → Compare: a[key] < b[key]
// → Return -1 (ascending) or 1 (descending) for less than
// → Return 1 (ascending) or -1 (descending) for greater than
// → Return 0 for equal

// STEP 3: Update states
// → setData(sortedData)
// → setSortConfig({ key, direction })

// ============================================
// PAGINATION CALCULATIONS
// ============================================

// startIndex calculation:
// → (currentPage - 1) * rowsPerPage
// → Example: page 2, 5 per page → (2-1) * 5 = 5

// selectedData (current page data):
// → data.slice(startIndex, startIndex + rowsPerPage)
// → Example: data.slice(5, 10) → items 5-9

// totalPages calculation:
// → Math.ceil(data.length / rowsPerPage)
// → Example: 23 items, 5 per page → Math.ceil(23/5) = 5 pages

// ============================================
// PAGINATION HANDLERS
// ============================================

// handlePrevPage:
// → setCurrentPage((current) => current - 1)
// → Decrements page number
// → Disabled when currentPage === 1

// handleNextPage:
// → setCurrentPage((current) => current + 1)
// → Increments page number
// → Disabled when currentPage === totalPages

// handleRowsPerPageChange:
// → parseInt(event.target.value, 10) - convert string to number
// → setRowsPerPage(parsedValue)
// → setCurrentPage(1) - reset to first page

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Search input
// → className='search-input'
// → type='text', placeholder
// → value={searchTerm} - controlled
// → onChange={(e) => handleSearch(e.target.value)}

// SECTION 2: Table
// → <table className='table'>
// → <thead> with clickable column headers
// → Each <th onClick={() => handleSort('columnKey')}>
// → <tbody> maps over selectedData (current page)

// Table body:
// → {selectedData.map((item, index) => ...)}
// → <tr key={index}> for each row
// → <td> for each column value

// SECTION 3: Pagination controls
// → Previous button (disabled={currentPage === 1})
// → Page info: "Page X of Y"
// → Rows per page dropdown
// → Next button (disabled={currentPage === totalPages})

// Dropdown options:
// → [5, 10, 15, 20].map((pageSize) => <option>)
// → value={rowsPerPage}
// → onChange={handleRowsPerPageChange}

// ============================================
// KEY CONCEPTS
// ============================================

// Controlled search input → value and onChange synced with state
// .some() method → Returns true if ANY element passes test
// .includes() method → Check if string contains substring
// Shallow copy [...data] → Avoid mutating original array
// .sort() comparator → Returns -1, 0, or 1 for sorting
// .slice(start, end) → Extract portion of array for pagination
// Math.ceil() → Round up for total pages calculation
// Functional setState → (current) => current + 1 for safe updates
// parseInt(value, 10) → Convert string to number (base 10)
// Disabled button → disabled={condition} prevents clicks
// onClick on <th> → Makes table headers clickable for sorting
// key={index} → React list key (use unique ID in production)
// Toggle sort direction → Check current state and flip
// Reset to page 1 → When search or rowsPerPage changes
// sortConfig state → Track which column and direction currently sorted`,
  },
  {
    title: '41_colorfulList',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: text → useState('')
// → Current text input value
// → Resets to empty after adding item

// State 2: color → useState('#FF0000')
// → Currently selected color (hex code)
// → Default: red (#FF0000)

// State 3: items → useState([])
// → Array of item objects: { id, text, color }
// → Stores all added items

// ============================================
// HANDLEADDITEM FUNCTION
// ============================================

// Purpose: Add new item to list with selected color

// STEP 1: Validation
// → if (!text) alert and return
// → Prevents adding empty items

// STEP 2: Create new item object
// → id: new Date().getTime() - unique timestamp
// → text: current text value
// → color: current color value

// STEP 3: Add to items array
// → setItems([...items, newItem])
// → Spreads existing items, appends new one

// STEP 4: Reset text input
// → setText('')
// → Clears input for next entry

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Text input
// → type='text'
// → value={text} - controlled
// → onChange={(e) => setText(e.target.value)}

// SECTION 2: Color dropdown
// → <select value={color}> - controlled
// → onChange={(e) => setColor(e.target.value)}
// → Options: Red (#FF0000), Green (#00FF00), Blue (#0000FF)

// SECTION 3: Add button
// → onClick={handleAddItem}
// → Triggers item addition

// SECTION 4: List display
// → <ul> with items.map()
// → Each <li> has key={item.id}
// → style={{ color: item.color }} - inline style for text color
// → Displays item.text

// ============================================
// KEY CONCEPTS
// ============================================

// Controlled inputs → value and onChange for both input and select
// new Date().getTime() → Generate unique ID using timestamp
// Spread operator [...items, newItem] → Immutably add to array
// Inline styles → style={{ color: item.color }} for dynamic styling
// Validation → Check if text exists before adding
// Reset after action → setText('') clears input after adding
// Hex color codes → #FF0000 (red), #00FF00 (green), #0000FF (blue)
// Object structure → Each item has id, text, and color properties`,
  },
  {
    title: '42_file_explorer',
    code: `// DATA STRUCTURE (folderData.js)
// ============================================

// Tree node format:
// {
//   id: string,
//   name: string,
//   isFolder: boolean,
//   items: [] // array of child nodes
// }

// ============================================
// APP.JSX - STATE MANAGEMENT
// ============================================

// State: explorerData → useState(explorer)
// → Entire folder tree structure
// → Root node with nested items

// Custom hook: useTraverseTree()
// → Returns { insertNode, deleteNode, renameNode }
// → insertNode function used for adding files/folders

// handleInsertNode function:
// → Parameters: (folderId, item, isFolder)
// → Calls insertNode from hook
// → Updates explorerData with new tree
// → setExplorerData(finalTree)

// ============================================
// FOLDER.JSX - STATE MANAGEMENT
// ============================================

// State 1: expand → useState(false)
// → Controls folder open/closed state
// → true: show children, false: hide children

// State 2: showInput → useState({ visible: false, isFolder: false })
// → visible: show/hide input field
// → isFolder: determine if adding folder or file

// Props:
// → handleInsertNode: callback from parent
// → explorer: current node data

// ============================================
// FOLDER.JSX - HANDLERS
// ============================================

// handleNewFolder(e, isFolder):
// → e.stopPropagation() - prevent folder collapse
// → setExpand(true) - open folder
// → setShowInput({ visible: true, isFolder })

// onAddFolder(e):
// → if (e.keyCode === 13 && e.target.value) - Enter key pressed
// → handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
// → setShowInput({ ...showInput, visible: false })

// ============================================
// FOLDER.JSX - CONDITIONAL RENDERING
// ============================================

// If explorer.isFolder === true:
// → Render folder with expand/collapse
// → Show "Folder +" and "File +" buttons
// → Conditionally show input field (showInput.visible)
// → Recursively render children: explorer.items.map()

// If explorer.isFolder === false:
// → Render file (leaf node)
// → <span className='file'>📄 {explorer.name}</span>

// ============================================
// USETRAVERSE HOOK - INSERTNODE LOGIC
// ============================================

// insertNode(tree, folderId, item, isFolder):

// Base case:
// → if (tree.id === folderId && tree.isFolder)
// → Found target folder
// → tree.items.unshift({ new node object })
// → Adds to beginning of items array
// → return tree

// Recursive case:
// → let latestNode = tree.items.map((ob) => insertNode(ob, ...))
// → Recursively search each child
// → return { ...tree, items: latestNode }
// → Return updated tree with modified children

// New node structure:
// {
//   id: new Date().getTime(),
//   name: item,
//   isFolder: isFolder,
//   items: []
// }

// ============================================
// FOLDER.JSX - JSX STRUCTURE (FOLDER VIEW)
// ============================================

// Outer div:
// → marginTop: 5

// Folder header:
// → onClick={() => setExpand(!expand)} - toggle expand
// → className='folder'
// → Display: 📁 {explorer.name}
// → Buttons for "Folder +" and "File +"

// Children container:
// → style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}
// → Conditional display based on expand state
// → Indented with paddingLeft

// Input field (conditional):
// → {showInput.visible && <div>...</div>}
// → Shows folder/file icon based on showInput.isFolder
// → <input autoFocus onKeyDown={onAddFolder} onBlur={hide} />
// → onBlur hides input when clicking outside

// Recursive children:
// → {explorer.items.map((exp) => <Folder ... />)}
// → Passes handleInsertNode down
// → key={exp.id}
// → explorer={exp} for each child

// ============================================
// KEY CONCEPTS
// ============================================

// Recursive component → Folder renders itself for nested structure
// Tree traversal → Recursively search tree to find target node
// .unshift() → Add to beginning of array
// e.stopPropagation() → Prevent event bubbling to parent
// e.keyCode === 13 → Detect Enter key press
// onBlur → Triggered when input loses focus
// autoFocus → Automatically focus input when shown
// Conditional rendering → Different JSX for folders vs files
// Immutable update → {...tree, items: latestNode} creates new object
// Base case + recursive case → Standard recursion pattern
// paddingLeft for indentation → Visual hierarchy of nested items
// new Date().getTime() → Generate unique ID with timestamp
// Tree data structure → Nested objects with items array`,
  },
  {
    title: '44_calculator',
    code: `// Inside App.jsx, we are maintaining Calculator.jsx
// Step 1: Inside Calculator.jsx, we will start with useState variables declaration

// Ex: The very first useState variable
// This holds the number user is currently typing - starts with "0"
const [input, setInput] = useState('0');

// The second useState variable will be related to storing the first number in calculation
// This remembers the first number when user clicks an operator - starts as null
const [previousInput, setPreviousInput] = useState(null);

// The third useState variable will be related to storing which operation to perform
// This remembers if user clicked +, -, *, or / - starts as null
const [operator, setOperator] = useState(null);

// The fourth useState variable will be related to what shows on calculator screen
// This is what user sees on the calculator display - starts with "0"
const [display, setDisplay] = useState('0');

// Step 2: handleDigit function, this runs when user clicks number buttons (0-9 or .)
// Ex: when user clicks "5" button
const handleDigit = (digit) => {
  // Step (i): If current input is "0" and user clicks a digit, replace it
  // If current input is something else, add the digit to the end
  const newInput = input === '0' ? String(digit) : input + digit;
  setInput(newInput);

  // Step (ii): Update display to show either just the number or full expression
  
};

// Step 3: handleOperation function, this runs when user clicks +, -, *, / buttons
// Ex: when user clicks "+" button

// Step 4: calculateResult function, this runs when user clicks "=" or chains operations
// Ex: when user has typed "5 + 3" and clicks "="
const calculateResult = (newOperator = null, chaining = false) => {
  // Step (i): Check if we have everything needed for calculation
  if (operator && previousInput) {
    // Step (ii): Convert strings to numbers for math
    const currentInput = parseFloat(input); // "3" becomes 3
    const previous = parseFloat(previousInput); // "5" becomes 5
    let result;

    // Step (iii): Perform the actual calculation based on operator
    switch (operator) {
      case '+':
        result = previous + currentInput; // 5 + 3 = 8
        break;
      case '-':
        result = previous - currentInput; // 5 - 3 = 2
        break;
      case '*':
        result = previous * currentInput; // 5 * 3 = 15
        break;
      case '/':
        result = previous / currentInput; // 5 / 3 = 1.666...
        break;
      default:
        return;
    }

    // Step (iv): Handle result based on whether user is chaining operations
    if (chaining && newOperator) {
      // User typed "5 + 3 +" (wants to continue calculating)
      setPreviousInput(String(result)); // 8 becomes the new first number
      setOperator(newOperator); // + becomes the new operator
      setInput('0'); // Ready for next number
    } else {
      // User clicked "=" (final result)
      setInput(String(result)); // 8 becomes the input
      setPreviousInput(null); // Clear first number
      setOperator(null); // Clear operator
      setDisplay(String(result)); // Shows just "8"
    }
  }
};

// Step 5: clearAll function, this runs when user clicks "AC" button
// Ex: resets everything back to starting state
const clearAll = () => {
  setInput('0');
  setPreviousInput(null);
  setOperator(null);
  setDisplay('0');
};

// Step 6: Return JSX structure
// Display div that shows the current display state
// Buttons grid with AC, operators, digits, and equals
// Each button calls appropriate function when clicked

`,
  },
  {
    title: '45_showFullScreenModalOverlay',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State: isModalOpen → useState(false)
// → Controls modal visibility
// → true: modal visible, false: modal hidden

// ============================================
// FUNCTION LOGIC
// ============================================

// openModal():
// → setModalOpen(true)
// → Shows the modal

// closeModal():
// → setModalOpen(false)
// → Hides the modal

// ============================================
// JSX STRUCTURE
// ============================================

// Main container:
// → <div className='modal-container'>

// Open button:
// → <button onClick={openModal}>Open Modal</button>

// Modal (conditional rendering):
// → {isModalOpen && <div className='modal'>...</div>}
// → Only renders when isModalOpen is true

// Modal structure:
// → Outer div: className='modal' (backdrop/overlay)
// → Inner div: className='modal-content' (white box)
// → Close button: <span className='close' onClick={closeModal}>&times;</span>
// → Content: <p>Modal Content Here...</p>

// ============================================
// CSS KEY FEATURES
// ============================================

// .modal:
// → position: fixed - covers entire viewport
// → z-index: 1 - appears on top
// → width: 100%, height: 100% - full screen overlay
// → background-color: rgba(0,0,0,0.4) - semi-transparent backdrop
// → display: flex + center - centers modal content

// .modal-content:
// → background-color: #fefefe - white background
// → width: 30%, height: 30% - sized modal box
// → box-shadow - elevation effect
// → animation: animatetop - slide down animation

// @keyframes animatetop:
// → from: top: -300px, opacity: 0 (off-screen, invisible)
// → to: top: 0, opacity: 1 (in position, visible)
// → animation-duration: 0.4s

// .close:
// → float: right - positions X in top-right
// → font-size: 28px - large clickable area
// → &times; HTML entity - × symbol
// → :hover changes color to black

// ============================================
// KEY CONCEPTS
// ============================================

// Conditional rendering → {isModalOpen && <div>} shows/hides modal
// &times; HTML entity → × close symbol
// position: fixed → Modal stays in place during scroll
// z-index → Ensures modal appears above other content
// rgba(0,0,0,0.4) → Semi-transparent black backdrop
// CSS animation → Smooth slide-down entrance effect
// float: right → Position close button in top-right corner
// Overlay pattern → Full-screen backdrop with centered content
// Boolean state toggle → Simple open/close mechanism`,
  },
  {
    title: '46_api_integration_memoized_version',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: totalCount → useState(null)
// → Total number of Pokemon available (e.g., 1302)
// → Used to calculate dropdown options

// State 2: limit → useState(5)
// → Number of items to fetch per page
// → Default: 5

// State 3: offset → useState(0)
// → Starting point in the list
// → offset=20 means skip first 20 items

// State 4: data → useState([])
// → Current page of Pokemon data
// → Array of objects: [{ name: '', url: '' }]

// State 5: nextUrl → useState(null)
// → URL for fetching next page
// → Provided by API response

// State 6: cache → useState({})
// → Object storing previously fetched data
// → Structure: { 'url': [data] }
// → Avoids redundant API calls

// ============================================
// useEffect - FETCH INITIAL DATA
// ============================================

// Dependencies: [limit, offset]
// → Runs on mount and when limit/offset changes

// fetchInitialData():
// → await fetch(url) and response.json()
// → setTotalCount(result.count)
// → setData(result.results)
// → setNextUrl(result.next)
// → Cache results: setCache({ ...prevCache, [url]: result.results })

// ============================================
// FETCHDATA CALLBACK
// ============================================

// Dependencies: [nextUrl, cache]
// → useCallback for stable reference

// Logic:
// → Check if cache[nextUrl] exists
// → If cached: setData(cache[nextUrl]) and return
// → If not cached:
//   - await fetch(nextUrl)
//   - setData(result.results)
//   - setNextUrl(result.next)
//   - Update cache with new data

// ============================================
// HANDLELIMITCHANGE CALLBACK
// ============================================

// Dependencies: []
// → useCallback for stable reference

// Logic:
// → parseInt(event.target.value, 10) - convert to number
// → setLimit(parsedValue)
// → setOffset(0) - reset to first page

// ============================================
// HANDLENEXTCLICK CALLBACK
// ============================================

// Dependencies: [fetchData]
// → useCallback for stable reference

// Logic:
// → if (nextUrl) fetchData()
// → Only fetch if nextUrl exists

// ============================================
// OPTIONS MEMO
// ============================================

// Dependencies: [totalCount]
// → useMemo to calculate dropdown options

// Calculation:
// → Math.ceil(totalCount / 5) - number of options
// → [...Array(count)] creates array
// → .map((_, index) => ({ value: (index+1)*5, label: (index+1)*5 }))
// → Example: totalCount=1302 → options: [5, 10, 15, 20, ...]

// ============================================
// JSX STRUCTURE
// ============================================

// SECTION 1: Dropdown (conditional)
// → {totalCount && <select>...</select>}
// → Only renders when totalCount loaded
// → value={limit} - controlled select
// → onChange={handleLimitChange}
// → Maps options array to <option> elements

// SECTION 2: Pokemon list
// → <ul> with data.map()
// → Displays: {index + 1}. {pokemon.name}
// → key={index} for each item

// SECTION 3: Next button
// → <button onClick={handleNextClick}>Next</button>
// → Fetches next page of data

// ============================================
// KEY CONCEPTS
// ============================================

// API pagination → limit (items per page) and offset (starting point)
// Caching strategy → Store fetched data by URL to avoid re-fetching
// cache[url] check → If data exists in cache, use it instead of API call
// useCallback → Memoize functions that depend on other state
// useMemo → Memoize expensive calculations (dropdown options)
// parseInt(value, 10) → Convert string to number (base 10)
// Math.ceil() → Round up for total options calculation
// [...Array(n)] → Create array of length n for mapping
// Conditional rendering → {totalCount && ...} only show when loaded
// result.next → API provides next URL for pagination
// Spread in cache → {...prevCache, [url]: data} adds new entry immutably`,
  },
  {
    title: '47_treeStructure',
    code: `// ========== WHAT WE'RE TRYING TO DO ==========
// We want to turn this nested object structure:
const exampleObj = {
  taxi: 'a car licensed to transport passengers in return for payment of a fare',
  food: {
    sushi: 'a traditional Japanese dish of prepared rice...',
    apple: {
      Honeycrisp: 'an apple cultivar developed at the MAES...',
      Fuji: 'an apple cultivar developed by growers...',
    },
  },
};

// Into a visual tree that looks like:
// taxi: a car licensed to transport passengers in return for payment of a fare
// food:
//   sushi: a traditional Japanese dish of prepared rice...
//   apple:
//     Honeycrisp: an apple cultivar developed at the MAES...
//     Fuji: an apple cultivar developed by growers...

// ========== CODING APPROACH ==========
// Inside Component.jsx, we are creating a recursive tree renderer

// Step 2: Create treeStructure function - this is the heart of our tree renderer
const treeStructure = (object = {}) => (
  <div className='tree-container'>
    {/* Step (i): Get all the keys from current object level */}
    {Object.keys(object).map((ele) => (
      <>
        {/* Step (ii): Check if current key's value is a string */}
        {typeof object[ele] === 'string' && (
          <span className='tree-label'>
            {/* Display as "key: value" format */}
            {ele}: {object[ele]}
          </span>
        )}
        <br></br>

        {/* Step (iii): Check if current key's value is an object (nested data) */}
        {typeof object[ele] === 'object' && (
          <>
            {/* Display just the key name followed by colon */}
            <div className='tree-nestedobject'>{ele}:</div>

            {/* Step (iv): RECURSIVELY call treeStructure with the nested object */}
            {treeStructure(object[ele])}
          </>
        )}
      </>
    ))}
  </div>
);

// Step 3: Return JSX that starts the recursive rendering process
return <div className='main'>{treeStructure(exampleObj)}</div>;

// ========== HOW THE RECURSION WORKS STEP BY STEP ==========

// FIRST CALL: treeStructure(exampleObj)

// ========== WHY THIS IS USEFUL ==========
// This pattern is commonly used for:
// 1. JSON data viewers/explorers
// 2. Configuration file displays
// 3. API response visualization
// 4. Nested menu structures
// 5. File/folder tree displays
// 6. Any hierarchical data representation

// The CSS classes (tree-container, tree-label, tree-nestedobject) would provide:
// - Indentation for nested levels
// - Different styling for keys vs values
// - Visual hierarchy through colors/fonts
`,
  },
  {
    title: '48_phoneBook',
    code: `// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → passes namesArray to <NamesList />
// NamesList.jsx → groups and displays names by first letter

// ============================================
// STATE MANAGEMENT
// ============================================

// NO STATE NEEDED
// → Pure functional component
// → Props: { names } array of strings

// ============================================
// GROUPNAMESBYLETTER FUNCTION
// ============================================

// Purpose: Transform flat array into grouped object by first letter

// Logic:
// → names.reduce((acc, name) => {...}, {})
// → Accumulator starts as empty object {}

// For each name:
// → Get first letter: name[0].toUpperCase()
// → Check if acc[firstLetter] exists
// → If not exists: acc[firstLetter] = [name] (create new array)
// → If exists: acc[firstLetter].push(name) (append to existing)
// → Return acc

// Example transformation:
// Input: ['Ava', 'Anthony', 'Baddon']
// Output: {
//   A: ['Ava', 'Anthony'],
//   B: ['Baddon']
// }

// ============================================
// JSX STRUCTURE
// ============================================

// groupedNames object created:
// → const groupedNames = groupNamesByLetter(names)

// Outer loop - iterate over letters:
// → Object.keys(groupedNames) returns ['A', 'B', 'C']
// → .map((letter) => ...) for each letter

// For each letter:
// → <div key={letter}> wrapper
// → Letter heading: <div className='letter-group'>{letter}</div>
// → Inner loop: groupedNames[letter].map((name) => ...)
//   - Displays each name under that letter
//   - <div key={name} className='name'>{name}</div>

// ============================================
// KEY CONCEPTS
// ============================================

// .reduce() → Transform array into object (accumulator pattern)
// name[0] → Access first character of string
// .toUpperCase() → Convert to uppercase for grouping
// Object.keys() → Get array of object keys (letters)
// Nested .map() → Outer loop (letters), inner loop (names per letter)
// Accumulator pattern → Build object incrementally in reduce
// acc[key] = [] vs acc[key].push() → Initialize vs append
// Grouped data structure → Object with letters as keys, arrays as values
// No state needed → Pure transformation of props`,
  },
  {
    title: '49_like_dislike_buttons',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: likes → useState(100)
// → Count of total likes
// → Increments/decrements based on user action

// State 2: dislikes → useState(25)
// → Count of total dislikes
// → Increments/decrements based on user action

// State 3: liked → useState(false)
// → Boolean tracking if current user liked
// → Controls button styling and behavior

// State 4: disliked → useState(false)
// → Boolean tracking if current user disliked
// → Controls button styling and behavior

// ============================================
// HANDLELIKE FUNCTION
// ============================================

// Logic:
// → if (liked) - user already liked, toggle off
//   - setLikes(likes - 1)
//   - setLiked(false)
// → else - user hasn't liked, toggle on
//   - setLikes(likes + 1)
//   - setLiked(true)
//   - if (disliked) - remove dislike
//     * setDislikes(dislikes - 1)
//     * setDisliked(false)

// Mutual exclusivity: Can't like and dislike simultaneously

// ============================================
// HANDLEDISLIKE FUNCTION
// ============================================

// Logic:
// → if (disliked) - user already disliked, toggle off
//   - setDislikes(dislikes - 1)
//   - setDisliked(false)
// → else - user hasn't disliked, toggle on
//   - setDislikes(dislikes + 1)
//   - setDisliked(true)
//   - if (liked) - remove like
//     * setLikes(likes - 1)
//     * setLiked(false)

// Mutual exclusivity: Disliking removes like if active

// ============================================
// JSX STRUCTURE
// ============================================

// Like button:
// → Dynamic class based on liked state
// → onClick={handleLike}
// → Display: "Like | {likes}"

// Dislike button:
// → Dynamic class based on disliked state
// → onClick={handleDislike}
// → Display: "Dislike | {dislikes}"

// ============================================
// KEY CONCEPTS
// ============================================

// Toggle pattern → if (active) turn off, else turn on
// Mutual exclusivity → Activating one deactivates the other
// Nested conditionals → Check opposite button state when toggling
// Dynamic className → Template literal for conditional styling
// Counter state → Separate count and active state for each action
// Multiple state updates → 2-4 setState calls per click
// Boolean flags → Track user's current selection`,
  },
  {
    title: '50_basicFetchCountryData',
    code: `// Inside App.jsx, we are maintaining Weather.jsx
// Step 1: Import external data and define constants

// Ex: Import weather data from JSON file
import data from '../../public/data.json';
// This contains pre-stored weather data for different cities

// Define valid cities array
const VALID_CITIES = ['bogota', 'tokyo', 'madrid', 'paris', 'washington'];
// This is our whitelist of cities we have weather data for

// Step 2: Utility functions for validation and data processing

// Ex: validateCity function - checks if city input is valid
function validateCity(city) {
  // Step (i): Check if input is actually a string
  if (typeof city !== 'string') {
    throw new Error('not a string');
  }
  // Step (ii): Check if string is empty after removing spaces
  if (city.trim() === '') {
    throw new Error('string is empty');
  }
  // Step (iii): Check if city exists in our valid cities list
  if (!VALID_CITIES.includes(city.trim().toLowerCase())) {
    throw new Error('city not found');
  }
}

// Ex: extractWeatherData function - picks only needed data from full weather object
function extractWeatherData(weatherData) {
  return {
    temp: weatherData.temp,
    feels_like: weatherData.feels_like,
    temp_min: weatherData.temp_min,
    temp_max: weatherData.temp_max,
    pressure: weatherData.pressure,
    humidity: weatherData.humidity,
  };
  // This filters out unnecessary data and returns only what we want to display
}

// Ex: fetchWeatherData function - simulates API call but uses local data
async function fetchWeatherData(city) {
  try {
    // Step (i): Check if city exists in our data object
    if (data[city]) {
      return extractWeatherData(data[city]);
    } else {
      throw new Error('city not found');
    }
  } catch (error) {
    throw new Error('An error occurred while fetching the weather data');
  }
}

// Ex: cityWeather function - main orchestrator function
async function cityWeather(city) {
  // Step (i): First validate the city input
  validateCity(city);
  // Step (ii): If validation passes, fetch the weather data
  return await fetchWeatherData(city.toLowerCase());
}

// Step 3: Inside Weather.jsx, we will start with useState variables declaration

// Ex: The very first useState variable
const [city, setCity] = useState('');
// This holds whatever the user types in the input box - starts empty

// The second useState variable will be related to weather data
const [weather, setWeather] = useState(null);
// This holds the fetched weather information - starts as null (no data)

// The third useState variable will be related to error handling
const [error, setError] = useState('');
// This holds any error messages to show user - starts empty

// Step 4: handleFetchWeather function, this runs when user clicks "Get Weather" or presses Enter
// Ex: when user types "tokyo" and clicks button
const handleFetchWeather = async () => {
  try {
    // Step (i): Call our main weather function with current city input
    const data = await cityWeather(city);
    // Step (ii): If successful, update weather state with returned data
    setWeather(data);
    // Step (iii): Clear any previous error messages
    setError('');
  } catch (err) {
    // Step (iv): If anything fails, show error message and clear weather data
    setError(err.message);
    setWeather(null);
  }
};

// Step 5: handleInputChange function, this runs every time user types in input box
// Ex: when user types each letter of "tokyo"
const handleInputChange = (e) => {
  // Step (i): Update city state with what user typed
  setCity(e.target.value);
  // Step (ii): Clear previous error messages (fresh start for new input)
  setError('');
  // Step (iii): Clear previous weather data (clean slate)
  setWeather(null);
};

// Step 6: handleKeyPress function, this runs when user presses any key in input box
// Ex: when user presses Enter key after typing city name
const handleKeyPress = (e) => {
  // Step (i): Check if user pressed Enter key
  if (e.key === 'Enter') {
    // Step (ii): Trigger weather fetch (same as clicking button)
    handleFetchWeather();
  }
};

// Step 7: Return JSX structure
// Input box with change and keypress handlers
// Button that triggers weather fetch
// Conditional error message display
// Conditional weather data display
`,
  },
  {
    title: '51_trafficLights',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: light → useState('red')
// → Current active light color
// → Values: 'red', 'yellow', 'green'

// State 2: isPaused → useState(false)
// → Controls whether timer is paused
// → true: timer stops, false: timer runs

// ============================================
// FUNCTION LOGIC
// ============================================

// onReset():
// → setLight('red') - reset to red
// → setIsPaused(true) - pause the timer

// togglePause():
// → setIsPaused((prev) => !prev)
// → Toggles between paused and running

// ============================================
// useEffect - TIMER LOGIC
// ============================================

// Dependencies: [light, isPaused]
// → Runs when light changes or isPaused changes

// Logic:
// → if (isPaused) return - exit early if paused
// → setTimeout after 1000ms (1 second):
//   - if (light === 'red') → setLight('yellow')
//   - else if (light === 'yellow') → setLight('green')
//   - else if (light === 'green') → setLight('red')
// → Cleanup: return () => clearTimeout(timer)

// Cycle: red → yellow → green → red (repeats)

// ============================================
// JSX STRUCTURE
// ============================================

// Traffic light container:
// → Three light divs (red, yellow, green)
// → Each with dynamic className:
//   - Adds 'on' class when active

// Control buttons:
// → Pause/Resume button:
//   - onClick={togglePause}
//   - Text: {isPaused ? 'Resume' : 'Pause'}
// → Reset button:
//   - onClick={onReset}
//   - Text: 'Reset'

// ============================================
// KEY CONCEPTS
// ============================================

// setTimeout → Delay state change by 1000ms
// clearTimeout in cleanup → Prevent memory leaks
// Early return → if (isPaused) return stops timer
// Cyclic state transitions → red → yellow → green → red
// Conditional className → Add 'on' class to active light
// Functional setState → setIsPaused((prev) => !prev) for toggle
// useEffect cleanup → Clear timer on unmount or dependency change
// Dependencies trigger → light change restarts timer for next transition`,
  },
  {
    title: '52_ticTacToe_n_n',
    code: `// ============================================
// CONFIGURATION
// ============================================

// BOARD_SIZE constant:
// → Controls grid size (3 for 3x3, 4 for 4x4, etc.)
// → Single point to scale entire game

// TOTAL_SQUARES calculation:
// → BOARD_SIZE * BOARD_SIZE
// → Example: 3x3 = 9, 4x4 = 16, 5x5 = 25

// ============================================
// STATE MANAGEMENT
// ============================================

// State 1: squares → useState(Array(TOTAL_SQUARES).fill(null))
// → Dynamic array based on board size
// → Stores 'X', 'O', or null for each square

// State 2: isXNext → useState(true)
// → Tracks current player
// → true = X's turn, false = O's turn

// ============================================
// calculateWinner FUNCTION
// ============================================

// Purpose: Dynamically generate and check all winning combinations

// STEP 1: Initialize empty winningCombinations array

// STEP 2: Generate row combinations
// → Nested loops: for row (0 to n-1), for col (0 to n-1)
// → Formula: row * BOARD_SIZE + col
// → Example 3x3: [0,1,2], [3,4,5], [6,7,8]
// → Example 4x4: [0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]

// STEP 3: Generate column combinations
// → Nested loops: for col (0 to n-1), for row (0 to n-1)
// → Same formula but different iteration order
// → Example 3x3: [0,3,6], [1,4,7], [2,5,8]

// STEP 4: Generate main diagonal
// → Loop: i from 0 to BOARD_SIZE-1
// → Formula: i * (BOARD_SIZE + 1)
// → Example 3x3: [0,4,8]
// → Example 4x4: [0,5,10,15]

// STEP 5: Generate anti-diagonal
// → Loop: i from 0 to BOARD_SIZE-1
// → Formula: (i + 1) * (BOARD_SIZE - 1)
// → Example 3x3: [2,4,6]
// → Example 4x4: [3,6,9,12]

// STEP 6: Check each combination
// → Get first square value: firstValue = squares[combination[0]]
// → Skip if null
// → Loop through remaining squares in combination
// → Check if all match firstValue
// → Return winner if all match ('X' or 'O')
// → Return null if no winner

// ============================================
// HANDLECLICK FUNCTION
// ============================================

// Logic:
// → if (winner || squares[i]) return - prevent invalid moves
// → Create copy: newSquares = [...squares]
// → Set value: newSquares[i] = isXNext ? 'X' : 'O'
// → Update states: setSquares, setIsXNext(!isXNext)

// ============================================
// RENDERSQUARE FUNCTION
// ============================================

// Returns:
// → <button onClick={() => handleClick(i)}>{squares[i]}</button>

// ============================================
// RESETGAME FUNCTION
// ============================================

// Logic:
// → setIsXNext(true)
// → setSquares(Array(TOTAL_SQUARES).fill(null))
// → Dynamically creates array of correct size

// ============================================
// JSX STRUCTURE - DYNAMIC BOARD RENDERING
// ============================================

// Status display:
// → Shows winner or next player

// Board rendering (nested loops):
// → Outer loop: Array.from({ length: BOARD_SIZE }, (_, row) => ...)
//   - Creates BOARD_SIZE rows
// → Inner loop: Array.from({ length: BOARD_SIZE }, (_, col) => ...)
//   - Creates BOARD_SIZE columns per row
//   - Calculates index: row * BOARD_SIZE + col
//   - Calls renderSquare(index)

// Reset button:
// → onClick={resetGame}
// → Shows current board size: "Reset Game ({n}x{n})"

// ============================================
// KEY CONCEPTS
// ============================================

// Dynamic board size → Single constant scales entire game
// Index formula: row * n + col → Convert 2D position to 1D array index
// Main diagonal formula: i * (n + 1) → 0, 5, 10, 15 for 4x4
// Anti-diagonal formula: (i + 1) * (n - 1) → 3, 6, 9, 12 for 4x4
// Array.from({ length: n }) → Create array of specific length for mapping
// Dynamic winning combinations → Generate all rows, cols, diagonals programmatically
// Nested loops for grid → Outer (rows) × Inner (columns)
// Guard clauses → if (winner || squares[i]) return prevents invalid moves
// Array(n).fill(null) → Initialize board with nulls
// Spread operator [...squares] → Create copy before mutation
`,
  },
  {
    title: '53_jobBoard',
    code: `// ============================================
// USEPAGINATEDJOBS HOOK - STATE MANAGEMENT
// ============================================

// State 1: loading → useState(true)
// → Initial load state (fetching job IDs)

// State 2: loadingMore → useState(false)
// → Loading subsequent pages

// State 3: jobs → useState([])
// → Accumulated array of job detail objects

// State 4: jobIds → useState([])
// → Array of all job IDs from API

// State 5: page → useState(0)
// → Current page number (0-indexed)

// State 6: hasMore → useState(true)
// → Boolean for remaining jobs

// Constant: PAGE_SIZE = 6
// → Jobs per page

// ============================================
// USEPAGINATEDJOBS - EFFECT 1 (FETCH JOB IDS)
// ============================================

// Dependencies: []
// → Runs once on mount

// Logic:
// → fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
// → Response: array of job ID numbers
// → setJobIds(ids)
// → setLoading(false)

// ============================================
// USEPAGINATEDJOBS - EFFECT 2 (FETCH PAGE DETAILS)
// ============================================

// Dependencies: [page, jobIds]
// → Runs when page or jobIds changes

// Logic:
// → if (jobIds.length === 0) return - guard clause
// → setLoadingMore(true)
// → Calculate slice: start = page * PAGE_SIZE, end = start + PAGE_SIZE
// → pageJobIds = jobIds.slice(start, end)
// → if (pageJobIds.length === 0) - no more jobs
// → Promise.all with pageJobIds.map((id) => fetch detail endpoint)
// → setJobs((prev) => [...prev, ...jobDetails]) - append new jobs
// → setHasMore(end < jobIds.length)
// → setLoadingMore(false)

// ============================================
// USEPAGINATEDJOBS - LOADMORE FUNCTION
// ============================================

// Logic:
// → setPage((prev) => prev + 1)
// → Increments page, triggers Effect 2

// Return:
// → { jobs, loading, loadingMore, hasMore, loadMore }

// ============================================
// APP.JSX - STRUCTURE
// ============================================

// Hook usage:
// → const { jobs, loading, loadingMore, hasMore, loadMore } = usePaginatedJobs()

// Initial loading:
// → if (loading) return <Loading />

// Jobs list:
// → jobs.map((job) => <JobPosting key={job.id} {...job} />)
// → Spread props: id, title, by, time, url

// Load more button:
// → {hasMore && <button disabled={loadingMore} onClick={loadMore}>}
// → Conditional rendering based on hasMore
// → Disabled during loadingMore

// ============================================
// JOBPOSTING.JSX - STRUCTURE
// ============================================

// Props: { url, by, time, title }

// Title rendering:
// → {url ? <a href={url} target='_blank'>{title}</a> : title}
// → Conditional link or plain text

// Metadata:
// → "By {by} {new Date(time * 1000).toLocaleString()}"
// → time * 1000 converts Unix timestamp to milliseconds

// ============================================
// KEY CONCEPTS
// ============================================

// Custom hook → Encapsulate pagination logic
// Two-stage loading → First job IDs, then details
// .slice(start, end) → Extract page subset from array
// Promise.all → Parallel API calls for multiple jobs
// Append pattern → setJobs((prev) => [...prev, ...new]) accumulates results
// Guard clause → if (jobIds.length === 0) return prevents premature execution
// Disabled button → disabled={loadingMore} prevents duplicate requests
// Unix timestamp * 1000 → Convert seconds to milliseconds for Date
// Spread props → {...job} passes all properties
// rel='noopener' → Security for target='_blank' links
// Empty dependency [] → Run once on mount
// PAGE_SIZE constant → Controls pagination chunk size
`,
  },
  {
    title: '54_digital_clock',
    code: `// ============================================
// STATE MANAGEMENT
// ============================================

// State: time → useState(new Date())
// → Stores current Date object
// → Updates every second

// ============================================
// useEffect - TIMER LOGIC
// ============================================

// Dependencies: []
// → Runs once on mount

// Logic:
// → setInterval(() => setTime(new Date()), 1000)
// → Updates time every 1000ms (1 second)
// → Cleanup: return () => clearInterval(timer)

// ============================================
// TIME FORMATTING LOGIC
// ============================================

// Extract time components:
// → hours = time.getHours() (0-23)
// → minutes = time.getMinutes() (0-59)
// → seconds = time.getSeconds() (0-59)

// Determine AM/PM:
// → ampm = hours >= 12 ? 'PM' : 'AM'

// Convert to 12-hour format:
// → hours = hours % 12
// → hours = hours ? hours : 12
// → 0 becomes 12, 13 becomes 1, etc.

// formatNumber function:
// → String(num).padStart(2, '0')
// → Adds leading zero: 5 → '05', 12 → '12'

// ============================================
// JSX STRUCTURE
// ============================================

// Clock display:
// → Hours: {formatNumber(hours)}
// → Colon separator: ':'
// → Minutes: {formatNumber(minutes)}
// → Colon separator: ':'
// → Seconds: {formatNumber(seconds)}
// → AM/PM indicator: {ampm}

// ============================================
// CSS KEY FEATURES
// ============================================

// .clock-container:
// → Centered with flexbox (100vh height)
// → Dark background (#222)

// .time:
// → font-size: 48px
// → color: #0ff (cyan)
// → monospace font

// .colon animation:
// → @keyframes blink - opacity toggle
// → animation: blink 1s infinite

// ============================================
// KEY CONCEPTS
// ============================================

// setInterval(fn, 1000) → Execute function every second
// clearInterval cleanup → Prevent memory leaks
// new Date() → Get current date/time
// .getHours/Minutes/Seconds() → Extract time components
// hours % 12 → Convert 24-hour to 12-hour format
// .padStart(2, '0') → Add leading zeros (5 → '05')
// Ternary for AM/PM → hours >= 12 determines period
// CSS animation → Blinking colon effect`,
  },
  {
    title: '55_nested_checkboxes',
    code: `
/**
 * APPROACH OVERVIEW:
 * - Use a Set to track checked item IDs (simple state management)
 * - When a checkbox is clicked:
 *   Step 1: Update all descendants (propagate down)
 *   Step 2: Update all ancestors (propagate up)
 * - Use recursion for tree traversal
 */

// STATE MANAGEMENT
// Simple approach: Set of checked IDs
const [checkedItems, setCheckedItems] = useState(new Set());

/**
 * CORE LOGIC - handleCheck function
 */
const handleCheck = (item, isChecked) => {
  setCheckedItems((prev) => {
    const newChecked = new Set(prev);

    /**
     * STEP 1: UPDATE DESCENDANTS (Propagate Down)
     * When checking/unchecking an item, apply same action to all children
     */
    const updateItem = (item, shouldCheck) => {
      // Add or remove current item
      if (shouldCheck) {
        newChecked.add(item.id);
      } else {
        newChecked.delete(item.id);
      }

      // Recursively update all children
      if (item.children) {
        item.children.forEach((child) => updateItem(child, shouldCheck));
      }
    };

    // Start the downward propagation
    updateItem(item, isChecked);

    /**
     * STEP 2: UPDATE ANCESTORS (Propagate Up)
     * After updating item and its children, update parent checkboxes
     *
     * Rule: Parent is checked if ALL children are checked
     *       Parent is unchecked if ANY child is unchecked
     */
    const updateParents = (target, data) => {
      // Helper: Find parent of target item in the tree
      const findParent = (nodes, parent = null) => {
        for (let node of nodes) {
          if (node.id === target.id) {
            return parent; // Found target, return its parent
          }
          if (node.children) {
            const found = findParent(node.children, node);
            if (found) return found;
          }
        }
        return null;
      };

      const parent = findParent(data);
      if (parent) {
        // Get all children IDs of this parent
        const childrenIds = getChildrenIds(parent);

        // Check if ALL children are checked
        const allChildrenChecked = childrenIds.every((id) =>
          newChecked.has(id)
        );

        // Update parent based on children state
        if (allChildrenChecked) {
          newChecked.add(parent.id);
        } else {
          newChecked.delete(parent.id);
        }

        // Recursively update parent's parent (grandparent, etc.)
        updateParents(parent, data);
      }
    };

    // Start the upward propagation
    updateParents(item, fileData);

    return newChecked;
  });
};

/**
 * HELPER FUNCTIONS
 */

// Get all descendant IDs (not including the item itself)
const getChildrenIds = (item) => {
  if (!item.children) return [];

  const ids = [];
  const traverse = (child) => {
    ids.push(child.id);
    if (child.children) {
      child.children.forEach(traverse);
    }
  };

  item.children.forEach(traverse);
  return ids;
};

/**
 * RENDERING LOGIC
 * Calculate visual states for each checkbox
 */
const CheckboxItem = ({ item, level = 0 }) => {
  // Basic checked state
  const isChecked = checkedItems.has(item.id);

  // Calculate indeterminate state for parents
  const childrenIds = getChildrenIds(item);
  const checkedChildren = childrenIds.filter((id) => checkedItems.has(id));

  const hasChildren = childrenIds.length > 0;
  const allChildrenChecked =
    hasChildren && checkedChildren.length === childrenIds.length;
  const someChildrenChecked = checkedChildren.length > 0;

  // Indeterminate = some but not all children checked
  const isIndeterminate =
    hasChildren && someChildrenChecked && !allChildrenChecked;

  return (
    <div>
      <input
        type='checkbox'
        checked={isChecked}
        ref={(input) => {
          if (input) input.indeterminate = isIndeterminate;
        }}
        onChange={(e) => handleCheck(item, e.target.checked)}
      />
      {/* Recursively render children */}
      {item.children?.map((child) => (
        <CheckboxItem key={child.id} item={child} level={level + 1} />
      ))}
    </div>
  );
};

/**
 * INTERVIEW TIPS:
 *
 * 1. Start with the simplest state (Set of IDs)
 * 2. Break the problem into two steps: down & up propagation
 * 3. Use clear helper functions (getChildrenIds, findParent)
 * 4. Handle the indeterminate state last (it's just UI)
 *
 * TIME BREAKDOWN (30 mins):
 * - 5 mins: Understand requirements & plan approach
 * - 10 mins: Implement core handleCheck logic
 * - 5 mins: Write helper functions
 * - 5 mins: Implement rendering & indeterminate state
 * - 5 mins: Test & debug
 *
 * COMPLEXITY:
 * - Time: O(n) for each checkbox click (traverse tree)
 * - Space: O(n) for storing checked IDs
 *
 * POSSIBLE OPTIMIZATIONS (mention if time):
 * - Cache parent relationships to avoid findParent traversal
 * - Use memoization for expensive calculations
 * - But for interview, focus on working solution first!
 */
`,
  },
  {
    title: '56_undoable_counter',
    code: `// Inside Counter.jsx, I will be writing all the main logic

// Step 1:

// Operations: '/2', '-1', '+1', 'x2' apply respective operations to current count
// Undo: reverts the last action and updates count
// Redo: applies the last undone action (if any)
// Reset: resets counter to 0 and clears all history

// Step 2: I will be maintaining three state variables

// State 1: useState ---> count ---> Ex: 0 is my defaultValue (current counter value)
// State 2: useState ---> history ---> Ex: [] empty array (stores all performed operations)
// State 3: useState ---> undoHistory ---> Ex: [] empty array (stores undone operations for redo)

// Step 3: Core Logic Functions

// CORE LOGIC 1: performOperation function (helper function)
function performOperation(counter, operation) {
  switch (operation) {
    case '/2':
      return counter / 2;
    case '-1':
      return counter - 1;
    case '+1':
      return counter + 1;
    case 'x2':
      return counter * 2;
    default:
      return counter;
  }
}

// CORE LOGIC 2: handleOperation function (main operation handler)
const handleOperation = (operation) => {
  // Ex: count = 5, operation = 'x2'
  const oldCount = count; // oldCount = 5

  // performOperation(5, 'x2') returns 10
  const newCount = performOperation(count, operation); // newCount = 10

  // Updates counter display to 10
  setCount(newCount);

  // Adds new entry to front: [{ operation: 'x2', before: 5, after: 10 }, ...existingHistory]
  setHistory([{ operation, before: oldCount, after: newCount }, ...history]);

  // Clears redo options when new operation performed
  setUndoHistory([]);
};

// CORE LOGIC 3: undo function
const undo = () => {
  if (history.length > 0) {
    // Ex: history = [{ operation: 'x2', before: 5, after: 10 }, { operation: '+1', before: 4, after: 5 }]
    // latest = { operation: 'x2', before: 5, after: 10 }
    // restHistory = [{ operation: '+1', before: 4, after: 5 }]
    const [latest, ...restHistory] = history;

    // Restores counter to value before last operation: 10 → 5
    setCount(latest.before);

    // Removes last operation from history: keeps [{ operation: '+1', before: 4, after: 5 }]
    setHistory(restHistory);

    // Saves undone operation for redo: [{ operation: 'x2', before: 5, after: 10 }, ...existingUndoHistory]
    setUndoHistory([latest, ...undoHistory]);
  }
};

// CORE LOGIC 4: redo function
const redo = () => {
  if (undoHistory.length > 0) {
    // Ex: undoHistory = [{ operation: 'x2', before: 5, after: 10 }, { operation: '+1', before: 4, after: 5 }]
    // latest = { operation: 'x2', before: 5, after: 10 }
    // restUndoHistory = [{ operation: '+1', before: 4, after: 5 }]
    const [latest, ...restUndoHistory] = undoHistory;

    // Applies the operation again: 5 → 10
    setCount(latest.after);

    // Removes from undo stack: keeps [{ operation: '+1', before: 4, after: 5 }]
    setUndoHistory(restUndoHistory);

    // Adds back to history: [{ operation: 'x2', before: 5, after: 10 }, ...existingHistory]
    setHistory([latest, ...history]);
  }
};

// CORE LOGIC 5: reset function
const reset = () => {
  setCount(0);
  setHistory([]);
  setUndoHistory([]);
};

// Step 4: JSX Structure

// i) Main div container
// ii) h1 element showing "Counter: {count}"
// iii) First button group div with operation buttons (/2, -1, +1, x2)
// iv) Second button group div with control buttons (Undo, Redo, Reset)
// v) History section with h2 title and table

// Operation buttons onClick={() => handleOperation('OPERATION_TYPE')}
// Control buttons: onClick={undo/redo/reset} with proper disabled conditions

// Step 5: History Table Logic

// Table structure: Operation | Before | After
// Data source: history array (shows most recent operations first)
// Each history entry: { operation: '/2', before: 5, after: 2.5 }

{
  history.map((entry, index) => (
    <tr key={index}>
      <td>{entry.operation}</td>
      <td>{entry.before}</td>
      <td>{entry.after}</td>
    </tr>
  ));
}

// Step 6: Button Disabled Logic

// Undo button: disabled={history.length === 0}
// Redo button: disabled={undoHistory.length === 0}
// Reset button: always enabled

// Step 7: Key Implementation Notes

// - Use array destructuring for undo/redo: const [latest, ...rest] = array
// - Always clear undoHistory when performing new operations
// - History stores operations in reverse chronological order (newest first)
// - Each history entry contains: operation name, before value, after value

// FOR UI Logic: Use margin for button spacing, border-collapse for table, disabled states for buttons

// In HTML tables:

/* 
<table> - the table container
<tr> - table row
<th> - table header (column titles)
<td> - table data (actual content cells)
*/
`,
  },
  {
    title: '57_generate_table',
    code: `// Inside TableGenerator.jsx, I will be writing table generation logic

// Step 1: I'm building a dynamic table generator based on user input

// User enters rows and columns in input fields
// When "Generate Table" clicked, creates table with sequential numbers 1 to (rows x columns)
// Reset button clears inputs and hides table

// Step 2: I will be maintaining three state variables

// State 1: useState ---> rows ---> Ex: '' is my defaultValue (user input for number of rows)
// State 2: useState ---> columns ---> Ex: '' is my defaultValue (user input for number of columns)
// State 3: useState ---> showTable ---> Ex: false is my defaultValue (controls table visibility)

// Step 3: Core Logic Functions

// CORE LOGIC 1: handleSubmit function (simple validation)
const handleSubmit = () => {
  if (rows && columns) {
    setShowTable(true);
  }
};

// CORE LOGIC 2: resetTable function (clears all state)
const resetTable = () => {
  setRows('');
  setColumns('');
  setShowTable(false);
};

// CORE LOGIC 3: generateTable function (complex nested loop logic)
const generateTable = () => {
  const tableRows = [];
  let counter = 1;

  for (let i = 0; i < parseInt(rows); i++) {
    const tableCells = [];
    for (let j = 0; j < parseInt(columns); j++) {
      tableCells.push(<td key={j}>{counter}</td>);
      counter++;
    }
    tableRows.push(<tr key={i}>{tableCells}</tr>);
  }
  return tableRows;
};

// EXAMPLE: generateTable() with rows=3, columns=4
// INPUT: rows='3', columns='4'
// STEP 1: tableRows = [], counter = 1

// ITERATION 1 (i=0, Row 1):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{1}</td>), counter = 2
// j=1: tableCells.push(<td key={1}>{2}</td>), counter = 3
// j=2: tableCells.push(<td key={2}>{3}</td>), counter = 4
// j=3: tableCells.push(<td key={3}>{4}</td>), counter = 5
// tableCells = [<td>1</td>, <td>2</td>, <td>3</td>, <td>4</td>]
// tableRows.push(<tr key={0}>{tableCells}</tr>)

// ITERATION 2 (i=1, Row 2):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{5}</td>), counter = 6
// j=1: tableCells.push(<td key={1}>{6}</td>), counter = 7
// j=2: tableCells.push(<td key={2}>{7}</td>), counter = 8
// j=3: tableCells.push(<td key={3}>{8}</td>), counter = 9
// tableCells = [<td>5</td>, <td>6</td>, <td>7</td>, <td>8</td>]
// tableRows.push(<tr key={1}>{tableCells}</tr>)

// ITERATION 3 (i=2, Row 3):
// tableCells = []
// j=0: tableCells.push(<td key={0}>{9}</td>), counter = 10
// j=1: tableCells.push(<td key={1}>{10}</td>), counter = 11
// j=2: tableCells.push(<td key={2}>{11}</td>), counter = 12
// j=3: tableCells.push(<td key={3}>{12}</td>), counter = 13
// tableCells = [<td>9</td>, <td>10</td>, <td>11</td>, <td>12</td>]
// tableRows.push(<tr key={2}>{tableCells}</tr>)

// FINAL OUTPUT:
// tableRows = [
//   <tr key={0}>[<td>1</td>, <td>2</td>, <td>3</td>, <td>4</td>]</tr>,
//   <tr key={1}>[<td>5</td>, <td>6</td>, <td>7</td>, <td>8</td>]</tr>,
//   <tr key={2}>[<td>9</td>, <td>10</td>, <td>11</td>, <td>12</td>]</tr>
// ]

// Step 4: JSX Structure

// i) Main div with className "container"
// ii) h1 element with "Table Generator" title
// iii) Form container div with input fields for rows and columns
// iv) Input fields with onChange handlers: onChange={(e) => setRows(e.target.value)}
// v) Generate button with onClick={handleSubmit}
// vi) Conditional rendering: {showTable && <div>...</div>}
// vii) Table structure: <table><tbody>{generateTable()}</tbody></table>
// viii) Reset button with onClick={resetTable}

// Step 5: Input Handling Logic

// Input onChange: (e) => setRows(e.target.value) captures user input
// Button validation: if (rows && columns) checks both fields have values
// parseInt(rows) converts string input to number for loop iterations

// Step 6: Key Implementation Notes

// - Use parseInt() to convert string inputs to numbers for loops
// - Nested loops: outer loop creates rows, inner loop creates cells per row
// - Counter increments continuously across all cells (1, 2, 3... up to rows*columns)
// - Each cell gets unique key prop for React reconciliation
// - Conditional rendering shows/hides table based on showTable state
// - Reset function clears all state back to initial values

// FOR UI Logic: Use className for CSS styling, min='1' for input validation, type='number' for numeric inputs
`,
  },
  {
    title: '58_temperature_converter',
    code: `// Inside TemperatureConverter.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) celsius ---> empty string ('') ---> holds celsius temperature value
// ii) fahrenheit ---> empty string ('') ---> holds fahrenheit temperature value

// Step 2:

// I'll directly jump on the return JSX template

// i) main div container
// ii) Inside main div we have h2 title and two input sections
// iii) Each input section contains:
//     - div wrapper
//     - label for accessibility
//     - input field with onChange handler

// JSX Structure:
// <div>
//   <h2>Temperature Converter</h2>
//   <div>
//     <label htmlFor='celsius'>Celsius:</label>
//     <input onChange={handleCelsiusChange} />
//   </div>
//   <div>
//     <label htmlFor='fahrenheit'>Fahrenheit:</label>
//     <input onChange={handleFahrenheitChange} />
//   </div>
// </div>

// CORE LOGIC --> handleCelsiusChange and handleFahrenheitChange
// i) both are accepting event as parameters

// for handleCelsiusChange -->
// i) extract value from e.target.value
// ii) setCelsius(value) to update celsius state
// iii) check if value is valid number using isValidNumber helper
// iv) if valid: convert celsius to fahrenheit using formula (C * 1.8 + 32)
// v) round result to 4 decimals and setFahrenheit
// vi) if invalid: setFahrenheit to empty string

// for handleFahrenheitChange -->
// i) extract value from e.target.value
// ii) setFahrenheit(value) to update fahrenheit state
// iii) check if value is valid number using isValidNumber helper
// iv) if valid: convert fahrenheit to celsius using formula ((F - 32) / 1.8)
// v) round result to 4 decimals and setCelsius
// vi) if invalid: setCelsius to empty string

// HELPER FUNCTIONS:

// isValidNumber function
const isValidNumber = (value) => {
  // i) check if value is not empty string
  // ii) check if value is not NaN (Not a Number)
  // iii) check if value is finite (not Infinity)
  return value !== '' && !isNaN(value) && isFinite(value);
};

// roundToFourDecimals function
const roundToFourDecimals = (num) => {
  // i) multiply by 10000 to shift decimal places
  // ii) use Math.round to round to nearest integer
  // iii) divide by 10000 to shift decimal places back
  return Math.round(num * 10000) / 10000;
};

// CONVERSION FORMULAS:
// Celsius to Fahrenheit: F = C × 1.8 + 32
// Fahrenheit to Celsius: C = (F - 32) ÷ 1.8

// VALIDATION LOGIC:
// i) Input validation happens on every keystroke
// ii) If input is valid number -> perform conversion and update other field
// iii) If input is invalid (letters, symbols, etc.) -> clear other field
// iv) Empty string is considered invalid, so other field gets cleared

// STATE MANAGEMENT:
// i) Each input controls its own state independently
// ii) Conversion only happens when input is valid
// iii) Invalid input immediately clears the corresponding field
// iv) No infinite loops because we only update the opposite field, not the current one
`,
  },
  {
    title: '59_flight_booker',
    code: `// Inside FlightBooking.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) flightType ---> 'one-way' (default) ---> holds flight type selection
// ii) departureDate ---> empty string ('') ---> holds departure date value
// iii) returnDate ---> empty string ('') ---> holds return date value
// iv) successMessage ---> empty string ('') ---> holds booking confirmation message
// v) errors ---> empty array ([]) ---> holds validation error messages

// Step 2:

// I'll directly jump on the return JSX template

// i) main div container
// ii) Inside main div we have h2 title, form section, error section, and success section
// iii) Form section contains:
//     - Flight type radio buttons (one-way/round-trip)
//     - Departure date input
//     - Conditional return date input (only for round-trip)
//     - Submit button

// JSX Structure:
// <div>
//   <h2>Flight Booking</h2>
//   <div> // Form container
//     // Radio buttons for flight type
//     // Date inputs
//     // Submit button
//   </div>
//   // Conditional error messages
//   // Conditional success message
// </div>

// CORE LOGIC --> handleSubmit, handleFlightTypeChange, handleDateChange
// i) handleSubmit handles form validation and booking confirmation
// ii) handleFlightTypeChange handles flight type selection changes
// iii) handleDateChange handles date input changes

// for handleSubmit -->
// i) clear previous messages: setSuccessMessage('') and setErrors([])
// ii) call validateForm() to get validation errors
// iii) if errors exist: setErrors(validationErrors) and return early
// iv) if no errors: generate success message based on flight type
// v) for one-way: "You have booked a one-way flight on YYYY-MM-DD"
// vi) for round-trip: "You have booked a round-trip flight, departing on YYYY-MM-DD and returning on YYYY-MM-DD"

// for handleFlightTypeChange -->
// i) extract value from e.target.value
// ii) setFlightType(value) to update flight type state
// iii) clear messages: setSuccessMessage('') and setErrors([])
// iv) if switching to one-way: setReturnDate('') to clear return date

// for handleDateChange -->
// i) accept field parameter ('departure' or 'return') and value
// ii) if field is 'departure': setDepartureDate(value)
// iii) if field is 'return': setReturnDate(value)
// iv) clear messages: setSuccessMessage('') and setErrors([])

// HELPER FUNCTIONS:

// getTodayDate function
const getTodayDate = () => {
  // i) create new Date object for current date
  // ii) convert to ISO string format
  // iii) split by 'T' and take first part to get YYYY-MM-DD format
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// validateForm function
const validateForm = () => {
  // i) initialize empty validationErrors array
  // ii) get today's date using getTodayDate helper
  // iii) validate departure date:
  //     - check if departureDate is empty
  //     - check if departureDate is in the past
  // iv) validate return date (only for round-trip):
  //     - check if returnDate is empty
  //     - check if returnDate is in the past
  //     - check if returnDate is before departureDate
  // v) return validationErrors array
  const validationErrors = [];
  const today = getTodayDate();

  // Departure date validation
  if (!departureDate) {
    validationErrors.push('Departure date is required.');
  } else if (departureDate < today) {
    validationErrors.push('Departure date cannot be in the past.');
  }

  // Return date validation for round-trip
  if (flightType === 'round-trip') {
    if (!returnDate) {
      validationErrors.push('Return date is required for round-trip flights.');
    } else if (returnDate < today) {
      validationErrors.push('Return date cannot be in the past.');
    } else if (departureDate && returnDate < departureDate) {
      validationErrors.push('Return date cannot be before departure date.');
    }
  }

  return validationErrors;
};

// CONDITIONAL RENDERING LOGIC:
// i) Return date input only shows when flightType === 'round-trip'
// ii) Error messages only show when errors.length > 0
// iii) Success message only shows when successMessage is not empty

// VALIDATION RULES:
// i) Departure date is required for all flight types
// ii) Departure date cannot be in the past
// iii) Return date is required only for round-trip flights
// iv) Return date cannot be in the past
// v) Return date cannot be before departure date

// STATE MANAGEMENT FLOW:
// i) User selects flight type -> handleFlightTypeChange -> clear messages and optionally clear return date
// ii) User enters dates -> handleDateChange -> update respective date state and clear messages
// iii) User clicks submit -> handleSubmit -> validate form -> show errors or success message

// ERROR HANDLING:
// i) Collect all validation errors in an array
// ii) Display all errors at once in a list format
// iii) Clear errors when user makes any changes

// SUCCESS HANDLING:
// i) Generate different messages for one-way vs round-trip
// ii) Include actual dates in the confirmation message
// iii) Clear success message when user makes changes
`,
  },
  {
    title: '60_dice_roller',
    code: `// Inside DiceRoller.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) numberOfDice ---> 6 (default) ---> holds the number of dice to roll
// ii) diceResults ---> empty array ([]) ---> holds the results of dice rolls (visual dice values)

// Step 2:

// I'll directly jump on the return JSX template

// i) main container div with 'container' className
// ii) Inside main container we have h2 title, input section, and conditional dice results
// iii) Input section contains:
//     - Number input with 'input-field' className
//     - Roll button with 'roll-button' className
// iv) Dice results section conditionally displays:
//     - Dice container with 'dice-container' className
//     - Calls renderDiceInRows() function to display visual dice

// JSX Structure:
// <>
//   <div className='container'>
//     <h2 className='title'>Number of Dice</h2>
//     <div className='input-section'>
//       <input className='input-field' onChange={handleNumberChange} />
//       <button className='roll-button' onClick={rollDice}>Roll</button>
//     </div>
//     {diceResults.length > 0 && (
//       <div className='dice-container'>{renderDiceInRows()}</div>
//     )}
//   </div>
// </>

// CORE LOGIC --> rollDice, handleNumberChange, renderDiceInRows, renderDie
// i) rollDice generates random numbers for each die
// ii) handleNumberChange validates and updates number of dice
// iii) renderDiceInRows creates visual dice layout in rows of 3
// iv) renderDie creates individual visual die with dot patterns

// for rollDice -->
// i) create empty results array
// ii) loop from 0 to numberOfDice
// iii) for each iteration: generate random number (1-6) using Math.floor(Math.random() * 6) + 1
// iv) push each random number to results array
// v) setDiceResults(results) to update state with visual dice values

// for handleNumberChange -->
// i) extract value from e.target.value
// ii) convert to integer using parseInt(value)
// iii) validate: if value >= 1 && value <= 12
// iv) if valid: setNumberOfDice(value)
// v) if invalid: do nothing (ignore the input)

// for renderDiceInRows -->
// i) create empty rows array to hold JSX elements
// ii) loop through diceResults in chunks of 3 (i += 3)
// iii) for each chunk: use slice(i, i + 3) to get maximum 3 dice values
// iv) create a div with 'dice-row' className for each row
// v) map through rowDice and call renderDie(value, i + index) for each die
// vi) push each row JSX to rows array
// vii) return all rows as JSX elements

// for renderDie -->
// i) accept value (1-6) and index as parameters
// ii) return JSX structure for single die:
//     - outer div with 'die' className
//     - inner div with 'dots' and 'dots-{value}' classNames
//     - Array.from to create dot elements based on dice value
// iii) use Array.from({ length: value }, (_, i) => ...) to create exact number of dots
// iv) each dot gets 'dot' and 'dot-{i + 1}' classNames for CSS positioning

// VISUAL DICE LOGIC:

// Array.from explanation for dots creation
// Array.from({ length: value }, (_, i) => ...)
// i) Creates array with 'value' number of elements (e.g., value=3 creates [undefined, undefined, undefined])
// ii) Maps each element to a JSX dot element
// iii) First parameter (_) is array element (ignored), second (i) is index (0, 1, 2...)
// iv) Returns array of dot JSX elements: [<div className="dot dot-1">, <div className="dot dot-2">, ...]

// CSS className structure for dice
// i) 'die' className ---> styles the outer die container (white square with border)
// ii) 'dots' className ---> styles the inner dots container (60x60 positioning area)
// iii) 'dots-{value}' className ---> specific positioning for that dice value (dots-1, dots-2, etc.)
// iv) 'dot' className ---> styles individual dots (12px black circles)
// v) 'dot-{i + 1}' className ---> specific positioning for each dot within the pattern

// CONDITIONAL RENDERING LOGIC:
// i) Dice container only shows when diceResults.length > 0
// ii) This means visual dice only appear after first roll
// iii) Each subsequent roll updates the displayed visual dice
// iv) Uses && operator for conditional rendering

// ROWS OF 3 LOGIC BREAKDOWN:
// Example with 8 dice: diceResults = [1, 3, 5, 2, 6, 4, 1, 2]
// 
// First iteration: i = 0
// rowDice = diceResults.slice(0, 3) = [1, 3, 5]  ---> Row 1: 3 visual dice
// 
// Second iteration: i = 3  
// rowDice = diceResults.slice(3, 6) = [2, 6, 4]  ---> Row 2: 3 visual dice
// 
// Third iteration: i = 6
// rowDice = diceResults.slice(6, 9) = [1, 2]     ---> Row 3: 2 visual dice (remaining)

// VISUAL DICE PATTERNS EXPLAINED:
// i) Value 1: Single center dot ---> Array.from creates 1 dot with 'dot-1' class
// ii) Value 2: Two diagonal dots ---> Array.from creates 2 dots with 'dot-1' and 'dot-2' classes
// iii) Value 3: Three diagonal dots ---> Array.from creates 3 dots with 'dot-1', 'dot-2', 'dot-3' classes
// iv) Value 4: Four corner dots ---> Array.from creates 4 dots with respective classes
// v) Value 5: Four corners + center ---> Array.from creates 5 dots with respective classes
// vi) Value 6: Two columns of three ---> Array.from creates 6 dots with respective classes

// STATE MANAGEMENT FLOW:
// i) User enters number of dice -> handleNumberChange -> validate and update numberOfDice
// ii) User clicks roll -> rollDice -> generate random results -> update diceResults
// iii) Component re-renders -> renderDiceInRows -> calls renderDie for each value
// iv) renderDie -> creates visual die JSX with dots -> displays on screen

// CSS DEPENDENCY:
// i) Component relies on external CSS classes for visual appearance
// ii) JavaScript creates structure, CSS creates visual styling
// iii) className attributes connect JavaScript elements to CSS rules
// iv) Without CSS, dice would be unstyled div elements with text

// VISUAL RENDERING PROCESS:
// i) diceResults array holds numerical values: [1, 3, 5]
// ii) renderDiceInRows splits into rows of 3
// iii) renderDie converts each number to visual die with dots
// iv) CSS positions dots according to traditional dice patterns
// v) Final result: visual dice that look like real dice with dot patterns`,
  },
  {
    title: '61_progressBars_synchronous',
    code: `
// Inside ProgressBars.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) bars ---> empty array ([]) ---> holds array of progress bar objects with id and progress values

// Step 2:

// I'll directly jump on the return JSX template

// i) main div with 'app-container' className
// ii) Inside main div we have Add button and mapped progress bars section
// iii) Add button with 'add-button' className calls addBar function on click
// iv) Progress bars section maps through bars array to render each bar
// v) Each progress bar has three-level structure:
//     - Wrapper div with 'progress-bar-wrapper' className
//     - Container div with 'progress-bar-container' className
//     - Fill div with 'progress-bar-fill' className and dynamic width


// CORE LOGIC --> addBar function and useEffect hook
// i) addBar creates and adds new progress bar object to bars array
// ii) useEffect manages continuous animation timer for sequential progress updates

// for addBar -->
// i) create newBar object with two properties:
//     - id: Date.now() for unique identifier using current timestamp
//     - progress: 0 for starting progress percentage
// ii) use setBars with functional update: setBars((prev) => [...prev, newBar])
// iii) spread operator (...prev) maintains existing bars and adds newBar at end
// iv) new bar automatically gets picked up by animation timer

// for useEffect (Animation Timer Logic) -->
// i) create setInterval that runs every 50ms for animation updates
// ii) inside interval callback: use setBars with functional update
// iii) check if prev.length === 0, if true return prev (no bars to update)
// iv) create newBars copy using spread operator: const newBars = [...prev]
// v) find first incomplete bar using findIndex: activeBarIndex = newBars.findIndex((bar) => bar.progress < 100)
// vi) if activeBarIndex !== -1: increment that bar's progress by 1%
// vii) use Math.min(100, progress + 1) to prevent going over 100%
// viii) return newBars to update state
// ix) return cleanup function: () => clearInterval(interval)

// SEQUENTIAL ANIMATION LOGIC:

// Finding active bar for animation
const activeBarIndex = newBars.findIndex((bar) => bar.progress < 100);
// i) findIndex searches array from beginning (index 0)
// ii) returns index of FIRST element that matches condition
// iii) condition: bar.progress < 100 (bar not yet complete)
// iv) ensures bars fill in chronological order (first added = first filled)
// v) returns -1 if no bars match (all bars complete)

// Progress increment calculation
// i) Timer interval: 50ms (every 50 milliseconds)
// ii) Target fill time: 2000ms per bar
// iii) Total increments needed: 2000ms / 50ms = 40 increments
// iv) Progress per increment: 100% / 40 increments = 2.5% per increment
// v) NOTE: Code shows 1% increment, so actual time = 50ms * 100 = 5000ms per bar

// Progress update with bounds checking
newBars[activeBarIndex].progress = Math.min(100, newBars[activeBarIndex].progress + 1);
// i) Math.min ensures progress never exceeds 100%
// ii) activeBarIndex points to specific bar object in array
// iii) directly mutate progress property of copied array
// iv) 1% increment moves progress from 0% to 100% in 100 steps

// TIMER MANAGEMENT:

// useEffect with empty dependency array
// useEffect(() => { ... }, []);
// i) empty array [] means effect runs once on component mount
// ii) creates persistent timer that survives state updates
// iii) timer continues running regardless of bars array changes
// iv) cleanup function runs only on component unmount

// State update pattern
// setBars((prev) => { ... });
// i) functional update ensures we work with latest state
// ii) prevents stale closure issues with timer callbacks
// iii) prev parameter always contains current bars array
// iv) return value becomes new state

// VISUAL RENDERING SYSTEM:

// Dynamic width styling
// i) only property that remains inline (data-driven)
// ii) template literal converts number to percentage string
// iii) updates every 50ms as progress increments
// iv) CSS transition in external file handles smooth animation

// Key prop for React reconciliation
// key={bar.id}
// i) Date.now() timestamp ensures unique keys
// ii) helps React track individual progress bars
// iii) prevents rendering issues when bars are added/removed
// iv) maintains component state during re-renders

// STATE MANAGEMENT FLOW:

// Initial state: bars = []
// User clicks Add -> addBar() -> bars = [{id: 1234, progress: 0}]
// Timer starts: finds bars[0] with progress < 100
// After 50ms: bars[0].progress = 1%
// After 100ms: bars[0].progress = 2%
// ...continues until bars[0].progress = 100%
// User clicks Add again -> bars = [{id: 1234, progress: 100}, {id: 5678, progress: 0}]
// Timer now finds bars[1] as first incomplete bar
// Process repeats for second bar while first bar stays at 100%

// SEQUENTIAL BEHAVIOR GUARANTEE:

// Example with 3 bars added at different times:
// Time 0: bars = [{id: 1, progress: 0}] -> Bar 1 active
// Time 5000ms: bars = [{id: 1, progress: 100}] -> Bar 1 complete
// Time 5050ms: User adds bar -> bars = [{id: 1, progress: 100}, {id: 2, progress: 0}] -> Bar 2 active
// Time 10000ms: bars = [{id: 1, progress: 100}, {id: 2, progress: 100}] -> Bar 2 complete
// Time 10050ms: User adds bar -> bars = [..., {id: 3, progress: 0}] -> Bar 3 active

// CSS INTEGRATION:

// External CSS classes handle all styling
// i) .app-container -> main layout and spacing
// ii) .add-button -> button appearance and hover effects
// iii) .progress-bar-wrapper -> spacing between progress bars
// iv) .progress-bar-container -> gray background container styling
// v) .progress-bar-fill -> green fill color and smooth transitions

// Component only handles:
// i) Data management (bars array)
// ii) Business logic (sequential filling)
// iii) Dynamic content (progress percentage)
// iv) User interactions (button clicks)`,
  },
  {
    title: '62_progressBars_parallel',
    code: `// Inside ProgressBars.jsx, I will be maintaining all the logic for CONCURRENT progress bars

// Step 1: STATE MANAGEMENT

// useState declaration
// i) bars ---> empty array ([]) ---> holds array of progress bar objects with id and progress values

// Step 2: COMPONENT STRUCTURE

// I'll directly jump on the return JSX template

// i) main div with 'app-container' className
// ii) Inside main div we have Add button and mapped progress bars section
// iii) Add button with 'add-button' className calls addBar function on click
// iv) Progress bars container div with 'progress-bars-container' className
// v) Progress bars section maps through bars array to render each bar
// vi) Each progress bar has four-level structure:
//     - Wrapper div with 'progress-bar-wrapper' className
//     - Container div with 'progress-bar-container' className
//     - Fill div with 'progress-bar-fill' className and dynamic width
//     - Text div with 'progress-text' className showing percentage

// CORE LOGIC --> addBar function and useEffect hook
// i) addBar creates and adds new progress bar object to bars array
// ii) useEffect manages continuous animation timer for CONCURRENT progress updates

// for addBar -->
// i) create newBar object with two properties:
//     - id: Date.now() for unique identifier using current timestamp
//     - progress: 0 for starting progress percentage
// ii) use setBars with functional update: setBars((prev) => [...prev, newBar])
// iii) spread operator (...prev) maintains existing bars and adds newBar at end
// iv) new bar automatically gets picked up by animation timer

// for useEffect (CONCURRENT Animation Timer Logic) -->
// i) create setInterval that runs every 50ms for animation updates
// ii) inside interval callback: use setBars with functional update
// iii) check if prev.length === 0, if true return prev (no bars to update)
// iv) create newBars copy using spread operator: const newBars = [...prev]
// v) initialize concurrentCount = 0 to track how many bars we're updating
// vi) loop through bars array with for loop: for (let i = 0; i < newBars.length && concurrentCount < 3; i++)
// vii) for each bar: if progress < 100, increment by 1% and increment concurrentCount
// viii) continue until either all bars checked OR concurrentCount reaches 3
// ix) use Math.min(100, progress + 1) to prevent going over 100%
// x) return newBars to update state
// xi) return cleanup function: () => clearInterval(interval)

// CONCURRENT ANIMATION LOGIC:

// Multi-bar update loop (KEY DIFFERENCE from sequential)
let concurrentCount = 0;
for (let i = 0; i < newBars.length && concurrentCount < 3; i++) {
  if (newBars[i].progress < 100) {
    newBars[i].progress = Math.min(100, newBars[i].progress + 1);
    concurrentCount++;
  }
}

// i) concurrentCount tracks how many bars we're currently updating
// ii) loop continues until we've checked all bars OR updated 3 bars
// iii) && concurrentCount < 3 ensures maximum 3 bars fill simultaneously
// iv) only incomplete bars (progress < 100) get updated
// v) first 3 incomplete bars found will be the ones that get updated
// vi) maintains chronological order (earlier bars get priority)

// Progress increment calculation
// i) Timer interval: 50ms (every 50 milliseconds)
// ii) Target fill time: 5000ms per bar (50ms * 100 increments)
// iii) Total increments needed: 5000ms / 50ms = 100 increments
// iv) Progress per increment: 100% / 100 increments = 1% per increment
// v) Each bar takes exactly 5000ms to fill from 0% to 100%

// Concurrency limit enforcement
// i) Maximum 3 bars can be filling at any given time
// ii) 4th bar waits until 1st bar completes (reaches 100%)
// iii) 5th bar waits until 2nd bar completes
// iv) Creates a "sliding window" of active bars

// TIMER MANAGEMENT:

// useEffect with empty dependency array
// useEffect(() => { ... }, []);
// i) empty array [] means effect runs once on component mount
// ii) creates persistent timer that survives state updates
// iii) timer continues running regardless of bars array changes
// iv) cleanup function runs only on component unmount

// State update pattern
// setBars((prev) => { ... });
// i) functional update ensures we work with latest state
// ii) prevents stale closure issues with timer callbacks
// iii) prev parameter always contains current bars array
// iv) return value becomes new state

// VISUAL RENDERING SYSTEM:

// Dynamic width styling
// i) only property that remains inline (data-driven)
// ii) template literal converts number to percentage string
// iii) updates every 50ms as progress increments
// iv) CSS transition in external file handles smooth animation

// Progress text display
// {bar.progress}%
// i) shows current percentage as text below each bar
// ii) updates in real-time with progress value
// iii) provides accessibility and user feedback

// Key prop for React reconciliation
// key={bar.id}
// i) Date.now() timestamp ensures unique keys
// ii) helps React track individual progress bars
// iii) prevents rendering issues when bars are added/removed
// iv) maintains component state during re-renders

// STATE MANAGEMENT FLOW:

// Scenario: User adds 5 bars rapidly
// Time 0: bars = [{id: 1, progress: 0}] -> Bar 1 active (1/3 slots used)
// Time 50ms: bars = [{id: 1, progress: 1}] -> Bar 1 continues
// User adds 2nd bar: bars = [{id: 1, progress: X}, {id: 2, progress: 0}] -> Bars 1&2 active (2/3 slots)
// User adds 3rd bar: bars = [Bar1, Bar2, {id: 3, progress: 0}] -> Bars 1,2,3 active (3/3 slots FULL)
// User adds 4th bar: bars = [Bar1, Bar2, Bar3, {id: 4, progress: 0}] -> Bar 4 WAITS (still 3/3 slots)
// User adds 5th bar: bars = [Bar1, Bar2, Bar3, Bar4, {id: 5, progress: 0}] -> Bar 5 WAITS

// Time when Bar 1 completes (5000ms):
// bars = [{id: 1, progress: 100}, {id: 2, progress: X}, {id: 3, progress: X}, {id: 4, progress: 0}, {id: 5, progress: 0}]
// Now Bars 2,3,4 are active -> Bar 4 starts filling, Bar 5 still waits

// Time when Bar 2 completes:
// bars = [Bar1(100%), {id: 2, progress: 100}, Bar3(X%), Bar4(X%), {id: 5, progress: 0}]
// Now Bars 3,4,5 are active -> Bar 5 finally starts filling

// CONCURRENT BEHAVIOR GUARANTEE:

// Queue-like behavior with 3-slot limitation
// Example timeline with 6 bars added at once:
// Bars 1,2,3: Start immediately (fill concurrently)
// Bar 4: Starts when Bar 1 completes
// Bar 5: Starts when Bar 2 completes
// Bar 6: Starts when Bar 3 completes

// Active slots management:
// i) Always maintain exactly 3 active bars (unless fewer than 3 total)
// ii) As soon as one bar completes, next waiting bar starts immediately
// iii) Chronological order preserved (first added = first priority)
// iv) No gaps in animation (smooth transition from completed to waiting bars)

// ANIMATION TIMING SYNCHRONIZATION:

// All active bars progress at same rate
// i) Every 50ms, all active bars increment by 1%
// ii) Bars started at same time will finish at same time
// iii) New bars inherit the timing rhythm of existing animation
// iv) No visual stuttering or timing conflicts

// EDGE CASES HANDLED:

// Empty state: if (prev.length === 0) return prev
// i) Prevents unnecessary processing when no bars exist
// ii) Timer continues running but does nothing

// Completion bounds: Math.min(100, progress + 1)
// i) Ensures progress never exceeds 100%
// ii) Prevents visual overflow or calculation errors

// Loop termination: && concurrentCount < 3
// i) Prevents updating more than 3 bars per cycle
// ii) Maintains strict concurrency limit

// CSS INTEGRATION:

// External CSS classes handle all styling
// i) .app-container -> main layout, background, padding
// ii) .add-button -> button styling, hover effects, focus states
// iii) .progress-bars-container -> flex layout, spacing between bars
// iv) .progress-bar-wrapper -> individual bar container, max width
// v) .progress-bar-container -> gray background, rounded corners, shadow
// vi) .progress-bar-fill -> green gradient, smooth transitions, animations
// vii) .progress-text -> percentage text styling, alignment

// Component separation of concerns:
// i) JavaScript handles data and business logic only
// ii) CSS handles all visual presentation and animations
// iii) Inline styles used only for dynamic data (width percentage)
// iv) Clean separation enables easy styling changes without logic changes

// PERFORMANCE CONSIDERATIONS:

// Efficient state updates
// i) Single setBars call per timer cycle (not per bar)
// ii) Batch processing of multiple bar updates
// iii) Minimal array copying with spread operator

// Timer optimization
// i) Single timer for all bars (not one timer per bar)
// ii) 50ms interval balances smoothness with performance
// iii) Early return for empty state saves unnecessary processing

// React rendering optimization
// i) Stable key props prevent unnecessary re-renders
// ii) Functional state updates prevent stale closures
// iii) Minimal inline styles reduce render complexity
`,
  },
];
