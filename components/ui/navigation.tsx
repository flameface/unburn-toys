import "@/components/styles/navigation.css"

export function Navigation() {
    return (
        <nav>
            <a href="/">
                <img className="logo" src="./logo.svg" alt="Logo" draggable="false" />
            </a>
            <div className="button">
                <img src="/github.svg"/>
            </div>
        </nav>
    )
}