"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

const Slide = ({ slide, index, current, handleSlideClick }) => {
    const slideRef = useRef(null);
    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    const { src, button, title, color } = slide;

    return (
        <div className="[perspective:1200px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[90vw] md:w-[60vw] aspect-[16/9] mx-[4vmin] z-10"
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.98) rotateX(8deg)"
                            : "scale(1) rotateX(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
                    style={{
                        backgroundColor: color || "#1D1F2F",
                        transform:
                            current === index
                                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                                : "none",
                    }}
                >
                    {src ? (
                        <img
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out"
                            style={{
                                opacity: current === index ? 1 : 0.5,
                            }}
                            alt={title}
                            src={src}
                            onLoad={imageLoaded}
                            loading="eager"
                            decoding="sync"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                            style={{ backgroundColor: color }}
                        />
                    )}
                    {/* Bottom gradient overlay with project color for text readability */}
                    <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                            background: current === index
                                ? `linear-gradient(to top, ${color}ee 0%, ${color}80 30%, transparent 60%)`
                                : `linear-gradient(to top, ${color}80 0%, transparent 40%)`
                        }}
                    />
                </div>

                <article
                    className={`absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end transition-opacity duration-500 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                >
                    {/* Work Name - Bottom Left */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight">
                        {title}
                    </h2>

                    {/* View Case - Pure Text with Arrow */}
                    <span className="text-sm font-medium text-black hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1">
                        {button} <span className="ml-1">→</span>
                    </span>
                </article>
            </li>
        </div>
    );
};

const CarouselControl = ({ type, title, handleClick }) => {
    return (
        <button
            className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""
                }`}
            title={title}
            onClick={handleClick}
        >
            <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
    );
};

export default function Carousel({ slides, onSlideClick, autoScrollInterval = 3000 }) {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const intervalRef = useRef(null);
    const dragStartX = useRef(0);
    const dragStartIndex = useRef(0);

    // Auto-scroll effect
    useEffect(() => {
        if (isPaused) return;

        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, autoScrollInterval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, slides.length, autoScrollInterval]);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index) => {
        if (isDragging) return; // Prevent click during drag
        if (current !== index) {
            setCurrent(index);
        } else if (onSlideClick) {
            onSlideClick(slides[index]);
        }
    };

    // Drag handlers
    const handleDragStart = (e) => {
        setIsDragging(false);
        dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        dragStartIndex.current = current;
        setIsPaused(true);
    };

    const handleDragMove = (e) => {
        if (dragStartX.current === 0) return;
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = dragStartX.current - clientX;
        if (Math.abs(diff) > 10) {
            setIsDragging(true);
        }
    };

    const handleDragEnd = (e) => {
        if (dragStartX.current === 0) return;
        const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStartX.current - clientX;
        const threshold = 50; // Minimum drag distance to change slide

        if (diff > threshold && current < slides.length - 1) {
            setCurrent(current + 1);
        } else if (diff < -threshold && current > 0) {
            setCurrent(current - 1);
        }

        dragStartX.current = 0;
        setTimeout(() => {
            setIsDragging(false);
            setIsPaused(false);
        }, 100);
    };

    const id = useId();

    return (
        <div
            className="relative w-[90vw] md:w-[60vw] aspect-[16/9] mx-auto cursor-grab active:cursor-grabbing select-none"
            aria-labelledby={`carousel-heading-${id}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => { setIsPaused(false); dragStartX.current = 0; }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
            <ul
                className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        slide={slide}
                        index={index}
                        current={current}
                        handleSlideClick={handleSlideClick}
                    />
                ))}
            </ul>

            <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <CarouselControl
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    );
}
