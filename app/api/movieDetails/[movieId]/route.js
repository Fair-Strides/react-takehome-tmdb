export async function GET(request, {params}) {
    const url = `${process.env.DJANGO_API_URL}/details/movieId=${params.movieId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch search results');
    }

    const data = await res.json();

    return Response.json({data});
}