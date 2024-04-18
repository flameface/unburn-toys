import styles from "@/styles/footer.module.css"

export default function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <p>
                    Powered by
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}> Google</a>
                </p>

                <div className={styles["social-media"]}>
                    <a href="https://discord.gg/TRjWmvhg" target="_blank" rel="noopener noreferrer"><img src="/discord.svg" /></a>
                    <a href="https://github.com/unburn" target="_blank" rel="noopener noreferrer"><img src="/github.svg" /></a>
                    <a href="https://twitter.com/unburntech" target="_blank" rel="noopener noreferrer"><img src="/twitter.svg" /></a>
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}></div>

            <div className={styles.copyright}>
                <img src="/unburn.svg" /><p><b><a href="https://unburn.tech" target="_blank" rel="noopener noreferrer">Unburn</a> </b> &copy; {new Date().getFullYear()}</p>
            </div>

            <div style={{ marginBottom: "20px" }}></div>
        </>
    )
}