"use client"

import React, { useState } from 'react'
import { Navigation } from "@/components/ui/navigation";
import "../styles.css"
import { Run } from './function';

interface ContentState {
    output: string;
    process: boolean;
    blocked: boolean;
}

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState<ContentState>({
        output: '',
        process: false,
        blocked: false
    });

    const [copyMessage, setCopyMessage] = useState<boolean>(false);

    const run = async () => {
        setContent({
            output: "Generating...",
            process: true,
            blocked: false
        });

        Run({
            prompt: prompt
        }).then((x: any) => {
            if (x.status !== 200) {
                setPrompt("")

                setContent({
                    output: x.output,
                    process: false,
                    blocked: true
                })
            } else {
                setPrompt("")

                setContent({
                    output: x.output,
                    process: false,
                    blocked: false
                })
            }
        })
    }

    const handleCopy = () => {
        setPrompt("")
        navigator.clipboard.writeText(content.output)
            .then(() => {
                setCopyMessage(true);
                setTimeout(() => {
                    setCopyMessage(false);
                }, 1000);
            })
    }

    return (
        <div className="container">
            <Navigation />

            <div className="container-main">
                <h1>Password Generator</h1>
                <p>A simple password generator which uses ai to create strong passwords.</p>

                <div className='prompt-area'>
                    <input
                        type="text"
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='eg. Generate a 8 letter password based on a name einzi'
                    />
                </div>

                <div className='content-area left' style={content.blocked ? { border: "1px solid #dc2626" } : { border: "1px solid var(--zinc-800)" }}>
                    <div className='content-text'>
                        <p style={content.blocked ? { color: "#dc2626" } : { color: "var(--zinc-500)" }}>
                            {content.output.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>

                    <div className="line"></div>

                    <div className="row">
                        {prompt.length > 5 ? (
                            <>
                                {content.process ? (
                                    <div className='button-disabled'><img src='/loading.svg' /></div>
                                ) : (
                                    <div className='button' onClick={run} style={content.blocked ? { background: "#dc2626" } : { background: "var(--zinc-100)" }}>Generate</div>
                                )}
                            </>
                        ) : (
                            <div className='button-disabled'>Generate</div>
                        )}

                        {content.output.length > 0 ? (
                            <>
                                {content.process ? (
                                    <div className='button-disabled'>
                                        <img src={copyMessage ? "/check.svg" : "/content_paste.svg"} />
                                    </div>
                                ) : (
                                    <>
                                        {content.blocked ? (
                                            <div className='button-disabled'>
                                                <img src={copyMessage ? "/check.svg" : "/content_paste.svg"} />
                                            </div>
                                        ) : (
                                            <div className='button' onClick={handleCopy}>
                                                <img src={copyMessage ? "/check.svg" : "/content_paste.svg"} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <div className='button-disabled'>
                                <img src={copyMessage ? "/check.svg" : "/content_paste.svg"} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}