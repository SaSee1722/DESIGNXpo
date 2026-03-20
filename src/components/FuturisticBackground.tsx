import React, { useMemo } from 'react';
import { m } from 'framer-motion';

const FuturisticBackground: React.FC = () => {
    const particles = useMemo(() => Array.from({ length: 20 }), []);

    return (
        <div className="fixed inset-0 bg-white overflow-hidden -z-10">
            {/* Soft Ambient Orbs */}
            <m.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-sky-200/40 rounded-full blur-[120px]"
            />
            <m.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -40, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-violet-200/40 rounded-full blur-[140px]"
            />


            {/* Floaties */}
            {particles.map((_, i) => (
                <m.div
                    key={i}
                    initial={{
                        x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                        opacity: Math.random() * 0.3,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, -50],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 10,
                    }}
                    className="absolute w-2 h-2 bg-sky-400 rounded-full blur-[2px]"
                />
            ))}
        </div>
    );
};

export default FuturisticBackground;
