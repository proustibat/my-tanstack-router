import {
    Dispatch,
    SetStateAction,
    createContext,
    PropsWithChildren,
    useState,
    useMemo, useContext
} from 'react';

export interface FontOption {
    value: string;
    label: string;
}

export const fontOptions: FontOption[] = [
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

const availableValuesMap = [...fontOptions.map(option => option.value)] as const;
export type FontValue = typeof availableValuesMap[number];


interface IFontContext {
    font: FontValue;
    setFont?: Dispatch<SetStateAction<FontValue>>;
}
export const FontContext = createContext<IFontContext>({font: fontOptions[9].value});
export const FontProvider = ({children}: PropsWithChildren) => {
    const {font: defaultFont} = useContext(FontContext);
    const [font, setFont] = useState<FontValue>(defaultFont);
    const value = useMemo(() => ({font, setFont}), [font])
    return <FontContext.Provider value={value}>{children}</FontContext.Provider>
};
