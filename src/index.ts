import { Elysia } from "elysia";
import puppeteer from "puppeteer";


const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/pdf", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <h1>
            Hello World!
        </h1>
    </body>

    </html>
    `
    await page.setContent(content)
    const pdfBuffer = await page.pdf({ format: "A4", margin: { top: "60px", right: "20px", bottom: "60px", left: "20px" } });
    await browser.close();
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="example.pdf"',
      },
    });
  })
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
