import React, { useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import "@/components/styles/drag-drop.css"

interface FileWithPreview extends File {
    preview: string;
}

interface MyDropzoneProps {
    files: FileWithPreview[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

export function MyDropzone({ files, setFiles }: MyDropzoneProps): JSX.Element {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject
    } = useDropzone({
        onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            setFiles([])
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result as string;
                    setFiles(prevFiles => [...prevFiles, { ...file, preview: dataURL }]);
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
                            setFiles([{ ...blob, preview: dataURL }]);
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

    const thumbs = files.map(file => (
        <div className='image-container'>
            <img
                src={file.preview}
                onLoad={() => { URL.revokeObjectURL(file.preview) }}
                alt={file.name}
            />
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div {...getRootProps()} className="drag-drop">
            <input {...getInputProps()} />
            {isDragReject ? (
                <>
                    <p>This image is not supported</p>
                    <p className='em' style={{ textAlign: 'center', color: 'white' }}>
                        (Only *.jpeg and *.png images will be accepted)
                    </p>
                </>
            ) : isDragActive ? (
                <>
                    <p>Drop the image here ...</p>
                    <p className='em' style={{ textAlign: 'center', color: 'white' }}>
                        (Only *.jpeg and *.png images will be accepted)
                    </p>
                </>
            ) : (
                <>
                    <p>Drag and drop your image here, or click to select image</p>
                    <p className='em' style={{ textAlign: 'center', color: 'white' }}>
                        (Only *.jpeg and *.png images will be accepted)
                    </p>
                </>
            )}

            {thumbs}
        </div>
    );
}
