//Tom Fan
//Version 1 13/6/2022
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var mouse = { x: c.width / 2, y: c.height / 2 }

//--------------------------------------------------
const playerRight = document.getElementById('AmeRight')
const playerLeft = document.getElementById('AmeLeft')

const summonGura = document.getElementById('SummonGura')
const summonIna = document.getElementById('SummonIna')

const AmeSwordRight = document.getElementById('AmeSwordRight')
const AmeSwordLeft = document.getElementById('AmeSwordLeft')

const wind = document.getElementById('wind')

const GuraLeft = document.getElementById('GuraLeft')
const GuraRight = document.getElementById('GuraRight')

const MoriLeft = document.getElementById('MoriLeft')
const MoriRight = document.getElementById('MoriRight')

const KiaraLeft = document.getElementById('KiaraLeft')
const KiaraRight = document.getElementById('KiaraRight')

const InaLeft = document.getElementById('InaLeft')
const InaRight = document.getElementById('InaRight')

const HammerLeft = document.getElementById('HammerLeft')
const HammerRight = document.getElementById('HammerRight')

const SelenBday = document.getElementById('SelenBday')

const gameStartBtn = document.querySelector('.gameStartBtn')

const MessageBoxWrap = document.querySelector('.MessageBoxWrap')
const MessageBoxWrapBtn = document.querySelector('.MessageBoxWrapBtn')

const PausePage = document.querySelector('.PausePage')

const skillPointsBar = document.querySelector('.skillPointsBar')
const skillPointsBtn_0 = document.getElementById('skillPointsBtn_0')
const skillPointsBtn_1 = document.getElementById('skillPointsBtn_1')
const skillPointsBtn_2 = document.getElementById('skillPointsBtn_2')
const skillPointsBtn_3 = document.getElementById('skillPointsBtn_3')
const skillPointsBtn_4 = document.getElementById('skillPointsBtn_4')
const skillPointsBtn_5 = document.getElementById('skillPointsBtn_5')
const skillPointsBtn_6 = document.getElementById('skillPointsBtn_6')
const skillPointsBtn_7 = document.getElementById('skillPointsBtn_7')

const skillPointsTotal = document.getElementById('skillPointsTotal')
const atkValue = document.getElementById('atkValue')
const speedValue = document.getElementById('speedValue')
const chargeValue = document.getElementById('chargeValue')
const releaseValue = document.getElementById('releaseValue')
const lightningValue = document.getElementById('lightningValue')
const waterValue = document.getElementById('waterValue')
const FireDanceValue = document.getElementById('FireDanceValue')
const CastleValue = document.getElementById('CastleValue')

//--------------------------------------------------
MessageBoxWrapBtn.addEventListener("click", () => {
    MessageBoxWrap.style.display = 'none'
    gameStartBtn.style.display = 'block'
})
//--------------------------------------------------
window.addEventListener("resize", function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})
//--------------------------------------------------
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

//--------------------------------------------------
var keyID = ''

//Pause
window.addEventListener('keydown', function (e) {
    if (gameStartConfirm === true) {
        keyID = e.code
    }
    switch (keyID) {
        //--------------------------------------------------
        case 'KeyP':
            PausePage.style.display = 'block'
            break;
        //--------------------------------------------------
        case "KeyQ":
            if (Player.skillRemain.Kiara >= Player.skillMaxRemain.Kiara && Player.skill.Kiara === false) {
                Player.skillRemain.Kiara = 0
                Player.skill.Kiara = true
                Player.speed += 20
                Player.attack += 5
                setTimeout(() => {
                    Player.skill.Kiara = false
                    Player.speed -= 20
                    Player.attack -= 5
                }, 5000 * Player.releasePerTime.Kiara)
            }
            PausePage.style.display = 'none'
            break;
        //--------------------------------------------------
        case "KeyW":
            if (Player.skillRemain.Gura >= Player.skillMaxRemain.Gura && Player.skill.Gura === false) {
                Player.skillRemain.Gura = 0
                Player.skill.Gura = true
                Summons.push(new newSkill(Player.position.x, Player.position.y, 0, 0, summonGura, 0.5, 0, 8, 2))

                setTimeout(() => {
                    Player.skill.Gura = false;
                    Summons = []
                    Thunders = []
                }, 10000)
            }
            PausePage.style.display = 'none'
            break;
        //--------------------------------------------------
        case "KeyE":
            if (Player.skillRemain.Ina >= Player.skillMaxRemain.Ina && Player.skill.Ina === false) {
                Player.skillRemain.Ina = 0
                Player.skill.Ina = true
                WaterBallStorage.push(new newSkill(Player.position.x, Player.position.y, 0, 0, summonIna, 0.5, 0, 8, 2))
                WaterBallStorage.push(new waterBigBall(Player.position.x, Player.position.y))
            }
            setTimeout(() => {
                Player.skill.Ina = false;
                //Mark the x,y coordinate before the array empty
                var WaterBallStoragePositionX = WaterBallStorage[0].position.x
                var WaterBallStoragePositionY = WaterBallStorage[0].position.y
                for (var i = 0; i < Player.releasePerTime.Ina; i++) {
                    WaterBallRelease.push(new waterBall(WaterBallStoragePositionX, WaterBallStoragePositionY))
                }
                WaterBallStorage = []
            }, 5000)
            PausePage.style.display = 'none'
            break;
        //--------------------------------------------------
        case "KeyR":
            if (Player.skillRemain.Mori >= Player.skillMaxRemain.Mori && Player.skill.Mori === false) {
                Player.skillRemain.Mori = 0
                Player.skill.Mori = true
                Reaper.push(new reaper)
                setTimeout(() => {
                    Player.skill.Mori = false;
                    Reaper = []
                    AllEnemy = []
                }, 5000)
            }
            PausePage.style.display = 'none'
            break;
        //--------------------------------------------------
        default:
            PausePage.style.display = 'none'
            break;
    }
});

