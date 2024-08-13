import Expert from "./src";
import "dotenv/config";


async function main() {
    const url = 'https://dev.libretexts.org'
    const expert = new Expert(url);

    // expert.auth.ServerToken({
    //     key: process.env.DEV_SERVER_KEY || '',
    //     secret: process.env.DEV_SERVER_SECRET || '',
    //     user: process.env.DEV_SERVER_USER || ''
    // })

    expert.auth.BrowserToken({
        key: process.env.DEV_BROWSER || ''
    })

    const auth = expert.auth.getHeader();
    const res = await expert.pages.getPageSubPages(430, { auth: auth });
    console.log(res);
}

main();

