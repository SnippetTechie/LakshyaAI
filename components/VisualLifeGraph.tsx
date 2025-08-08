'use client'

import { useState, useRef, useCallback } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, DollarSign, Target, Zap, ChevronDown, Download } from 'lucide-react'

// Enhanced data structure for a career step
interface CareerStep {
  year: number
  role: string
  salary: number // in Lakhs
  description: string
  skills: string[]
}

// Enhanced function to generate a more detailed career path
const generateCareerPath = (field: string, targetSalary: string): CareerStep[] => {
  const path: CareerStep[] = []
  let currentSalary = 3 // Starting salary in Lakhs

  const salaryRange = targetSalary.match(/\d+/g)?.map(Number) ?? [15]
  const finalSalary = salaryRange[0]

  const roles = {
    'Software Development': ['Intern', 'Junior Dev', 'Software Dev', 'Senior Dev', 'Tech Lead'],
    'Data Science & AI': ['Intern', 'Junior Analyst', 'Data Scientist', 'Senior Data Scientist', 'AI Specialist'],
    'Product Management': ['Associate PM', 'Product Manager', 'Senior PM', 'Group PM', 'Director of Product'],
    'Cybersecurity': ['Analyst', 'Security Engineer', 'Senior Engineer', 'Consultant', 'Architect'],
    'UI/UX Design': ['Intern', 'Junior Designer', 'UI/UX Designer', 'Senior Designer', 'Design Lead'],
    'Marketing': ['Coordinator', 'Specialist', 'Manager', 'Senior Manager', 'Director'],
    'Finance & Banking': ['Analyst', 'Associate', 'Vice President', 'Director', 'Managing Director'],
    'Healthcare': ['Medical Student', 'Resident', 'Attending Physician', 'Specialist', 'Consultant'],
    'Civil Services': ['Aspirant', 'Probationer', 'SDM/ASP', 'District Magistrate/SP', 'Secretary'],
    'Entrepreneurship': ['Founder (Idea)', 'Founder (Seed)', 'CEO (Growth)', 'CEO (Scale-up)', 'Visionary'],
  }

  const skillsDb = {
    'Software Development': ['React, Node.js', 'System Design', 'Cloud (AWS/Azure)', 'DevOps (Docker, K8s)'],
    'Data Science & AI': ['Python (Pandas, TF)', 'SQL', 'ML Models', 'Big Data (Spark)'],
    'Product Management': ['User Research', 'Roadmapping', 'Agile/Scrum', 'Data Analysis'],
    'Cybersecurity': ['Network Security', 'Penetration Testing', 'IAM', 'Threat Intelligence'],
    'UI/UX Design': ['Figma/Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    'Marketing': ['SEO/SEM', 'Content Strategy', 'Analytics', 'CRM (Salesforce)'],
    'Finance & Banking': ['Financial Modeling', 'Valuation', 'Excel', 'Capital Markets', 'M&A'],
    'Healthcare': ['Diagnosis', 'Patient Care', 'Medical Research', 'Specialization', 'Ethics'],
    'Civil Services': ['Public Policy', 'Administration', 'Law & Order', 'Governance', 'Economics'],
    'Entrepreneurship': ['Product-Market Fit', 'Fundraising', 'Team Building', 'Scaling Ops', 'P&L Management'],
  }

  const fieldRoles = roles[field as keyof typeof roles] || roles['Software Development']
  const fieldSkills = skillsDb[field as keyof typeof skillsDb] || skillsDb['Software Development']

  for (let i = 0; i < 10; i++) {
    const progress = i / 9
    currentSalary = 3 + (finalSalary - 3) * progress * progress // Exponential growth

    let roleIndex = Math.min(Math.floor(progress * fieldRoles.length), fieldRoles.length - 1)
    
    path.push({
      year: new Date().getFullYear() + i,
      role: fieldRoles[roleIndex],
      salary: parseFloat(currentSalary.toFixed(1)),
      description: `A key year for growth, focusing on core competencies and taking on more responsibility as a ${fieldRoles[roleIndex]}.`,
      skills: [fieldSkills[roleIndex % fieldSkills.length], fieldSkills[(roleIndex + 1) % fieldSkills.length]].filter(Boolean),
    })
  }
  return path
}

export default function VisualLifeGraph() {
  const [education, setEducation] = useState('1st Year College')
  const [field, setField] = useState('')
  const [targetSalary, setTargetSalary] = useState('₹15-25 Lakhs')
  const [careerPath, setCareerPath] = useState<CareerStep[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const path = generateCareerPath(field, targetSalary)
    setCareerPath(path)
    setIsSubmitted(true)
    setActiveIndex(0) // Open the first milestone by default
  }

  const handleDownloadPdf = useCallback(() => {
    if (timelineRef.current) {
      html2canvas(timelineRef.current, { scale: 2, backgroundColor: null }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'px', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = imgWidth / imgHeight
        let newWidth = pdfWidth
        let newHeight = newWidth / ratio
        if (newHeight > pdfHeight) {
            newHeight = pdfHeight
            newWidth = newHeight * ratio
        }
        const x = (pdfWidth - newWidth) / 2
        pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight)
        pdf.save(`My_Career_Timeline_${field.replace(/\s/g, '_')}.pdf`)
      })
    }
  }, [field])

  const formSection = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">{field ? `Chart Your Future in ${field}` : 'Chart Your Future'}</h2>
        <p className="text-gray-600 mt-2">Get a personalized 10-year career timeline.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
          <select 
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option>12th Grade</option>
            <option>1st Year College</option>
            <option>2nd Year College</option>
            <option>3rd Year College</option>
            <option>4th Year College</option>
            <option>Graduate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field of Interest</label>
          <select 
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="" disabled>Select a Field</option>
            <option>Software Development</option>
            <option>Data Science & AI</option>
            <option>Product Management</option>
            <option>Cybersecurity</option>
            <option>UI/UX Design</option>
            <option>Marketing</option>
            <option>Finance & Banking</option>
            <option>Healthcare</option>
            <option>Civil Services</option>
            <option>Entrepreneurship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Salary (5 Yrs)</label>
          <select 
            value={targetSalary}
            onChange={(e) => setTargetSalary(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option>₹10-15 Lakhs</option>
            <option>₹15-25 Lakhs</option>
            <option>₹25-40 Lakhs</option>
            <option>₹40-60 Lakhs</option>
            <option>₹60 Lakhs+</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" disabled={!field} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
          {field ? `Generate My ${field.split(' ')[0]} Timeline` : 'Generate My Timeline'}
        </button>
      </div>
    </form>
  )

  const timelineSection = (
    <div ref={timelineRef} className="p-4 md:p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Your 10-Year Journey in {field}</h2>
      <p className="text-center text-gray-600 mb-8">Click on each milestone to see details.</p>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 -ml-px w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-500" aria-hidden="true"></div>
        <div className="space-y-8">
          {careerPath.map((step, index) => (
            <div key={step.year} className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-5/12"></div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <motion.div 
                className="w-full md:w-5/12 bg-white rounded-lg shadow-lg p-4 cursor-pointer border-l-4 border-blue-500" 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{step.year}</p>
                    <h3 className="text-lg font-bold text-gray-900">{step.role}</h3>
                  </div>
                  <ChevronDown className={`transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div 
                      className="mt-4 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-gray-700 mb-3">{step.description}</p>
                      <div className="flex items-center text-green-600 font-semibold mb-3">
                        <DollarSign size={16} className="mr-2" /> Est. Salary: ₹{step.salary} Lakhs/year
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800 flex items-center"><Target size={16} className="mr-2"/>Key Skills to Build:</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto my-8">
      {!isSubmitted ? formSection : 
        <div>
          {timelineSection}
          <div className="text-center mt-8 space-x-4">
            <button onClick={() => setIsSubmitted(false)} className="text-gray-700 font-medium py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
              Start Over
            </button>
            <button onClick={handleDownloadPdf} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 inline-flex">
              <Download size={18}/> Download as PDF
            </button>
          </div>
        </div>
      }
    </div>
  )
}
