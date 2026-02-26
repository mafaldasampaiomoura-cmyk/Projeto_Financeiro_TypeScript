import { saveTransactions, loadTransactions } from "../storage/storage.js";

export interface Transaction { // vai ser o nosso manual de instruções. 
    id: number, 
    descricao: string, 
    valor: number, 
    tipo: 'receita' | 'despesa', // defino estas duas variáveis e digo ao TypeScript que não podem entrar mais nada. Apenas estas duas   
    data: string, // guardo em string por no js eu coloco to locale Date String --> converte para uma string por isso 
}

export let transactions: Transaction [] = loadTransactions (); // array de transaction
// faço o transactions = a loadTransactions porque ele devolve um transaction []. Assim garanto que os dados já vêm carregados. 


export function carregarTransactions() {
  transactions = loadTransactions();
}

export function getTransactions(): Transaction[] { //aqui coloco o retorno porque 
  return transactions;
}

export function addTransactions(novaTransacao: Transaction): void {
  transactions.push(novaTransacao);
  saveTransactions(transactions);
}

export function removeTransaction(id: number): void {
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions(transactions);
}
