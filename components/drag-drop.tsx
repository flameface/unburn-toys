import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from "@/styles/drag.module.css"

interface FileWithPreview extends File {
    preview: string;
}

interface MyDropzoneProps {
    image: FileWithPreview[];
    setImage: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

export function MyDropzone({ image, setImage }: MyDropzoneProps): JSX.Element {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject
    } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setImage([])
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result as string;
                    setImage(prevFiles => [...prevFiles, { ...file, preview: dataURL }]);
                };
                reader.readAsDataURL(file);
            });
        },
        maxFiles: 1,
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpeg']
        },
    });

    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const dataURL = reader.result as string;
                            setImage([{ ...blob, preview: dataURL }]);
                        };
                        reader.readAsDataURL(blob);
                        break;
                    }
                }
            }
        }
    };

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, []);

    const imagePreview = image.map(file => (
        <div style={{ position: "relative" }}>
            <img className={styles['image-preview']} src={file.preview} style={{ objectFit: "contain" }} />
            <div
                className={styles['image-close']}
                onClick={() => setImage([])}
            >
                <img src='/close.svg' style={{
                    width: "10px"
                }} />
            </div>
        </div >
    ));

    useEffect(() => {
        return () => image.forEach(file => URL.revokeObjectURL(file.preview));
    }, [image]);

    return (
        <>
            {isDragActive ? (
                <div className={styles['drag-drop-area']} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={styles['drag-drop']} style={image.length > 0 ? {
                        background: "rgba(255, 255, 255, 0.05)"
                    } : { width: "100%", background: "rgba(255, 255, 255, 0.05)" }}>
                        <svg width="62" height="40" viewBox="0 0 62 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.1656 16.8333V17.3322L50.6645 17.3333C56.6357 17.3466 61.5 22.2949 61.5 28.4028C61.5 34.514 56.6603 39.4861 50.6933 39.4861H35.9286V29.375H42.0991H43.2687L42.4605 28.5295L31.3614 16.9184L30.9998 16.5401L30.6384 16.9186L19.5393 28.5436L18.7322 29.3889H19.9009H26.0714V39.5H12.3862C5.83527 39.5 0.5 34.0669 0.5 27.3611C0.5 22.0339 3.86496 17.5144 8.56388 15.8892L8.84569 15.7917L8.89387 15.4975C9.50651 11.7562 12.7111 8.90278 16.5379 8.90278C17.7819 8.90278 18.9641 9.21474 20.0204 9.75134L20.4808 9.98522L20.6997 9.5175C23.1969 4.18189 28.5077 0.5 34.6812 0.5C43.2392 0.5 50.1933 7.57243 50.1933 16.3333C50.1933 16.3925 50.1884 16.4551 50.1812 16.542L50.1806 16.5493C50.174 16.6281 50.1656 16.7291 50.1656 16.8333Z" fill="white" />
                        </svg>

                        <div style={{ marginTop: "15px" }} />

                        <p>Drag and drop file (image) here</p>
                        <p>or <span style={{ color: "#ECFF8C" }}>upload here</span></p>
                    </div>

                    {imagePreview}
                </div>
            ) : (
                <div className={styles['drag-drop-area']} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={`${styles['drag-drop']} ${image.length > 0 ? styles["hide"] : styles["drag-drop-max"]}`}>
                        <svg width="62" height="40" viewBox="0 0 62 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50.1656 16.8333V17.3322L50.6645 17.3333C56.6357 17.3466 61.5 22.2949 61.5 28.4028C61.5 34.514 56.6603 39.4861 50.6933 39.4861H35.9286V29.375H42.0991H43.2687L42.4605 28.5295L31.3614 16.9184L30.9998 16.5401L30.6384 16.9186L19.5393 28.5436L18.7322 29.3889H19.9009H26.0714V39.5H12.3862C5.83527 39.5 0.5 34.0669 0.5 27.3611C0.5 22.0339 3.86496 17.5144 8.56388 15.8892L8.84569 15.7917L8.89387 15.4975C9.50651 11.7562 12.7111 8.90278 16.5379 8.90278C17.7819 8.90278 18.9641 9.21474 20.0204 9.75134L20.4808 9.98522L20.6997 9.5175C23.1969 4.18189 28.5077 0.5 34.6812 0.5C43.2392 0.5 50.1933 7.57243 50.1933 16.3333C50.1933 16.3925 50.1884 16.4551 50.1812 16.542L50.1806 16.5493C50.174 16.6281 50.1656 16.7291 50.1656 16.8333Z" stroke="white" />
                        </svg>

                        <div style={{ marginTop: "15px" }} />

                        <p>Drag and drop file (image) here</p>
                        <p>or <span style={{ color: "#ECFF8C" }}>upload here</span></p>
                    </div>

                    {imagePreview}
                </div>
            )}

        </>
    );
}
