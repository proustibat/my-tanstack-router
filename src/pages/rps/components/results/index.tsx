import { forwardRef, useImperativeHandle, useRef } from "react";
import { CHOICES, RESULTS_MESSAGES } from "../../rps-types.ts";
import {base64Icons, hideEl, showEl} from "../../utils.ts";

import styles from "./results.module.css";

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
                return new Promise( resolve => {
                    resultRef.current && hideEl( resultRef.current );
                    humanRef.current && hideEl( humanRef.current );
                    const hideAnimation = computerRef.current && hideEl( computerRef.current, true );
                    hideAnimation && hideAnimation.addEventListener( "finish", () => resolve());
                } );
            },
            show: () => {
                return  new Promise( resolve => {
                    humanRef.current && showEl( humanRef.current, 200, "simple");
                    const durationChoice = 2000;
                    const durationMessage = 400;
                    const computerResultAnimation = computerRef.current && showEl(computerRef.current, durationChoice, "apparition");
                    computerResultAnimation && computerResultAnimation.addEventListener( "finish", () => {
                        const resultMessageAnimation = resultRef.current && showEl(resultRef.current, durationMessage, "big")
                        resultMessageAnimation && resultMessageAnimation.addEventListener( "finish", () => resolve() );
                    } );
                } );
            }
        };
    } );

    return (
        <section className={styles.results}>
            <h1 ref={resultRef} className={styles.resultsTitle}>{currentResultMessage}</h1>
            <div className={styles.resultsChoices}>
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