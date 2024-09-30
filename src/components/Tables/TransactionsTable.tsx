"use client";

import { Transaction } from "@/types/transaction";
import { fetchTransactions } from "../../../db/transactions";
import { useEffect, useState } from "react";
import currencyIDRFormatter from "../../../utils/currencyIDR.js";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await fetchTransactions();
        setTransactions(transactions);
        console.log('transactions', transactions);
      } catch (error) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-black dark:text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-black dark:text-white">{error}</p>
      </div>
    );
  }


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Transactions
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Donator
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Installment
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Transaction Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Transaction Status
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Transaction Receipt
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium xsm:text-base">
              Payment Method
            </h5>
          </div>
        </div>

        {transactions.map((transcation, key) => (
          <div
            className={`grid grid-cols-6 sm:grid-cols-6 ${key === transactions.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                Nicholas
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {transcation.installment ? (
                <p className="text-black dark:text-white">{currencyIDRFormatter(transcation.installment)}</p>
              ) : <p className="text-black dark:text-white">Sekali Bayar</p>}
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{new Date(transcation.transaction_date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{transcation.transaction_status}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {/* <p className="text-black dark:text-white">{transcation.transaction_receipt}</p> */}
              <Popover placement="bottom" color="secondary" className="rounded-xl">
                <PopoverTrigger>
                  <Button>View Receipt</Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-xl">
                  <div className="px-1 py-2">
                    <div className="text-small font-bold text-white">Receipt URL</div>
                    <a href={transcation.transaction_receipt} target="_blank" className="text-small underline text-blue-800">Open</a>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {transcation.payment_method ? (
                <p className="text-black dark:text-white">{transcation.payment_method}</p>
              ) : <p className="text-black dark:text-white">Tunai</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
