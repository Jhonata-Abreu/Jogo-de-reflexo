const placas = document.querySelectorAll('h1')
let pt = 0
let placar = document.getElementById('placar')
let n = 30
const modos = {tempo:'tempo', sequencia:'sequencia'}
let modoAtual = modos.tempo
// adiciona evento ao entrar com mouse no elemento h1
placas.forEach(h1 =>{
    h1.addEventListener('mouseenter',() =>{
        // se o elemento h1 não tiver a classe ativo no css, interrompe o código e não executa o restante
        if(!h1.classList.contains('ativo')) return
        pt++
        placar.innerHTML = `${pt} pontos`
        h1.classList.remove('ativo')
        // se o modo for sequência, chama novamente a função sequência
        if(modoAtual === modos.sequencia){
            sequencia()
            placar.innerHTML = `${pt} pontos`
        }
    })
    

})
function start(){
    
    if(modoAtual == modos.tempo){
        modoTempo()
    }else{
        modoSequencia()
    }
    document.getElementById('cronometro').innerHTML = `30`
        
}
function modoTempo(){
    
    restart()
    painel()
    cronometro()
    
}
function modoSequencia(){
    modoAtual=modos.sequencia
    restart()
    sequencia()
    cronometro()
}
function restart(){
    clearInterval(intervalo)
    clearInterval(segundos)
    placar.innerHTML = '0 pontos'
    document.getElementById('cronometro').innerHTML = `0`
    pt = 0
    n = 30
    intervalo = null
    segundos = null
    placas.forEach(h1 =>{
        h1.classList.remove('ativo')
    })
}
let intervalo = null
function painel(){
    intervalo = setInterval(() => {
        if(modoAtual !== modos.tempo) return
        let numero = parseInt((Math.random())*placas.length)
        let item = ((placas.length)-1)-numero
            // adiciona classe ativo ao elemento da array placas
            placas[item].classList.add('ativo')
            setTimeout(() =>{
                // remove a classe ativo do elemento da array
                placas[item].classList.remove('ativo')
            }, 450)

    }, 600)
    
}
let segundos = null

// cronometro regressivo, inicia com valor n e a cada 1000ms subtrai um até zero. Após isso interrompe o loop do painel.
function cronometro(){
    segundos = setInterval(()=>{
        n--
        document.getElementById('cronometro').innerHTML = `${n}`
        if(n === 0){
            clearInterval(segundos)
            clearInterval(intervalo)
            modoAtual = null
            placas.forEach(h1=>{h1.classList.remove('ativo')})
        }
    },1000)
}
// 
function sequencia(){
    let numero = parseInt((Math.random())*placas.length)
    let item = ((placas.length)-1)-numero
    placas[item].classList.add('ativo')
    
}
function alternarModo(){
    let modoJogo = document.getElementById('modeGame')
    if(modoJogo.innerHTML == 'Tempo'){
        modoJogo.innerHTML = 'Sequencia'
        modoAtual = modos.sequencia
    } else{
        modoJogo.innerHTML = 'Tempo'
        modoAtual = modos.tempo
    }
}