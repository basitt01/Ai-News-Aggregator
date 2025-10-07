// src/components/NewsCard.jsx
import React from 'react';
import { Zap, TrendingUp, TrendingDown, Clock } from 'lucide-react';

// --- UTILITY COMPONENTS ---

// Dynamic Sentiment Gauge (Circular Indicator)
const SentimentGauge = ({ sentiment }) => {
  const getStyle = (s) => {
    switch (s) {
      case 'Positive': return { color: 'text-sentiment-positive', shadow: '0 0 8px #34D399', icon: TrendingUp };
      case 'Negative': return { color: 'text-sentiment-negative', shadow: '0 0 8px #F87171', icon: TrendingDown };
      default: return { color: 'text-sentiment-neutral', shadow: '0 0 8px #FBBF24', icon: Clock };
    }
  };
  const { color, shadow, icon: Icon } = getStyle(sentiment);

  return (
    <div className={`flex items-center space-x-2 p-2 rounded-md ${color} font-bold text-sm bg-black/30 border border-current/50 shadow-md`} style={{ boxShadow: shadow }}>
      <Icon className="w-4 h-4" />
      <span>{sentiment}</span>
    </div>
  );
};

// Authenticity Score Visual (Segmented Bar)
const AuthenticityScoreVisual = ({ score }) => {
  const scoreValue = parseInt(score);
  let barColor = 'bg-sentiment-neutral';
  let shadowColor = 'shadow-neon-shadow';

  if (scoreValue >= 90) {
    barColor = 'bg-sentiment-positive';
    shadowColor = 'shadow-sentiment-positive';
  } else if (scoreValue < 50) {
    barColor = 'bg-sentiment-negative';
    shadowColor = 'shadow-sentiment-negative';
  }

  return (
    <div className="w-full bg-matrix-dark border border-primary-neon/50 rounded-full h-3">
      <div 
        className={`h-full rounded-full transition-all duration-700 ${barColor}`} 
        style={{ width: `${scoreValue}%`, boxShadow: shadowColor, filter: 'saturate(1.5)' }}
      ></div>
      <span className="text-xs text-primary-neon/80 font-mono mt-1 block text-right">
        {scoreValue}%
      </span>
    </div>
  );
};


// --- MAIN CARD COMPONENT ---
const NewsCard = React.memo(({ article }) => {
  const analysis = article.analysis || {};
  const isError = analysis.error;

  return (
    <div className="bg-container-bg p-4 rounded-lg border border-primary-neon transition duration-300 ease-in-out hover:shadow-neon-shadow group">
      
      {/* HEADER */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
        <h2 className="text-xl font-sans font-bold text-primary-neon hover:text-secondary-accent transition duration-150">
          {article.title}
        </h2>
      </a>
      <p className="text-xs text-gray-400 mt-1">Source: <span className="text-secondary-accent">{article.source}</span></p>

      {/* AI ANALYSIS SECTION (The Focus) */}
      <div className="mt-4 p-4 border border-secondary-accent/50 rounded-lg bg-black/30 transition duration-300 group-hover:border-primary-neon/80 group-hover:animate-pulse">
        <h3 className="flex items-center text-sm font-bold text-secondary-accent mb-3 uppercase">
          <Zap className="w-4 h-4 mr-2" />
          AI Analysis Chamber
        </h3>

        {isError ? (
          <p className="text-sentiment-negative font-mono">{analysis.details || analysis.error}</p>
        ) : (
          <>
            {/* Summary */}
            <div className="mb-4">
              <p className="text-primary-neon text-sm font-mono whitespace-pre-line leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 border-t border-primary-neon/20 pt-4">
              {/* Sentiment */}
              <div>
                <span className="text-xs text-gray-500 uppercase block mb-1">Sentiment:</span>
                <SentimentGauge sentiment={analysis.sentiment} />
              </div>

              {/* Authenticity Score */}
              <div>
                <span className="text-xs text-gray-500 uppercase block mb-2">Authenticity Score:</span>
                <AuthenticityScoreVisual score={analysis.authenticity_score} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default NewsCard;
