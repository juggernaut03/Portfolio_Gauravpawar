import { motion, AnimatePresence } from 'framer-motion';

const LetterExplosion = ({ text, isExploding, onComplete }) => {
    const characters = text.split('');

    // Generate random trajectories for each character
    const generateRandomTrajectory = (index) => {
        const randomX = (Math.random() - 0.5) * 1000; // Random horizontal movement
        const randomY = Math.random() * 1000 + 500; // Always fall down
        const randomRotate = (Math.random() - 0.5) * 720; // Random rotation
        const randomDelay = Math.random() * 0.1; // Slight stagger

        return {
            initial: { opacity: 1, x: 0, y: 0, rotate: 0 },
            animate: isExploding
                ? {
                    opacity: 0,
                    x: randomX,
                    y: randomY,
                    rotate: randomRotate,
                    transition: {
                        duration: 1.2,
                        delay: randomDelay,
                        ease: [0.16, 1, 0.3, 1],
                    },
                }
                : { opacity: 1, x: 0, y: 0, rotate: 0 },
        };
    };

    return (
        <AnimatePresence>
            {!isExploding ? (
                <motion.div
                    className="inline-block"
                    onAnimationComplete={onComplete}
                >
                    {characters.map((char, index) => {
                        const trajectory = generateRandomTrajectory(index);
                        return (
                            <motion.span
                                key={index}
                                className="inline-block will-change-transform"
                                {...trajectory}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        );
                    })}
                </motion.div>
            ) : (
                <div className="inline-block">
                    {characters.map((char, index) => {
                        const trajectory = generateRandomTrajectory(index);
                        return (
                            <motion.span
                                key={index}
                                className="inline-block will-change-transform"
                                {...trajectory}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        );
                    })}
                </div>
            )}
        </AnimatePresence>
    );
};

export default LetterExplosion;
