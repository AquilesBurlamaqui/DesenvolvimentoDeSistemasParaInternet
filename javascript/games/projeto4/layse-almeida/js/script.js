let NIVEL = 1;
let PERSONAGEM = 0;
let COMECA = true;

let OPERACOES = {
  'soma': false,
  'subtração': false,
  'divisão': false,
  'multiplicação': false
}

let CORESFUNDO = {
  'soma': "yellow",
  'subtração': "aqua",
  'divisão': "grey",
  'multiplicação': "orange"
}
let OPERACAO;
let NUMEROSPEGADOS = [];
let RESULTADOOPERACAO = 0;

let intervalCriarNumero;

const gamerTetris = () => {
  const OPERADORES = {
    'soma': '+',
    'subtração': '-',
    'divisão': '/',
    'multiplicação': '*'
  };

  const criaPalco = () => {
    $('<div>')
      .attr('id', 'palco').html(`
        <div id="personagem"></div>
          <div id="placar">
            <span></span>
          <div id="quadro"></div>
        </div>
        <div id="vidas">vidas
          <div>&hearts;</div>
          <div>&hearts;</div>
          <div>&hearts;</div>
        </div>
        `).prependTo($('body'));

    $('<div>').attr({
      id: 'thunder'
    }).html(`
        <div class='thunder1'></div>
        <div class='thunder2'></div>
        <div class='thunder3'></div>
      `).appendTo($('body'));
  }

  criaPalco();

  $('#personagem').css({
    backgroundImage: 'url(img/personagens.png)',
    backgroundSize: '260px 400px',
    backgroundPosition: '-' + 85 + 'px -' + 135 * (PERSONAGEM - 1) + 'px'
  });

  $('#placar span').html("Qual o valor da " + OPERACAO + "?");

  const numeroRandomico = () => {
    if (NIVEL + 1 == NUMEROSPEGADOS.length) {
      RESULTADOOPERACAO = NUMEROSPEGADOS[0];
      for (let i = 1; i < NUMEROSPEGADOS.length; i++) {
        if (OPERACAO == "soma")
          RESULTADOOPERACAO = parseInt(RESULTADOOPERACAO) + parseInt(NUMEROSPEGADOS[i]);
        else if (OPERACAO == "subtração")
          RESULTADOOPERACAO = parseInt(RESULTADOOPERACAO) - parseInt(NUMEROSPEGADOS[i]);
        else if (OPERACAO == "multiplicação")
          RESULTADOOPERACAO *= parseInt(NUMEROSPEGADOS[i]);
        else if (OPERACAO == "divisão")
          RESULTADOOPERACAO = (parseFloat(RESULTADOOPERACAO) / parseFloat(NUMEROSPEGADOS[i])).toFixed(2);
      }
      NUMEROSPEGADOS.push(RESULTADOOPERACAO);
    }
    if (NUMEROSPEGADOS.length == NIVEL + 2) {
      const arrPossibilidade = [parseInt(RESULTADOOPERACAO) - 1, parseInt(RESULTADOOPERACAO), parseInt(RESULTADOOPERACAO) + 1, parseInt(RESULTADOOPERACAO) + 2];
      return arrPossibilidade[Math.floor(Math.random() * 3)];
    }

    if(OPERACAO == "divisão" && NUMEROSPEGADOS[0] == undefined){ //Para a divisão vir um número muito quebrado no NIVEL 3
      return Math.floor(Math.random() * (400 - 300) + 300);  
    }

    return Math.floor(Math.random() * (9 - 1) + 1);
  }

  const posicaoNumeroCaindo = (minimo, maximo) => {
    const min = 0 + minimo;
    const max = Math.ceil(maximo);
    return Math.floor(Math.random() * (max - min)) + min
  }

  const criarNumeros = (tempo, tamanho, op) => {
    $('<div>').css({
        top: -tamanho,
        left: posicaoNumeroCaindo(0, $('#palco').width() - tamanho), //gera numeros randomicos entre o tamanho do palco menos o tamanho da letra
        width: tamanho,
        height: tamanho
      })
      .addClass('numero')
      .attr('id', 'numero')
      .animate({
        top: $("#palco").height() + tamanho
      }, tempo, () => {
        $('#numero').remove();
      })
      .html(numeroRandomico())
      .appendTo("#palco");

    colisaoComNumero(op);
  }

  const colisaoComNumero = () => {
    const tempoParaTestarColisao = setInterval(() => {
      let topoNumero = parseInt($('#numero').css('top')); //pegando o y do numero caindo
      let alturaNumero = parseInt($('#numero').height()); //pegando a altura do numero caindo
      let leftNumero = parseInt($('#numero').css('left')); //pegando a posicao x do numero caindo
      let larguraNumero = parseInt($('#numero').width()); //pegando a largura do numero caindo

      let topoPersonagem = parseInt($('#personagem').css('top')); //mesma coisa só q para o personagem
      let alturaPersonagem = parseInt($('#personagem').height());
      let leftPersonagem = parseInt($('#personagem').css('left'));
      let larguraPersonagem = parseInt($('#personagem').width());

      let logicacolisao = (leftPersonagem + larguraPersonagem >= leftNumero) && (leftNumero +
        larguraNumero >= leftPersonagem); //testando a colisao entre o personagem e o numero na horizontal
      let logicacolisao2 = (topoPersonagem + alturaPersonagem >= topoNumero) && (topoNumero +
        alturaNumero >= topoPersonagem); //testando a colisao entre o personagem e o numero na vertical

      if (logicacolisao && logicacolisao2) {

        if (NUMEROSPEGADOS.length < NIVEL + 1) {
          NUMEROSPEGADOS.push($('#numero').html());
        } else {
          // numero que esta pegando == resultado da operação que esta no último index
          if ($('#numero').html() == NUMEROSPEGADOS[NIVEL + 1]) {
            // acertou
            NIVEL++;
            if (NIVEL > 3) {
              OPERACOES[OPERACAO] = true;
              OPERACAO = false;
              NIVEL = 1;
              let contObjetivos = 0;
              for (var elemento in OPERACOES){
                
                if(OPERACOES[elemento])
                  contObjetivos++;
              }
              if (contObjetivos == 4){
                alert("Acabou o jogo");
              }
              if ($('#palco').length) $('#palco').remove();
              clearInterval(tempoParaTestarColisao);
              clearInterval(intervalCriarNumero);
              menuFase(NIVEL);
            }
            NUMEROSPEGADOS = [];
            $('#quadro h1').html("");
          } else {
            if ($('#vidas div').length) {
              $('#vidas div')[0].remove();
            }
            $('#thunder').addClass('thunder-container');
            setTimeout(() => {
              $('#thunder').removeClass('thunder-container');
              if ($('#vidas div')[0] == undefined) {
                // perdeu
                alert('Você perdeu!')
                NIVEL = 1;
                PERSONAGEM = 0;
                COMECA = true;
                OPERACOES = {
                  'soma': false,
                  'subtração': false,
                  'divisão': false,
                  'multiplicação': false
                }
                OPERACAO;
                NUMEROSPEGADOS = [];
                RESULTADOOPERACAO = 0;
                $('#palco, .numero').remove();
                clearInterval(tempoParaTestarColisao);
                clearInterval(intervalCriarNumero);
                criarMenuInicial();
              }
            }, 1000);
          }
        }

        $('#quadro').html("<h1>" + NUMEROSPEGADOS[0] + " " + OPERADORES[OPERACAO] + " " +
          ((NUMEROSPEGADOS[1] == undefined) ? "" : (NUMEROSPEGADOS[1] + ' = ?')) + "</h1>");

        let n = NUMEROSPEGADOS;
        let o = OPERADORES[OPERACAO];

        switch (NIVEL) {
          case 1:
            $('#quadro')
              .html(`<h1> ${n[0]} ${o} ${((n[1] == undefined) ? "" : (n[1] + ' = ?'))} </h1>`);
            break;
          case 2:
            $('#quadro')
              .html(`<h1> 
              ${(n[0] == undefined) ? "" : n[0] + " " +o+" " } 
              ${((n[1] == undefined) ? "" : n[1]+" "+o +" " )}
              ${((n[2] == undefined) ? "" : (n[2] + ' = ?'))} 
              </h1>`);
            break;
          case 3:
            $('#quadro')
              .html(`<h1> 
              ${(n[0] == undefined) ? "" : n[0] + " " +o+" " } 
              ${((n[1] == undefined) ? "" : n[1]+" "+o +" " )}
              ${((n[2] == undefined) ? "" : n[2]+" "+o +" " )}
              ${((n[3] == undefined) ? "" : (n[3] + ' = ?'))} 
              </h1>`);
            break;

        }

        $('#numero').remove();
        clearInterval(tempoParaTestarColisao);
      }
    }, 50);
  }
    $(document).keydown((e) => { //Mexer o personagem
      let leftPersonagem = parseInt($('#personagem').css('left'));
      switch (e.keyCode) {
        case 39:
          if (leftPersonagem <= ($("#palco").width() - $('#personagem').width() - 12)) {
            //modifica posição do personagem e o spriter para a direita
            $('#personagem').css({
              left: (leftPersonagem + 20),
              backgroundPosition: '-' + 85 * 2 + 'px -' + 135 * (PERSONAGEM - 1) + 'px'
            })
          }
          break;
        case 37:
          if (leftPersonagem >= 10) {
            //modifica posição do personagem e o spriter para a esquerda
            $('#personagem').css({
              left: (leftPersonagem - 20),
              backgroundPosition: '-' + 85 * 0 + 'px -' + 135 * (PERSONAGEM - 1) + 'px'
            })
          }
          break;
      }
    }).keyup(() => {
      //modifica o spriter para a frente quando solta a tecla
      $('#personagem').css({
        backgroundPosition: '-' + 85 + 'px -' + 135 * (PERSONAGEM - 1) + 'px'
      })
    });

  let tempo = 4000; // tempo do numero caindo
  let tamanho = 100; //tamanho do numero caindo

  criarNumeros(tempo, tamanho, OPERACAO);

  intervalCriarNumero = setInterval(() => {
    criarNumeros(tempo, tamanho, OPERACAO);
  }, tempo + 30);

}

