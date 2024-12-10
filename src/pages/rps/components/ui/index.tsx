import {  ReactElement } from "react";
import { CHOICES } from "../../rps-types.ts";
import classnames from "classnames";
import { base64Icons } from "../../utils.ts";

import styles from "./ui.module.css";

interface UIProps {
    onPlay: ( choice: CHOICES ) => void;
    onReset: () => void;
    onDeleteBestScore: () => void;
    round: number;
    bestScore: number;
    disable?: boolean
}

const UI = ( { onPlay, onReset, onDeleteBestScore, round, bestScore, disable = false }: UIProps ): ReactElement => {
    const handlePlay = ( choice: CHOICES ) => () => onPlay( choice );
    return (
        <section className={styles.ui}>
            <section className={styles.choices}>
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.ROCK )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.ROCK] })` }}
                    disabled={disable}
                />
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.PAPER )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.PAPER] })` }}
                    disabled={disable}
                />
                <button
                    className={styles.choiceBtn}
                    type="button"
                    onClick={handlePlay( CHOICES.SCISSORS )}
                    style={{ backgroundImage: `url(${ base64Icons[CHOICES.SCISSORS] })` }}
                    disabled={disable}
                />
            </section>
            <section className={styles.actions}>
                <button disabled={round === 0 || disable} className={classnames( styles.actionButton, styles.reset )} type="reset" onClick={onReset}>Replay</button>
                <button disabled={bestScore === 0 || disable} className={styles.actionButton} type="reset" onClick={onDeleteBestScore}>Delete my best score</button>
            </section>
        </section>
    );
};

export default UI;