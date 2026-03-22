import React, { useMemo } from 'react';

const FuturisticBackground: React.FC = () => {
    // Stable random values computed once per mount
    const particles = useMemo(() =>
        Array.from({ length: 8 }, () => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            o: `${Math.random() * 0.3}`,
            dur: `${Math.random() * 8 + 8}s`,
            delay: `${Math.random() * 10}s`,
        })),
    []);

    return (
        <div className="fixed inset-0 bg-white overflow-hidden -z-10">
            {/* Soft Ambient Orbs — CSS classes, no inline styles */}
            <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] bg-orb-1" />
            <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-violet-200/40 rounded-full blur-[140px] bg-orb-2" />
            <div className="absolute top-[20%] right-[15%] w-[30%] h-[30%] bg-fuchsia-100/30 rounded-full blur-[100px] bg-orb-3" />

            {/* Minimal floaties — CSS custom properties for dynamic values */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-indigo-400 rounded-full blur-[2px] bg-particle"
                    style={{
                        '--x': p.x,
                        '--y': p.y,
                        '--o': p.o,
                        '--dur': p.dur,
                        '--delay': p.delay,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export default React.memo(FuturisticBackground);