const destroiTudo = () => {
  $(document).keydown(()=>{}).keyup(()=>{});
  $('#palco').off().remove();
}

const intro = () => {
  let $intro = $('<div>').attr({
      id: 'intro'
    })
    .css({
      background: '#000'
    })
    .appendTo($('body'));

  const $target = $('<div>')
    .attr({
      id: 'target'
    })
    .css({
      top: $intro.height()
    })
    .html(`CHUVA DE NÚMEROS <br><br>
    É um jogo educacional que tem por objetivos
    abordar as 4 operações matemáticas básicas
    (adição, subtração, multiplicação e divisão),
    por meio de cálculos mentais de números naturais,
    destinados a alunos do 3º ano do ensino fundamental.
    No jogo, um grupo de amigos, Pedro, Bianca e Gabriel,
    estão estudando matemática dentro da biblioteca.
    Está chovendo do lado de fora mas a vontade que
    eles têm é de brincar lá fora. Pedro está muito
    confuso com o conteúdo e está tendo muita dificuldade,
    fazendo com que ele fique desinteressado em estudar
    e acaba caindo no sono. Ele começa a sonhar, e em seu
    sonho ele e seus amigos, estão do lado de fora da biblioteca,
    brincando na chuva, porém o que cai do céu são números!`)
    .appendTo($intro);

  $target.animate({
    top: '-' + $target.height()
    // }, ($target.height()/$intro.height()*10000), 'linear', ()=>{
  }, 1000, 'linear', () => {
    criarMenuInicial();
  });

}

