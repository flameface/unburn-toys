export async function Run({ prompt }: { prompt: string }): Promise<string> {
    try {
        const response = await fetch(`/api/summarizer`, {
            method: "POST",
            body: JSON.stringify({
                prompt
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
}
