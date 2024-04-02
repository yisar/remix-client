export async function loader() {
    const data = await fetch('https://remix-api.deno.dev/dos').then(res => res.json()).then(data => data)
    await new Promise(r => setTimeout(() => r(), 5000))
    return data
}

export default function Content({ resource }) {
    const data = resource.read();

    return (
        <div className="tab-content">
            <p>{data.content}</p>
        </div>
    );
}