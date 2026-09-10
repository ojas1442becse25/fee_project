import { motion } from 'framer-motion';

const InterestsStep = ({ formData, updateForm }) => {
  const allInterests = [
    "Coding", "Artificial Intelligence", "Technology", "Mathematics",
    "Biology", "Medicine", "Design", "Gaming", "Business", "Finance",
    "Law", "Government Services", "Cyber Security", "Data Analysis", "Creative Arts"
  ];

  const allSkills = [
    "Problem Solving", "Programming", "Communication", "Creativity",
    "Leadership", "Mathematics", "Research", "Analytical Thinking", "Teamwork"
  ];

  const toggleSelection = (field, value) => {
    const currentList = formData[field] || [];
    const isSelected = currentList.includes(value);

    let newList;
    if (isSelected) {
      newList = currentList.filter(item => item !== value);
    } else {
      newList = [...currentList, value];
    }

    updateForm({ [field]: newList });
  };

  return (
    <motion.div
      className="form-step-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="form-group">
        <label>Select Your Interests <span>(Multiple allowed)</span></label>
        <div className="chips-container">
          {allInterests.map(interest => (
            <button
              key={interest}
              className={`chip chip-multi ${formData.interests?.includes(interest) ? 'active' : ''}`}
              onClick={() => toggleSelection('interests', interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group margin-top-large">
        <label>Select Your Skills <span>(Multiple allowed)</span></label>
        <div className="chips-container">
          {allSkills.map(skill => (
            <button
              key={skill}
              className={`chip chip-multi ${formData.skills?.includes(skill) ? 'active' : ''}`}
              onClick={() => toggleSelection('skills', skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InterestsStep;