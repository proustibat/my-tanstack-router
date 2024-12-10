import { ReactElement } from "react";
import ClassInput from "./components/ClassInput.tsx";
import FunctionalInput from "./components/FunctionalInput.tsx";

import styles from "./todo.module.css";

const TodoApp= ( ): ReactElement => {
    return (
        <>
            <h1 className={styles.title}>TODO</h1>
            <main className={styles.main}>
                <ClassInput name="App with class components" />
                <FunctionalInput name="App with functional components" />
            </main>
        </>
    );
};

export default TodoApp;