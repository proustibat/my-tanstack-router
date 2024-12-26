import styles from "./TextToSpeech.module.css";
import {ChangeEvent, useRef, useState} from "react";
import {
    filterAvailableVoices,
    getVoicesOptions,
    groupVoicesByRegion,
    sortVoicesByRegionPreference
} from "../utils.ts";

const TextToSpeech = () => {
    const [text, setText] = useState<string>("");
    const [placeholder] = useState<string>("Enter your own text");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [voicesOptions, setVoicesOptions] = useState<{label: string, value: string}[]>();
    const [currentVoice, setCurrentVoice] = useState<string>();
    const [jsonData, setJsonData] = useState<any>();
    const [voices, setVoices] = useState<any>();

    const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleSelectLanguage = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.currentTarget.value;

        const jsonData = await import(`../json-voices/${selectedLanguage}.json`).catch(_ => null);
        setJsonData(jsonData);
        const {voices, availableVoices} = await filterAvailableVoices(jsonData);
        setVoices(voices);
        if(availableVoices.length === 0) {
            alert("no voice available")
        }
        const groupedVoices = groupVoicesByRegion(availableVoices);
        const sortedVoices = sortVoicesByRegionPreference(groupedVoices);
        const voicesOptions = getVoicesOptions(sortedVoices);
        setVoicesOptions(voicesOptions)
        if(voicesOptions.length > 0) {
            const defaultVoice = voicesOptions[0].value;
            setCurrentVoice(defaultVoice)
            setText(jsonData.testUtterance.replace("{name}", defaultVoice));
        }
    }

    const handleSelectVoice = async (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrentVoice(e.currentTarget.value);
        setText(jsonData.testUtterance.replace("{name}", e.currentTarget.value));
    }

    const handleRead = async () => {
        const utterance = new SpeechSynthesisUtterance();

        for (const voice of voices) {
            if (voice.name === currentVoice) {
                utterance.text = text || placeholder;
                utterance.voice = voice;
                utterance.lang = voice.lang;
                utterance.volume = 1;
                utterance.rate = 1;
                utterance.pitch = 1;
                break;
            }
        }

        speechSynthesis.speak(utterance);
    }

    return (
        <section className={styles.container}>
            <h1>Text To Speech</h1>
            <label htmlFor="language-select">Select a language</label>
            <select id="language-select" name="language-select" onChange={handleSelectLanguage}>
                <option></option>
                <option value="ar">Arabic</option>
                <option value="eu">Basque</option>
                <option value="bho">Bhojpuri</option>
                <option value="bn">Bengali</option>
                <option value="bg">Bulgarian</option>
                <option value="ca">Catalan</option>
                <option value="hr">Croatian</option>
                <option value="cs">Czech</option>
                <option value="da">Danish</option>
                <option value="nl">Dutch</option>
                <option value="en">English</option>
                <option value="fi">Finnish</option>
                <option value="fr">French</option>
                <option value="gl">Galician</option>
                <option value="de">German</option>
                <option value="el">Greek</option>
                <option value="he">Hebrew</option>
                <option value="hi">Hindi</option>
                <option value="hu">Hungarian</option>
                <option value="id">Indonesian</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="kn">Kannada</option>
                <option value="ko">Korean</option>
                <option value="ms">Malay</option>
                <option value="cmn">Mandarin Chinese</option>
                <option value="mr">Marathi</option>
                <option value="nb">Norwegian</option>
                <option value="fa">Persian</option>
                <option value="pl">Polish</option>
                <option value="pt">Portuguese</option>
                <option value="ro">Romanian</option>
                <option value="ru">Russian</option>
                <option value="sk">Slovak</option>
                <option value="sl">Slovenian</option>
                <option value="es">Spanish</option>
                <option value="sv">Swedish</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="th">Thai</option>
                <option value="tr">Turkish</option>
                <option value="uk">Ukrainian</option>
                <option value="vi">Vietnamese</option>
                <option value="wuu">Wu Chinese (Shanghainese)</option>
                <option value="yue">Yue Chinese (Cantonese)</option>
            </select>
            <label htmlFor="voice-select">Select a voice</label>
            <select id="voice-select" name="voice-select" onChange={handleSelectVoice}>
                {voicesOptions?.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
            </select>
            <textarea value={text} placeholder={placeholder} onChange={handleChangeText} ref={textAreaRef} className={styles.textarea}></textarea>
            <button disabled={!currentVoice} onClick={handleRead} className={styles.button} type="button">Read</button>
        </section>
    );
};
export default TextToSpeech;
