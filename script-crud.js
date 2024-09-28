const ElementoBotaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const ElementoFormularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const ElementoListaDeTarefas = document.querySelector(".app__section-task-list");
const ElementoBotaoDoFormularioParaCancelarTarefa = document.querySelector(".app__form-footer__button--cancel");
const ElementoBotaoRemoverTarefasConcluidas = document.getElementById("btn-remover-concluidas");
const ElementoBotaoRemoverTodasAsTarefas = document.getElementById("btn-remover-todas");

let Tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
Tarefas.forEach(lTarefa => {adicionarTarefaNaLista(lTarefa)});

let TarefaSelecionada = null;
let ElementoItemTarefaSelecionada = null;

function criarElementoTarefa(pTarefa){
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
    lDescricaoDaTarefa.textContent = pTarefa.descricao;
    const lBotaoEditarTarefa = document.createElement("button");
    lBotaoEditarTarefa.classList.add("app_button-edit");
    lBotaoEditarTarefa.innerHTML = `<img src="/imagens/edit.png">`;
    lBotaoEditarTarefa.onclick = () => {
        //debugger; //descomente para debugar o código =)
        const lNovaDescricaoDaTarefa = prompt("Qual é a nova descrição da tarefa?");
        if (lNovaDescricaoDaTarefa) {
            lDescricaoDaTarefa.textContent = lNovaDescricaoDaTarefa;
            pTarefa.descricao = lNovaDescricaoDaTarefa;
            atualizarTarefas();
        }
    };

    lItemDaListaDeTarefas.appendChild(lImagemDoItemDaListaDeTarefas);
    lItemDaListaDeTarefas.appendChild(lDescricaoDaTarefa);
    lItemDaListaDeTarefas.appendChild(lBotaoEditarTarefa);

    if (pTarefa.completa){
        lItemDaListaDeTarefas.classList.add("app__section-task-list-item-complete");
        lItemDaListaDeTarefas.querySelector("button").setAttribute("disabled", "disabled");
    }else{
        lItemDaListaDeTarefas.onclick = (pEvento) => {
            const lCliqueNoBotaoEditarTarefa = pEvento.target.classList.contains("app_button-edit") || pEvento.target.parentElement.classList.contains("app_button-edit");
            if (lCliqueNoBotaoEditarTarefa){
                return
            }
            const lTarefaFinalizada = lItemDaListaDeTarefas.classList.contains("app__section-task-list-item-complete");
            if (lTarefaFinalizada){
                return
            }
            const lElementoTarefaEmAndamento = document.querySelector(".app__section-active-task-description");
            document.querySelectorAll(".app__section-task-list-item-active").forEach(lItemDeTarefa => {
                lItemDeTarefa.classList.remove("app__section-task-list-item-active");    
            })
            if (TarefaSelecionada == pTarefa){
                lElementoTarefaEmAndamento.textContent = "";
                TarefaSelecionada = null;
                ElementoItemTarefaSelecionada = null;
                return
            }
            TarefaSelecionada = pTarefa;
            ElementoItemTarefaSelecionada = lItemDaListaDeTarefas;
            lElementoTarefaEmAndamento.textContent = pTarefa.descricao;
            lItemDaListaDeTarefas.classList.add("app__section-task-list-item-active");
        };
    }

    return lItemDaListaDeTarefas;
}

function adicionarTarefaNaLista(pTarefa){
    const lItemDaListaDeTarefas = criarElementoTarefa(pTarefa);
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
    atualizarTarefas();
    lElementoCampoTarefa.value = "";
    ElementoFormularioAdicionarTarefa.classList.add("hidden");
});

function atualizarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(Tarefas));
}

ElementoBotaoDoFormularioParaCancelarTarefa.addEventListener("click", (pEvento) => {
    pEvento.preventDefault();
    const lElementoCampoTarefa = document.querySelector(".app__form-textarea");
    lElementoCampoTarefa.value = "";
    ElementoFormularioAdicionarTarefa.classList.add("hidden");
});

document.addEventListener("AoFinalizarFoco", () => {
    if (TarefaSelecionada && ElementoItemTarefaSelecionada){
        ElementoItemTarefaSelecionada.classList.remove("app__section-task-list-item-active");
        ElementoItemTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        ElementoItemTarefaSelecionada.querySelector("button").setAttribute("disabled", "disabled");
        TarefaSelecionada.completa = true;
        atualizarTarefas();
    }
});

ElementoBotaoRemoverTarefasConcluidas.addEventListener("click", () => {
    removerTarefas(true);
});

ElementoBotaoRemoverTodasAsTarefas.addEventListener("click", () => {
    removerTarefas(false);
});

function removerTarefas(pSomenteConcluidas){
    const lClasseDeTarefa = `app__section-task-list-item${pSomenteConcluidas?"-complete":""}`;
    removerTarefasPelaClasseDoItemDaLista(lClasseDeTarefa);
    Tarefas = pSomenteConcluidas?Tarefas.filter(lTarefa => !lTarefa.completa):[];
    atualizarTarefas();
}

function removerTarefasPelaClasseDoItemDaLista(pClasse){
    document.querySelectorAll(`.${pClasse}`).forEach(lItemDaListaDeTarefas => {
        lItemDaListaDeTarefas.remove();
    });
}