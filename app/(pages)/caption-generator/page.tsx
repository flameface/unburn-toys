"use client"
import React, { useState } from 'react';
import { Navigation } from "@/components/ui/navigation";
import "../styles.css";
import { MyDropzone } from '@/components/ui/drag-drop';
import { Run } from './function';

interface FileWithPreview extends File {
    preview: string;
}

interface ContentState {
    output: string;
    process: boolean;
    blocked: boolean;
}

export default function Home() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
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
            dataUrl: Buffer.from(files[0].preview.replace(/^data:image\/\w+;base64,/, ''), "base64").toString("base64")
        }).then((x: any) => {
            if (x.status !== 200) {
                setFiles([])

                setContent({
                    output: x.output,
                    process: false,
                    blocked: true
                })
            } else {
                setContent({
                    output: x.output,
                    process: false,
                    blocked: false
                })
            }
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(content.output)
            .then(() => {
                console.log('Content copied to clipboard');
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
                <h1>Caption Generator</h1>
                <p>Generate caption from image for Instagram, Twitter and more.</p>

                <MyDropzone files={files} setFiles={setFiles} />

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
                        {files.length ? (
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
