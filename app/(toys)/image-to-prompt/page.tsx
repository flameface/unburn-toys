"use client"

import React from "react";
import { MyDropzone } from "@/components/drag-drop";
import Nav from "@/components/nav";
import styles from "@/styles/toys.module.css";
import { Button, Divider, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import Footer from "@/components/footer";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface FileWithPreview extends File {
    preview: string;
}

export default function CaptionGenerator() {
    const [image, setImage] = useState<FileWithPreview[]>([]);
    const [output, setOutput] = useState<any>("");
    const [copyMessage, setCopyMessage] = useState<boolean>(false);

    const submit = async () => {
        setOutput({
            output: "",
            process: true,
            blocked: false
        });

        const res = await fetch("/api/image-to-prompt", {
            method: "POST",
            body: JSON.stringify({
                image: Buffer.from(image[0].preview.replace(/^data:image\/\w+;base64,/, ''), "base64").toString("base64")
            })
        })

        const response = await res.json();

        if (res.status !== 200) {
            setImage([])
            setOutput({
                output: response.result,
                process: false,
                blocked: true
            })
        } else {
            setOutput({
                output: response.result,
                process: false,
                blocked: false
            })
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(output.output)
            .then(() => {
                setCopyMessage(true);
                setTimeout(() => {
                    setCopyMessage(false);
                }, 1000);
            })
    }

    return (
        <>
            <Nav />
            <div className={styles.main} style={{ border: "none", padding: "30px 0px" }}>
                <h1 className="text-center m-auto">Image to Prompt</h1>
                <p className="text-center mb-5 text-lg text-default-500 m-auto">Generate enhanced prompt from image.</p>

                <div className="mb-5"></div>

                <div className={`${styles.main}`}
                    style={{
                        width: "100%",
                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.0075) 100%)",
                        borderRadius: "20px"
                    }}
                >
                    <h3>Upload Image</h3>
                    <p className="font-light text-default-500 mb-4">Add an image to generate enhanced prompt.</p>

                    <MyDropzone image={image} setImage={setImage} />

                    <div style={{ marginTop: "50px" }} />

                    {image.length > 0 ? (
                        <>
                            {output.process ? (
                                <Button
                                    className="bg-default-50"
                                    isDisabled
                                    style={{
                                        width: "100%",
                                        height: "50px"
                                    }}>
                                    Generate
                                </Button>
                            ) : (
                                <Button
                                    className="bg-default-100"
                                    onClick={submit}
                                    style={{
                                        width: "100%",
                                        height: "50px"
                                    }}>
                                    Generate
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button isDisabled
                            className="bg-default-50"
                            style={{
                                width: "100%",
                                height: "50px"
                            }}>
                            Generate
                        </Button>
                    )}

                    {output ? (
                        <>
                            <div style={{ marginTop: "30px" }} />

                            <Divider className="my-4" />

                            <div style={{ marginTop: "30px" }} />

                            {output.process ? (
                                <div
                                    className={styles.main}
                                    style={{ border: "none", padding: "0px", width: "100%" }}
                                >
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton style={{
                                            width: "100%",
                                            height: "20px",
                                            borderRadius: "5px"
                                        }} />
                                        <Skeleton style={{
                                            width: "50%",
                                            height: "20px",
                                            borderRadius: "5px"
                                        }} />
                                        <Skeleton style={{
                                            width: "70%",
                                            height: "20px",
                                            borderRadius: "5px"
                                        }} />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {output.blocked ? (
                                        <div
                                            className={styles.main}
                                            style={{ border: "none", background: "#320009", padding: "30px", width: "100%" }}
                                        >
                                            <p style={{ color: "#FF002E" }}>{output.output}</p>
                                        </div>
                                    ) : (
                                        <div className={styles.main} style={{
                                            border: "1px solid #00100A",
                                            background: "linear-gradient(180deg, #00100A 0%, rgba(0, 0, 0, 0) 100%)",
                                            padding: "30px",
                                            width: "100%",
                                            position: "relative",
                                            borderRadius: "20px"
                                        }}>
                                            <div className={styles.copy} onClick={handleCopy}>
                                                <img src={copyMessage ? "/check.svg" : "/content_copy.svg"} />
                                            </div>
                                            <Markdown className="prose dark:prose-invert prose-li:marker:text-emerald-400 prose-li:font-light" remarkPlugins={[remarkGfm]}>{output.output}</Markdown>
                                        </div>
                                    )}

                                </>
                            )}

                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div >

            <div style={{ marginTop: "50px" }} />

            <Footer />
        </>
    )
}