import { saveTransactions, loadTransactions } from "../storage/storage.js";
export let transactions = loadTransactions(); // array de transaction
// faço o transactions = a loadTransactions porque ele devolve um transaction []. Assim garanto que os dados já vêm carregados. 
export function carregarTransactions() {
    transactions = loadTransactions();
}
export function getTransactions() {
    return transactions;
}
export function addTransactions(novaTransacao) {
    transactions.push(novaTransacao);
    saveTransactions(transactions);
}
export function removeTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions(transactions);
}
//# sourceMappingURL=transactions.js.map