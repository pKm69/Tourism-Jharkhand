import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages|info&exintro=true&explaintext=true&titles=${encodeURIComponent(query)}&pithumbsize=500&inprop=url`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === '-1') {
      return NextResponse.json({ error: 'No content found for this query' }, { status: 404 });
    }

    const page = pages[pageId];
    const extract = page.extract;
    const thumbnail = page.thumbnail?.source;
    const fullurl = page.fullurl;

    if (extract) {
      return NextResponse.json({ extract, thumbnail, fullurl });
    } else {
      return NextResponse.json({ error: 'No content found for this query' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from Wikipedia' }, { status: 500 });
  }
}
