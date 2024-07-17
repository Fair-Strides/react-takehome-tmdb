let previousResults = {};
let previousTerm = "";
export async function GET(request, {params}) {
    if(params.title === "__") {
        previousResults = {};
        previousTerm = "";
        return Response.json({data: {}});
    }

    if(params.title === previousTerm || params.title === "none") {
        return Response.json({data: previousResults});
    }

    previousTerm = params.title;
    const url = `${process.env.DJANGO_API_URL}/search/title=${params.title}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch search results');
    }

    const data = await res.json();
    previousResults = data;

    return Response.json({data});
}