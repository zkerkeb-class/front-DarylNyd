const SkeletonSection = ({ className = '' }) => (
    <div className={className}>
        <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4" />
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
    </div>
);

const AnalysisSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Style Badge */}
            <div className="flex items-center justify-between">
                <div className="h-8 w-32 bg-gray-200 rounded-full" />
            </div>

            {/* Main Analysis Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-8">
                {/* Technical Assessment */}
                <SkeletonSection className="border-b border-gray-100 pb-6" />

                {/* Composition */}
                <SkeletonSection className="border-b border-gray-100 pb-6" />

                {/* Color Theory */}
                <SkeletonSection className="border-b border-gray-100 pb-6" />

                {/* Style & Context */}
                <SkeletonSection className="border-b border-gray-100 pb-6" />

                {/* Improvements */}
                <div className="space-y-4">
                    <div className="h-7 w-48 bg-gray-200 rounded-lg" />
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <div className="h-6 w-6 bg-gray-200 rounded-full flex-shrink-0" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Learning Resources */}
                <div className="mt-6 bg-gray-50 rounded-xl p-6">
                    <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisSkeleton; 