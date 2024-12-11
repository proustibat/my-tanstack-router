import {ReactElement} from "react";
import Select from 'react-select';
import fonts from "../../modern-fonts.module.css";

interface Option  {
    value: string;
    label: string;
}

export const options: Option[] = [
    { value: 'systemUi', label: 'System UI' },
    { value: 'transitional', label: 'Transitional' },
    { value: 'oldStyle', label: 'Old Style' },
    { value: 'humanist', label: 'Humanist' },
    { value: 'geometricHumanist', label: 'GeometricHumanist' },
    { value: 'classicalHumanist', label: 'ClassicalHumanist' },
    { value: 'neoGrotesque', label: 'Neo Grotesque' },
    { value: 'monospaceSlabSerif', label: 'Monospace Slab Serif' },
    { value: 'monospaceCode', label: 'Monospace Code' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'roundedSans', label: 'Rounded Sans' },
    { value: 'slabSerif', label: 'Slab Serif' },
    { value: 'antique', label: 'Antique' },
    { value: 'didone', label: 'Didone' },
    { value: 'handwritten', label: 'Handwritten' }
];

const availableValuesMap = [...options.map(option => option.value)] as const;
export type Value = typeof availableValuesMap[number];

interface FontSwitcherProps {
   onFontSelected: (value: Value) => void;
   defaultFont?: Value
}

const FontSwitcher = ({ onFontSelected, defaultFont = options[9].value }: FontSwitcherProps): ReactElement => {
    const getDefaultOption = () => {
        return options.find(option => option.value === defaultFont);
    }
    const handleChange = (option: Option | null) => {
        option && onFontSelected(option.value);
    }
    return (
        <>
            <label htmlFor="fontSwitcher">Change font</label>
            <Select
                classNames={{
                    option: ({data: {value}}) => fonts[value],
                }}
                name="fontSwitcher"
                id="fontSwitcher"
                placeholder="Change font"
                options={options}
                onChange={handleChange}
                defaultValue={getDefaultOption()}
            />
        </>
    );
};

export default FontSwitcher;