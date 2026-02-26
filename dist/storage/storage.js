const STORAGE_KEY = "transacoes";
export function saveTransactions(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}
export function loadTransactions() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : []; //ternário: se dados for null ele não devolve nada, entra num array vazio. 
}
//(JSON.parse(dados) as Transaction[]) siginifica que caso hajam dados, faz parse transforma uma forma de dados
// numa estrutura de dados )
//# sourceMappingURL=storage.js.map