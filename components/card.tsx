import styles from "@/styles/home.module.css";

// const genCard = [
//     {
//         name: "--",
//         description: "--",
//         tag: "--",
//         image: "--",
//         link: "--",
//         id: "--"
//     },
// ]

const textCard = [
    {
        name: "Caption Generator",
        description: "Generate captions for images.",
        tag: "CG",
        link: "/caption-generator",
        id: "caption-generator"
    },
    {
        name: "Grammar Checker",
        description: "Check grammar and spelling errors.",
        tag: "GC",
        link: "/grammar-checker",
        id: "grammar-checker"
    },
    {
        name: "Paraphraser",
        description: "Rephrase text in different ways.",
        tag: "P",
        link: "/paraphraser",
        id: "paraphraser"
    },
    {
        name: "Summarizer",
        description: "Condense text into shorter paragraphs.",
        tag: "S",
        link: "/summarizer",
        id: "summarizer"
    },
    {
        name: "Image to Prompt",
        description: "Generate prompt from images.",
        tag: "IP",
        link: "/image-to-prompt",
        id: "image-to-prompt"
    },
    {
        name: "Text Extractor",
        description: "Extract text from images.",
        tag: "TE",
        link: "/text-extractor",
        id: "text-extractor"
    },
]

export default function Card() {
    // const genCards = genCard.map((card, index) => {
    //     return (
    //         <a href={card.link} key={card.id}>
    //             <div
    //                 className={`${index === 1 || index === 4 ? styles.margincard : ""} ${styles.card}`}
    //                 style={{
    //                     background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 85.58%), url(${card.image})`,
    //                     backgroundSize: "cover",
    //                     backgroundRepeat: "no-repeat"
    //                 }}>
    //                 <div className={styles.cardTag}>{card.tag}</div>
    //                 <div>
    //                     <p>{card.name}</p>
    //                     <p className={styles.cardDesc}>{card.description}</p>
    //                 </div>
    //             </div>
    //         </a>
    //     )
    // })

    const textCards = textCard.map((card, index) => {
        return (
            <a href={card.link} key={card.id}>
                <div
                    className={`${index === 1 || index === 4 ? styles.margincard : ""} ${styles.card}`}
                    style={{
                        background: "transparent",
                        height: "192px"
                    }}>
                    <div className={styles.cardTag} style={{ color: "black", background: "white" }}>{card.tag}</div>
                    <div>
                        <p>{card.name}</p>
                        <p className={styles.cardDesc}>{card.description}</p>
                    </div>
                </div>
            </a>
        )
    })

    return (
        <>
            <div style={{ marginBottom: "50px" }}></div>

            <div className={`${styles.container} fadeIn`} id="text-tools">
                <h2>Text AI Tools</h2>
                <p>These are the trained text-based AI tools.</p>

                <div style={{ marginBottom: "20px" }}></div>

                <div className={styles.cardGroup}>
                    {textCards}
                </div>
            </div>

            {/* <div style={{ marginBottom: "50px" }}></div>

            <div className={styles.container} id="gen-tools">
                <h2>Gen AI Tools</h2>
                <p>These are image-based AI tools.</p>

                <div style={{ marginBottom: "20px" }}></div>

                <div className={styles.cardGroup}>
                    {genCards}
                </div>
            </div> */}

            <div style={{ marginBottom: "50px" }}></div>
        </>
    );
}