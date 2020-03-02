const escolar = require("../escolar");

describe("Escolar", () => {
  beforeEach(() => {
    baseDeAlunos = require("../baseDeAlunos");
    /* Mocks utilizados */
    alunoNotasBaixas = {
      nome: "Flavia",
      notas: [6, 7, 5],
      cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
      }],
      faltas: 0
    };
    alunoMuitasFaltas = {
      nome: "Anitta",
      notas: [10, 9.8, 9.6],
      cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
      }],
      faltas: 10
    };
    alunoNotasBaixasEMuitasFaltas = {
      nome: "Vitor",
      notas: [6, 5, 4],
      cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
      }],
      faltas: 10
    };
    alunoNotaAltaEPoucasFaltas = {
      nome: "Ricardo",
      notas: [9, 9, 9],
      cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
      }],
      faltas: 1
    };
    alunoValido = {
      nome: "Lucca",
      notas: [10, 9.8, 9.6],
      cursos: [{
        nomeDoCurso: "UX",
        dataMatricula: new Date
      }],
      faltas: 0
    };
    alunoSemCurso = {
      nome: "Edson",
      notas: [],
      cursos: [],
      faltas: 2
    };
    alunoNaoCadastrado = {
      nome: "Renato",
      notas: [],
      cursos: [],
      faltas: 0
    };
    /* Adicionado a base de testes */
    baseDeAlunos.push(
      alunoNotasBaixas,
      alunoMuitasFaltas,
      alunoNotasBaixasEMuitasFaltas,
      alunoNotaAltaEPoucasFaltas
    );
    /* Ativar escuta do método console.log() */
    spyOn(console, 'log');
  });

  /*
      listarAlunos():
      ===============
      Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
      Vale dizer que as informações deverão ser exibidas em um formato amigável. 
  */

  describe("quando *listar* alunos", () => {

    it("deve retornar o resultado via método console.log()", () => {
      escolar.listarAlunos(baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve retornar uma lista com os *nomes* dos alunos já cadastrados", () => {
      let nomeAlunoCadastrado = "Henrique";
      escolar.listarAlunos(baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith('Nome: ' + nomeAlunoCadastrado);
    });

    it("deve retornar um campo para *notas* dos alunos", () => {
      escolar.listarAlunos(baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Notas:/));
    });

    it("deve retornar um campo com os *cursos* dos alunos", () => {
      escolar.listarAlunos(baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Cursos:/));
    });

    it("deve retornar um campo com os *faltas* dos alunos", () => {
      escolar.listarAlunos(baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Faltas:/));
    });
  });

  /*
      adicionarAluno():
      =================
      Essa função irá receber uma *string* que é nome do aluno a ser criado. 
      E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
      A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.
  */

  describe("quando *adicionar* um novo aluno", () => {
    it("deve retornar o resultado via método console.log()", () => {
      escolar.adicionarAluno("Flavio", baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve aumentar um registro na base de alunos", () => {
      let tamanhoDaBaseDeAlunos = baseDeAlunos.length;
      escolar.adicionarAluno("Flavio", baseDeAlunos);
      expect(baseDeAlunos.length).toEqual(tamanhoDaBaseDeAlunos + 1);
    });

    it("deve retornar uma mensagem de *sucesso* contendo o nome do aluno adicionado", () => {
      let nomeAluno = "Flavio";
      escolar.adicionarAluno(nomeAluno, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Aluno \'${nomeAluno}\' cadastrado com sucesso!`);
    });

    it("deve retornar uma mensagem de *erro* quando não for possível concluir a adição", () => {
      let nomeAluno = "";
      escolar.adicionarAluno(nomeAluno, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Houve um erro ao adicionar o aluno na base.`);
    });
  });

  /* 
      buscarAluno():
      ==============
      Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
      Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. 
      E deverá devolver um aluno em seu retorno. 
  */
  describe("quando *buscar* um aluno na lista de alunos", () => {
    it("deve retornar o resultado via método console.log()", () => {
      escolar.buscarAluno("Henroque", baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve retornar um objeto literal *aluno* quando aluno for encontrado", () => {
      let resultado = escolar.buscarAluno("Henrique", baseDeAlunos);
      expect(resultado.nome).toEqual('Henrique');
    });

    it("deve retornar uma mensagem de *sucesso* na console ao encontrar um aluno", () => {
      let nome = "Henrique";
      escolar.buscarAluno(nome, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Aluno \'${nome}\' encontrado.`);
    });

    it("deve retornar uma mensagem de *erro* na console ao não encontrar um aluno", () => {
      let nome = "Rubens";
      escolar.buscarAluno(nome, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Aluno \'${nome}\' não encontrado.`);
    });
  });

  /*  
      matricularAluno():
      ==================
      Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
      Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, 
      e deverá armazenar a data atual no momento da matricula.
      Lembre-se de exibir o feedback para o usuário. 
  */

  describe("quando *matricular* um novo aluno", () => {
    it("deve retornar o resultado via método console.log()", () => {
      let nomeCurso = "Javascript Avançado";
      escolar.matricularAluno(alunoValido, nomeCurso, baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve cadastrar o aluno em um curso", () => {
      let nomeDoCurso = "Javascript Avançado";
      let aluno = escolar.matricularAluno(alunoValido, nomeDoCurso, baseDeAlunos);
      let resultado = aluno.cursos.filter((curso) => curso.nomeDoCurso === nomeDoCurso)[0];
      expect(resultado.nomeDoCurso).toEqual(nomeDoCurso);
    });

    it("deve armazenar data atual no momento da matrícula", () => {
      let nomeDoCurso = "Javascript Avançado";
      let aluno = escolar.matricularAluno(alunoValido, nomeDoCurso, baseDeAlunos);
      let date = new Date;
      let resultado = aluno.cursos.filter((curso) => curso.nomeDoCurso === nomeDoCurso)[0].dataMatricula;
      let dataDaMatriculaCadastrada = resultado.getDate() + "-" + resultado.getMonth() + "-" + resultado.getFullYear();
      let dataDaMatriculaEsperada = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      expect(dataDaMatriculaCadastrada).toEqual(dataDaMatriculaEsperada);
    });

    it("deve exibir uma mensagem de *erro* caso aluno não esteja cadastrado no sistema", () => {
      let nomeDoCurso = "Javascript Avançado";
      escolar.matricularAluno(alunoNaoCadastrado, nomeDoCurso, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith("Matrícula não pode ser realizada. O aluno deve ser cadastrado no sistema anteriormente.");
    });
  });

  /*
      aplicarFalta():
      ===============
      Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. 
      Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver 
      matriculado em um curso.
  */
  describe("quando *aplicar faltas* a um aluno", () => {
    it("deve retornar o resultado via método console.log()", () => {
      escolar.aplicarFalta(alunoValido, baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve retornar uma mensagem de *sucesso*", () => {
      escolar.aplicarFalta(alunoValido, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/sucesso/));
    });

    it("deve retornar uma emnsagem de *erro* quando aluno não estiver matriculado em nenhum curso", () => {
      escolar.aplicarFalta(alunoSemCurso, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro ao aplicar falta!!! Aluno deve estar matriculado em algum curso.`);
    });

    it("deve retornar uma mensagem de *erro* quando aluno não for cadastrado", () => {
      escolar.aplicarFalta(alunoNaoCadastrado, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro ao aplicar falta!!! Aluno deve ser cadastrado no sistema.`);
    });
  });

  /*
      aplicarNota():
      ==============
      Ao receber um aluno devidamente cadastrado em nossa lista. 
      Você deverá adicionar uma nota ao aluno na sua lista de notas. 
      Você deverá dar um feedback ao concluir a tarefa. 
      Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
  */
  describe("quando *aplicar nota* a um aluno", () => {
    it("deve retornar o resultado via método console.log()", () => {
      let nota = 9;
      escolar.aplicarNota(alunoValido, nota, baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve adicionar uma nota ao registro", () => {
      let nota = 9;
      let aluno = escolar.aplicarNota(alunoValido, nota, baseDeAlunos);
      let tamanho = aluno.notas.length;
      expect(aluno.notas[tamanho - 1]).toEqual(nota);
    })

    it("deve retornar uma mensagem de *sucesso* ao concluir o processo", () => {
      let nota = 9;
      escolar.aplicarNota(alunoValido, nota, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/sucesso/));
    });

    it("deve retornar uma mensagem de *erro* caso aluno não esteja matriculado em um curso", () => {
      escolar.aplicarNota(alunoSemCurso, 9, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro ao aplicar nota!!! Aluno deve estar matriculado em algum curso.`);
    });

    it("deve retornar uma mensagem de *erro* caso aluno não seja cadastrado no sistema", () => {
      escolar.aplicarNota(alunoNaoCadastrado, 9, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro ao aplicar nota!!! Aluno deve ser cadastrado no sistema.`);
    });
  });
  /* 
      aprovarAluno():
      ===============
      Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. 
      Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
      O aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
  */
  describe("quando for *aprovar* um aluno", () => {
    it("deve retornar o resultado via método console.log()", () => {
      escolar.aprovarAluno(alunoValido, baseDeAlunos);
      expect(console.log).toHaveBeenCalled();
    });

    it("deve aprovar aluno que possui no máximo 3 faltas e média de pelo menos 7", () => {
      escolar.aprovarAluno(alunoNotaAltaEPoucasFaltas, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/aprovado/));
    });

    it("deve reprovar aluno com mais de 3 faltas", () => {
      expect(escolar.aprovarAluno(alunoMuitasFaltas, baseDeAlunos)).toEqual = false;
    });

    it("deve reprovar aluno com média menor que 7", () => {
      expect(escolar.aprovarAluno(alunoNotasBaixas, baseDeAlunos)).toEqual = false;
    });

    it("não deve aprovar/reprovar se não estiver matriculado em um curso", () => {
      escolar.aprovarAluno(alunoSemCurso, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro: Aluno deve estar matriculado em algum curso.`);
    });

    it("não deve aprovar/reprovar se não estiver cadastrado no sistema", () => {
      escolar.aprovarAluno(alunoNaoCadastrado, baseDeAlunos);
      expect(console.log).toHaveBeenCalledWith(`Erro: Aluno deve ser cadastrado no sistema.`);
    });
  });
});