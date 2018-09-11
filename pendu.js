// Prérequis pour le prompteur (pas d'importance pour le cours)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ['chevre', 'vache']

class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing // number of letters missing

    function init() {
      lives = 5

      word = WORD_LIST[Math.floor(Math.random() * Math.floor(WORD_LIST.length))] // TODO: récupérer un mot random depuis WORD_LIST (1 ligne)
      letters = []
      // Count without duplicated
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i
      }).length
    }

    function addLetter(letter) {
      if(letters.includes(letter) || !word.includes(letter)){
        lives -= 1
      }else{
        letters.push(letter)
        missing = word.length - letters.length
      }
      // TODO: cette fonction doit :
      // - vérifier que la lettre n'a pas déjà été tentée auparavent
      // - si ce n'est pas le cas, l'ajouter dans le tableau `letters`
      // - modifier `lives` et `missing` en conséquence
      // - ne retourne rien
      // - (6 lignes)
    }

    function displayWord() {
      let displayed = [];

      for(let i = 0 ; i < word.length ; i++){
        if(letters.includes(word[i])){
          displayed.push(word[i])
        }else{
          displayed.push("_")
        }
      }
      return displayed.join('');

      // TODO: cette fonction doit:
      // - retourner une chaine de caractère
      // - les lettres trouvées et celles manquantes remplacées par un underscore
      // - exemple : v_ch_e
      // - Utiliser une boucle for et la concaténation
      // - (9 lignes)
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join('❤'))
      rl.question(displayWord() + '\r\n', cb)
    }

    function onAnswer(answer) {
      /* TODO: appeler la fonction addLetter en envoyant la première lettre de `answer` (1 ligne) */
      addLetter(answer[0])

      if (missing > 0 && lives > 0) {
        prompt(onAnswer)
      }
      else {
        console.log(['End of the game.', 'you', missing > 0 ? 'lose' : 'win', '!'].join(' '))
        rl.close()
      }
    }

    return {
      play() {
        init()
        console.log('Vous êtes prêts ? Devinez le mot.')
        prompt(onAnswer)
      }
    }
  }
  play() { }
}

const game = new Game()

game.play()
