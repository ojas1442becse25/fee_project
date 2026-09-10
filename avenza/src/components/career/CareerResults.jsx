import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import CareerCard from './CareerCard';
import { useNavigate } from 'react-router-dom';

const CareerResults = ({ results, resetForm }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="results-container-pro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="results-header-pro">
        <h2>Career Recommendations</h2>
        <p>Based on your profile, interests and academic background.</p>
      </div>

      <div className="results-grid">
        {results.map((career, index) => (
          <CareerCard key={career.id} career={career} rank={index + 1} />
        ))}
      </div>

      <div className="results-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/roadmap')}
        >
          <span>View Detailed Roadmap</span>
          <ArrowRight size={18} />
        </button>
        <button
          className="btn btn-secondary"
          onClick={resetForm}
        >
          <RotateCcw size={18} />
          <span>Start New Assessment</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CareerResults;