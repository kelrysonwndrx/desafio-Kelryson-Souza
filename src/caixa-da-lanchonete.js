
class CaixaDaLanchonete {

    cardapio = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
    }

    /*  - Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem "Item extra não pode ser pedido sem o principal". [Done]
        - Combos não são considerados como item principal. [Done]
        - É possível pedir mais de um item extra sem precisar de mais de um principal. [Done]
        - Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!" [Done]
        - Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!". [Done]
        - Se o código do item não existir, apresentar mensagem "Item inválido!" [Done]
        - Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!" [Done]*/


    calcularValorDaCompra(metodoDePagamento, itens) {

        var produto = [];
        var valores = [];
        var precoFinal;

        if(metodoDePagamento != "dinheiro" && metodoDePagamento != "debito" && metodoDePagamento != "credito"){
            return "Forma de pagamento Inválida!"
        } else if(itens.length == 0){
            return "Não há itens no carrinho de compra!"
        } else {
                for(var i = 0; i < itens.length; i++){
                    var aux = itens[i].split(",")
                    if(!(Object.keys(this.cardapio).includes(aux[0]))){
                        return "Item inválido!"
                    } if(aux[1] == "0"){
                        return "Quantidade inválida!"
                    }else{
                        produto.push(aux[0])
                        valores.push(parseFloat(aux[1])*(this.cardapio[aux[0]]))
                    }
                }
                if(((produto.includes("chantily")) && !(produto.includes("cafe"))) || (produto.includes("queijo")) && !(produto.includes("sanduiche"))){
                    return "Item extra não pode ser pedido sem o principal"
                } else{
                    precoFinal = valores.reduce((accumulator,value) => accumulator + value,0);

                    if(metodoDePagamento == "dinheiro"){
                        precoFinal -= (precoFinal*0.05)
                    } 
                    if(metodoDePagamento == "credito"){
                        precoFinal += (precoFinal*0.03)
                    }
                    return "R$ "+(precoFinal.toFixed(2)).replace('.', ',')
                }
        }
    }
}

export { CaixaDaLanchonete };

 var caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'sanduiche,1', 'queijo,1', 'chantily,1']))

