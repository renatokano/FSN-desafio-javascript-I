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

//listarAlunos(alunosDaEscola);

// feature/adicionar-aluno
let adicionarAluno = (aluno, baseDeAlunos) => {
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

// let aluno = {
//     nome: "Renato",
//     notas: [7,8,9],
//     cursos: [{
//         nomeDoCurso: "Full Stack",
//         dataMatricula: new Date
//     }],
//     faltas: 0
// }

// adicionarAluno(aluno, alunosDaEscola);

// feature/buscar-aluno
let buscarAluno = (nome, baseDeAlunos) => {
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

// let alunoBuscar = "Henrique";
// let result = buscarAluno(alunoBuscar, alunosDaEscola);
// console.log(result);

// feature/matricular-aluno
let matricularAluno = (aluno, nomeDoCurso, baseDeAlunos) => {
    /* 
        Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
        Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, 
        e deverá armazenar a data atual no momento da matricula.
        Lembre-se de exibir o feedback para o usuário. 
    */
    let result = buscarAluno(aluno.nome, baseDeAlunos);
    if(typeof result !== 'undefined'){
        let cursoMatricular = {
            nomeDoCurso,
            dataMatricula:new Date
        };
        aluno.cursos.push(cursoMatricular);
        console.log(`O aluno \'${aluno.nome}\' foi matriculado com sucesso no curso \'${nomeDoCurso}\'.`);
        return aluno;
    } else {
        console.log("Matrícula não pode ser realizada. O aluno deve ser cadastrado no sistema anteriormente.");
    }
}



// matricularAluno(aluno, "Advanced Deep Learning", alunosDaEscola);

// feature/aplicar-falta
let aplicarFalta = (aluno, baseDeAlunos) => {
    /*
        Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. 
        Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver 
        matriculado em um curso.
    */
    let result = buscarAluno(aluno.nome, baseDeAlunos);
    if(typeof result !== 'undefined'){
        if(aluno.cursos.length > 0){
            aluno.faltas++;
            console.log(`Falta adicionada com sucesso!!! \nO aluno \'${aluno.nome}\' agora possui \'${aluno.faltas}\' falta(s).`);
            return aluno;
        }
        console.log("Erro ao aplicar falta!!! Aluno deve estar matriculado em algum curso.");
        return aluno;
    } else {
        console.log("Erro ao aplicar falta!!! Aluno deve ser cadastrado no sistema.");
        return false;
    }
}

// let aluno2 = buscarAluno("Renato",alunosDaEscola);
// aplicarFalta(aluno2, alunosDaEscola);

// feature/aplicar-nota
let aplicarNota = (aluno, nota, baseDeAlunos) => {
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

// let aluno3 = buscarAluno("Renato", alunosDaEscola);
// aplicarNota(aluno3, 9, alunosDaEscola);
// listarAlunos(alunosDaEscola);

let aprovarAluno = (aluno, baseDeAlunos) => {
    /* 
        Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. 
        Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
        O aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
    */
   let result = buscarAluno(aluno.nome, baseDeAlunos);
   if(typeof result !== 'undefined'){
       // aluno matriculado em pelo menos um curso
       if(aluno.cursos.length > 0){
            // critérios de aprovação
            let mediaDeNotasMinima = 7;
            let numeroDeFaltasMaxima = 3;
            // notas e faltas do aluno
            let mediaDeNotasAluno = aluno.notas.reduce((soma, nota) => soma+=nota) / aluno.notas.length;
            let faltas = aluno.faltas;
            // verificação dos critérios de aprovação
            if(mediaDeNotasAluno >= mediaDeNotasMinima && faltas <= numeroDeFaltasMaxima){
                console.log(`O aluno \'${aluno.nome}\' está \'aprovado\' com média \'${mediaDeNotasAluno.toFixed(1)}\' e \'${faltas}\' falta(s).`);
                return true;
            }
            // aluno reprovado
            console.log(`O aluno \'${aluno.nome}\' está \'reprovado\' com média \'${mediaDeNotasAluno.toFixed(1)}\' e \'${faltas}\' falta(s).`);
            return false;
       }
       // aluno não matriculado
       console.log("Erro: Aluno deve estar matriculado em algum curso.");
       return false;
   } else {
       // aluno não cadastrado
       console.log("Erro: Aluno deve ser cadastrado no sistema.");
       return false;
    }
}

// let aluno4 = buscarAluno("Renato", alunosDaEscola);
// aprovarAluno(aluno4, alunosDaEscola);
// listarAlunos(alunosDaEscola);