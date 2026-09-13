import { careers } from '../data/careers.js';

// ------------------------------------------------------------------
// Career matching engine
//
// Every career is scored against the user's profile with a fixed-weight
// system that always adds up to 100, so a match percentage is realistic
// and comparable across careers:
//
//   Academic Stream    25  (is the user's stream recommended?)
//   Interests          25  (share of the career's interest set selected)
//   Strengths/Skills   25  (share of the career's required skills selected)
//   Career Goal        15  (does the career's category match the goal?)
//   Marks / Academics  10  (does the profile meet the career minimum?)
//                       ------
//   Total             100
//
// The same weights also drive a personalized "why" - every reason is
// generated from the user's actual selections, never a generic phrase.
// ------------------------------------------------------------------

const WEIGHT = {
  stream: 25,
  interests: 25,
  skills: 25,
  goal: 15,
  marks: 10
};

// Joins a list naturally: "X", "X and Y", "X, Y and Z".
const listWords = (arr) => {
  if (arr.length <= 1) return arr[0] || '';
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
  return `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;
};

// Builds the single short headline reason shown at the top of a card.
const buildPersonalReason = (matchedInterests, matchedSkills, streamMatch, stream) => {
  if (matchedInterests.length && matchedSkills.length) {
    return `Your interest in ${listWords(matchedInterests)} and strength in ${listWords(matchedSkills)} strongly align with this career.`;
  }
  if (matchedInterests.length) {
    return `Your interest in ${listWords(matchedInterests)} is a strong driver for this career field.`;
  }
  if (matchedSkills.length) {
    return `Your strength in ${listWords(matchedSkills)} is central to what this career demands.`;
  }
  if (streamMatch) {
    return `Your ${stream} academic background is the ideal foundation for this career path.`;
  }
  return 'This career aligns with your profile, strengths, and goals.';
};

export const calculateMatches = (userProfile) => {
  const {
    stream,
    marks,
    interests = [],          // multi-selected interest labels
    skills = [],             // multi-selected strength labels
    careerGoal = ''          // single-selected goal label
  } = userProfile;

  const parsedMarks = parseInt(marks, 10) || 0;

  const scoredCareers = careers.map((career) => {
    const details = { stream: 0, interests: 0, skills: 0, goal: 0, marks: 0 };

    // 1. Academic stream (max 25)
    const streamMatch =
      career.recommendedStreams.includes(stream) ||
      (stream === 'Other' && career.recommendedStreams.includes('Other'));
    details.stream = streamMatch ? WEIGHT.stream : 0;

    // 2. Interests (max 25) - proportion of the career's interest set selected
    const matchedInterests = career.interests.filter((i) => interests.includes(i));
    details.interests = career.interests.length
      ? Math.round((matchedInterests.length / career.interests.length) * WEIGHT.interests)
      : 0;

    // 3. Strengths / skills (max 25)
    const matchedSkills = career.requiredSkills.filter((s) => skills.includes(s));
    details.skills = career.requiredSkills.length
      ? Math.round((matchedSkills.length / career.requiredSkills.length) * WEIGHT.skills)
      : 0;

    // 4. Career goal (max 15) - exact category match scores highest
    if (careerGoal && careerGoal !== 'Not Sure') {
      if (career.category === careerGoal) {
        details.goal = WEIGHT.goal;
      } else if (career.category.toLowerCase().includes(careerGoal.toLowerCase())) {
        details.goal = Math.round(WEIGHT.goal * 0.75); // partial overlap
      }
    } else {
      details.goal = 7; // neutral when no specific goal is chosen
    }

    // 5. Academic performance (max 10) - passing the minimum scores fully
    if (parsedMarks >= career.minimumMarks) {
      details.marks = WEIGHT.marks;
    } else if (career.minimumMarks - parsedMarks <= 10) {
      details.marks = Math.max(0, WEIGHT.marks - (career.minimumMarks - parsedMarks));
    }

    const matchScore = Math.round(
      details.stream + details.interests + details.skills + details.goal + details.marks
    );

    // ----- Personalized explanations (generated from real selections) -----
    const matchReasons = [];
    if (matchedInterests.length) {
      matchReasons.push(`Your interest in ${listWords(matchedInterests)} drives this field.`);
    }
    if (matchedSkills.length) {
      matchReasons.push(`Your strength in ${listWords(matchedSkills)} is exactly what ${career.title} needs.`);
    }
    if (streamMatch) {
      matchReasons.push(`Your ${stream} stream is the recommended academic route.`);
    }
    if (careerGoal && details.goal >= 10) {
      matchReasons.push(`A ${careerGoal} career goal fits this ${career.category} role.`);
    }
    if (details.marks === 10) {
      matchReasons.push(`Your academics clear the ${career.minimumMarks}% requirement.`);
    } else if (details.marks > 0) {
      matchReasons.push(`You are close to the ${career.minimumMarks}% academic benchmark.`);
    }

    return {
      ...career,
      matchScore,
      matchDetails: details, // weight breakdown - useful for the wireframe/debug
      matchReasons,
      personalReason: buildPersonalReason(matchedInterests, matchedSkills, streamMatch, stream)
    };
  });

  scoredCareers.sort((a, b) => b.matchScore - a.matchScore);

  // Return the Top 3 matches.
  return scoredCareers.slice(0, 3);
};