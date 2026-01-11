import { depositMethods } from "@/data";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth/use-auth";
import { getSubCollectionDocuments } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

function Deposit() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: recentDeposits } = useQuery({
    queryKey: ["recentDeposits", user?.uid],
    queryFn: async () => {
      if (!user?.docRef) return [];
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions"
      );
      return (documents || [])
        .filter((doc) => doc.type === "deposit")
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 6);
    },
    enabled: !!user?.docRef,
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold premium-gradient-text">
          Fund your Account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pick your preferred payment method
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {depositMethods.map((wallet, index) => (
          <div
            key={wallet.name}
            className={`md:col-start-[${index + 1}] md:col-end-[${
              index + 3
            }] cursor-pointer glass-card glass-card-hover flex gap-6 min-w-[200px] items-center p-4 rounded-xl transition-all duration-300`}
            onClick={() => navigate(wallet.path)}
          >
            <div className="h-10 w-10 grid place-content-center">
              <img
                src={wallet.icon}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <span className="uppercase font-medium tracking-wide">
              {wallet.name}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Recent Deposits</h2>
          <Button
            variant="outline"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/user/transactions?type=deposit")}
          >
            See more
          </Button>
        </div>
        <div className="glass-card rounded-2xl p-6 overflow-hidden">
          <DataTable
            columns={columns}
            data={recentDeposits || []}
            hideFilters={true}
            hidePagination={true}
          />
        </div>
      </div>
    </>
  );
}

export default Deposit;
