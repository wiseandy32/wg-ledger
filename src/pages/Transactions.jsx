import { columns, conversionColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useAuth } from "@/context/auth/use-auth";
import {
  getSubCollectionDocuments,
  subscribeToSubCollection,
} from "@/lib/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function TransactionHistoryPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type");

  const { data: transactions } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions"
      );
      return (documents || []).sort((a, b) => b.timestamp - a.timestamp);
    },
  });

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToSubCollection(
        "users",
        user?.docRef,
        "transactions",
        () => qc.invalidateQueries({ queryKey: ["user"] })
      );

      return unsubscribe;
    }
  }, [user, user?.docRef, qc]);

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold premium-gradient-text">
          Transaction History
        </h1>
        <p className="text-muted-foreground">
          A comprehensive overview of all your deposits, withdrawals, and
          conversions.
        </p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="max-w-[calc(100vw-2rem)] md:max-w-full">
          <DataTable
            columns={columns}
            conversionColumns={conversionColumns}
            data={transactions || []}
            defaultType={defaultType}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionHistoryPage;
