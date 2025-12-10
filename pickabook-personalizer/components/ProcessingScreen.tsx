"use client";

export default function ProcessingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center animate-fade-in">
        {/* Animated Loader */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            {/* Outer spinning ring */}
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow"
              style={{
                borderTopColor: "var(--primary)",
                borderRightColor: "var(--secondary)",
              }}
            />
            {/* Inner pulsing circle */}
            <div
              className="absolute inset-2 rounded-full animate-pulse-glow"
              style={{
                backgroundColor: "var(--accent)",
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              ✨
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="mb-3 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Creating your personalized illustration…
        </h2>

        {/* Subtext */}
        <p className="mb-8 text-sm" style={{ color: "var(--foreground)" }}>
          This may take 5–10 seconds
        </p>

        {/* Process Steps */}
        <div className="space-y-3 mb-8">
          <ProcessStep icon="🔍" text="Detecting your child's face" />
          <ProcessStep icon="🎨" text="Stylizing the illustration" />
          <ProcessStep icon="📖" text="Inserting into storybook template" />
        </div>

        {/* Loading Bar */}
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          <div
            className="h-full rounded-full animate-shimmer"
            style={{
              background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--primary))",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: "var(--border-color)" }}>
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
        {text}
      </span>
    </div>
  );
}
