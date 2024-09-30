export type Transaction = {
    installment: number | null;
    amount: number;
    transaction_date: Date;
    transaction_status: string;
    transaction_receipt: string;
    payment_method: string | null;
    donator: object;
}