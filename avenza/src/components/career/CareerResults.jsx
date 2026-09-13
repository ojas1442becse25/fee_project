import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import CareerCard from './CareerCard';
import Button from '../ui/Button';
import useSavedCareers from '../../hooks/useSavedCareers';

// CareerResults
// -------------
// Renders the Top 3 career matches returned by the recommendation engine.
// Used by the dedicated /career/results page. Owns the saved-careers state
// and passes isSaved/onToggleSave down to each CareerCard (lifting state
// up + props).
const CareerResults = ({ results, onRestart }) => {
  const { isSaved, toggleSave } = useSavedCareers();

  return (
    <motion.div
      className="results-container-pro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header-pro">
        <h2>Top Career Matches</h2>
        <p>
          Your top {results.length} recommendations based on your profile, interests and academic background.
        </p>
      </div>

      <div className="results-grid">
        {results.map((career, index) => (
          <CareerCard
            key={career.id}
            career={career}
            rank={index + 1}
            isSaved={isSaved(career.id)}
            onToggleSave={toggleSave}
          />
        ))}
      </div>

      {onRestart && (
        <div className="results-actions">
          <Button variant="secondary" onClick={onRestart} icon={RotateCcw}>
            Start New Assessment
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default CareerResults;