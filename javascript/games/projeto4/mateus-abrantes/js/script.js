let bg;
let posicao_y_jogador = 585;
let posicao_x_jogador = 42;
let width_avatar = 80;
let height_avatar = 80;
let width=1080;
let height=720;
let pulo;
let tempo_pulo=0;
let pulando;
let pulo_posicao_y_jogador = posicao_y_jogador;
pulo_posicao_y_jogador = posicao_y_jogador;

function setup() {

  bg = loadImage('img/full-background.png');
  createCanvas(width, height);
}

function draw() {
  clear();
  background(bg);
  andar_pular();
  pular();
  ellipse(posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
}



function andar_pular() {
  if (keyIsDown(LEFT_ARROW) && (posicao_x_jogador>=((width_avatar/2)+4))){
    posicao_x_jogador -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && (posicao_x_jogador<(width-(width_avatar/2)-4))) {
    posicao_x_jogador += 5;
  }
  if (keyIsDown(UP_ARROW) || (pulo_posicao_y_jogador<posicao_y_jogador)){
    pulando = true;
  }else{
    pulando = false;
  }
}

function pular(){
  if (pulando) {
      pulo =-(tempo_pulo-0)*(tempo_pulo-height*0.035);
      tempo_pulo = tempo_pulo + 0.5;
      if (pulo < 0) {
        pulando=false;
        pulo=0;
        tempo_pulo=0;
      }
      pulo_posicao_y_jogador = posicao_y_jogador - pulo;
    }
}
