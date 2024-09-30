import type { Transaction } from "@/types/transaction";
import axios from "axios";

export type Transactions = (
    Transaction[]
);

export async function fetchTransactions() : Promise<Transactions> {
    try {
        const response = await axios.get('http://localhost:8080/transactions');
        const transactions: Transactions = response.data;
        return transactions;
    } catch(error) {
        throw new Error(`Error fetching transactions: ${error}`);
    }
}