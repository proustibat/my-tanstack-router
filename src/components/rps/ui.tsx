import {  ReactElement } from "react";
import { CHOICES } from "../../types/rps-types.ts";
import classnames from "classnames";
import { base64Icons } from "../../utils.ts";
import styles from "../../styles/ui.module.css";

interface UIProps {
    onPlay: ( choice: CHOICES ) => void;
    onReset: () => void;
    onDeleteBestScore: () => void;
    round: number;
    bestScore: number;
}

const UI = ( { onPlay, onReset, onDeleteBestScore, round, bestScore }: UIProps ): ReactElement => {
    const handlePlay = ( choice: CHOICES ) => () => onPlay( choice );
    return (
        <section className={styles.container}>
            <section className={styles.choices}>
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.ROCK )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.ROCK] })` }}
                />
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.PAPER )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.PAPER] })` }}
                />
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.SCISSORS )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.SCISSORS] })` }}
                />
            </section>
            <section className={styles.actions}>
                <button disabled={round === 0} className={classnames( styles.actionButton, styles.reset )} type="reset" onClick={onReset}>Replay</button>
                <button disabled={bestScore === 0} className={styles.actionButton} type="reset" onClick={onDeleteBestScore}>Delete my best score</button>
            </section>
        </section>
    );
};

export default UI;