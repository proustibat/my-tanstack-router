import {ReactElement, useState} from "react";
import ClassInput from "./components/ClassInput.tsx";
import FunctionalInput from "./components/FunctionalInput.tsx";
import FontSwitcher, {options, type Value} from "../../common/components/font-switcher";

import styles from "./todo.module.css";
import fonts from "../../common/modern-fonts.module.css";


const TodoApp= (): ReactElement => {
    const [font, setFont] = useState<Value>(options[9].value);
    const onFontSelected = (value: Value) => {
       setFont(value)
    }
    return (
        <div {...{ ...(font && {className: fonts[font]}) }} >
            <h1 className={styles.title}>TODO</h1>
            <main className={styles.main}>
                <ClassInput name="App with class components" />
                <FunctionalInput name="App with functional components" />
            </main>
            <footer>
                <FontSwitcher onFontSelected={onFontSelected} defaultFont={options[9].value} />
            </footer>
        </div>
    );
};

export default TodoApp;