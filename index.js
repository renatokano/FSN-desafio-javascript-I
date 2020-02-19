// Base a ser utilizada
const alunosDaEscola=[{nome:"Henrique",notas:[],cursos:[],faltas:5},{nome:"Edson",notas:[],cursos:[],faltas:2},{nome:"Bruno",notas:[10,9.8,9.6],cursos:[],faltas:0},{nome:"Guilherme",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"Full Stack",dataMatricula:new Date}],faltas:0},{nome:"Carlos",notas:[],cursos:[],faltas:0},{nome:"Lucca",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"UX",dataMatricula:new Date}],faltas:0}];


// implementação
let listarAlunos = (baseDeAlunos) => {
    /* Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
    Vale dizer que As informações deverão ser exibidas em um formato amigável. */

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