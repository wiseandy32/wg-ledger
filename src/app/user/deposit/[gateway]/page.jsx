import GateWay from "@/views/GateWay";

export default async function Page({ params }) {
  const { gateway } = await params;
  return <GateWay gateway={gateway} />;
}