const criarMenuInicial = function () {
  var i;

  for (i = 0; i < 3; i++) {
    $('<div>')
      .attr({
        'data-id': i + 1
      })
      .addClass('person')
      .css({
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: -170,
        marginLeft: -42,
        width: 85,
        height: 135,
        backgroundImage: 'url(img/personagens.png)',
        backgroundSize: '260px 400px',
        backgroundPosition: '-' + 170 + 'px -' + 135 * i + 'px'
      }).appendTo($('body'));
  }

  $.each($('.person'), (i, el) => {
    $(el).animate({
      left: (i == 0 ? '25%' : (i == 1) ? '50%' : '75%')
    }, 1000 * (i + 1), () => {
      $(el).css({
        backgroundPosition: '-' + 85 + 'px -' + (135 * i) + 'px'
      });
    })
  });

  let $menu = $('<div>')
    .attr({
      id: 'menu'
    })
    .appendTo($('body'));

  let $options = $('<div>')
    .css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(img/bg.png)',
      backgroundSize: '100% 100%',
      width: '100%',
      height: '100%',
      zIndex: 0,
      opacity: 0
    })
    .appendTo($menu);

  $('#intro').remove();

  $options.animate({
    opacity: 1
  }, function () {

    $('body').css({
      backgroundColor: '#cbebf3'
    });

    $('<button>')
      .addClass('botao')
      .html('INICIAR')
      .on('click', () => {
        $('#menu').remove();
        menuFase(NIVEL);
      })
      .appendTo($options);

    $('<button>')
      .addClass('botao')
      .html('AJUDA')
      .on('click', ajuda)
      .appendTo($options);
  });
}

