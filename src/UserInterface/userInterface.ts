
import { transactions, removeTransaction } from "../transactions/transactions.js"// escrevo js porque ele depois faz a compilação para o Ts. Quando compilar passa a haver o .js 
import { getTotalDespesas, getTotalReceitas, getSaldo } from "../calculations/calculations.js";

const listaTransacao = document.querySelector<HTMLElement>(".lista-transacoes");
if (!listaTransacao){
   throw new Error ("Elemento Lista de Transação Não encontrada");
};
const listaTransacaoElemento = listaTransacao

export function renderTransactions() { //renderizar para aparecer na tela. É esta função que é responsável por isto. 
   let novaTransacao = ''; //acumular uma string no HTML. Esta variável é a mesma que tem de estar no forEach 

   transactions.forEach((t) => { //forEach percorre um array  // span para criar blocos //quando ele é chamado, a informação já existe lá 
      //span t.tipo vai ser responsável por garantir que se t.tipo for uma receita, vai colocar a etiqueta-receita. Se não mete a etiqueta despesa 
      // span tvalor vai colocar os valores ou como positivos ou como negativos
      novaTransacao = novaTransacao +
        `<div class = "transaction item-transacao" data-id="${t.id}" > 
            <span> ${t.descricao} </span>
            <span class="${t.tipo === "receita" ? "etiqueta-receita" : "etiqueta-despesa"}">${t.tipo}</span> 
            <span> ${t.data} </span>
            <span>${t.tipo === "receita" ? "+" : "-"} ${Number(t.valor).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}</span>
            <button class="btn-remover" title="Remover">✕</button>

        </div>`;
    })

   listaTransacaoElemento.innerHTML= novaTransacao; //meter a lista dentro do meu container 
}

export function atualizacaoCards (lista = transactions){ //Recebo a lista, calculo os 3 números e meto-os nos cards 
   const saldoValor = document.querySelector<HTMLElement>("#saldoValor");  //vou buscar ao documento do index onde é que estão os cards. 
   if (!saldoValor){
      throw new Error ("Elemento #saldoValor não encontrado");
   }; 
   
   const  receitasValor = document.querySelector<HTMLElement>("#receitasValor");
   if(!receitasValor){
      throw new Error ("Elementos #receitasValor não encontrado")
   } 

   const despesasValor = document.querySelector<HTMLElement>("#despesasValor"); 
   if (!despesasValor){
      throw new Error ("Elementos #despesasValor não encontrado");
   }; 

   const saldo = getSaldo(lista); //chamo as funções que vou precisar de trabalhar para fazer que ele pegue nas funções que eu fiz. 
   const receita = getTotalReceitas(lista); 
   const despesa = getTotalDespesas(lista);

   saldoValor.textContent = formatacaoEuro(saldo); //escrevo no texto/dashboard, o cálculo do  que eu preciso 
   receitasValor.textContent = formatacaoEuro(receita); 
   despesasValor.textContent = formatacaoEuro(despesa); 
}

listaTransacao.addEventListener("click", (e) => { 
   const target = e.target; 
   if (!(target instanceof Element)) return; //TS se o target não for um Elemento, sai return 
                                          // se não cliquei no btn removar, btn sai null, se clicar, o btn é elemento certo por isso posso continuar 
      
   const btn = target.closest(".btn-remover"); //TS neste caso, o Event Target está muito genérico, por isso, temos de confirmar que o target é um Element. 
  
   if (!btn){
   return;
  }

  const linha = btn.closest<HTMLElement>(".item-transacao");
  if (!linha) return; 

  const id = Number(linha.dataset.id);

  removeTransaction(id);
  renderTransactions();
  atualizacaoCards();

})

export function formatacaoEuro (valor: number): string{ //criei esta função para ser mais fácil adicionar os euros a cada box //TS faltava declarar o valor de valor bem como o que a função devolvia, neste caso, string porque tem um localeString 
   return valor.toLocaleString("pt-Pt", {style:"currency", currency: "EUR"})
};