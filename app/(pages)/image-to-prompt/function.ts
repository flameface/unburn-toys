export async function Run({ dataUrl }: { dataUrl: string }): Promise<string> {
    try {
        const response = await fetch(`/api/image-to-prompt`, {
            method: "POST",
            body: JSON.stringify({
                dataUrl
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
}
