"use client";

import { useState, useRef } from "react";
import UploadScreen from "@/components/UploadScreen";
import ProcessingScreen from "@/components/ProcessingScreen";
import OutputScreen from "@/components/OutputScreen";

type AppState = "upload" | "processing" | "output" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setAppState("upload");
  };

  const handleGenerateClick = async () => {
    if (!uploadedImage) return;

    setAppState("processing");

    // Simulate API call - replace with actual backend endpoint
    try {
      // Mock delay to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // In production, this would be:
      // const response = await fetch('/api/personalize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image: uploadedImage })
      // });
      // const data = await response.json();
      // setGeneratedImage(data.illustratedImage);

      // Mock generated image (using a placeholder)
      setGeneratedImage(uploadedImage);
      setAppState("output");
    } catch (error) {
      setErrorMessage("We couldn't personalize the image. Please try another photo.");
      setAppState("error");
    }
  };

  const handleTryAgain = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setErrorMessage("");
    setAppState("upload");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {appState === "upload" && (
        <UploadScreen
          uploadedImage={uploadedImage}
          onImageUpload={handleImageUpload}
          onGenerateClick={handleGenerateClick}
          isGenerateDisabled={!uploadedImage}
        />
      )}

      {appState === "processing" && <ProcessingScreen />}

      {appState === "output" && generatedImage && (
        <OutputScreen
          generatedImage={generatedImage}
          originalImage={uploadedImage}
          onTryAgain={handleTryAgain}
        />
      )}

      {appState === "error" && (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
            <div className="mb-6 text-5xl">😢</div>
            <h2 className="mb-3 text-2xl font-bold text-gray-800">Oops!</h2>
            <p className="mb-8 text-gray-600">{errorMessage}</p>
            <button
              onClick={handleTryAgain}
              className="w-full rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
            >
              Try Another Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
