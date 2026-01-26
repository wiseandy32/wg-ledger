import VerifyPage from "@/views/VerifyAccount";

export default async function Page({ params }) {
  const { uid } = await params;
  return <VerifyPage uid={uid} />;
}
