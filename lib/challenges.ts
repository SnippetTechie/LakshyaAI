export type Challenge = {
  id: string;
  title: string;
  career: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in minutes
  points: number;
  description: string;
  skills: string[];
};

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Build a Simple Calculator',
    career: 'Software Developer',
    difficulty: 'Easy',
    duration: 15,
    points: 100,
    description: "Experience what it's like to code by building a functional calculator with HTML, CSS, and JavaScript.",
    skills: ['Problem Solving', 'Logic', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: '2',
    title: 'Diagnose Patient Symptoms',
    career: 'Medical Doctor',
    difficulty: 'Medium',
    duration: 20,
    points: 150,
    description: "Step into a doctor's shoes and diagnose patients based on their symptoms and medical history.",
    skills: ['Critical Thinking', 'Pattern Recognition', 'Medical Knowledge'],
  },
  {
    id: '3',
    title: 'Predict Sales Trends',
    career: 'Data Scientist',
    difficulty: 'Medium',
    duration: 25,
    points: 175,
    description: 'Analyze sales data and create predictions using basic data science techniques and visualization.',
    skills: ['Analytical Thinking', 'Statistics', 'Data Visualization'],
  }
];


export const getChallengeById = (id: string) => {
  return challenges.find(challenge => challenge.id === id);
};
