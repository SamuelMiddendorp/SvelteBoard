
import * as fs from 'fs';

export async function POST(requestEvent) {
    const { request } = requestEvent;
    let foo = await request.json();

    setFile(foo);
    return new Response(JSON.stringify({ success: true }), {

        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export async function GET() {
    let data = fs.readFileSync("./db.json", "utf8");
    return new Response(data, {
        headers: {

            'Content-Type': 'application/json'
        }
    })
}

const setFile = (data: any) => {
    fs.writeFileSync("./db.json", JSON.stringify(data));
}