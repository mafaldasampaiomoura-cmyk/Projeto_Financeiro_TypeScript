import type{ Transaction } from "../transactions/transactions.js";

export function getTotalReceitas (lista: Transaction []) : number{
   return lista.reduce((total: number, t) => { //para cada transação: se for receita soma se não devolve 
      if(t.tipo === "receita"){
         return total + t.valor
      } else {
      return total; 
   }
}, 0);  
}; 

export function getTotalDespesas (lista: Transaction []): number {
   return lista.reduce ((total: number, t) => { //para cada transação: se for despesa subtrai se não devolve 
      if(t.tipo === "despesa"){
         return total + t.valor
      } else {
      return total; 
   }
}, 0);  
};

export function getSaldo (lista: Transaction []): number {
   return getTotalReceitas(lista) - getTotalDespesas(lista)
   
}

// TS: importo o transaction do módulo transactions. Aqui declaro que a lista que elee vai buscar pertence 
// a transaction. Daqui declaro que as funções vão dar um número, ou seja, o seu resultado. 
// Quando estou a tipar a lista tenho de colocar entre o [] porque senão o TS vai dar como erro. 

// No reduce defini-se o total dos reduce como um number porque é isso que eu quero ir devolver. Ou seja, eu sei que ele vai ter de devolver aqui um número 
