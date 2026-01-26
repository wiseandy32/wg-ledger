// All images are now served from public/assets folder
const regulatoryImg = "/assets/regulatory_compliance.png";
const securityImg = "/assets/institutional_security.png";
const globalImg = "/assets/global_banking.png";
const liquidityImg = "/assets/instant_liquidity.png";
const wealthImg = "/assets/private_wealth.png";
const auditImg = "/assets/transparent_audits.png";
const btcIcon = "/assets/btc-logo.png";
const ethIcon = "/assets/eth-logo.png";
const usdtIcon = "/assets/usdt-logo.png";
const xlmIcon = "/assets/xlm-logo.png";
const xrpIcon = "/assets/xrp-logo.png";
const dogeIcon = "/assets/doge-logo.png";
const ltcIcon = "/assets/ltc-logo.png";
const algoIcon = "/assets/algo-logo.png";
const solIcon = "/assets/sol-logo.png";
const bnbIcon = "/assets/bnb-logo.png";
const qtumIcon = "/assets/qtum-logo.png";
const tezosIcon = "/assets/tezos-logo.png";
const thetaIcon = "/assets/theta-logo.png";
const fileCoinIcon = "/assets/filecoin-logo.png";
const nanoIcon = "/assets/nano-logo.png";
const shibaIcon = "/assets/shiba-logo.png";
const trumpIcon = "/assets/trump-logo.png";
const adaIcon = "/assets/ada-logo.webp";
const xdceIcon = "/assets/xdce-logo.svg";
const bitcoinQRCode = "/assets/bitcoin-qr.jpg";
const ethQRCode = "/assets/eth-qr.jpg";
const xrpQRCode = "/assets/xrp-qr.jpg";
const xlmQRCode = "/assets/xlm-qr.jpg";
const usdtQRCode = "/assets/usdt-trc20-qr.jpg";
const dogeQRCode = "/assets/doge-qr.jpg";
const algoQRCode = "/assets/algo-qr.jpg";
const solQRCode = "/assets/sol-qr.jpg";
const trumpQRCode = "/assets/trump-qr.jpg";
const adaQRCode = "/assets/ada-qr.jpg";
const xdceQRCode = "/assets/xdce-qr.jpg";
const shibaQRCode = "/assets/shiba-qr.jpeg";
import { DollarSign } from "lucide-react";

export const registrationFormField = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "Enter your first name",
    type: "text",
    min: 2,
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Enter your last name",
    type: "text",
    min: 2,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "sample@gmail.com",
    type: "email",
    // pattern: "[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-Z]{2,}$",
    title: "Please enter a valid email address (e.g., user@example.com)",
  },
  {
    name: "username",
    label: "username",
    placeholder: "Enter a unique username",
    type: "text",
    min: 4,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter a password",
    type: "password",
    // pattern:
    //   "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
    // title:
    //   "Password must contain at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character",
    title: "Password must contain at least 4 characters",
    min: 6,
  },
  {
    name: "confirmPassword",
    label: "confirm your password",
    placeholder: "Confirm your password",
    type: "password",
    min: 6,
  },
];

export const loginFormFields = [
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email address",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    type: "password",
  },
];

export const chooseUsCardInfo = [
  {
    title: "Regulatory Compliance",
    subtext:
      "Fully licensed and regulated financial infrastructure. We adhere to the strictest international banking standards, ensuring your operations are always compliant and secure.",
    start: 1,
    image: regulatoryImg,
  },
  {
    title: "Institutional Security",
    subtext:
      "Your assets are safeguarded in military-grade cold storage vaults with multi-signature technology and comprehensive insurance coverage against theft or loss.",
    image: securityImg,
  },
  {
    title: "Global Banking Access",
    subtext:
      "Experience borderless finance with support for over 50 fiat currencies. Send and receive funds globally with instant wire transfers and zero foreign exchange fees.",
    image: globalImg,
  },
  {
    title: "Instant Liquidity",
    subtext:
      "Access your funds 24/7 with our real-time settlement network. Convert between crypto and fiat instantly, providing you with the liquidity you need, when you need it.",
    image: liquidityImg,
  },
  {
    title: "Private Wealth Management",
    subtext:
      "Bespoke financial services for high-net-worth individuals. Enjoy dedicated account managers, personalized investment strategies, and priority 24/7 concierge support.",
    image: wealthImg,
  },
  {
    title: "Transparent Audits",
    subtext:
      "Trust is earned through transparency. We provide real-time proof of reserves and undergo rigorous quarterly audits by top-tier accounting firms to verify solvency.",
    image: auditImg,
  },
];

