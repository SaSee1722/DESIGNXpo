import React, { useMemo } from 'react';

const FuturisticBackground: React.FC = () => {
    // Stable random CSS rules computed once per mount
    const particleCSS = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const x = (Math.random() * 100).toFixed(2);
            const y = (Math.random() * 100).toFixed(2);
            const o = (Math.random() * 0.3).toFixed(3);
            const dur = (Math.random() * 8 + 8).toFixed(1);
            const delay = (Math.random() * 10).toFixed(1);
            return `.bg-particle-${i}{left:${x}%;top:${y}%;opacity:${o};animation:bg-floaty ${dur}s ease-in-out ${delay}s infinite;will-change:transform,opacity}`;
        }).join('');
    }, []);

    return (
        <div className="fixed inset-0 bg-white overflow-hidden -z-10">
            <style>{particleCSS}</style>
            {/* Soft Ambient Orbs */}
            <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] bg-orb-1" />
            <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-violet-200/40 rounded-full blur-[140px] bg-orb-2" />
            <div className="absolute top-[20%] right-[15%] w-[30%] h-[30%] bg-fuchsia-100/30 rounded-full blur-[100px] bg-orb-3" />

            {/* Minimal floaties */}
            {Array.from({ length: 8 }, (_, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 bg-indigo-400 rounded-full blur-[2px] bg-particle-${i}`}
                />
            ))}
        </div>
    );
};

export default React.memo(FuturisticBackground);
