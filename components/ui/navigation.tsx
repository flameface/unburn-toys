import "@/components/styles/navigation.css"

export function Navigation() {
    return (
        <nav>
            <a href="/">
                <img className="logo" src="./logo.svg" alt="Logo" draggable="false" />
            </a>
            <a href="https://github.com/flameface/unburn-toys">
                <div className="button">
                    <img src="/github.svg" />
                </div>
            </a>
        </nav>
    )
}