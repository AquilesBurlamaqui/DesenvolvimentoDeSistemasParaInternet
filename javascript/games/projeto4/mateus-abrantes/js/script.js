let bg;
let posicao_y_jogador = 475;
let posicao_x_jogador = 42;
let width_avatar = 100;
let height_avatar = 170;
let width=1080;
let height=720;
let pulo;
let tempo_pulo=0;
let pulando;
let pulo_posicao_y_jogador = posicao_y_jogador;

let personagem_parado=[];
let personagem_andando_esquerda=[];
let personagem_andando_direita=[];
let parado = true;
let andando_esquerda = false;
let andando_direita = false;
let indice_personagem_parado =1;
let indice_personagem_andando_esquerda =1;
let indice_personagem_andando_direita =1;
pulo_posicao_y_jogador = posicao_y_jogador;

let regua,vidas=3,reguaspace = 200;
let fontKidsZone, fontLuckiestGuy;

let num1,num2,resultado;
let posicao_x_numeros = [], posicao_y_numeros = [], numeros = [];

function preload() {
  //Carregando vetores de animação do avatar
  for (let i=1; i<=15; i++) {
    personagem_parado[i]  = loadImage("img/boy_1/Idle ("+i+")-min.png");
    personagem_andando_esquerda[i]  = loadImage("img/boy_1/Run ("+i+")-min-left.png");
    personagem_andando_direita[i]  = loadImage("img/boy_1/Run ("+i+")-min-right.png");
  }
  //Vidas
  regua = loadImage("img/regua.png");


  //carregando musica de fundo
  soundFormats('mp3', 'ogg');
  son_tema = loadSound('sons/tema.mp3');

  //Carregando fonts
  fontKidsZone = loadFont('fonts/Kids Zone.ttf');
  fontLuckiestGuy = loadFont('fonts/LuckiestGuy.ttf');

}

function setup() {
  bg = loadImage('img/full-background.png');
  son_tema.loop();
  createCanvas(width, height);
  preload();
  adicao();
}

function draw() {
  clear();
  background(bg);
  andar_pular();
  pular();
  for(let i=0;i<vidas;i++){
    image(regua,reguaspace+(i*50),15,50 ,70);
  }

  textFont(fontLuckiestGuy,50);
  fill(247, 236, 27);
  text("Vidas:", 40, 60);
  text(num1+'+'+num2+'?', 40, 110);

  mostrar();

  if (parado) {
    image(personagem_parado[indice_personagem_parado],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_parado < 15) {
      indice_personagem_parado++;
    } else {
      indice_personagem_parado = 1;
    }
  }
  if (andando_esquerda) {
    image(personagem_andando_esquerda[indice_personagem_andando_esquerda],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_andando_esquerda < 15) {
      indice_personagem_andando_esquerda++;
    } else {
      indice_personagem_andando_esquerda = 1;
    }
  }
  if (andando_direita) {
    image(personagem_andando_direita[indice_personagem_andando_direita],posicao_x_jogador, pulo_posicao_y_jogador, width_avatar, height_avatar);
    if (indice_personagem_andando_direita < 15) {
      indice_personagem_andando_direita++;
    } else {
      indice_personagem_andando_direita = 1;
    }
  }
}



function andar_pular() {
  if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && (posicao_x_jogador>=(4))){
    posicao_x_jogador -= 5;
    parado = false;
    andando_esquerda = true;
    andando_direita = false;
  }
  if(!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(65) && !keyIsDown(68)){
    parado = true;
    andando_esquerda = false;
    andando_direita = false;
  }
  if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && (posicao_x_jogador<(width-(width_avatar)))) {
    posicao_x_jogador += 5;
    andando_esquerda = false;
    andando_direita = true;
    parado = false;
  }
  if ((keyIsDown(UP_ARROW) || keyIsDown(32) || keyIsDown(87)) || (pulo_posicao_y_jogador<posicao_y_jogador)){
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

function mostrar(){
  for(let i = 0; i<4; i++) {
    posicao_y_numeros[i] = posicao_y_numeros[i]+2;
    if ((posicao_y_numeros[i] > height+50)) {
      posicao_x_numeros[i] = random(150, width-50);
      posicao_y_numeros[i] = random(-450, -50);
      numeros[i] = int(random(resultado-2,resultado+2));
      }
    text(numeros[i], posicao_x_numeros[i], posicao_y_numeros[i]);
  }
}

function adicao(){
    num1 = int(random(1,9));
    num2 = int(random(1,9));
    resultado = num1+num2;
    for(let i = 0; i<4; i++) {
      posicao_x_numeros[i] = random(150, width-50);
      posicao_y_numeros[i] = random(-450, -50);
      numeros[i] = int(random(resultado-2,resultado+2));
    }
}
