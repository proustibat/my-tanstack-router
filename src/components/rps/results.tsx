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
    animate: () => void
}

const Results = forwardRef<ResultsRef, ResultsProps>( ( { currentResultMessage, humanChoice, computerChoice }, ref ) => {

    const resultRef = useRef<HTMLHeadingElement | null>( null );

    useImperativeHandle( ref, () => {
        return {
            animate: () => {
                resultRef.current?.animate(
                    [
                        { opacity: 0, easing: "ease-out", transform: "scale(0)" },
                        { opacity: 1, easing: "ease-in", transform: "scale(2)" },
                        { opacity: 1, easing: "ease-out", transform: "scale(1)" }
                    ], {
                        duration: 300,
                        iterations: 1
                    }
                );
            }
        };
    } );

    return (
        <section className={styles.container}>
            <h1 ref={resultRef} className={styles.title}>{currentResultMessage}</h1>
            <div className={styles.choices}>
                <p>
                    <span>You</span>
                    <span><img src={base64Icons[humanChoice ?? "empty"]} alt={humanChoice ?? "Your choice"} /></span>
                </p>

                <p>
                    <span>Computer</span>
                    <span><img src={base64Icons[computerChoice ?? "empty"]} alt={computerChoice ?? "Computer choice"}/></span>
                </p>
                
            </div>
        </section>
    );
} );

Results.displayName = "Results";
export default Results;