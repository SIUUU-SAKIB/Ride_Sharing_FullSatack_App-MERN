export default function RideXErrorPage({ onBack, onTryAgain, onContactSupport }) {
  return (
    <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center font-sans">
      <div className="w-[300px] bg-[#f8f9fb] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-center relative px-5 pt-5 pb-3">
          <button
            onClick={onBack}
            className="absolute left-5 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[#2ecc8e] font-extrabold text-xl tracking-tight">RideX</span>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center py-6 relative">
          {/* Blobs */}
          <div className="absolute w-28 h-28 rounded-full bg-blue-100 opacity-60 -left-2 top-2" />
          <div className="absolute w-16 h-16 rounded-full bg-pink-200 opacity-50 right-8 top-0" />

          {/* Car + alert icon */}
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-red-500" viewBox="0 0 64 64" fill="currentColor">
              {/* Car body */}
              <rect x="8" y="30" width="48" height="18" rx="4" fill="#e53e3e" />
              {/* Roof */}
              <path d="M18 30 L22 18 H42 L46 30 Z" fill="#c53030" />
              {/* Windows */}
              <rect x="24" y="20" width="7" height="8" rx="1" fill="#fed7d7" opacity="0.8" />
              <rect x="33" y="20" width="7" height="8" rx="1" fill="#fed7d7" opacity="0.8" />
              {/* Wheels */}
              <circle cx="18" cy="48" r="6" fill="#2d3748" />
              <circle cx="18" cy="48" r="2.5" fill="#718096" />
              <circle cx="46" cy="48" r="6" fill="#2d3748" />
              <circle cx="46" cy="48" r="2.5" fill="#718096" />
              {/* Headlights */}
              <rect x="9" y="36" width="5" height="3" rx="1" fill="#fefcbf" />
              <rect x="50" y="36" width="5" height="3" rx="1" fill="#fefcbf" />
            </svg>
            {/* Alert badge */}
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-white font-black text-sm leading-none">!</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="px-6 text-center">
          <h2 className="text-[17px] font-extrabold text-gray-900 mb-2 leading-snug">
            Oops! Something went wrong
          </h2>
          <p className="text-[13px] text-gray-400 leading-relaxed">
            We're having trouble loading this page.{" "}
            Please check your connection or try again in a few moments.
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pt-6 pb-2 flex flex-col items-center gap-3">
          <button
            onClick={onTryAgain}
            className="w-full py-3.5 bg-[#2ecc8e] hover:bg-[#27b87e] active:bg-[#1fa36e] text-white font-bold text-[15px] rounded-2xl transition-colors shadow-md shadow-green-200"
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            className="text-[#2ecc8e] font-semibold text-[14px] hover:underline transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 py-5">
          <span className="text-base">🎧</span>
          <button
            onClick={onContactSupport}
            className="text-[12px] text-gray-400 hover:text-[#2ecc8e] transition-colors"
          >
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
}