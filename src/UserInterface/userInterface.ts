
import { transactions, removeTransaction } from "../transactions/transactions.js"// escrevo js porque ele depois faz a compilação para o Ts. Quando compilar passa a haver o .js 
import { getTotalDespesas, getTotalReceitas, getSaldo } from "../calculations/calculations.js";

const listaTransacao = document.querySelector(".lista-transacoes");


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

   listaTransacao.innerHTML= novaTransacao; //meter a lista dentro do meu container 
}

export function atualizacaoCards (lista = transactions){ //Recebo a lista, calculo os 3 números e meto-os nos cards 
   const saldoValor = document.querySelector("#saldoValor");  //vou buscar ao documento do index onde é que estão os cards. 
   const  receitasValor = document.querySelector("#receitasValor"); 
   const despesasValor = document.querySelector("#despesasValor"); 

   const saldo = getSaldo(lista); //chamo as funções que vou precisar de trabalhar para fazer que ele pegue nas funções que eu fiz. 
   const receita = getTotalReceitas(lista); 
   const despesa = getTotalDespesas(lista);

   saldoValor.textContent = formatacaoEuro(saldo); //escrevo no texto/dashboard, o cálculo do  que eu preciso 
   receitasValor.textContent = formatacaoEuro(receita); 
   despesasValor.textContent = formatacaoEuro(despesa); 
}

listaTransacao.addEventListener("click", (e) => { 
   const btn = e.target.closest(".btn-remover");
  
   if (!btn){
   return;
  }

  const linha = btn.closest(".item-transacao");
  const id = Number(linha.dataset.id);

  removeTransaction(id);
  renderTransactions();
  atualizacaoCards();

})

export function formatacaoEuro (valor){ //criei esta função para ser mais fácil adicionar os euros a cada box 
   return valor.toLocaleString("pt-Pt", {style:"currency", currency: "EUR"})
};