import "../index.css";
import Providers from "./providers";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WG Ledger",
  description: "Web ledger application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '8ee61612d18e52b696fc7cc6b6194b2dcb832672';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
        <noscript>
          Powered by{" "}
          <a
            href="https://www.smartsupp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Smartsupp
          </a>
        </noscript>
      </body>
    </html>
  );
}
