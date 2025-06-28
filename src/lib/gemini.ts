import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: In a real application, this should be stored securely on the server
const API_KEY = 'AIzaSyDummy_Key_Replace_With_Real_Key';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateLearningPath(skills: string[], currentLevel: string, goals: string[]) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Create a personalized learning path for someone with the following profile:
      
      Current Skills: ${skills.join(', ')}
      Current Level: ${currentLevel}
      Learning Goals: ${goals.join(', ')}
      
      Please provide:
      1. A structured learning path with 5-7 key milestones
      2. Recommended resources for each milestone
      3. Estimated time to complete each milestone
      4. Skills that will be developed at each stage
      
      Format the response as a JSON object with the following structure:
      {
        "learningPath": [
          {
            "title": "Milestone Title",
            "description": "Description of what will be learned",
            "duration": "Estimated time",
            "skills": ["skill1", "skill2"],
            "resources": ["resource1", "resource2"],
            "difficulty": "beginner|intermediate|advanced"
          }
        ],
        "totalDuration": "Total estimated time",
        "skillsToGain": ["skill1", "skill2", "skill3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON response
    try {
      return JSON.parse(text);
    } catch {
      // Fallback if JSON parsing fails
      return generateFallbackLearningPath(skills, goals);
    }
  } catch (error) {
    console.error('Error generating learning path:', error);
    return generateFallbackLearningPath(skills, goals);
  }
}

export async function analyzeSkillGaps(currentSkills: string[], targetRole: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Analyze the skill gaps for someone wanting to become a ${targetRole}.
      
      Current Skills: ${currentSkills.join(', ')}
      Target Role: ${targetRole}
      
      Please provide:
      1. Skills they already have that are relevant
      2. Critical skills they're missing
      3. Nice-to-have skills for the role
      4. Priority order for learning missing skills
      
      Format as JSON:
      {
        "relevantSkills": ["skill1", "skill2"],
        "criticalGaps": ["skill1", "skill2"],
        "niceToHave": ["skill1", "skill2"],
        "learningPriority": ["skill1", "skill2", "skill3"],
        "overallReadiness": "percentage"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return generateFallbackSkillAnalysis(currentSkills, targetRole);
    }
  } catch (error) {
    console.error('Error analyzing skill gaps:', error);
    return generateFallbackSkillAnalysis(currentSkills, targetRole);
  }
}

export async function searchWithAI(query: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Based on the search query: "${query}"
      
      Provide relevant learning recommendations including:
      1. Suggested courses that match the query
      2. Learning paths that would be beneficial
      3. Skills to focus on
      4. Difficulty level recommendations
      
      Format as JSON:
      {
        "courses": [
          {
            "title": "Course Title",
            "description": "Course description",
            "difficulty": "beginner|intermediate|advanced",
            "duration": "estimated duration",
            "skills": ["skill1", "skill2"],
            "relevanceScore": 95
          }
        ],
        "learningPaths": [
          {
            "title": "Path Title",
            "description": "Path description",
            "difficulty": "beginner|intermediate|advanced",
            "duration": "estimated duration",
            "relevanceScore": 90
          }
        ],
        "recommendedSkills": ["skill1", "skill2", "skill3"],
        "suggestedLevel": "beginner|intermediate|advanced"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return generateFallbackSearchResults(query);
    }
  } catch (error) {
    console.error('Error searching with AI:', error);
    return generateFallbackSearchResults(query);
  }
}

