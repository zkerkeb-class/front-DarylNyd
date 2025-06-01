import { motion } from 'framer-motion';

const FeedbackSection = ({ title, content, className = '' }) => (
    <div className={className}>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {title}
        </h3>
        <div className="prose prose-sm max-w-none text-gray-700">
            {content}
        </div>
    </div>
);

const FeatureCard = ({ icon, title, content }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-700">{content}</p>
            </div>
        </div>
    </motion.div>
);

const TechnicalAssessment = ({ content, onReanalyze }) => {
    // Parse the content into sections
    const sections = content.split('\n\n').filter(section => section.trim());

    const features = [
        {
            icon: (
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: "Technical Quality",
            content: sections[0] || "Analysis of technical execution and quality"
        },
        {
            icon: (
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4 4L19 7" />
                </svg>
            ),
            title: "Strengths",
            content: sections[1] || "Identified strong points in the artwork"
        },
        {
            icon: (
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Areas for Improvement",
            content: sections[2] || "Areas that could be enhanced"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Features Breakdown</h3>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={onReanalyze}
                        className="inline-flex items-center px-4 py-2 border border-primary-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reanalyze
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Analysis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </div>
    );
};

const LearningResource = ({ resource }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-start">
            <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
                <div className="mt-2 flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {resource.type}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {resource.difficulty}
                    </span>
                </div>
            </div>
        </div>
        {resource.url && (
            <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
            >
                Learn More
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        )}
    </div>
);

const AnalysisResults = ({ results, onReanalyze }) => {
    if (!results) return null;

    const {
        style,
        technicalAssessment,
        composition,
        colorTheory,
        styleAndContext,
        improvements,
        learning_resources
    } = results;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Art Style Badge */}
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800"
                >
                    <span className="text-sm font-medium">{style}</span>
                </motion.div>
            </div>

            {/* Main Analysis Grid */}
            <div className="space-y-8">
                {/* Technical Assessment */}
                {technicalAssessment && (
                    <TechnicalAssessment content={technicalAssessment} onReanalyze={onReanalyze} />
                )}

                {/* Composition Analysis */}
                {composition && (
                    <div className="border-t border-gray-100 pt-6">
                        <FeedbackSection
                            title="Composition"
                            content={composition}
                        />
                    </div>
                )}

                {/* Color Theory */}
                {colorTheory && (
                    <div className="border-t border-gray-100 pt-6">
                        <FeedbackSection
                            title="Color Theory"
                            content={colorTheory}
                        />
                    </div>
                )}

                {/* Style & Context */}
                {styleAndContext && (
                    <div className="border-t border-gray-100 pt-6">
                        <FeedbackSection
                            title="Style & Context"
                            content={styleAndContext}
                        />
                    </div>
                )}

                {/* Improvements */}
                {improvements && improvements.length > 0 && (
                    <div className="border-t border-gray-100 pt-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Suggested Improvements</h3>
                        </div>
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
                            <ul className="space-y-3">
                                {improvements.map((improvement, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center mr-3">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-700">{improvement}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Learning Resources */}
                {learning_resources && learning_resources.length > 0 && (
                    <div className="border-t border-gray-100 pt-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Learning Resources</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {learning_resources.map((resource, index) => (
                                <LearningResource key={index} resource={resource} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AnalysisResults; 