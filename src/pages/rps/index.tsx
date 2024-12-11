import { ReactElement, useEffect, useRef, useState } from "react";
import Round from "./components/round";
import Results, { ResultsRef } from "./components/results";
import Scores from "./components/scores";
import Ui from "./components/ui";
import { CHOICES, RESULTS_MESSAGES } from "./rps-types.ts";
import { getRandomInt, winnerRules } from "./utils.ts";

import styles from "./rps.module.css";

const bestScoreKey = "best-score";

const getComputerChoice = (): CHOICES => Object.values( CHOICES )[getRandomInt( 0, Object.values( CHOICES ).length  - 1 )];
const isHumanWinner = ( humanChoice: CHOICES, computerChoice: CHOICES ) => winnerRules[humanChoice] === computerChoice;

const RockPaperScissorsApp = (): ReactElement => {
    const [ computerChoice, setComputerChoice ] = useState<CHOICES | null>();
    const [ humanChoice, setHumanChoice ] = useState<CHOICES | null>();
    const [ humanScore, setHumanScore ] = useState<number>( 0 );
    const [ computerScore, setComputerScore ] = useState<number>( 0 );
    const [ bestScore, setBestScore ] = useState<number>( 0 );
    const [ currentResultMessage, setCurrentResultMessage ] = useState<RESULTS_MESSAGES>( RESULTS_MESSAGES.READY );
    const [ currentRound, setCurrentRound ] = useState<number>( 0 );
    const [ disableUi, setDisableUi ] = useState( false );

    const resultsRef = useRef<ResultsRef>( null );

    useEffect( () => {
        console.log( "USE EFFECT" );
        const storage = localStorage.getItem( bestScoreKey );
        setBestScore( storage ? parseInt( storage , 10 ) : 0 );
    }, [] );

    const updateResultMessage = ( isTie: boolean, isHumanCurrentlyWinning: boolean ) => {
        if ( isTie ) {
            setCurrentResultMessage( RESULTS_MESSAGES.TIE );
        }
        else {
            if ( isHumanCurrentlyWinning ) {
                setCurrentResultMessage( RESULTS_MESSAGES.WIN );
            }
            else {
                setCurrentResultMessage( RESULTS_MESSAGES.LOSE );
            }
        }
    };

    const incrementHumanScore = () => {
        const newHumanScore = humanScore + 1;
        setHumanScore( newHumanScore );

        // best score
        const storage = localStorage.getItem( bestScoreKey );
        const previousBestScore = storage ? parseInt( storage , 10 ) : 0;
        if( newHumanScore > previousBestScore ) {
            setBestScore( newHumanScore );
            localStorage.setItem( bestScoreKey, newHumanScore.toString() );
        }
    };

    const handlePlay = async ( humanChoice: CHOICES ) => {
        // disable iu to prevent playing too quickly without animations being ended
        setDisableUi( true );

        // hide results: message and previous played choices
        await resultsRef.current?.hide();

        // init choices
        const computerChoice: CHOICES = getComputerChoice();
        setHumanChoice( humanChoice );
        setComputerChoice( computerChoice );

        // current round played
        setCurrentRound( round => round + 1 );

        // check result
        const isTie = humanChoice === computerChoice;
        const isHumanCurrentlyWinning: boolean = isHumanWinner( humanChoice, computerChoice );

        // update & display result: message and played choices
        updateResultMessage( isTie, isHumanCurrentlyWinning );
        await resultsRef.current?.show();

        // update & show scores
        if( !isTie ) {
            if ( isHumanCurrentlyWinning ) {
                incrementHumanScore();
            }
            else {
                setComputerScore( score => score + 1 );
            }
        }

        // enable ui to play again
        setDisableUi( false );
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
        <main className={styles.main}>
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
                disable={disableUi}
            />
        </main>
    );
};

export default RockPaperScissorsApp;