export const wallets = [
  {
    name: "BTC",
    id: "bitcoin",
    icon: btcIcon,
    balance: 0.0,
    value: "BTC_balance",
  },
  {
    name: "ETH",
    id: "ethereum",
    icon: ethIcon,
    balance: 0.0,
    value: "ETH_balance",
  },
  {
    name: "USDT",
    id: "tether",
    icon: usdtIcon,
    balance: 0.0,
    value: "USDT_balance",
  },
  {
    name: "XLM",
    id: "stellar",
    icon: xlmIcon,
    balance: 0.0,
    value: "XLM_balance",
  },
  {
    name: "XRP",
    id: "ripple",
    icon: xrpIcon,
    balance: 0.0,
    value: "XRP_balance",
  },
  {
    name: "DOGE",
    id: "doge",
    icon: dogeIcon,
    balance: 0.0,
    value: "DOGE_balance",
  },
  {
    name: "LTC",
    id: "litecoin",
    icon: ltcIcon,
    balance: 0.0,
    value: "litecoin_balance",
  },
  {
    name: "ALGO",
    id: "algorand",
    icon: algoIcon,
    balance: 0.0,
    value: "ALGO_balance",
  },
  {
    name: "SOL",
    id: "solana",
    icon: solIcon,
    balance: 0.0,
    value: "SOL_balance",
  },
  {
    name: "BNB",
    id: "binancecoin",
    icon: bnbIcon,
    balance: 0.0,
    value: "bnb_balance",
  },
  {
    name: "QTUM",
    id: "qtum",
    icon: qtumIcon,
    balance: 0.0,
    value: "qtum_balance",
  },
  {
    name: "TEZOS",
    id: "tezos",
    icon: tezosIcon,
    balance: 0.0,
    value: "tezos_balance",
  },
  {
    name: "THETA",
    id: "theta-token",
    icon: thetaIcon,
    balance: 0.0,
    value: "theta_balance",
  },
  {
    name: "Filecoin",
    id: "filecoin",
    icon: fileCoinIcon,
    balance: 0.0,
    value: "filecoin_balance",
  },
  {
    name: "NANO",
    id: "nano",
    icon: nanoIcon,
    balance: 0.0,
    value: "nano_balance",
  },
  {
    name: "SHIBA",
    id: "shiba-inu",
    icon: shibaIcon,
    balance: 0.0,
    value: "shiba_balance",
  },
  {
    name: "ADA",
    id: "cardano",
    icon: adaIcon,
    balance: 0.0,
    value: "ada_balance",
  },
  {
    name: "XDCE",
    id: "xdce-crowd-sale",
    icon: xdceIcon,
    balance: 0.0,
    value: "xdce_balance",
  },
  {
    name: "Total Withdrawals",
    icon: thetaIcon,
    balance: 0.0,
    value: "withdrawal_balance",
  },
];

export const depositMethods = [
  { name: "Bitcoin", id: "bitcoin", icon: btcIcon, path: "bitcoin" },
  { name: "Ethereum", id: "ethereum", icon: ethIcon, path: "ethereum" },
  { name: "XRP", id: "ripple", icon: xrpIcon, path: "xrp" },
  { name: "XLM", id: "stellar", icon: xlmIcon, path: "xlm" },
  { name: "USDT TRC20", id: "tether", icon: usdtIcon, path: "usdt" },
  { name: "DOGEcoin", id: "doge", icon: dogeIcon, path: "dogecoin" },
  { name: "ALGO", id: "algorand", icon: algoIcon, path: "algo" },
  { name: "Solana", id: "solana", icon: solIcon, path: "sol" },
  { name: "ADA", id: "cardano", icon: adaIcon, path: "cardano" },
  { name: "XDCE", id: "xdce-crowd-sale", icon: xdceIcon, path: "xdce" },
  { name: "SHIBA", id: "shiba-inu", icon: shibaIcon, path: "shiba" },
];

