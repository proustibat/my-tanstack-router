import { ReactElement } from "react";
import classnames from "classnames";

import styles from "./scores.module.css";

interface ScoresProps {
   humanScore: number;
   computerScore: number;
   bestScore: number;
   round: number;
}

const Scores = ( { humanScore, computerScore, bestScore, round }: ScoresProps ): ReactElement => {
    return (
        <section className={styles.scores} >
            <p className={classnames(
                styles.currentScores,
                { "visible": round > 0 },
                { "hidden": round === 0 }
            )}>
                <span>Human: {humanScore}</span>{` | `}
                <span>Computer: {computerScore}</span>
            </p>
            <p>Your best score: <span>{bestScore}</span></p>
        </section>
    );
};

export default Scores;