// Funcao que criar a tela de ajuda
const ajuda = () => {
  var $ajuda = $('<div>')
    .css({
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: '80%',
      background: '#fff',
      borderRadius: '30px',
      boxShadow: '0 10px 10px rgba(0,0,0,.5)'
    })
    .html('Instruções do Jogo')
    .appendTo('#menu');

  // botao para fechar a ajuda
  $('<div>')
    .css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'red',
      borderRadius: '100%',
      position: 'absolute',
      color: '#fff',
      fontHeight: 'bold',
      boxShadow: '0 5px 5px rgba(0,0,0,.5)',
      cursor: 'pointer',
      top: -15,
      right: -15,
      width: 50,
      height: 50
    })
    .html('<span>X</span>')
    .on('click', () => {
      $ajuda.remove();
    })
    .appendTo($ajuda);
}

const menuFase = () => {
  let $menu = $('<div>')
    .attr({
      id: 'menu'
    })
    .appendTo($('body'));

  let $options = $('<div>')
    .css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(img/bg.png)',
      backgroundSize: '100% 100%',
      width: '100%',
      height: '100%',
      zIndex: 0,
      opacity: 1
    })
    .appendTo($menu);
  // botao soma
  let soma = $('<button>')
    .addClass('botao')
    .css({
      backgroundColor: 'yellow',
      borderRadius: 10,
      color: '#000',
      cursor: 'pointer'
    })
    .attr({
      'data-sinal': 'soma'
    })
    .html('Adição<br>(+)')
    .appendTo($options)
    .click((e) => {
      if (!$(e.target).hasClass('active')) {
        $('.botao').removeClass('active');
      }
      $(e.target).toggleClass('active');
      checkReady();
    });

  if (OPERACOES['soma']) soma.attr({
    disabled: ''
  }).css({
    opacity: 0.5,
    cursor: 'default'
  })

  // botao subtração
  let subtracao = $('<button>')
    .addClass('botao')
    .css({
      backgroundColor: 'aqua',
      borderRadius: 10,
      color: '#000',
      cursor: 'pointer'
    })
    .attr({
      'data-sinal': 'subtração'
    })
    .html('Subração<br>(-)')
    .appendTo($options)
    .click((e) => {
      if (!$(e.target).hasClass('active')) {
        $('.botao').removeClass('active');
      }
      $(e.target).toggleClass('active');
      checkReady();
    });

  if (OPERACOES['subtração']) subtracao.attr({
    disabled: ''
  }).css({
    opacity: 0.5,
    cursor: 'default'
  })

  // botão multiplicação    
  let multiplicacao = $('<button>')
    .addClass('botao')
    .css({
      backgroundColor: 'orange',
      borderRadius: 10,
      color: '#000',
      cursor: 'pointer'
    })
    .attr({
      'data-sinal': 'multiplicação'
    })
    .html('Multiplicação<br>(*)')
    .appendTo($options)
    .click((e) => {
      if (!$(e.target).hasClass('active')) {
        $('.botao').removeClass('active');
      }
      $(e.target).toggleClass('active');
      checkReady();
    });

  if (OPERACOES['multiplicação']) multiplicacao.attr({
    disabled: ''
  }).css({
    opacity: 0.5,
    cursor: 'default'
  })

  // botao divisão
  let divisao = $('<button>')
    .addClass('botao')
    .css({
      backgroundColor: 'green',
      borderRadius: 10,
      color: '#000',
      cursor: 'pointer'
    })
    .attr({
      'data-sinal': 'divisão'
    })
    .html('Divisão<br>(/)')
    .appendTo($options)
    .click((e) => {
      if (!$(e.target).hasClass('active')) {
        $('.botao').removeClass('active');
      }
      $(e.target).toggleClass('active');
      checkReady();
    });

  if (OPERACOES['divisão']) divisao.attr({
    disabled: ''
  }).css({
    opacity: 0.5,
    cursor: 'default'
  })

  // // botao todos
  // $('<button>')
  //   .addClass('botao')
  //   .css({
  //     backgroundColor: 'gray',
  //     borderRadius: 10,
  //     color: '#000',
  //     cursor: 'pointer'
  //   })
  //   .attr({
  //     'data-sinal': 'todos'      
  //   })
  //   .html('TODOS<br>(+ - * /)')
  //   .appendTo($options)
  //   .click((e) => {
  //     if (!$(e.target).hasClass('active')) {
  //       $('.botao').removeClass('active');
  //     }
  //     $(e.target).toggleClass('active');
  //     checkReady();
  //   });    

  $.each($('.person'), (i, el) => {
    $(el)
      .addClass('no-active')
      .click((e) => {
        $('.person').addClass('no-active').removeClass('selected');
        $(e.target).removeClass('no-active').addClass('selected');
        checkReady();
      })
  });

  // botao jogar
  let $play = $('<button>')
    .addClass('botao')
    .css({
      position: 'absolute',
      top: 0,
      background: '#9c0',
      padding: 40,
      margin: 20,
      borderRadius: '100%',
      fontSize: 30,
      fontWeight: 'bold',
      cursor: 'pointer',
      lineHeight: '10px'
    })
    .attr({
      disabled: 'disabled'
    })
    .click(() => {
      $('#menu, .person').remove();
      $("body").css('background-color', CORESFUNDO[OPERACAO])
      
      gamerTetris();
    })
    .html('<span>JOGAR</span>')
    .appendTo($options)

  const checkReady = () => {
    OPERACAO = $('.botao.active').data('sinal');
    if (COMECA) {
      let personagem = $('.person.selected').data('id');
      PERSONAGEM = personagem;
    }
    if (!!(OPERACAO && PERSONAGEM)) {
      $play.removeAttr('disabled');
      COMECA = false;
    }
  }
}

const nextNivel = () => {
  $('<div>').attr({
      id: 'menu'
    })
    .html('Parabéns, vá para o proximo nível.')
}