export const paymentGateways = [
  {
    type: "Bitcoin",
    id: "bitcoin",
    value: "BTC_balance",
    qrCode: bitcoinQRCode,
    icon: btcIcon,
    walletAddress: "bc1qx4np0tgsl0ys7jcqes4cva9y40wjhf5nfhv066",
  },
  {
    type: "XRP",
    value: "XRP_balance",
    id: "ripple",
    qrCode: xrpQRCode,
    icon: xrpIcon,
    walletAddress: "r9VvmZmL7VASmBb8p3ByjnjxdKJ62BQme1",
  },
  {
    type: "XLM",
    value: "XLM_balance",
    id: "stellar",
    qrCode: xlmQRCode,
    icon: xlmIcon,
    walletAddress: "GDPNUJUQV6KMBEXDEE3M3EHW6IQPFHIF6LWA45IQOG4Q4NIRKSNV2QZ5",
  },
  {
    type: "ethereum",
    value: "ETH_balance",
    id: "ethereum",
    qrCode: ethQRCode,
    icon: ethIcon,
    walletAddress: "0xFb23Bf97A6e70A978F8dC518EC7d83E57aad7584",
  },
  {
    type: "USDT",
    value: "USDT_balance",
    extra: "(TRC20)",
    id: "tether",
    qrCode: usdtQRCode,
    icon: usdtIcon,
    walletAddress: "TRtxynBmL4fyg7Qa7nJvaEFsVobVysk9PB",
  },
  {
    type: "dogecoin",
    value: "DOGE_balance",
    id: "doge",
    qrCode: dogeQRCode,
    icon: dogeIcon,
    walletAddress: "DLFyTv52jgjptxXxzwaDwUQUYAZ72vZjKE",
  },
  {
    type: "Sol",
    value: "SOL_balance",
    id: "solana",
    icon: solIcon,
    qrCode: solQRCode,
    walletAddress: "BsfZQAEfvbkxfDQFFGqXfQNVV7y8L6rCprs7MY3VykSf",
  },
  {
    type: "Algo",
    value: "ALGO_balance",
    id: "algorand",
    icon: algoIcon,
    qrCode: algoQRCode,
    walletAddress: "YCAFLK3SGL4EHGKI7FG2NBWP5JWCMNID3PINF5F3QLQXJMOKRC4SDA36TM",
  },
  {
    type: "ADA",
    value: "ada_balance",
    id: "cardano",
    extra: "(cardano)",
    icon: adaIcon,
    qrCode: adaQRCode,
    walletAddress:
      "addr1q8lvmeymcwq3nrm6rzwnyn73t6edlvzppt6qzp735x08hvzshcgz0a2vlgd0mhr4nwlw89r3zkg36me9hf99rz04j9nqwncmvs",
  },
  {
    type: "XDCE",
    value: "xdce_balance",
    id: "XDCE",
    extra: "(ERC20)",
    icon: xdceIcon,
    qrCode: xdceQRCode,
    walletAddress: "0xFb23Bf97A6e70A978F8dC518EC7d83E57aad7584",
  },
  {
    type: "shiba",
    value: "shiba_balance",
    id: "shiba-inu",
    icon: shibaIcon,
    qrCode: shibaQRCode,
    walletAddress: "0xFb23Bf97A6e70A978F8dC518EC7d83E57aad7584",
  },
];

export const withdrawalOptions = [
  {
    title: "XLM",
    value: "XLM_balance",
  },
  {
    title: "XRP",
    value: "XRP_balance",
  },
  {
    title: "Bitcoin",
    value: "BTC_balance",
  },
  {
    title: "USDT",
    value: "USDT_balance",
  },
  {
    title: "Ethereum",
    value: "ETH_balance",
  },
  {
    title: "Doge",
    value: "DOGE_balance",
  },
  {
    title: "Litecoin",
    value: "litecoin_balance",
  },
  {
    title: "ALGORAND",
    value: "ALGO_balance",
  },
  {
    title: "SOLANA",
    value: "SOL_balance",
  },
  {
    title: "BNB",
    value: "bnb_balance",
  },
  {
    title: "QTUM",
    value: "qtum_balance",
  },
  {
    title: "TEZOS (XTZ)",
    value: "tezos_balance",
  },
  {
    title: "THETA",
    value: "theta_balance",
  },
  {
    title: "FILECOIN",
    value: "filecoin_balance",
  },
  {
    title: "NANO",
    value: "nano_balance",
  },
  {
    title: "SHIBA",
    value: "shiba_balance",
  },
  {
    title: "ADA (Cardano)",
    value: "ada_balance",
  },
  {
    title: "XDCE (ERC20)",
    value: "xdce_balance",
  },
];
