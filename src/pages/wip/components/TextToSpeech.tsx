import styles from "./TextToSpeech.module.css";
import {ChangeEvent, useEffect, useRef, useState} from "react";

const TextToSpeech = () => {
    const [speech, setSpeech] = useState<SpeechSynthesisUtterance>();
    const [text, setText] = useState<string>("");
    const [placeholder] = useState<string>("Enter your own text");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        const newSpeech = new SpeechSynthesisUtterance();

        // const voices = window.speechSynthesis.getVoices();
        // console.log(voices);

        newSpeech.lang = "en-US";
        newSpeech.volume = 1;
        newSpeech.rate = 1;
        newSpeech.pitch = 1;

        setSpeech(newSpeech)
    }, []);

    const handleSpeech = () => {
        if(textAreaRef.current && speech) {
            speech.text = text || placeholder;
            speechSynthesis.speak(speech);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.currentTarget.value);
        setText(e.target.value);
    }
    return (
        <>
            <h1>Text To Speech</h1>
            <section className={styles.container}>
                <textarea value={text} placeholder={placeholder} onChange={handleChange} ref={textAreaRef} className={styles.textarea}></textarea>
                <button onClick={handleSpeech} className={styles.button} type="button">Speech</button>
            </section>
        </>
    );
};
export default TextToSpeech;
