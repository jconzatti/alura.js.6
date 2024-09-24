const ElementoBotaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const ElementoFormularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const ElementoListaDeTarefas = document.querySelector(".app__section-task-list");

const Tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

Tarefas.forEach(lTarefa => {adicionarTarefaNaLista(lTarefa)});

function criarElementoTarefa(pDescricaoDaTarefa){
    const lItemDaListaDeTarefas = document.createElement("li");
    lItemDaListaDeTarefas.classList.add("app__section-task-list-item");
    const lImagemDoItemDaListaDeTarefas = document.createElement("svg");
    lImagemDoItemDaListaDeTarefas.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;
    const lDescricaoDaTarefa =  document.createElement("p");
    lDescricaoDaTarefa.classList.add("app__section-task-list-item-description");
    lDescricaoDaTarefa.textContent = pDescricaoDaTarefa;
    const lBotaoEditarTarefa = document.createElement("button");
    lBotaoEditarTarefa.classList.add("app_button-edit");
    lBotaoEditarTarefa.innerHTML = `<img src="/imagens/edit.png">`;
    lItemDaListaDeTarefas.appendChild(lImagemDoItemDaListaDeTarefas);
    lItemDaListaDeTarefas.appendChild(lDescricaoDaTarefa);
    lItemDaListaDeTarefas.appendChild(lBotaoEditarTarefa);
    return lItemDaListaDeTarefas;
}

function adicionarTarefaNaLista(pTarefa){
    const lItemDaListaDeTarefas = criarElementoTarefa(pTarefa.descricao);
    ElementoListaDeTarefas.appendChild(lItemDaListaDeTarefas);
}

ElementoBotaoAdicionarTarefa.addEventListener("click", () => {
    ElementoFormularioAdicionarTarefa.classList.toggle("hidden");
});

ElementoFormularioAdicionarTarefa.addEventListener("submit", (pEvento) => {
    pEvento.preventDefault();
    const lElementoCampoTarefa = document.querySelector(".app__form-textarea");
    const lTarefa = {
        descricao: lElementoCampoTarefa.value
    }
    Tarefas.push(lTarefa);
    adicionarTarefaNaLista(lTarefa);
    localStorage.setItem("tarefas", JSON.stringify(Tarefas));
    lElementoCampoTarefa.value = "";
    ElementoFormularioAdicionarTarefa.classList.add("hidden");
});
