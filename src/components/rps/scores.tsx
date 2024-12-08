import { ReactElement } from "react";
import styles from "../../styles/scores.module.css";
import classnames from "classnames";

interface ScoresProps {
   humanScore: number;
   computerScore: number;
   bestScore: number;
   round: number;
}

const Scores = ( { humanScore, computerScore, bestScore, round }: ScoresProps ): ReactElement => {
    return (
        <section className={styles.container} >
            <p className={classnames(
                styles.currentScores,
                { "visible": round > 0 },
                { "hidden": round === 0 }
            )}>
                <span>Human: {humanScore}</span>{` | `}
                <span>Computer: {computerScore}</span>
            </p>
            <p>Your best score: {bestScore}</p>
        </section>
    );
};

export default Scores;