"use client"

import React from "react";
import Nav from "@/components/nav";
import styles from "@/styles/toys.module.css";
import { Button, Divider, Link, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import Footer from "@/components/footer";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TextArea } from "@/components/custom";

export default function CaptionGenerator() {
    const [description, setDescription] = useState<any>("");
    const [output, setOutput] = useState<any>("");
    const [copyMessage, setCopyMessage] = useState<boolean>(false);

    const submit = async () => {
        setOutput({
            output: "",
            process: true,
            blocked: false
        });

        const res = await fetch("/api/paraphraser", {
            method: "POST",
            body: JSON.stringify({
                sentence: description
            })
        })

        const response = await res.json();

        if (res.status !== 200) {
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
                console.log('Content copied to clipboard');
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
                <h1 className="text-center m-auto">Paraphraser</h1>
                <p className="text-center mb-5 text-lg text-default-500 m-auto">Rephrase sentence or paragraph in different words without changing meaning.</p>

                <div className="mb-5"></div>

                <div className={`${styles.main}`}
                    style={{
                        width: "100%",
                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.0075) 100%)",
                        borderRadius: "20px"
                    }}
                >
                    <h3>Paraphrase</h3>
                    <p className="font-light text-default-500 mb-4">Add a paragraph or a sentence to paraphrase.</p>
                    <TextArea
                        style={{
                            width: "100%"
                        }}
                        color="default"
                        placeholder="Enter or paste text here"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />

                    <Link
                        color="foreground"
                        onClick={() => setDescription("What is the step by step guide to invest in share market in india?")}
                        className="cursor-pointer text-sm mt-3"
                        showAnchorIcon
                    >Try an example</Link>
                    <div style={{ marginTop: "30px" }} />

                    {description.length > 0 ? (
                        <>
                            {output.process ? (
                                <Button
                                    isDisabled
                                    isLoading
                                    className="bg-default-100"
                                    onClick={submit}
                                    style={{
                                        width: "100%",
                                        height: "50px"
                                    }}>
                                    Rephrasing...
                                </Button>
                            ) : (
                                <Button
                                    className="bg-default-100"
                                    onClick={submit}
                                    style={{
                                        width: "100%",
                                        height: "50px"
                                    }}>
                                    Rephrase
                                </Button>
                            )
                            }
                        </>
                    ) : (
                        <Button
                            isDisabled
                            className="bg-default-50"
                            style={{
                                width: "100%",
                                height: "50px"
                            }}>
                            Rephrase
                        </Button>
                    )}


                    {output ? (
                        <>
                            <div style={{ marginTop: "30px" }} />

                            <Divider className="my-4" />

                            <div style={{ marginTop: "30px" }} />

                            {output.process ? (
                                <div className={styles.main} style={{ border: "none", padding: "0px", width: "100%" }} >
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
                                        <div className={styles.main} style={{
                                            border: "none",
                                            background: "#320009",
                                            padding: "30px",
                                            width: "100%",
                                            borderRadius: "20px"
                                        }}>
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