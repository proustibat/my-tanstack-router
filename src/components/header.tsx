import { ReactElement } from "react";
import styles from "../styles/header.module.css";
import { Link } from "@tanstack/react-router";

const Header = (): ReactElement => {
    return (
        <nav className={styles.header}>
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>
            <Link to="/rps" className="[&.active]:font-bold">
                RPS
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </nav>
    );
};

export default Header;