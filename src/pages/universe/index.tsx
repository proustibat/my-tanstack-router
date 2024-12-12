import {ReactElement, useEffect, useState} from "react";
import styles from "./universe.module.css";

const Universe = (): ReactElement => {
    const [mainHeight, setMainHeight] = useState("100vh");

    const handleResize = () => {
        setMainHeight(`${getAvailableHeight()}px`);
    }

    const getAvailableHeight = () => {
        const navEl = document.body.querySelector("nav") as HTMLElement;
        const switchFontBtnEl = document.body.querySelector("[data-js].button") as HTMLElement;

        const navHeight = navEl?.offsetHeight ?? 0;
        const btnHeight = switchFontBtnEl?.offsetHeight ?? 0;
        // @ts-ignore
        const paddings = (navEl?.computedStyleMap().get("padding-top")?.value ?? 0)
            // @ts-ignore
            + (navEl?.computedStyleMap().get("padding-bottom")?.value ?? 0)
            // @ts-ignore
            + (switchFontBtnEl?.computedStyleMap().get("padding-top")?.value ?? 0)
            // @ts-ignore
            + (switchFontBtnEl?.computedStyleMap().get("padding-bottom")?.value ?? 0);

        const totalHeight = window.innerHeight;

        return totalHeight - navHeight - btnHeight - paddings;
    }

    useEffect(() => {

        setMainHeight(`${getAvailableHeight()}px`);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return (
        <main className={styles.main} style={{height: mainHeight}}>
            <div className={styles.container}>
                <div className={styles.planet}>
                    <div className={styles.satellite}></div>
                </div>
            </div>
        </main>
    );
};

export default Universe;