import Document, { Html, Head, Main, NextScript } from "next/document";

export default class GuildManagerDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="container mx-auto p-4">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}