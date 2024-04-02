export async function loader() {
    const data = await fetch('https://remix-api.deno.dev/uno').then(res => res.json()).then(data => data)
    await new Promise(r => setTimeout(() => r(), 1500))
    return data
}

export default function Content({ resource }) {
    const data = resource.read();
    console.log(resource.read())

    return (
        <div className="tab-content">
            <p>{data.content}</p>
        </div>
    );
}