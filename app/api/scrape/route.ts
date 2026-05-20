import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Add protocol if missing
    let formattedUrl = targetUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json({ 
        title: 'Proyecto Externo', 
        description: 'Sitio web cargado correctamente desde ' + new URL(formattedUrl).hostname 
      });
    }

    const html = await res.text();

    // Extract Title using multiple strategies
    let title = '';
    
    // 1. og:title
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["'][^>]*>/i);
    
    // 2. twitter:title
    const twitterTitleMatch = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                              html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:title["'][^>]*>/i);
    
    // 3. HTML <title>
    const titleTagMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

    if (ogTitleMatch && ogTitleMatch[1]) {
      title = decodeHtmlEntities(ogTitleMatch[1].trim());
    } else if (twitterTitleMatch && twitterTitleMatch[1]) {
      title = decodeHtmlEntities(twitterTitleMatch[1].trim());
    } else if (titleTagMatch && titleTagMatch[1]) {
      title = decodeHtmlEntities(titleTagMatch[1].trim());
    }

    // Clean title from extra spaces
    title = title.replace(/\s+/g, ' ');

    // Extract Description using multiple strategies
    let description = '';

    // 1. og:description
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["'][^>]*>/i);

    // 2. twitter:description
    const twitterDescMatch = html.match(/<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                              html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:description["'][^>]*>/i);

    // 3. meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);

    if (ogDescMatch && ogDescMatch[1]) {
      description = decodeHtmlEntities(ogDescMatch[1].trim());
    } else if (twitterDescMatch && twitterDescMatch[1]) {
      description = decodeHtmlEntities(twitterDescMatch[1].trim());
    } else if (descMatch && descMatch[1]) {
      description = decodeHtmlEntities(descMatch[1].trim());
    }

    description = description.replace(/\s+/g, ' ');

    // Fallbacks if not found
    if (!title) {
      const hostname = new URL(formattedUrl).hostname;
      title = hostname.replace('www.', '');
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    if (!description) {
      description = 'Proyecto web interactivo optimizado y desarrollado profesionalmente.';
    }

    return NextResponse.json({ title, description });
  } catch (err: any) {
    console.error('Error scraping:', err);
    // Return friendly fallbacks on error so the admin page doesn't crash
    try {
      const hostname = new URL(targetUrl).hostname;
      const cleanName = hostname.replace('www.', '').split('.')[0];
      return NextResponse.json({
        title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        description: 'Proyecto web interactivo cargado y enlazado correctamente.'
      });
    } catch {
      return NextResponse.json({
        title: 'Proyecto Nuevo',
        description: 'Proyecto web interactivo cargado y enlazado correctamente.'
      });
    }
  }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
