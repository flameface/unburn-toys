import "@/components/styles/card.css"

interface ToyData {
    header: string;
    description: string;
    footer: {
        avatar: string;
        name: string;
    };
    github: string;
    link: string;
}

const toysData: ToyData[] = [
    {
        header: "Password Generator",
        description: "Generate strong passwords to use anywhere",
        footer: {
            avatar: "https://avatars.githubusercontent.com/u/91873189?v=4",
            name: "Einzi"
        },
        github: "https://github.com/einzi-0",
        link: "/password-generator"
    },
    {
        header: "Caption Generator",
        description: "Generate caption from image for instagram, twitter and more.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/caption-generator"
    },
    {
        header: "Image to Prompt",
        description: "Get enhanced prompt from image.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/image-to-prompt"
    },
    {
        header: "Prompt Enhancer",
        description: "An image prompt enhancer improves image-based prompts by adding context or guidance.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/prompt-enhancer"
    },
    {
        header: "Image Text Extractor",
        description: "Extract text from image in formated order.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/image-text-extractor"
    },
    {
        header: "Grammar Checker",
        description: "A grammar checker is a tool that identifies and corrects grammatical errors in written text.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/grammar-checker"
    },
    {
        header: "Paraphraser",
        description: "A paraphraser rewrites text in different words while preserving the original meaning.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/paraphraser"
    },
    {
        header: "Summarizer",
        description: "A summarizer condenses text into shorter summaries while preserving key information.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        github: "https://github.com/flameface",
        link: "/summarizer"
    }
]

export function Card() {
    const cards = toysData.map(x => {
        return (
            <a href={x.link}>
                <div className="card" key={x.link.replace("/", "")}>
                    <div className="card-text">
                        <p className="card-header">{x.header}</p>
                        <p className="card-description">{x.description}</p>
                    </div>
                    <div className="card-footer">
                        <img className="w-7 mr-2 rounded-full" src={x.footer.avatar} alt={x.footer.name} draggable="false" />
                        <div>
                            <p className="font-thin text-zinc-600 text-sm">Added by <a style={{ color: "var(--zinc-400)", fontWeight: 500 }} href={x && x.github}>{x && x.footer && x.footer.name}</a></p>
                        </div>
                    </div>
                </div>
            </a>
        );
    });

    return (
        <div className="card-list">
            {cards}
        </div>
    );
}