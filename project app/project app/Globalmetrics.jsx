// src/components/GlobalMetrics.jsx
import React from 'react';
import { Activity, HardHat } from 'lucide-react';
import { useData } from '../context/DataContext';

const GlobalMetrics = () => {
  const { articles } = useData();

  const totalArticles = articles.length;
  
  // Calculate Average Authenticity Score
  const validScores = articles
    .map(a => parseInt(a.analysis?.authenticity_score))
    .filter(score => !isNaN(score));
  
  const averageScore = validScores.length 
    ? (validScores.reduce((sum, score) => sum + score, 0) / validScores.length).toFixed(1)
    : 'N/A';

  return (
    <div className="p-6 h-full flex flex-col space-y-8 bg-container-bg border-l border-secondary-accent">
      <h3 className="flex items-center text-lg font-bold text-secondary-accent uppercase border-b border-secondary-accent/50 pb-3">
        <Activity className="w-5 h-5 mr-2" />
        Global Metrics
      </h3>

      <div className="space-y-4">
        
        {/* Total Article Count */}
        <div className="p-3 bg-black/30 rounded-md border border-primary-neon/50 shadow-neon-shadow">
          <span className="text-sm text-gray-500 uppercase block">Total Articles Rendered:</span>
          <span className="text-3xl text-primary-neon font-mono font-bold">{totalArticles}</span>
        </div>

        {/* Average Authenticity Score */}
        <div className="p-3 bg-black/30 rounded-md border border-secondary-accent/50 shadow-accent-shadow">
          <span className="text-sm text-gray-500 uppercase block">Avg. Authenticity Score:</span>
          <span className="text-3xl text-secondary-accent font-mono font-bold">{averageScore}</span>
        </div>
        
        {/* Placeholder for future metrics */}
        <div className="pt-4 border-t border-primary-neon/20">
            <span className="flex items-center text-xs text-gray-600 uppercase">
                <HardHat className="w-3 h-3 mr-1" />
                System Status: NOMINAL
            </span>
        </div>

      </div>
    </div>
  );
};

export default GlobalMetrics;