export async function generateSkillAssessments(userLevel: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Generate skill assessments for a ${userLevel} level learner.
      
      Provide:
      1. Assessment categories (Programming, Design, Data Science, etc.)
      2. Specific assessments for each category
      3. Estimated completion time
      4. Skills being evaluated
      
      Format as JSON:
      {
        "assessments": [
          {
            "id": "unique_id",
            "title": "Assessment Title",
            "category": "Programming",
            "description": "What this assessment evaluates",
            "difficulty": "beginner|intermediate|advanced",
            "duration": "estimated time",
            "skillsEvaluated": ["skill1", "skill2"],
            "questionCount": 20,
            "type": "multiple-choice|coding|project"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return generateFallbackAssessments(userLevel);
    }
  } catch (error) {
    console.error('Error generating assessments:', error);
    return generateFallbackAssessments(userLevel);
  }
}

// Fallback functions for when AI is not available
function generateFallbackLearningPath(skills: string[], goals: string[]) {
  return {
    learningPath: [
      {
        title: "Foundation Building",
        description: "Strengthen your core skills and establish a solid foundation",
        duration: "2-3 weeks",
        skills: ["Problem Solving", "Critical Thinking"],
        resources: ["Online Courses", "Practice Exercises"],
        difficulty: "beginner"
      },
      {
        title: "Skill Development",
        description: "Focus on developing key technical and soft skills",
        duration: "4-6 weeks",
        skills: skills.slice(0, 3),
        resources: ["Tutorials", "Projects", "Mentorship"],
        difficulty: "intermediate"
      },
      {
        title: "Advanced Application",
        description: "Apply your skills in real-world scenarios",
        duration: "3-4 weeks",
        skills: ["Project Management", "Leadership"],
        resources: ["Capstone Project", "Industry Certification"],
        difficulty: "advanced"
      }
    ],
    totalDuration: "9-13 weeks",
    skillsToGain: [...skills, ...goals]
  };
}

function generateFallbackSkillAnalysis(currentSkills: string[], targetRole: string) {
  return {
    relevantSkills: currentSkills.slice(0, Math.ceil(currentSkills.length * 0.6)),
    criticalGaps: ["Communication", "Leadership", "Technical Expertise"],
    niceToHave: ["Project Management", "Data Analysis", "Design Thinking"],
    learningPriority: ["Communication", "Technical Expertise", "Leadership"],
    overallReadiness: "65%"
  };
}

function generateFallbackSearchResults(query: string) {
  return {
    courses: [
      {
        title: "Introduction to " + query,
        description: "A comprehensive course covering the fundamentals",
        difficulty: "beginner",
        duration: "4-6 weeks",
        skills: ["Fundamentals", "Best Practices"],
        relevanceScore: 95
      },
      {
        title: "Advanced " + query + " Techniques",
        description: "Deep dive into advanced concepts and applications",
        difficulty: "advanced",
        duration: "6-8 weeks",
        skills: ["Advanced Concepts", "Real-world Applications"],
        relevanceScore: 88
      }
    ],
    learningPaths: [
      {
        title: query + " Mastery Path",
        description: "Complete journey from beginner to expert",
        difficulty: "beginner",
        duration: "12-16 weeks",
        relevanceScore: 92
      }
    ],
    recommendedSkills: ["Fundamentals", "Problem Solving", "Critical Thinking"],
    suggestedLevel: "beginner"
  };
}

function generateFallbackAssessments(userLevel: string) {
  return {
    assessments: [
      {
        id: "prog-basics",
        title: "Programming Fundamentals",
        category: "Programming",
        description: "Evaluate your understanding of basic programming concepts",
        difficulty: userLevel as "beginner" | "intermediate" | "advanced",
        duration: "30 minutes",
        skillsEvaluated: ["Variables", "Functions", "Control Flow"],
        questionCount: 20,
        type: "multiple-choice" as const
      },
      {
        id: "web-dev",
        title: "Web Development Skills",
        category: "Web Development",
        description: "Test your knowledge of HTML, CSS, and JavaScript",
        difficulty: userLevel as "beginner" | "intermediate" | "advanced",
        duration: "45 minutes",
        skillsEvaluated: ["HTML", "CSS", "JavaScript"],
        questionCount: 25,
        type: "coding" as const
      },
      {
        id: "data-analysis",
        title: "Data Analysis Fundamentals",
        category: "Data Science",
        description: "Assess your data analysis and visualization skills",
        difficulty: userLevel as "beginner" | "intermediate" | "advanced",
        duration: "40 minutes",
        skillsEvaluated: ["Data Analysis", "Statistics", "Visualization"],
        questionCount: 22,
        type: "multiple-choice" as const
      }
    ]
  };
}