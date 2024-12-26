import {ReactElement} from "react";
import SpeechRecognition from "./components/SpeechRecognition.tsx";
import TextToSpeech from "./components/TextToSpeech.tsx";
import RandomJoke from "./components/RandomJoke.tsx";

const Wip = (): ReactElement => {


    return (
        <main>
            <SpeechRecognition />
            <TextToSpeech />
            <RandomJoke />
        </main>
    );
};

export default Wip;