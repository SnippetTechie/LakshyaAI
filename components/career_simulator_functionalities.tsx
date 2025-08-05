import { ReactNode } from 'react'
import { Code, PenTool, BarChart } from 'lucide-react'
// Define types for better type safety
export type CardId = 'ui-designer' | 'software-developer' | 'digital-marketer'

export type StepContent = {
  content?: string
  instructions?: string
  hints?: string[]
  options?: string[]
  correctAnswer?: number
  explanation?: string
  buggyCode?: string
  solution?: string
  testCases?: {
    input: any[]
    expectedOutput: number
    description: string
  }[]
}

export type ChallengeContent = {
  title: string
  subtitle: string
  instructions: string
  steps: string[]
  tools: string[]
  icon: ReactNode
  stepContent?: StepContent[]
}

export interface SimulatorCard {
  id: CardId
  title: string
  company: string
  level: string
  levelColor: string
  challenge: string
  description: string
  skills: string[]
  duration: string
  participants: string
  rating: number
  icon: string
  tasks: string[]
}

// Card data
export const simulatorCards: SimulatorCard[] = [
  {
    id: 'ui-designer',
    title: 'UI Designer',
    company: 'Tech Startup',
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-800',
    challenge: 'Design a mobile app login screen',
    description: 'Experience the daily work of a UI designer by creating user interfaces, choosing colors, and making design decisions.',
    skills: ['Design Thinking', 'User Experience', 'Visual Design'],
    duration: '15 mins',
    participants: '2.3k',
    rating: 4.8,
    icon: '🎨',
    tasks: [
      'Design a login page for a food delivery app.',
      'Choose a color palette for a finance dashboard.',
      'Create a wireframe for a profile settings screen.'
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    company: 'E-commerce Company',
    level: 'Intermediate',
    levelColor: 'bg-yellow-100 text-yellow-800',
    challenge: 'Debug a shopping cart feature',
    description: 'Step into the shoes of a developer and solve coding problems, debug issues, and implement new features.',
    skills: ['Problem Solving', 'Programming', 'Debugging'],
    duration: '20 mins',
    participants: '3.1k',
    rating: 4.9,
    icon: '💻',
    tasks: [
      'Develop a product listing page using React.',
      'Fix a bug in the checkout logic.',
      'Write a function to calculate discounts for bulk orders.'
    ]
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    company: 'Fashion Brand',
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-800',
    challenge: 'Create a social media campaign',
    description: 'Learn how marketers think by creating campaigns, analyzing data, and making strategic decisions.',
    skills: ['Strategy', 'Content Creation', 'Analytics'],
    duration: '12 mins',
    participants: '1.8k',
    rating: 4.7,
    icon: '📱',
    tasks: [
      'Create an Instagram campaign for a new product launch.',
      'Draft a catchy slogan for a summer sale.',
      'Analyze engagement data from last month\'s campaign.'
    ]
  }
]

// Challenge content data
export const challengeContent: Record<CardId, ChallengeContent> = {
  'ui-designer': {
    title: 'UI Designer Challenge',
    subtitle: 'Design a mobile app login screen',
    instructions: 'Create a login interface that is both visually appealing and user-friendly. Consider color theory, spacing, and accessibility.',
    steps: [
      'Choose a color palette that reflects the brand identity',
      'Design the input fields and login button',
      'Add visual elements that enhance user experience',
      'Consider error states and feedback mechanisms'
    ],
    tools: ['Figma mockup editor', 'Color palette generator', 'UI component library'],
    icon: <PenTool size={24} />,
    stepContent: [
      // Step 1: Choose color palette
      {
        instructions: "Select a color palette for your food delivery app that conveys trust, appetite, and ease of use.",
        content: "Food delivery apps often use colors that stimulate appetite (reds, oranges) balanced with neutral colors for readability.",
        hints: ["Consider color psychology", "Balance bright accent colors with neutral backgrounds", "Ensure good contrast for accessibility"]
      },
      
      // Step 2: Design input fields
      {
        instructions: "Design the username and password fields, including labels, placeholder text, and focus states.",
        content: "Input fields should be clearly visible, properly labeled, and indicate when they're selected."
      },
      
      // Step 3: Visual elements
      {
        instructions: "Add supporting elements like a logo, illustrations, or graphics that enhance the login experience.",
        content: "Visual elements should support the brand identity without distracting from the main login action."
      },
      
      // Step 4: Error states
      {
        instructions: "Design how error messages appear when a user enters invalid credentials.",
        content: "Error states should be noticeable but not alarming, and provide clear guidance on how to fix the problem."
      }
    ]
  },
  'software-developer': {
    title: 'Software Developer Challenge',
    subtitle: 'Debug a shopping cart feature',
    instructions: 'A shopping cart feature is malfunctioning. Users report that adding multiple items sometimes results in incorrect totals. Your task is to identify and fix the bug.',
    steps: [
      'Review the existing code to understand the logic flow',
      'Identify potential issues in the calculation function',
      'Fix the bug and implement a solution',
      'Test edge cases to ensure the fix works properly'
    ],
    tools: ['Code editor', 'Debugging console', 'Test data set'],
    icon: <Code size={24} />,
    stepContent: [
      // Step 1: Review code
      {
        content: `
// Shopping Cart Implementation
function calculateCartTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPrice = item.price;
    const quantity = item.quantity;
    
    // Add the item price to the total
    total += itemPrice;
  }
  
  // Apply discount for orders over $100
  if (total > 100) {
    total = total * 0.9; // 10% discount
  }
  
  return total;
}

// Example cart items
const cartItems = [
  { id: 1, name: "T-shirt", price: 25.99, quantity: 2 },
  { id: 2, name: "Jeans", price: 49.99, quantity: 1 },
  { id: 3, name: "Socks", price: 8.99, quantity: 3 }
];

console.log("Cart total:", calculateCartTotal(cartItems));
`,
        instructions: "Review the shopping cart code above. The customer reports that they added multiple quantities of items, but the total doesn't reflect the correct amount. Can you identify what's wrong with the code?",
        hints: ["Look at how quantities are used in the calculation", "Is each item being counted correctly?"]
      },
      
      // Step 2: Identify issues
      {
        content: "Based on your review, what's the bug in the code?",
        options: [
          "The discount is calculated incorrectly",
          "The quantity of each item isn't being multiplied by the price",
          "The for loop has incorrect boundary conditions",
          "The total variable isn't properly initialized"
        ],
        correctAnswer: 1,
        explanation: "The bug is that the code adds just the item price to the total, not (price × quantity). This means that no matter how many of an item a customer orders, only one is counted in the total."
      },
      
      // Step 3: Fix the bug
      {
        buggyCode: `function calculateCartTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPrice = item.price;
    const quantity = item.quantity;
    
    // Add the item price to the total
    total += itemPrice;
  }
  
  // Apply discount for orders over $100
  if (total > 100) {
    total = total * 0.9; // 10% discount
  }
  
  return total;
}`,
        instructions: "Fix the bug in the calculation function. Remember to account for the quantity of each item.",
        solution: `function calculateCartTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPrice = item.price;
    const quantity = item.quantity;
    
    // Add the item price multiplied by quantity to the total
    total += itemPrice * quantity;
  }
  
  // Apply discount for orders over $100
  if (total > 100) {
    total = total * 0.9; // 10% discount
  }
  
  return total;
}`
      },
      
      // Step 4: Test the solution
      {
        testCases: [
          {
            input: [
              { id: 1, name: "T-shirt", price: 25.99, quantity: 2 },
              { id: 2, name: "Jeans", price: 49.99, quantity: 1 },
              { id: 3, name: "Socks", price: 8.99, quantity: 3 }
            ],
            expectedOutput: 128.94, // (25.99*2 + 49.99 + 8.99*3) * 0.9
            description: "Mixed items with quantity"
          },
          {
            input: [
              { id: 1, name: "Expensive item", price: 200, quantity: 1 }
            ],
            expectedOutput: 180, // 200 * 0.9
            description: "Single expensive item with discount"
          },
          {
            input: [
              { id: 1, name: "Cheap item", price: 10, quantity: 5 }
            ],
            expectedOutput: 50, // 10 * 5 (no discount because total <= 100)
            description: "Multiple cheap items without discount"
          }
        ],
        instructions: "Test your fixed function with these test cases to verify it works correctly."
      }
    ]
  },
  'digital-marketer': {
    title: 'Digital Marketer Challenge',
    subtitle: 'Create a social media campaign',
    instructions: 'Design a social media campaign for a new product launch that drives engagement and conversions across platforms.',
    steps: [
      'Define target audience and campaign objectives',
      'Create content calendar with post ideas',
      'Draft sample posts with compelling copy',
      'Outline metrics to track campaign success'
    ],
    tools: ['Content planning template', 'Audience insights dashboard', 'Campaign analytics tool'],
    icon: <BarChart size={24} />,
    stepContent: [
      // Step 1: Target audience
      {
        instructions: "Define the primary and secondary target audiences for the summer fashion collection launch.",
        content: "Consider demographics, interests, behaviors, and pain points that your campaign will address.",
        hints: ["Think about age ranges, lifestyles, and fashion preferences", "Consider which social platforms your audience uses most"]
      },
      
      // Step 2: Content calendar
      {
        instructions: "Create a 2-week content calendar for the campaign launch with post types and timing.",
        content: "Plan a mix of promotional, educational, and engagement content across multiple platforms."
      },
      
      // Step 3: Draft posts
      {
        instructions: "Write three sample social media posts with compelling copy for the campaign.",
        content: "Include one announcement post, one product highlight, and one engagement post."
      },
      
      // Step 4: Metrics
      {
        instructions: "Identify the key metrics you'll track to measure campaign success.",
        content: "Consider both engagement metrics and conversion metrics that align with your campaign objectives."
      }
    ]
  }
}

// Utility functions for handling challenge interactions
export const handleCheckAnswer = (selectedOption: number | null, correctAnswer: number | null): boolean => {
  if (selectedOption === null || correctAnswer === null) return false
  return selectedOption === correctAnswer
}

// Simulates testing a solution against test cases
export const testSolution = (
  solution: string, 
  testCases: { input: any[], expectedOutput: number }[]
): { passed: boolean, actual: number }[] => {
  // In a real app, this would actually evaluate the code
  // For demo purposes, we'll simulate success
  return testCases.map(testCase => ({
    passed: true,
    actual: testCase.expectedOutput
  }))
}

// Function to evaluate user's code solution
export const evaluateCodeSolution = (userCode: string, correctSolution: string): boolean => {
  // In a real app, this would compare functionality, not just strings
  // For demo purposes, we'll do a simple check
  return userCode.includes('total += itemPrice * quantity')
}