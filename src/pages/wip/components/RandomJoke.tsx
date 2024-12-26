import {useState} from "react";

const RandomJoke = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [joke, setJoke] = useState();
    const fetchJoke = async () => {
       return fetch("https://icanhazdadjoke.com", { headers: {'Accept': 'application/json' } } )
            .then((response: Response) => response.json())
            .catch((error) => setError(error.message));
    };
    const handleClick = async () => {
        console.log("click");
        setLoading(true);
        const response = await fetchJoke()
        console.log(response)
        if(response.joke) {
            setError(null);
            setJoke(response.joke)
        }
        setLoading(false);

    }
    return (
        <section style={{ padding: "1rem" }}>
            <h1>Random Joke</h1>
            {error && <p>{error}</p>}

            <p style={{
                letterSpacing: "0.05rem",
                lineHeight: "1.9rem",
                fontSize: "1.2rem",
                padding: "1rem",
                boxShadow: "0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)"
            }}>
                {joke ?? "Get a random joke from https://icanhazdadjoke.com"}
            </p>

            <button
                style={{margin: "auto", display: "block"}}
                type="button"
                disabled={loading}
                onClick={handleClick}
            >
                {loading ? "loading..." : "TELL ME A JOKE"}
            </button>
        </section>
    );
};
export default RandomJoke;
