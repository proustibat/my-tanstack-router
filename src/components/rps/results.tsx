import { forwardRef, useImperativeHandle, useRef } from "react";
import { CHOICES, RESULTS_MESSAGES } from "../../types/rps-types.ts";
import styles from "../../styles/results.module.css";
import { base64Icons } from "../../utils.ts";

interface ResultsProps {
    currentResultMessage: RESULTS_MESSAGES;
    humanChoice?: CHOICES | null;
    computerChoice?: CHOICES | null;
}

export interface ResultsRef {
    hide: () => Promise<void>;
    show: () => Promise<void>;
}

const Results = forwardRef<ResultsRef, ResultsProps>( ( { currentResultMessage, humanChoice, computerChoice }, ref ) => {

    const resultRef = useRef<HTMLHeadingElement | null>( null );
    const computerRef = useRef<HTMLSpanElement | null>( null );
    const humanRef = useRef<HTMLSpanElement | null>( null );

    useImperativeHandle( ref, () => {
        return {
            hide: async () => {
                const duration = 200;
                return new Promise( resolve => {
                    resultRef.current?.animate(
                        [
                            { opacity: 0, easing: "ease-out", transform: "scale(0)" },
                        ], {
                            duration,
                            iterations: 1,
                            fill: "forwards"
                        }
                    );
                    humanRef.current?.animate(
                        [
                            { opacity: 0, easing: "ease-out", transform: "scale(0)" },
                        ], {
                            duration,
                            iterations: 1,
                            fill: "forwards"
                        }
                    );
                    computerRef.current?.animate(
                        [
                            { opacity: 0, easing: "ease-out", transform: "scale(0) rotate(0deg)", filter: `blur(1rem)` },
                        ], {
                            duration,
                            iterations: 1,
                            fill: "forwards"
                        }
                    ).addEventListener( "finish", () =>resolve() );
                } );
            },
            show: () => {
                return  new Promise( resolve => {
                    humanRef.current?.animate(
                        [
                            { opacity: 0, easing: "ease-out", transform: "scale(0)" },
                            { opacity: 1, easing: "ease-in", transform: "scale(1)" },
                        ], {
                            duration: 200,
                            iterations: 1,
                            fill: "forwards"
                        }
                    );
                    const durationChoice = 2000;
                    const durationMessage = 400;
                    computerRef.current?.animate(
                        [
                            { opacity: 0, easing: "ease-out", transform: "scale(0) rotate(0deg)", filter: `blur(1rem)` },
                            { opacity: 1, easing: "ease-in", transform: `scale(1) rotate(${ 360*20 }deg)`, filter: `blur(0)` },
                        ], {
                            duration: durationChoice,
                            iterations: 1,
                            fill: "forwards"
                        }
                    ).addEventListener( "finish", () => {
                        resultRef.current?.animate(
                            [
                                { opacity: 0, easing: "ease-out", transform: "scale(0)" },
                                { opacity: 1, easing: "ease-in", transform: "scale(2)" },
                                { opacity: 1, easing: "ease-in-out", transform: "scale(1)" }
                            ], {
                                duration: durationMessage,
                                iterations: 1,
                                fill: "forwards"
                            }
                        ).addEventListener( "finish", () => resolve() );
                    } );
                } );
            }
        };
    } );

    return (
        <section className={styles.container}>
            <h1 ref={resultRef} className={styles.title}>{currentResultMessage}</h1>
            <div className={styles.choices}>
                <p>
                    <span>You</span>
                    <span ref={humanRef}><img src={base64Icons[humanChoice ?? "empty"]} alt={humanChoice ?? "Your choice"} /></span>
                </p>
                <p>
                    <span>Computer</span>
                    <span ref={computerRef}><img src={base64Icons[computerChoice ?? "empty"]} alt={computerChoice ?? "Computer choice"}/></span>
                </p>
                
            </div>
        </section>
    );
} );

Results.displayName = "Results";
export default Results;