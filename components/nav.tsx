import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Nav() {
    return (
        <nav className="fadeIn">
            <div style={{ flexDirection: "row", display: "flex" }}>
                <a href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={80}
                        height={60}
                    />
                </a>
            </div>

            <a href="https://github.com/flameface/unburn-toys">
                <Button
                    variant="solid"
                    style={{
                        background: "rgba(255, 255, 255, 0.01)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(5px)",
                        width: "100%",
                        height: "40px"
                    }}
                >
                    Github
                </Button>
            </a>
        </nav >
    )
}