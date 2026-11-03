/*
 * English text and content for the Wellness App.
 *
 * To add a language, copy this file (for example to js/lang/xx.js), translate it,
 * and load it instead of this one in the page's <script> tags.
 * Content lists (puzzles, names, words) should be adapted to the language and
 * culture, not just translated.
 */
window.WELLNESS_LANG = {
  code: 'en',

  ui: {
    chooseLevel: 'Choose your level',
    easyName: 'Easy',
    easyDesc: 'Bigger targets, fewer steps',
    mediumName: 'Medium',
    mediumDesc: 'A little more to do',
    hardName: 'Hard',
    hardDesc: 'Smaller targets, more steps',
    start: "Start today's session",
    startHint: 'Three short activities, picked at random. Take as long as you need.',
    privacyNote: 'Nothing you do here is saved or sent anywhere. Closing this page starts fresh.',
    // Shown instead on clinic pages that count visits.
    privacyNoteCounted: 'No personal information is collected or saved. This page only counts how many times it is opened, so the clinic knows how many people use it.',
    wellnessNote: 'For general wellness only. Not intended to diagnose, treat or prevent any condition.',
    endShort: 'End session',
    confirmTitle: 'End this session?',
    confirmText: 'You can start a new session any time.',
    keepGoing: 'Keep going',
    confirmEnd: 'End session',
    finishTitle: 'Well done!',
    finishText: "You finished today's three activities. Come back tomorrow for a new mix.",
    again: 'Do another session',
    home: 'Back to start',
    step: (i, n) => `${i} of ${n}`,
    stepLabel: (i, n) => `Activity ${i} of ${n}`,
    nextActivity: 'Next activity',
    finish: 'Finish',
    wellDone: 'Well done!',
    groups: { hand: 'Hand control', thinking: 'Thinking puzzle', phone: 'Phone skills' },
    question: (r, n) => `Question ${r} of ${n}`,
    progress: (r, n) => `${r} of ${n}`,
  },

  dots: {
    title: 'Connect the dots',
    instruction: (level) => (level === 'easy'
      ? 'Tap the dots in number order, starting with 1. The next dot to tap has a circle around it.'
      : 'Tap the dots in number order, starting with 1.'),
    aria: 'Numbered dots',
    wrong: (hit, next) => `That is ${hit}. Look for ${next}.`,
    done: (name) => `You drew ${name}!`,
    names: {
      house: 'a house', kite: 'a kite', flag: 'a flag', fish: 'a fish', sailboat: 'a sailboat',
      arrow: 'an arrow', star: 'a star', tree: 'a tree', heart: 'a heart',
    },
  },

  maze: {
    title: 'Find the way',
    instruction: 'Start at the green circle. Drag along the open paths to the square in the far corner. The lines are walls you cannot cross.',
    start: 'Start at the green circle.',
    keepGoing: 'Keep going from the end of your line. It has a ring around it.',
    wall: 'That is a wall. Look for an open path.',
    done: 'You found the way!',
  },

  copy: {
    title: 'Copy the drawing',
    instruction: 'Look at the small drawing. Draw the same thing in the big box. It does not have to be perfect.',
    label: (name) => `Draw ${name}`,
    aria: (name) => `A drawing of ${name}`,
    clear: 'Clear',
    doneButton: "I'm done",
    hint: 'Tap "I\'m done" when you are happy with it.',
    done: 'Nice drawing!',
    names: {
      square: 'a square', triangle: 'a triangle', plus: 'a plus sign',
      house: 'a house', envelope: 'an envelope', arrow: 'an arrow',
      houseDetail: 'a house with a door and window', star: 'a star', twoSquares: 'two overlapping squares',
    },
  },

  odd: {
    title: 'Odd one out',
    instruction: 'Tap the word that does not belong with the others.',
    right: (why) => `Yes! ${why}`,
    wrong: 'Not quite. Which one is different from the rest?',
    done: 'You found every odd one out!',
    sets: {
      easy: [
        { items: ['Apple', 'Banana', 'Chair'], odd: 'Chair', why: 'Apples and bananas are fruits.' },
        { items: ['Dog', 'Cat', 'Spoon'], odd: 'Spoon', why: 'Dogs and cats are animals.' },
        { items: ['Red', 'Blue', 'Table'], odd: 'Table', why: 'Red and blue are colors.' },
        { items: ['Shirt', 'Sock', 'Carrot'], odd: 'Carrot', why: 'Shirts and socks are clothes.' },
        { items: ['Bus', 'Train', 'Pillow'], odd: 'Pillow', why: 'Buses and trains are ways to travel.' },
        { items: ['Rose', 'Daisy', 'Hammer'], odd: 'Hammer', why: 'Roses and daisies are flowers.' },
      ],
      medium: [
        { items: ['Piano', 'Guitar', 'Violin', 'Teapot'], odd: 'Teapot', why: 'Pianos, guitars and violins are instruments.' },
        { items: ['Monday', 'Friday', 'Sunday', 'April'], odd: 'April', why: 'April is a month. The others are days of the week.' },
        { items: ['Oak', 'Maple', 'Pine', 'Tulip'], odd: 'Tulip', why: 'Oak, maple and pine are trees.' },
        { items: ['Eagle', 'Robin', 'Sparrow', 'Salmon'], odd: 'Salmon', why: 'A salmon is a fish. The others are birds.' },
        { items: ['Winter', 'Summer', 'Autumn', 'Tuesday'], odd: 'Tuesday', why: 'Winter, summer and autumn are seasons.' },
        { items: ['Fork', 'Knife', 'Spoon', 'Shovel'], odd: 'Shovel', why: 'Forks, knives and spoons are used for eating.' },
      ],
      hard: [
        { items: ['2', '4', '8', '9'], odd: '9', why: '2, 4 and 8 are even numbers. 9 is odd.' },
        { items: ['Copper', 'Iron', 'Silver', 'Marble'], odd: 'Marble', why: 'Copper, iron and silver are metals.' },
        { items: ['Whale', 'Dolphin', 'Seal', 'Shark'], odd: 'Shark', why: 'A shark is a fish. Whales, dolphins and seals are mammals.' },
        { items: ['Square', 'Triangle', 'Circle', 'Cube'], odd: 'Cube', why: 'A cube is solid. The others are flat shapes.' },
        { items: ['Mars', 'Venus', 'Jupiter', 'Moon'], odd: 'Moon', why: 'The Moon is not a planet. The others are.' },
        { items: ['Inch', 'Mile', 'Foot', 'Pound'], odd: 'Pound', why: 'A pound measures weight. The others measure length.' },
      ],
    },
  },

  order: {
    title: 'Put in order',
    instruction: 'Read the question, then tap the answers in the right order. Each one you get right is numbered.',
    right: 'That is the right order!',
    wrongFirst: 'Not that one yet. Which one comes first?',
    wrongNext: 'Not that one yet. Which one comes next?',
    done: 'You put everything in order!',
    /*
     * Round types:
     *   { type: 'numbers', count, max, prompt }            random numbers, smallest first
     *   { type: 'slice', list, count, prompt }             a run of neighbors from a list (days, months)
     *   { type: 'pick', list, count, prompt }              random items from an ordered list, kept in list order
     *   { type: 'fixed', items, prompt }                   exactly these items in this order
     */
    rounds: {
      easy: [
        { type: 'numbers', count: 3, max: 20, prompt: 'Tap the numbers from smallest to largest.' },
        { type: 'fixed', prompt: 'Tap the meals in the order you eat them in a day.', items: ['Breakfast', 'Lunch', 'Dinner'] },
        { type: 'fixed', prompt: 'Tap the sizes from smallest to largest.', items: ['Small', 'Medium', 'Large'] },
        { type: 'fixed', prompt: 'Tap the times of day in the order they happen.', items: ['Morning', 'Afternoon', 'Evening'] },
      ],
      medium: [
        { type: 'numbers', count: 4, max: 50, prompt: 'Tap the numbers from smallest to largest.' },
        { type: 'slice', count: 4, prompt: 'Tap the days in the order they come in the week.', list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
        { type: 'fixed', prompt: 'Tap the seasons in order, starting with spring.', items: ['Spring', 'Summer', 'Autumn', 'Winter'] },
        { type: 'fixed', prompt: 'Tap the steps in the order they happen.', items: ['Plant the seed', 'Water it', 'It sprouts', 'It flowers'] },
      ],
      hard: [
        { type: 'numbers', count: 5, max: 100, prompt: 'Tap the numbers from smallest to largest.' },
        { type: 'slice', count: 5, prompt: 'Tap the months in the order they come in the year.', list: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
        { type: 'pick', count: 5, prompt: 'Tap the letters in alphabetical order.', list: 'ABCDEFGHIJKLMNOPRSTW'.split('') },
        { type: 'fixed', prompt: 'Tap the stages of a plant in order.', items: ['Seed', 'Sprout', 'Bud', 'Flower', 'Fruit'] },
      ],
    },
  },

  typing: {
    title: 'Typing',
    instruction: 'Tap the white box to open the keyboard. Type what you see, then tap Check.',
    label: 'Type here',
    check: 'Check',
    empty: 'Type the word first, then tap Check.',
    right: 'Correct!',
    wrong: 'Almost. Compare each letter with what is shown above, then try again.',
    done: 'You typed every one!',
    words: {
      easy: ['cat', 'sun', 'hat', 'cup', 'dog', 'pen', 'map', 'bed', 'jam', 'egg'],
      medium: ['apple', 'garden', 'window', 'pencil', 'flower', 'bread', 'river', 'basket'],
      hard: ['good morning', 'thank you', 'see you soon', 'happy birthday', 'call me later', 'have a nice day'],
    },
  },

  scroll: {
    title: 'Scroll and find',
    instruction: 'Slide your finger up or down on the list to scroll. Find the name shown at the top and tap it.',
    find: 'Find: ',
    listLabel: 'Contact list',
    wrong: (name, target) => `That is ${name}. Keep looking for ${target}.`,
    right: 'You found it!',
    done: 'You found every name!',
    names: [
      'Alice', 'Arthur', 'Barbara', 'Bernard', 'Carol', 'Charles', 'Dorothy', 'Donald', 'Edith', 'Edward',
      'Frances', 'Frank', 'Gloria', 'George', 'Helen', 'Harold', 'Irene', 'Isaac', 'Joan', 'James',
      'Kathleen', 'Kenneth', 'Linda', 'Leonard', 'Margaret', 'Martin', 'Nancy', 'Norman', 'Olive', 'Oscar',
      'Patricia', 'Paul', 'Rose', 'Raymond', 'Shirley', 'Samuel', 'Theresa', 'Thomas', 'Ursula', 'Victor',
      'Virginia', 'Walter', 'Wanda', 'Albert', 'Betty', 'Clara', 'Dennis', 'Eleanor', 'Florence', 'Gerald',
      'Hazel', 'Howard', 'Janet', 'Louise', 'Marion', 'Philip', 'Ruth', 'Stanley', 'Vera', 'Wilbur',
    ],
    initials: 'ABCDEFGHJKLMNPRSTW'.split(''),
  },

  slider: {
    title: 'Use a slider',
    instruction: 'Press the round knob and slide it to the numbered marker, like turning the volume up or down. Then let go.',
    aria: 'Slider',
    goal: 'Move the knob to ',
    now: (v) => `The knob is at ${v}`,
    right: 'Right on the mark!',
    more: 'Close. Slide it a little to the right.',
    less: 'Close. Slide it a little to the left.',
    done: 'You can use a slider!',
  },

  swipe: {
    title: 'Swiping',
    instruction: 'Put your finger on the card and slide it the way the arrow points, like flipping through photos.',
    dir: { left: 'left', right: 'right', up: 'up', down: 'down' },
    word: { left: 'Left', right: 'Right', up: 'Up', down: 'Down' },
    text: (d) => (d === 'left' || d === 'right' ? `Swipe the card to the ${d}.` : `Swipe the card ${d}.`),
    card: (i, n, text) => `Card ${i} of ${n}: ${text}`,
    wrongDir: (got, wantText) => `That went ${got}. ${wantText}`,
    tooShort: 'Slide a little farther before you let go.',
    done: 'You can swipe!',
  },

  zoom: {
    title: 'Zoom in',
    instruction: (level) => (level === 'easy'
      ? 'Find the small sign in the picture. Spread two fingers apart on the picture to zoom in, read the number, then tap it below. The Zoom in and Zoom out buttons work too.'
      : 'Somewhere in the picture is a small sign with a number. Spread two fingers apart to zoom in, read it, then tap it below. Drag with one finger to look around. The Zoom in and Zoom out buttons work too.'),
    aria: 'A picture of a house, a tree and a small sign',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    reset: 'Reset',
    ask: 'What number is on the sign?',
    wrong: 'Not quite. Zoom in closer to read the sign.',
    done: (n) => `Yes, the sign says ${n}!`,
  },
};
