import { careers } from '../data/careers';

export const calculateMatches = (userProfile) => {
  const {
    stream,
    marks,
    interests, // Array of strings
    skills, // Array of strings
    budget,
    careerGoal
  } = userProfile;

  const parsedMarks = parseInt(marks) || 0;

  const scoredCareers = careers.map(career => {
    let score = 0;
    const matchDetails = {
      interests: 0,
      skills: 0,
      stream: 0,
      marks: 0,
      goal: 0,
      budget: 0
    };

    // 1. Interest Match (max 35)
    // Calculate percentage of career interests satisfied by user interests
    if (career.interests.length > 0 && interests.length > 0) {
      const matchedInterests = career.interests.filter(i => interests.includes(i));
      const interestScore = (matchedInterests.length / career.interests.length) * 35;
      score += interestScore;
      matchDetails.interests = interestScore;
    }

    // 2. Skill Match (max 20)
    if (career.skills.length > 0 && skills.length > 0) {
      const matchedSkills = career.skills.filter(s => skills.includes(s));
      const skillScore = (matchedSkills.length / career.skills.length) * 20;
      score += skillScore;
      matchDetails.skills = skillScore;
    }

    // 3. Stream Match (max 15)
    if (stream && career.recommendedStreams.includes(stream)) {
      score += 15;
      matchDetails.stream = 15;
    } else if (stream === 'Other' && career.recommendedStreams.includes('Other')) {
        score += 15;
        matchDetails.stream = 15;
    }

    // 4. Marks Match (max 10)
    if (parsedMarks >= career.minimumMarks) {
      // Full points if they meet or exceed
      score += 10;
      matchDetails.marks = 10;
    } else {
      // Partial points if close (within 10 marks)
      const diff = career.minimumMarks - parsedMarks;
      if (diff <= 10) {
        const markScore = 10 - diff;
        score += Math.max(0, markScore);
        matchDetails.marks = Math.max(0, markScore);
      }
    }

    // 5. Career Goal Match (max 10)
    if (careerGoal && careerGoal !== 'Not Sure') {
      if (career.category === careerGoal || career.category.includes(careerGoal)) {
        score += 10;
        matchDetails.goal = 10;
      }
    } else {
      // If Not Sure, give partial points to all to not penalize
      score += 5;
      matchDetails.goal = 5;
    }

    // 6. Budget Match (max 10)
    if (budget && career.budgetLevel.includes(budget)) {
      score += 10;
      matchDetails.budget = 10;
    } else if (budget) {
       // if not match, give partial if low demanding high, etc.
       // Keep it simple
       score += 5;
       matchDetails.budget = 5;
    }

    // Generate dynamic explanation
    let reason = "This career aligns closely with your profile. ";
    if (matchDetails.interests > 20) reason += "It strongly matches your declared interests. ";
    if (matchDetails.skills > 12) reason += "Your selected skills are highly relevant here. ";
    if (matchDetails.stream === 15) reason += "Your academic stream is a perfect fit. ";

    return {
      ...career,
      matchScore: Math.round(score),
      matchDetails,
      reason
    };
  });

  // Sort descending by matchScore
  scoredCareers.sort((a, b) => b.matchScore - a.matchScore);

  // Return top 3
  return scoredCareers.slice(0, 3);
};
