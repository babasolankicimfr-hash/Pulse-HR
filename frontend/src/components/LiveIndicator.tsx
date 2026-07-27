

export const LiveIndicator = ({ isConnected }: { isConnected: boolean }) => {
    return (
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border shadow-sm">
            <span className="relative flex h-3 w-3">
                {isConnected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-sm font-medium text-slate-700">
                {isConnected ? 'Live Sync Active' : 'Disconnected'}
            </span>
        </div>
    );
};
