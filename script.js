
const formulario = document.getElementById("form-notas");
const listaNotas = document.getElementById("lista-notas");
const botaoAdicionar = document.getElementById("btn-adicionar");

const campoMediaMinima = document.getElementById("media-minima");
const resultado = document.getElementById("resultado");
const valorMedia = document.getElementById("valor-media");
const situacao = document.getElementById("situacao");
const detalhe = document.getElementById("detalhe");
const erro = document.getElementById("erro");


botaoAdicionar.addEventListener("click", function () {
  const quantidade = document.querySelectorAll(".nota__input").length;

  const novaNota = document.createElement("div");
  novaNota.className = "nota";

  novaNota.innerHTML = `
        <label>Nota ${quantidade + 1}</label>
        <input
            type="number"
            class="nota__input"
            min="0"
            max="10"
            step="0.1"
            placeholder="0 a 10"
        >
    `;

  listaNotas.appendChild(novaNota);
});


formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const camposNotas = document.querySelectorAll(".nota__input");

  const mediaMinima = Number(campoMediaMinima.value);

  erro.hidden = true;
  resultado.hidden = true;

  for (const campo of camposNotas) {
    if (campo.value.trim() === "") {
      erro.textContent = "Preencha todas as notas antes de calcular.";
      erro.hidden = false;
      return;
    }
    if (Number(campo.value) < 0 || Number(campo.value) > 10) {
      erro.textContent = "As notas devem estar entre 0 e 10.";
      erro.hidden = false;
      return;
    }
  }

  if (
    campoMediaMinima.value.trim() === "" ||
    mediaMinima < 0 ||
    mediaMinima > 10
  ) {
    erro.textContent = "Digite uma média mínima entre 0 e 10.";
    erro.hidden = false;
    return;
  }

  let soma = 0;

  for (const campo of camposNotas) {
    soma = soma + Number(campo.value);
  }

  const media = soma / camposNotas.length;

  valorMedia.textContent = media.toFixed(1).replace(".", ",");
  resultado.classList.remove("aprovado", "recuperacao", "reprovado");

  if (media >= mediaMinima) {
    situacao.textContent = "Aprovado!";
    resultado.classList.add("aprovado");
  } else {
    situacao.textContent = "Reprovado!";
    resultado.classList.add("reprovado");
  }

  detalhe.textContent =
    "Média mínima para aprovação: " + mediaMinima.toFixed(1).replace(".", ",");

  resultado.hidden = false;
});


formulario.addEventListener("reset", function () {
  resultado.hidden = true;
  erro.hidden = true;

  resultado.classList.remove("aprovado", "recuperacao", "reprovado");
});
