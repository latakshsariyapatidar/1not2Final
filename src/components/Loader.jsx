import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
/**
 * Cinematic intro loader. Displays once on first mount.
 * Counts up to 100 then curtains away.
 */
export function Loader({ onComplete }) {
    const rootRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);
    const topCurtain = useRef(null);
    const bottomCurtain = useRef(null);
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const counter = { val: 0 };
        const tl = gsap.timeline({
            onComplete: () => {
                setHidden(true);
                onComplete?.();
            },
        });
        tl.to(counter, {
            val: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = String(Math.floor(counter.val)).padStart(3, "0");
                }
                if (barRef.current) {
                    barRef.current.style.width = `${counter.val}%`;
                }
            },
        })
            .to([counterRef.current, barRef.current?.parentElement], {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
        }, "+=0.2")
            .to(topCurtain.current, {
            yPercent: -100,
            duration: 1.0,
            ease: "expo.inOut",
        }, "<")
            .to(bottomCurtain.current, {
            yPercent: 100,
            duration: 1.0,
            ease: "expo.inOut",
        }, "<");
    }, [onComplete]);
    if (hidden)
        return null;
    return (_jsxs("div", { ref: rootRef, className: "fixed inset-0 z-[10000] pointer-events-none", "aria-hidden": true, children: [_jsx("div", { ref: topCurtain, className: "absolute top-0 left-0 right-0 h-1/2 bg-background" }), _jsx("div", { ref: bottomCurtain, className: "absolute bottom-0 left-0 right-0 h-1/2 bg-background" }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [_jsx("div", { className: "font-display text-gold text-sm tracking-[0.4em] uppercase mb-6", children: "One / NotTwo" }), _jsx("span", { ref: counterRef, className: "font-display text-foreground text-7xl md:text-9xl tabular-nums", children: "000" }), _jsx("div", { className: "mt-8 w-64 h-px bg-border overflow-hidden", children: _jsx("div", { ref: barRef, className: "h-full bg-gold", style: { width: "0%" } }) })] })] }));
}
