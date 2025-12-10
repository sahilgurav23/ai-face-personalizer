"use client";

import { useState } from "react";

interface OutputScreenProps {
  generatedImage: string;
  originalImage: string | null;
  onTryAgain: () => void;
}

export default function OutputScreen({
  generatedImage,
  originalImage,
  onTryAgain,
}: OutputScreenProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "personalized-storybook.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: "var(--primary)" }}>
            ✨ Your Personalized Story
          </h1>
          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            Your child is ready for an adventure!
          </p>
        </div>

        {/* Main Output Container */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-lg">
          {showComparison && originalImage ? (
            // Comparison Slider
            <div className="relative w-full bg-gray-200">
              <img
                src={generatedImage}
                alt="Generated illustration"
                className="w-full h-auto block"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={originalImage}
                  alt="Original photo"
                  className="w-full h-full object-cover"
                  style={{ width: `${(100 / sliderPosition) * 100}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
              />
              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                  <svg
                    className="w-4 h-4 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1zm4 0a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            // Single Image View
            <img
              src={generatedImage}
              alt="Generated personalized illustration"
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        {/* Storybook Frame Decoration */}
        <div
          className="mb-8 rounded-2xl p-6 text-center"
          style={{ backgroundColor: "var(--soft-blue)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            📖 Ready for the storybook!
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--foreground)" }}>
            Your personalized character is now part of an illustrated adventure
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full rounded-full px-6 py-4 font-bold text-white transition-all hover:shadow-lg hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
            }}
          >
            ⬇️ Download Image
          </button>

          {/* Comparison Toggle */}
          {originalImage && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full rounded-full px-6 py-3 font-semibold transition-all"
              style={{
                backgroundColor: "var(--soft-purple)",
                color: "var(--foreground)",
              }}
            >
              {showComparison ? "Hide Comparison" : "👀 Before → After"}
            </button>
          )}

          {/* Try Another Photo Button */}
          <button
            onClick={onTryAgain}
            className="w-full rounded-full px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: "var(--border-color)",
              color: "var(--foreground)",
            }}
          >
            Try Another Photo
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs" style={{ color: "var(--foreground)" }}>
          <p>💡 Tip: You can personalize multiple children and create a family collection!</p>
        </div>
      </div>
    </div>
  );
}
