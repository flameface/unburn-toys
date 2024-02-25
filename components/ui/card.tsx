import "@/components/styles/card.css"

interface ToyData {
    header: string;
    description: string;
    footer: {
        avatar: string;
        name: string;
    };
    link: string;
}

const toysData: ToyData[] = [
  {
    header: "Password Generator",
    description: "Generate strong passwords to use anywhere",
    footer: {
            avatar: "",
            name: "_einzi_"
        },
    link: "/password-generator"
  },
    {
        header: "Caption Generator",
        description: "Generate caption from image for instagram, twitter and more.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/caption-generator"
    },
    {
        header: "Image to Prompt",
        description: "Get enhanced prompt from image.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/image-to-prompt"
    },
    {
        header: "Prompt Enhancer",
        description: "An image prompt enhancer improves image-based prompts by adding context or guidance.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/prompt-enhancer"
    },
    {
        header: "Image Text Extractor",
        description: "Extract text from image in formated order.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/image-text-extractor"
    },
    {
        header: "Grammar Checker",
        description: "A grammar checker is a tool that identifies and corrects grammatical errors in written text.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/grammar-checker"
    },
    {
        header: "Paraphraser",
        description: "A paraphraser rewrites text in different words while preserving the original meaning.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/paraphraser"
    },
    {
        header: "Summarizer",
        description: "A summarizer condenses text into shorter summaries while preserving key information.",
        footer: {
            avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
            name: "FlameFace"
        },
        link: "/summarizer"
    },
    // {
    //     header: "Translator",
    //     description: "A translator converts text between languages while maintaining meaning.",
    //     footer: {
    //         avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp?size=512",
    //         name: "FlameFace"
    //     },
    //     link: "/translator"
    // }
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
                        <p className="font-thin text-zinc-600 text-sm">Added by {x.footer.name}</p>
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