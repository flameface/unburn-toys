import "@/components/styles/footer.css"

export function Footer() {
    return (
        <div className="footer">
            <p className="msg">This open-source project is made for experimental purposes,<br />feel free to contribute and add more things.</p>
            <a href="https://unburn.tech"><p className="label">&copy; Unburn {new Date().getFullYear()}</p></a>
        </div>
    )
}