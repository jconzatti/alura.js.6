const ElementoBotaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const ElementoFormularioAdicionarTarefa = document.querySelector(".app__form-add-task");

const Tarefas = [];

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
    localStorage.setItem("tarefas", JSON.stringify(Tarefas));
});
