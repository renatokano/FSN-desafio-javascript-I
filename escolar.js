const { exibirBarra } = require("./escolarHelper");

// feature/listar-alunos
let listarAlunos = (baseDeAlunos) => {
  /* 
      Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
      Vale dizer que as informações deverão ser exibidas em um formato amigável. 
  */

  baseDeAlunos.forEach(aluno => {
    exibirBarra();
    console.log(`Nome: ${aluno.nome}`);
    console.log(`Notas: ${aluno.notas}`);
    console.log('Cursos: ');
    if (aluno.cursos.length > 0) {
      aluno.cursos.forEach(curso => {
        console.log(` - ${curso.nomeDoCurso}`);
      });
    } else {
      console.log(` - Nenhum curso`);
    }
    console.log(`Faltas: ${aluno.faltas}`);
  });
}

// feature/adicionar-aluno
let adicionarAluno = (nomeAluno, baseDeAlunos) => {
  /*
      Essa função irá receber uma *string* que é nome do aluno a ser criado. 
      E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
      A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.
  */
  let aluno = {
    nome: nomeAluno,
    notas: [],
    cursos: [],
    faltas: 0
  }
  exibirBarra();
  aluno.nome && baseDeAlunos.push(aluno) ?
    console.log(`Aluno \'${aluno.nome}\' cadastrado com sucesso!`) :
    console.log('Houve um erro ao adicionar o aluno na base.');
}

// feature/buscar-aluno
let buscarAluno = (nome, baseDeAlunos, displayOutput = true) => {
  /* 
      Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
      Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. 
      E deverá devolver um aluno em seu retorno. 
  */
  let result = baseDeAlunos.filter((aluno) => aluno.nome === nome);
  if (result.length > 0) {
    if (displayOutput) {
      exibirBarra();
      console.log(`Aluno \'${nome}\' encontrado.`);
    }
    return result[0];
  } else {
    if (displayOutput) {
      exibirBarra();
      console.log(`Aluno \'${nome}\' não encontrado.`);
    }
    return false;
  }
}

// feature/matricular-aluno
let matricularAluno = (aluno, nomeDoCurso, baseDeAlunos) => {
  /* 
      Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
      Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, 
      e deverá armazenar a data atual no momento da matricula.
      Lembre-se de exibir o feedback para o usuário. 
  */
  let result = buscarAluno(aluno.nome, baseDeAlunos, false);
  exibirBarra();
  if (result) {
    let cursoMatricular = {
      nomeDoCurso,
      dataMatricula: new Date
    };
    result.cursos.push(cursoMatricular);
    console.log(`O aluno \'${result.nome}\' foi matriculado com sucesso no curso \'${nomeDoCurso}\'.`);
    return result;
  } else {
    console.log("Matrícula não pode ser realizada. O aluno deve ser cadastrado no sistema anteriormente.");
  }
}

// feature/aplicar-falta
let aplicarFalta = (aluno, baseDeAlunos) => {
  /*
      Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. 
      Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver 
      matriculado em um curso.
  */
  let result = buscarAluno(aluno.nome, baseDeAlunos, false);
  exibirBarra();
  if (result) {
    if (result.cursos.length > 0) {
      result.faltas++;
      console.log(`Falta adicionada com sucesso!!! \nO aluno \'${result.nome}\' agora possui \'${result.faltas}\' falta(s).`);
      return result;
    }
    console.log("Erro ao aplicar falta!!! Aluno deve estar matriculado em algum curso.");
    return result;
  } else {
    console.log("Erro ao aplicar falta!!! Aluno deve ser cadastrado no sistema.");
    return false;
  }
}

// feature/aplicar-nota
let aplicarNota = (aluno, nota, baseDeAlunos) => {
  /*
      Ao receber um aluno devidamente cadastrado em nossa lista. 
      Você deverá adicionar uma nota ao aluno na sua lista de notas. 
      Você deverá dar um feedback ao concluir a tarefa. 
      Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
  */
  let result = buscarAluno(aluno.nome, baseDeAlunos, false);
  exibirBarra();
  if (result) {
    if (result.cursos.length > 0) {
      result.notas.push(nota);
      console.log(`Nota \'${nota}\' adicionada com sucesso!!! \nO aluno \'${result.nome}\' agora possui as notas \'${result.notas.join(", ")}\'.`);
      return result;
    }
    console.log("Erro ao aplicar nota!!! Aluno deve estar matriculado em algum curso.");
    return result;
  } else {
    console.log("Erro ao aplicar nota!!! Aluno deve ser cadastrado no sistema.");
    return false;
  }
}

// feature/aprovar-aluno
let aprovarAluno = (aluno, baseDeAlunos) => {
  /* 
      Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. 
      Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
      O aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
  */
  let result = buscarAluno(aluno.nome, baseDeAlunos, false);
  exibirBarra();
  if (result) {
    // aluno matriculado em pelo menos um curso
    if (result.cursos.length > 0) {
      // critérios de aprovação
      let mediaDeNotasMinima = 7;
      let numeroDeFaltasMaxima = 3;
      // notas e faltas do aluno
      let mediaDeNotasAluno = result.notas.reduce((soma, nota) => soma += nota) / result.notas.length;
      let faltas = result.faltas;
      // verificação dos critérios de aprovação
      if (mediaDeNotasAluno >= mediaDeNotasMinima && faltas <= numeroDeFaltasMaxima) {
        console.log(`O aluno \'${result.nome}\' está \'aprovado\' com média \'${mediaDeNotasAluno.toFixed(1)}\' e \'${faltas}\' falta(s).`);
        return true;
      }
      // aluno reprovado
      console.log(`O aluno \'${result.nome}\' está \'reprovado\' com média \'${mediaDeNotasAluno.toFixed(1)}\' e \'${faltas}\' falta(s).`);
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

module.exports = {
  listarAlunos,
  adicionarAluno,
  buscarAluno,
  matricularAluno,
  aplicarFalta,
  aplicarNota,
  aprovarAluno
};