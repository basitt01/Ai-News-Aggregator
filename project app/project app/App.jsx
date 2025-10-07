// App.jsx
import React from 'react';
import ControlPanel from './components/ControlPanel';
import NewsCard from './components/NewsCard';
import GlobalMetrics from './components/GlobalMetrics';
import { useData } from './context/DataContext';
import { Loader } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-matrix-dark text-white font-sans">
        <MainDashboard />
    </div>
  );
};

const MainDashboard = () => {
    const { articles, loading, error, query } = useData();
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="col-span-1 md:col-span-2 flex justify-center items-center h-full">
                    <Loader className="w-10 h-10 text-primary-neon animate-spin shadow-neon-shadow" />
                    <p className="ml-4 text-primary-neon text-lg font-mono">
                        Indexing Matrix Data...
                    </p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="col-span-1 md:col-span-2 p-10 text-center text-sentiment-negative">
                    <h2 className="text-xl font-bold mb-4">ERROR: Data Stream Interrupted</h2>
                    <p className="font-mono">{error}</p>
                    <p className="mt-2">Check Flask server at http://localhost:5000 and console for details.</p>
                </div>
            );
        }

        if (articles.length === 0) {
            return (
                <div className="col-span-1 md:col-span-2 p-10 text-center text-secondary-accent">
                    <h2 className="text-xl font-bold mb-4">No Data Artifacts Found</h2>
                    <p>Try refining your query: <span className="font-mono text-primary-neon">{query || 'Top Headlines'}</span></p>
                </div>
            );
        }

        // Display the list of articles
        return (
            <div className="p-6 overflow-y-auto space-y-6">
                <h1 className="text-2xl text-primary-neon font-bold border-b border-primary-neon/30 pb-3 mb-6">
                    {query ? `Search Results for "${query}"` : "Top Global Headlines"}
                </h1>
                {articles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_280px] min-h-screen">
            {/* Sidebar (Control Panel) */}
            <div className="h-full">
                <ControlPanel />
            </div>

            {/* Main Content (News List) */}
            <div className="md:col-span-1 min-h-screen">
                {renderContent()}
            </div>

            {/* Utility/Metrics Panel */}
            <div className="hidden md:block h-full">
                <GlobalMetrics />
            </div>
        </div>
    );
};

// Wrap MainDashboard with the DataProvider
const Root = () => (
    <DataProvider>
        <App />
    </DataProvider>
);

export default Root;