//--------------------------------------------------
var skillPoints = 1
var skillPointsNextLevel = 1
function addSkillPoints() {
    skillPointsTotal.innerHTML = "Points: " + skillPoints + " / " + skillPointsNextLevel
    atkValue.innerHTML = "ATK: " + Player.attack.toFixed(1)
    speedValue.innerHTML = "Speed: " + Player.speed
    chargeValue.innerHTML = "Charge: " + Player.skillMaxRemain.Ame
    releaseValue.innerHTML = "Release: " + Player.releasePerTime.Ame
    lightningValue.innerHTML = "Lightning: " + Player.releasePerTime.Gura
    waterValue.innerHTML = "Water Ball: " + Player.releasePerTime.Ina
    FireDanceValue.innerHTML = "Fire Dance: " + Player.releasePerTime.Kiara.toFixed(1) * 5 + " s"
    CastleValue.innerHTML = "Castle HP: " + Castle.hp + "/" + Castle.maxHP

    //Max skill points: 10
    if (score > 5000 * skillPointsNextLevel && skillPointsNextLevel < 50) {
        skillPointsNextLevel++
        skillPoints++
    }
    //Show Btn
    if (skillPoints > 0) {
        skillPointsBtn_0.style.display = 'block'
        skillPointsBtn_1.style.display = 'block'
        skillPointsBtn_2.style.display = 'block'
        skillPointsBtn_3.style.display = 'block'
        skillPointsBtn_4.style.display = 'block'
        skillPointsBtn_5.style.display = 'block'
        skillPointsBtn_6.style.display = 'block'
        skillPointsBtn_7.style.display = 'block'
    }
    if (skillPoints <= 0) {
        skillPointsBtn_0.style.display = 'none'
        skillPointsBtn_1.style.display = 'none'
        skillPointsBtn_2.style.display = 'none'
        skillPointsBtn_3.style.display = 'none'
        skillPointsBtn_4.style.display = 'none'
        skillPointsBtn_5.style.display = 'none'
        skillPointsBtn_6.style.display = 'none'
        skillPointsBtn_7.style.display = 'none'
    }
}
//Skill Btn
/*
0. ATK
1. Speed
2. Slash max. charge
3. SlashreleasePerTime
4. Lightning max. release
5. Water Ball max. release
6. Fire Dance time
7. Castle HP
 */
skillPointsBtn_0.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.attack += 0.5
    addSkillPoints()
})

skillPointsBtn_1.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.speed += 2
    addSkillPoints()
})

skillPointsBtn_2.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.skillMaxRemain.Ame += 5
    addSkillPoints()
})

skillPointsBtn_3.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.releasePerTime.Ame += 5
    addSkillPoints()
})

skillPointsBtn_4.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.releasePerTime.Gura += 5
    addSkillPoints()
})

skillPointsBtn_5.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.releasePerTime.Ina += 50
    addSkillPoints()
})

skillPointsBtn_6.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Player.releasePerTime.Kiara += 0.1
    addSkillPoints()
})

