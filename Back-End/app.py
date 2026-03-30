from flask import Flask, request, jsonify
app = Flask(__name__)
# Banco de dados temporário (em memória)
lista_compras = ["Café", "Pão", "Leite"]
# Rota para VER a lista
@app.route('/compras', methods=['GET'])
def listar():
    return jsonify({"itens": lista_compras})
# Rota para ADICIONAR um item
@app.route('/compras', methods=['POST'])
def adicionar():
    # Pega o dado enviado no corpo da requisição (JSON)
    novo_item = request.json.get('item')
    if novo_item:
        lista_compras.append(novo_item)
        return jsonify({"mensagem": "Item adicionado!"}), 201
    return jsonify({"erro": "Item inválido"}), 400
if __name__ == '__main__':
    app.run(debug=True)