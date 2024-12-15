import axios from "axios";
import * as cheerio from "cheerio";

export const urlPattern =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

// Function to clean text content
function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();
}

// Function to scrape content from a URL
export async function scrapeUrl(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const $ = cheerio.load(response.data);

    // Remove script tags, style tags, and comments
    $("script").remove();
    $("style").remove();
    $("noscript").remove();
    $("iframe").remove();

    // Extract useful information
    const title = $("title").text();
    const h1 = $("h1").first().text();
    const h2 = $("h2").first().text();
    const metaDescription = $('meta[name="description"]').attr("content") || "";

    // Extract main content elements
    const articleText = $("article").text();
    const mainText = $("main").text();
    const contentText = $(".content, #content").text();
    const paragraphs = $("p")
      .map((_, el) => $(el).text())
      .get();
    const listItems = $("li")
      .map((_, el) => $(el).text())
      .get();

    // Combine all content
    let combinedContent = [
      articleText,
      mainText,
      contentText,
      paragraphs,
      listItems,
    ].join(" ");

    // Clean and truncate the content
    combinedContent = cleanText(combinedContent).slice(0, 40000);

    return {
      url,
      title: cleanText(title),
      headings: {
        h1: cleanText(h1),
        h2: cleanText(h2),
      },
      metaDescription: cleanText(metaDescription),
      content: combinedContent,
      error: null,
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return {
      error:
        error.response?.status === 403
          ? "Access forbidden - Website is blocking automated access"
          : error.message || "Failed to access the webpage",
      status: error.response?.status || 500,
      url: url,
    };
  }
}
