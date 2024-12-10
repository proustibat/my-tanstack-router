import classnames from "classnames";

import styles from "./round.module.css";

interface RoundProps {
    count: number
}
const Round = ( { count }: RoundProps ) => {
    return (
        <section>
            <h2 className={classnames(
                styles.round,
                { "visible": count > 0 },
                { "hidden": count === 0 }
            )}
            >Round: <span>{count}</span></h2>
        </section>
    );
};
export default Round;
