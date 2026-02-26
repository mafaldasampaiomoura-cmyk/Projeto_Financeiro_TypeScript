export interface Transaction {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
    data: string;
}
export declare let transactions: Transaction[];
export declare function carregarTransactions(): void;
export declare function getTransactions(): Transaction[];
export declare function addTransactions(novaTransacao: Transaction): void;
export declare function removeTransaction(id: number): void;
//# sourceMappingURL=transactions.d.ts.map