skillPointsBtn_7.addEventListener('click', () => {
    if (!skillPoints > 0) return
    skillPoints--
    Castle.maxHP += 50000
    Castle.hp += 50000
    addSkillPoints()
})
//--------------------------------------------------
const Player = new player();
const Castle = new castle();
let AllEnemy = [];
let currentId = 0;
const Slashs = [];
let score = 0;
const PlayerWind = new Wind();
const Portals = [];
const hitEffects = [];
let Summons = [];
let Thunders = [];
let WaterBallStorage = [];
let WaterBallRelease = [];
let Reaper = [];
//Game harder--------------------------------------------------
let hammerMission = 1
let selenBdayMission = 1
let Mission = 1
let addElite = true
let addEliteBoss = 1

//--------------------------------------------------
//fps
var fps = 60

function animate() {
    //--------------------------------------------------
    /*
    1. Clear Canvas
    2. Draw portals
    3. Draw player
    4. Draw Castle
    5. All enemy update
    6. Draw player skill effect
    7. Collision
    8. Add hit effect after Collision
    9. Update score
    10. Reload skill CD
    11. Calc skill points
    12. Add more enemy by scores
    */
    setTimeout(() => {
        requestAnimationFrame(animate);

        if (Castle.hp > 0 && keyID !== 'KeyP') {
            //Clear Canvas--------------------------------------------------
            ctx.clearRect(0, 0, c.width, c.height)
            //Draw portals--------------------------------------------------
            Portals.forEach((portal) => {
                portal.update()
            })
            //Draw Castle--------------------------------------------------
            Castle.update()
            //Draw player--------------------------------------------------
            Player.update()
            //All enemy update--------------------------------------------------
            AllEnemy.forEach((enemy) => {
                enemy.update()
            })
            //Player skill effect--------------------------------------------------
            PlayerWind.update()
            SlashsUpdate()

            Summons.forEach((x) => {
                x.update()
            })
            ThundersUpdate()
            WaterBallStorageUpdate()
            WaterBallReleaseUpdate()
            ReaperUpdate()
            //Collision--------------------------------------------------
            playerWindDefect()
            defect()
            SlashDefect()
            ThundersDefect()
            WaterBallDefect()
            castleDefect()
            //Hit effect--------------------------------------------------
            hitEffectupdate()
            //Update score--------------------------------------------------
            document.querySelector('.Score').innerHTML = score
            //Skill points--------------------------------------------------
            addSkillPoints()
            //Game harder--------------------------------------------------
            if (score >= 5000 * hammerMission) {
                addBossIna()
                hammerMission++
            }
            if (score >= 10000 * selenBdayMission) {
                addBossSelenBday()
                selenBdayMission++
            }
            if (score >= 10000 * Mission * Mission) {
                addGura()
                addIna()
                addMori()
                addKiara()
                Mission++
            }
            if (score >= 100000 && addElite === true) {
                //add once only
                addElite = false
                addEliteIna()
                addEliteGura()
                addEliteMori()
                addEliteKiara()
            }
            if (score >= 300000 * addEliteBoss) {
                addEliteBoss++
                addEliteBossIna()
            }

            //Monster number check
            console.log(AllEnemy.length)
        }

    }, 1000 / fps)
    //--------------------------------------------------
    if (Castle.hp <= 0 && gameOver === false) {
        ctx.clearRect(0, 0, c.width, c.height);
        alert('殘念\nYour score is ' + score + ' points\nPlease press F5 to have new game');
        gameOver = true;
    }
}

var gameOver = false

window.onload = () => {
    setTimeout(() => {
        document.querySelector('.Preloader').style.display = 'none'
    }, 2500);
}

var gameStartConfirm = false

gameStartBtn.addEventListener('click', () => {
    gameStartBtn.style.display = 'none'
    document.querySelector('.Score').style.display = 'block'
    skillPointsBar.style.pointerEvents = 'all'
    skillPointsBar.style.visibility = 'visible';

    gameStartConfirm = true

    addPortal()
    addGura()
    addIna()
    addMori()
    addKiara()

    //Reload skill--------------------------------------------------
    setInterval(() => {
        const d = new Date();
        let seconds = d.getSeconds();
        if (seconds % 10 === 0) {
            Player.skillRemain.Ame = Player.skillMaxRemain.Ame
        }

        if (Player.skillRemain.Kiara < Player.skillMaxRemain.Kiara) { Player.skillRemain.Kiara += 1 }
        if (Player.skillRemain.Ina < Player.skillMaxRemain.Ina) { Player.skillRemain.Ina += 1 }
        if (Player.skillRemain.Gura < Player.skillMaxRemain.Gura) { Player.skillRemain.Gura += 1 }
        if (Player.skillRemain.Mori < Player.skillMaxRemain.Mori) { Player.skillRemain.Mori += 1 }

    }, 1000)

    animate()

})



