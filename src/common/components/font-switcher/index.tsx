import {ReactElement, useContext} from "react";
import Select from 'react-select';
import fonts from "../../modern-fonts.module.css";
import styles from "./font-switcher.module.css";
import {type FontOption, fontOptions, FontContext} from "../../../contexts/FontContext.tsx";

const FontSwitcher = (): ReactElement => {
    const {font, setFont} = useContext(FontContext);
    const getDefaultOption = () => {
        return fontOptions.find(option => option.value === font);
    }

    const handleChange = (option: FontOption | null) => {
        option && setFont && setFont(option.value);
    }
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor="fontSwitcher">Change font</label>
            <Select
                classNames={{
                    option: ({data: {value}}) => fonts[value],
                }}
                name="fontSwitcher"
                id="fontSwitcher"
                placeholder="Change font"
                options={fontOptions}
                onChange={handleChange}
                defaultValue={getDefaultOption()}
            />
        </div>
    );
};

export default FontSwitcher;