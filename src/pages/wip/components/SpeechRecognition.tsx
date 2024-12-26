import {useEffect, useState} from "react";

const SpeechRecognition = () => {
    const [transcripts, setTranscripts] = useState<string[]>([]);
    const [startDisabled, setStartDisabled] = useState<boolean>(false);
    const [stopDisabled, setStopDisabled] = useState<boolean>(true);
    const [recognition, setRecognition] = useState<any>();
    const [currentLanguageRecognition, setCurrentLanguageRecognition] = useState<"fr-FR"|"en-US">("fr-FR");

    useEffect(() => {
        // Check if the browser supports the Web Speech API
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // Create a SpeechRecognition object
            const SpeechRecognition =
                (window as any)['SpeechRecognition'] || (window as any)['webkitSpeechRecognition'];
            const newRecognition = new SpeechRecognition()

            // Create a SpeechGrammarList object (optional)
            // const SpeechGrammarList =
            //     (window as any)['SpeechGrammarList'] || (window as any)['webkitSpeechGrammarList'];
            // const grammar = "Bonjour|Au revoir|arrête"
            // const speechRecognitionList = new SpeechGrammarList();
            // speechRecognitionList.addFromString(grammar, 1);

            // Set up recognition properties
            newRecognition.continuous = true;
            // newRecognition.grammars = speechRecognitionList;
            newRecognition.lang = currentLanguageRecognition;
            // newRecognition.interimResults = true;

            // Event fired when speech recognition starts
            newRecognition.onstart = () => {
                console.log("ON START")
                setStartDisabled(true);
                setStopDisabled(false);
            };

            newRecognition.onstop = () => {
                console.log("ON STOP")
                setStartDisabled(false);
                setStopDisabled(true);
            };

            // Event fired when speech recognition stops
            newRecognition.onend = () => {
                console.log("ON END")
                setStartDisabled(false);
                setStopDisabled(true);
            };

            // Event fired when speech recognition results are available
            // let finalTranscript="";
            // let interTranscript="";
            newRecognition.onresult = (event: any) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                if(transcript.includes("arrête") || transcript.includes("stop")) {
                    newRecognition.stop();
                }
                setTranscripts(transcripts => [
                    ...transcripts,
                    transcript
                ]);
            };

            // Event fired when an error occurs in speech recognition
            newRecognition.onerror = (event: Event) => {
                console.error('Speech recognition error:', (event as any).error);
            };

            setRecognition(newRecognition)
        } else {
            // Browser does not support speech recognition
            alert('Just a heads up, speech recognition is not supported in this browser.');
            setStartDisabled(true)
            setStopDisabled(true)
        }
    }, []);

    const startRecognition = () => {
        console.log("startRecognition", recognition);
        recognition.start();
    };
    const stopRecognition = () => {
        console.log("stopRecognition");
        recognition.stop();
        // recognition.abort();
    };

    const switchLang = () => {
        const newLang = currentLanguageRecognition === "fr-FR" ? "en-US" : "fr-FR";
        setCurrentLanguageRecognition(newLang)
        recognition.stop();
        recognition.lang = newLang;
    }
    return (
        <section style={{ padding: "1rem" }}>
            <h1>Speech Recognition</h1>
            <div>
                <button type="button" disabled={startDisabled} onClick={startRecognition}>start</button>
                <button type="button" disabled={stopDisabled} onClick={stopRecognition}>stop</button>
            </div>
            <button onClick={switchLang} type="button">Switch to {currentLanguageRecognition === "fr-FR" ? "English" : "French"}
            </button>
            <div>
                {transcripts.map((t, index) => <p key={t + index}>{t}</p>)}
            </div>
        </section>
    );
};
export default SpeechRecognition;
