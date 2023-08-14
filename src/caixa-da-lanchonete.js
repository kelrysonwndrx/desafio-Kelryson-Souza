
class CaixaDaLanchonete {

//  - Cardápio com valores de cada item

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

    calcularValorDaCompra(metodoDePagamento, itens) {

    // Variáveis auxiliares para armazenar código dos itens e quantidades de cada um.

        var produto = [];
        var valores = [];
        var precoFinal;

    // - Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!".

        if(metodoDePagamento != "dinheiro" && metodoDePagamento != "debito" && metodoDePagamento != "credito"){
            return "Forma de pagamento Inválida!"

    // - Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!".

        } else if(itens.length == 0){
            return "Não há itens no carrinho de compra!"
        } else {

            //  - As strings do array recebido como parâmetro são separadas pelo marcador ","

                for(var i = 0; i < itens.length; i++){
                    var aux = itens[i].split(",")

                // - Se o código do item não existir, apresentar mensagem "Item inválido!".

                    if(!(Object.keys(this.cardapio).includes(aux[0]))){
                        return "Item inválido!"

                    /* - *Caso adicional: Em caso de durante a inserção dos itens um deles seja informado sem a quantidade, 
                    apresentar a mensagem "Quantidade de *respectivo Item* não informada". */

                    } if(aux[1]==null || aux[1]==""){

                        return "Quantidade de "+aux[0]+" não informada"

                    } else{

                    // - Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".

                        if(aux[1] == "0"){
                            return "Quantidade inválida!"
                        }else{

                        /* - A primeira string indicando o item pedido é colocada no array "produto" enquanto a segunda string 
                           referente a quantidade é extraído o seu valor em float e multiplicado com o respectivo preço do item
                           pedido consultado no dicionário "cardapio". Logo após o resultado dessa operação é colocado no array "valores".
                        */

                            produto.push(aux[0])
                            valores.push(parseFloat(aux[1])*(this.cardapio[aux[0]]))
                        }
                    }
                }

            /*  - Caso item extra seja informado num pedido que não tenha o respectivo item principal, 
                  apresentar mensagem "Item extra não pode ser pedido sem o principal".
                - Combos não são considerados como item principal.
                - É possível pedir mais de um item extra sem precisar de mais de um principal. */

                if(((produto.includes("chantily")) && !(produto.includes("cafe"))) || (produto.includes("queijo")) && !(produto.includes("sanduiche"))){
                    return "Item extra não pode ser pedido sem o principal"
                } else{

                //  - Os valores do array "valores" são somados resultando no preço total dos itens pedidos.

                    precoFinal = valores.reduce((accumulator,value) => accumulator + value,0);

                //  - Pagamento em dinheiro tem 5% de desconto

                    if(metodoDePagamento == "dinheiro"){
                        precoFinal -= (precoFinal*0.05)
                    } 

                //  - Pagamento a crédito tem acréscimo de 3% no valor total

                    if(metodoDePagamento == "credito"){
                        precoFinal += (precoFinal*0.03)
                    }

                //  - Exemplo de saída do valor da compra: "R$ 6,00"

                    return "R$ "+(precoFinal.toFixed(2)).replace('.', ',')
                }
        }
    }
}

export { CaixaDaLanchonete };

