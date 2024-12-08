import { ReactElement, useEffect, useRef, useState } from "react";
import classnames from 'classnames';
import Round from "./round.tsx";
import Results, { ResultsRef } from "./results.tsx";
import Scores from "./scores.tsx";
import Ui from "./ui.tsx";
import { CHOICES, RESULTS_MESSAGES } from "../../types/rps-types.ts";
import { getRandomInt, winnerRules } from "../../utils.ts";

import styles from "../../styles/rps.module.css";

const bestScoreKey = "best-score";

const getComputerChoice = (): CHOICES => Object.values( CHOICES )[getRandomInt( 0, Object.values( CHOICES ).length  - 1 )];
const isHumanWinner = ( humanChoice: CHOICES, computerChoice: CHOICES ) => winnerRules[humanChoice] === computerChoice;

const RockPaperScissors = ( ): ReactElement => {
    const [ computerChoice, setComputerChoice ] = useState<CHOICES | null>();
    const [ humanChoice, setHumanChoice ] = useState<CHOICES | null>();
    const [ humanScore, setHumanScore ] = useState<number>( 0 );
    const [ computerScore, setComputerScore ] = useState<number>( 0 );
    const [ bestScore, setBestScore ] = useState<number>( 0 );
    const [ currentResultMessage, setCurrentResultMessage ] = useState<RESULTS_MESSAGES>( RESULTS_MESSAGES.READY );
    const [ currentRound, setCurrentRound ] = useState<number>( 0 );

    const resultsRef = useRef<ResultsRef>( null );

    useEffect( () => {
        console.log( "USE EFFECT" );
        const storage = localStorage.getItem( bestScoreKey );
        setBestScore( storage ? parseInt( storage , 10 ) : 0 );
    }, [] );

    const handlePlay = ( humanChoice: CHOICES ) => {
        const computerChoice: CHOICES = getComputerChoice();

        setHumanChoice( humanChoice );
        setComputerChoice( computerChoice );
        setCurrentRound( round => round + 1 );
        let newHumanScore: number;

        if ( humanChoice === computerChoice ) {
            setCurrentResultMessage( RESULTS_MESSAGES.TIE );
        }
        else {
            const isHumanCurrentlyWinning: boolean = isHumanWinner( humanChoice, computerChoice );
            if ( isHumanCurrentlyWinning ) {
                newHumanScore = humanScore +1;
                setHumanScore( newHumanScore );
                setCurrentResultMessage( RESULTS_MESSAGES.WIN );

                // best score
                const storage = localStorage.getItem( bestScoreKey );
                const previousBestScore = storage ? parseInt( storage , 10 ) : 0;
                if( newHumanScore > previousBestScore ) {
                    setBestScore( newHumanScore );
                    localStorage.setItem( bestScoreKey, newHumanScore.toString() );
                    // @todo animate best core ui
                }
            }
            else {
                setComputerScore( score => score + 1 );
                setCurrentResultMessage( RESULTS_MESSAGES.LOSE );
            }
        }

        resultsRef.current?.animate();
    };

    const handleReset=() => {
        setHumanScore( 0 );
        setComputerScore( 0 );
        setHumanChoice( null );
        setComputerChoice( null );
        setCurrentRound( 0 );
        setCurrentResultMessage( RESULTS_MESSAGES.READY );
    };

    const handleDeleteBestScore = () => {
        if( confirm( `Do you wanna clear your best score? (${ localStorage.getItem( bestScoreKey ) })` ) ) {
            localStorage.clear();
            setBestScore( 0 );
        }
    };

    return (
        <main className={classnames( styles.systemUi, styles.main )}>
            <Round count={currentRound} />
            <Results
                ref={resultsRef}
                currentResultMessage={currentResultMessage}
                humanChoice={humanChoice}
                computerChoice={computerChoice}
            />
            <Scores
                computerScore={computerScore}
                humanScore={humanScore}
                bestScore={bestScore}
                round={currentRound}
            />
            <Ui
                onPlay={handlePlay}
                onReset={handleReset}
                onDeleteBestScore={handleDeleteBestScore}
                round={currentRound}
                bestScore={bestScore}
            />
        </main>
    );
};

export default RockPaperScissors;