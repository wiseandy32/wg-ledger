import GateWay from "@/views/GateWay";

export default async function Page({ params }) {
  const { gateway } = await params;
  return <GateWay gateway={gateway} />;
}

export const metadata = {
  title: "Deposit Details | Quantum Global System",
  description: "Web ledger application",
};
