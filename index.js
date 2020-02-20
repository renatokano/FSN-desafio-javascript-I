// Base a ser utilizada
const alunosDaEscola=[{nome:"Henrique",notas:[],cursos:[],faltas:5},{nome:"Edson",notas:[],cursos:[],faltas:2},{nome:"Bruno",notas:[10,9.8,9.6],cursos:[],faltas:0},{nome:"Guilherme",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"Full Stack",dataMatricula:new Date}],faltas:0},{nome:"Carlos",notas:[],cursos:[],faltas:0},{nome:"Lucca",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"UX",dataMatricula:new Date}],faltas:0}];

// implementação
// feature/listar-alunos
let listarAlunos = (baseDeAlunos) => {
    /* 
        Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
        Vale dizer que As informações deverão ser exibidas em um formato amigável. 
    */

    let exibirBarra = ()=>console.log("=======================================================");

    baseDeAlunos.forEach(aluno => {
        exibirBarra();
        console.log(`Nome: ${aluno.nome}`);
        console.log(`Notas: ${aluno.notas}`);
        console.log('Cursos: ');
        if (aluno.cursos.length > 0){
            aluno.cursos.forEach(curso => {
                console.log(` - ${curso.nomeDoCurso}`);
            });
        } else {
            console.log(` - Nenhum curso`);
        }
        console.log(`Faltas: ${aluno.faltas}`);
    });
}

listarAlunos(alunosDaEscola);

// feature/adicionar-aluno
adicionarAluno = (aluno, baseDeAlunos) => {
    /*
        Essa função irá receber uma *string* que é nome do aluno a ser criado. 
        E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
        A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.
    */
    let alunosCadastradosAntes = baseDeAlunos.length;
    let alunosCadastradosDepois = baseDeAlunos.push(aluno);
    (alunosCadastradosAntes < alunosCadastradosDepois) ?
        console.log(`Aluno \'${aluno.nome}\' cadastrado com sucesso!`) :
        console.log('Houve um erro ao adicionar o aluno na base.');
}

let aluno = {
    nome: "Renato",
    notas: [7,8,9],
    cursos: [{
        nomeDoCurso: "Full Stack",
        dataMatricula: new Date
    }],
    faltas: 0
}

adicionarAluno(aluno, alunosDaEscola);

// feature/buscar-aluno
function buscarAluno(nome, baseDeAlunos){
    /* 
        Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
        Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. 
        E deverá devolver um aluno em seu retorno. 
    */
    let result = baseDeAlunos.filter((aluno) => aluno.nome === nome);
    result.length > 0 ?
        console.log(`Aluno \'${nome}\' encontrado.`) :
        console.log(`Aluno \'${nome}\' não encontrado.`)
    return result[0];
}

let alunoBuscar = "Henrique";
let result = buscarAluno(alunoBuscar, alunosDaEscola);
console.log(result);


// feature/aplicar-nota
function aplicarNota(aluno, nota, baseDeAlunos){
    /*
        Ao receber um aluno devidamente cadastrado em nossa lista. 
        Você deverá adicionar uma nota ao aluno na sua lista de notas. 
        Você deverá dar um feedback ao concluir a tarefa. 
        Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
    */
   let result = buscarAluno(aluno.nome, baseDeAlunos);
   if(typeof result !== 'undefined'){
       if(aluno.cursos.length > 0){
           aluno.notas.push(nota);
           console.log(`Nota \'${nota}\' adicionada com sucesso!!! \nO aluno \'${aluno.nome}\' agora possui as notas \'${aluno.notas.join(", ")}\'.`);
           return aluno;
       }
       console.log("Erro ao aplicar nota!!! Aluno deve estar matriculado em algum curso.");
       return aluno;
   } else {
       console.log("Erro ao aplicar nota!!! Aluno deve ser cadastrado no sistema.");
       return false;
   }
}

let aluno3 = buscarAluno("Renato", alunosDaEscola);
aplicarNota(aluno3, 9, alunosDaEscola);
listarAlunos(alunosDaEscola);