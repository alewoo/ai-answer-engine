// TODO: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
// Refer to the Next.js Docs on how to read the Request body: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Refer to the Groq SDK here on how to use an LLM: https://www.npmjs.com/package/groq-sdk
// Refer to the Cheerio docs here on how to parse HTML: https://cheerio.js.org/docs/basics/loading
// Refer to Puppeteer docs here: https://pptr.dev/guides/what-is-puppeteer

import { NextResponse } from "next/server";
import { getGroqResponse } from "@/app/utils/groqClient";
import { scrapeUrl, urlPattern } from "@/app/utils/scraper";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log("message received:", message);

    const urlMatch = message.match(urlPattern);
    let scrapedContent = "";
    let userQuery = message;

    if (urlMatch) {
      const url = urlMatch[0];
      console.log("Url found:", url);
      const scraperResponse = await scrapeUrl(url);

      if (scraperResponse.error) {
        return NextResponse.json({
          message: `Error accessing the webpage: ${scraperResponse.error}. Status: ${scraperResponse.status}`,
        });
      }

      scrapedContent = `
        Title: ${scraperResponse.title}
        Headings: ${scraperResponse.headings.h1} ${scraperResponse.headings.h2}
        Description: ${scraperResponse.metaDescription}
        Content: ${scraperResponse.content}
      `;

      // Remove the URL from the user query
      userQuery = message.replace(url, "").trim();
      console.log("User query:", userQuery);
    }

    const prompt = `
    Answer my question: "${userQuery}"

    Based on the following content:
    <content>
      ${scrapedContent}
    </content>
    `;

    const response = await getGroqResponse(prompt);
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
