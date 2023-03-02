let score=document.querySelector('.score')
let startGame=document.querySelector('.startGame')
let road=document.querySelector('.road')
let travelDistance=0

let keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArroeRight: false
}

let player={
    speed: 5
}

startGame.addEventListener('click', function newScreen(){
    startGame.classList.add('hidden')
    road.innerHTML=""
    player.start=true

    for(let i=0;i<5;i++){
        let lines=document.createElement('div')
        lines.classList.add('line')
        lines.y=i*150
        lines.style.top=lines.y+'px'
        road.appendChild(lines)
    }

    let car=document.createElement('div')
    car.classList.add('cars')
    road.appendChild(car)
    
    player.x = car.offsetLeft
    player.y = car.offsetTop

    for(let i=0;i<3;i++){
        let enemy=document.createElement('div')
        enemy.classList.add('enemies')
        enemy.y=((i+1)*320)*(-1)
        enemy.style.top=enemy.y+'px'
        enemy.style.backgroundColor=colorGenerator()
        enemy.style.left=Math.floor(Math.random()*340)+'px'
        road.appendChild(enemy)
    }

    window.requestAnimationFrame(startPlay)
})

function startPlay(){
    let car=document.querySelector('.cars')
    let area= road.getBoundingClientRect()
    

    if(player.start){
        moveLines()
        moveEnemies(car)
        if(keys.ArrowUp && player.y > (area.top+10)) player.y -= player.speed
        if(keys.ArrowDown && player.y < (area.bottom-85)) player.y += player.speed
        if(keys.ArrowLeft && player.x > 0) player.x -= player.speed
        if(keys.ArrowRight && player.x < (area.width - 70)) player.x += player.speed
        
        car.style.top = player.y +"px"
        car.style.left = player.x +"px"
        
        window.requestAnimationFrame(startPlay)

        travelDistance++
        score.innerHTML='Score: '+(travelDistance-1)
    }
}

function colorGenerator(){
    function r(){
        return Math.floor(Math.random()*256)
    }
    return "rgb("+r()+","+r()+","+r()+")"
}

function moveLines(){
    let lines=document.querySelectorAll('.line')
    lines.forEach((line) => {
        if(line.y>=615){
            line.y=-140
        }
        line.y+=player.speed
        line.style.top=line.y+'px'
    })
}

function moveEnemies(car){
    let enemies=document.querySelectorAll('.enemies')
    enemies.forEach((enemy) => {
        if(collide(car,enemy)) gameOver()
        if(enemy.y>630){
            enemy.y=-250
            enemy.style.left=Math.floor(Math.random()*340)+'px'
        }
        enemy.y+=player.speed
        enemy.style.top=enemy.y+'px'
    })
}

function collide(car,enemy){
    carSize=car.getBoundingClientRect()
    enemySize=enemy.getBoundingClientRect()
    if((carSize.top >  enemySize.bottom) || (carSize.bottom <  enemySize.top) ||
    (carSize.right <  enemySize.left) || (carSize.left >  enemySize.right)) return false
    return true
}

function gameOver(){
    player.start=false
    startGame.classList.remove('hidden')
    startGame.innerHTML="Game Over <br> Your final score is "+ travelDistance+"<br>Click to Restart the Game"
    travelDistance=0
}

document.addEventListener('keydown', (e)=>{
    e.preventDefault();
    keys[e.key] = true;
});

document.addEventListener('keyup', (e)=>{
    e.preventDefault();
    keys[e.key] = false;
});