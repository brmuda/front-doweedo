import { cn } from "@/lib/utils";

interface VoiceVisualizerProps {
  audioLevels: number[];
  className?: string;
}

export function VoiceVisualizer({ audioLevels, className }: VoiceVisualizerProps) {
  // Create a flowing wave effect like Telegram
  const barCount = 24;
  
  return (
    <div className={cn("flex items-center justify-center gap-[2px] h-10", className)}>
      {Array.from({ length: barCount }).map((_, index) => {
        // Get the corresponding audio level, interpolating if needed
        const levelIndex = Math.floor((index / barCount) * audioLevels.length);
        const level = audioLevels[levelIndex] || 0;
        
        // Create wave-like effect with slight offset based on position
        const wave = Math.sin((index / barCount) * Math.PI) * 0.3;
        const heightMultiplier = level + wave * level;
        
        return (
          <div
            key={index}
            className="w-[3px] bg-primary rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${Math.max(3, Math.min(32, heightMultiplier * 32))}px`,
              opacity: 0.6 + level * 0.4,
              transform: `scaleY(${0.3 + level * 0.7})`,
            }}
          />
        );
      })}
    </div>
  );
}