"use client";

import { useRef, useState } from "react";

interface UploadScreenProps {
  uploadedImage: string | null;
  onImageUpload: (imageData: string) => void;
  onGenerateClick: () => void;
  isGenerateDisabled: boolean;
}

export default function UploadScreen({
  uploadedImage,
  onImageUpload,
  onGenerateClick,
  isGenerateDisabled,
}: UploadScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold" style={{ color: "var(--primary)" }}>
            ✨ Pickabook
          </h1>
          <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Create a Personalized Storybook
          </p>
        </div>

        {/* Main Content */}
        {!uploadedImage ? (
          <>
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="mb-6 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all"
              style={{
                borderColor: isDragging ? "var(--primary)" : "var(--border-color)",
                backgroundColor: isDragging ? "var(--primary-light)" : "transparent",
              }}
            >
              <div className="mb-4 text-5xl">📸</div>
              <h2 className="mb-2 text-xl font-bold" style={{ color: "var(--foreground)" }}>
                Upload your child's photo
              </h2>
              <p className="mb-4 text-sm" style={{ color: "var(--foreground)" }}>
                Drag and drop or click to select
              </p>
              <p className="text-xs" style={{ color: "var(--foreground)" }}>
                JPEG, PNG (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: "var(--soft-blue)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  🎨 AI-Powered Illustration
                </p>
                <p className="text-xs" style={{ color: "var(--foreground)" }}>
                  Your photo becomes a magical illustrated character
                </p>
              </div>
              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: "var(--soft-purple)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  📖 Storybook Ready
                </p>
                <p className="text-xs" style={{ color: "var(--foreground)" }}>
                  Instantly placed in a beautiful storybook template
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Preview Section */}
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={uploadedImage}
                alt="Uploaded preview"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Preview Info */}
            <div className="mb-6 rounded-2xl p-4" style={{ backgroundColor: "var(--accent)" }}>
              <p className="text-center text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                ✓ Photo ready for personalization
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={onGenerateClick}
              disabled={isGenerateDisabled}
              className="w-full rounded-full px-6 py-4 font-bold text-white transition-all mb-3"
              style={{
                background: isGenerateDisabled
                  ? "#ccc"
                  : "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                cursor: isGenerateDisabled ? "not-allowed" : "pointer",
                opacity: isGenerateDisabled ? 0.6 : 1,
              }}
            >
              ✨ Generate Personalized Illustration
            </button>

            {/* Change Photo Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-full px-6 py-3 font-semibold transition-all"
              style={{
                backgroundColor: "var(--border-color)",
                color: "var(--foreground)",
              }}
            >
              Change Photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleInputChange}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
