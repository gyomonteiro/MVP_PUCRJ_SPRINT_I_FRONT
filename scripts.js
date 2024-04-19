/*
  -> Função para obter a lista de bebidas na taverna (via requisição GET)
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/bebidas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.bebidas.forEach(item => insertList(item.bebida, item.tipo, item.ano, item.categoria, item.produtor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para carregamento inicial da lista
*/
getList()

/*
  -> Função para adicionar uma bebida na lista (via requisição POST)
*/
const postItem = async (inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor) => {
  const formData = new FormData();
  formData.append('bebida', inputBebida);
  formData.append('tipo', inputTipo);
  formData.append('ano', inputAno);
  formData.append('categoria', inputCategoria);
  formData.append('produtor', inputProdutor);

  let url = 'http://127.0.0.1:5000/bebida';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para criar um botão close para cada bebida da taverna
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  -> Função para remover uma bebida da taverna (click no botão close)
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Está certo disso?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Pronto, bebida removida (espero que tenha sido bebida)!")
      }
    }
  }
}

/*
  -> Função para remover uma bebida da taverna (via requisição DELETE)
*/
const deleteItem = (item) => {
  console.log(item)
  let url = `http://127.0.0.1:5000/bebida?bebida=${encodeURIComponent(item)}`;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para adicionar uma nova bebida na taverna com nome, tipo, ano, categoria e produtor
*/
const newItem = () => {
  let inputBebida = document.getElementById("newBebida").value;
  let inputTipo = document.getElementById("newTipo").value;
  let inputAno = document.getElementById("newAno").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputProdutor = document.getElementById("newProdutor").value;

  if (inputBebida === '') {
    alert("Escreva o nome de uma bebida!");
  } else if (isNaN(inputAno)) {
    alert("Ano deve ser numérico!");
  } else {
    insertList(inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor)
    postItem(inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor)
    alert("Bebida incluída!")
  }
}

/*
  Função para inserir bebidas na lista
*/
const insertList = (bebida, tipo, ano, categoria, produtor) => {
  var item = [bebida, tipo, ano, categoria, produtor];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newBebida").value = "";
  document.getElementById("newTipo").value = "";
  document.getElementById("newAno").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newProdutor").value = "";

  removeElement();
}
