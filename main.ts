/**
 * RoversAIgotchi — updated client feedback version
 * 
 * NEW PLAN:
 * 
 * P16 = Music
 * 
 * P15 = Dance
 * 
 * P9  = Custom button kids can use
 * 
 * Force Sensor on P0 = Pet
 * 
 * Button B = cycle stat pages with 5 vertical bars
 * 
 * OTHER BUTTON MAP:
 * 
 * P8  = Phone
 * 
 * P5  = Study
 * 
 * P13 = Sleep
 * 
 * P14 = Feed
 */
/**
 * ============================================================
 */
/**
 * VARIABLES
 */
/**
 * ============================================================
 */
// ============================================================
// HELPERS
// ============================================================
function clamp (val: number) {
    return Math.max(0, Math.min(100, val))
}
function animSad () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.backward()
    basic.pause(300)
    roversa.stop()
    basic.pause(100)
    roversa.backward()
    basic.pause(200)
    roversa.stop()
    isMoving = false
}
function petAction () {
    if (isDead) {
        return
    }
    wakeUp()
    happiness += 8
    social += 4
    happiness = clamp(happiness)
    social = clamp(social)
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
}
function barHeight (stat: number) {
    return Math.max(0, Math.min(5, Math.round(stat * 5 / 100)))
}
function animExcited () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.turnRight(360)
    basic.pause(600)
    roversa.stop()
    isMoving = false
}
// ============================================================
// BUTTON A — show face
// ============================================================
input.onButtonPressed(Button.A, function () {
    updateFace()
    basic.pause(1000)
})
function animSleep () {
    if (isMoving) {
        return
    }
    isMoving = true
    roversa.driveForwards(20)
    basic.pause(400)
    roversa.driveBackwards(20)
    basic.pause(400)
    roversa.stop()
    isMoving = false
}
// ============================================================
// MUSIC — P16
// ============================================================
roversa.onEvent(RoversaPin.P16, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    happiness += 10
    social += 5
    energy += -3
    happiness = clamp(happiness)
    social = clamp(social)
    energy = clamp(energy)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.twinkle), music.PlaybackMode.InBackground)
    animHappy()
    basic.showString("MUSIC")
})
function animNotification () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.turnLeft(15)
    basic.pause(100)
    roversa.turnRight(30)
    basic.pause(100)
    roversa.turnLeft(30)
    basic.pause(100)
    roversa.turnRight(15)
    basic.pause(100)
    roversa.stop()
    isMoving = false
}
function suggestAction () {
    if (isSleeping) {
        basic.showString("ZZZ")
    } else if (energy < 30) {
        basic.showString("TRY SLEEP")
    } else if (satiation < 30) {
        basic.showString("EAT FOOD")
    } else if (social < 30) {
        basic.showString("PET / FRIEND")
    } else if (happiness < 30) {
        basic.showString("MUSIC")
    } else if (health < 30) {
        basic.showString("DANCE")
    } else if (weight > 65) {
        basic.showString("DANCE")
    } else if (weight < 30) {
        basic.showString("EAT MORE")
    } else if (phoneTime > 8) {
        basic.showString("TAKE BREAK")
    }
}
function updateFace () {
    if (isDead) {
        basic.showIcon(IconNames.Skull)
        return
    }
    if (isSleeping) {
        basic.showIcon(IconNames.Asleep)
        return
    }
    if (health < 20) {
        basic.showIcon(IconNames.Skull)
    } else if (energy < 25) {
        basic.showIcon(IconNames.Asleep)
    } else if (happiness < 30) {
        basic.showIcon(IconNames.Sad)
    } else if (social < 30) {
        basic.showIcon(IconNames.Confused)
    } else if (weight > 65) {
        basic.showIcon(IconNames.Surprised)
    } else {
        basic.showIcon(IconNames.Happy)
    }
}
function animHappy () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.turnRight(30)
    basic.pause(200)
    roversa.turnLeft(30)
    basic.pause(200)
    roversa.turnRight(30)
    basic.pause(200)
    roversa.stop()
    isMoving = false
}
// ============================================================
// CUSTOM — P9
// ============================================================
roversa.onEvent(RoversaPin.P9, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    energy += -5
    happiness += 10
    social += 5
    customMeter += 10
    energy = clamp(energy)
    happiness = clamp(happiness)
    social = clamp(social)
    customMeter = clamp(customMeter)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
    animHappy()
    basic.showString(customActionName)
})
function animStudy () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.turnLeft(20)
    basic.pause(300)
    roversa.turnRight(40)
    basic.pause(300)
    roversa.turnLeft(20)
    basic.pause(300)
    roversa.stop()
    isMoving = false
}
// ============================================================
// SLEEP — P13 toggle sleep/wake
// ============================================================
roversa.onEvent(RoversaPin.P13, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    if (isSleeping) {
        wakeUp()
        basic.showString("WAKE")
        return
    }
    isSleeping = true
    energy += 20
    happiness += Math.idiv(5 * otherDampen, 10)
    health += 5
    satiation += -10
    weight += -1
    energy = clamp(energy)
    happiness = clamp(happiness)
    health = clamp(health)
    satiation = clamp(satiation)
    weight = clampWeight(weight)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Asleep)
    basic.showString("SLEEP")
})
function animIdle () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    r = Math.randomRange(0, 3)
    if (r == 0) {
        roversa.turnLeft(15)
        basic.pause(200)
        roversa.stop()
    } else if (r == 1) {
        roversa.turnRight(15)
        basic.pause(200)
        roversa.stop()
    } else if (r == 2) {
        roversa.driveForwards(10)
        basic.pause(150)
        roversa.stop()
    }
    isMoving = false
}
function clampWeight (val: number) {
    return Math.max(10, Math.min(120, val))
}
function animExercise () {
    if (isMoving || isSleeping) {
        return
    }
    isMoving = true
    roversa.driveForwards(60)
    basic.pause(500)
    roversa.turnLeft(180)
    basic.pause(400)
    roversa.driveForwards(60)
    basic.pause(500)
    roversa.turnLeft(180)
    basic.pause(400)
    roversa.stop()
    isMoving = false
}
function checkDeath () {
    if (isDead) {
        return
    }
    if (health <= 0 || lifespan <= 0 || energy <= 0 && satiation <= 0) {
        isDead = true
        isSleeping = false
        animDeath()
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
        basic.showIcon(IconNames.Skull)
        basic.pause(1000)
        basic.showString("GAME OVER")
        basic.pause(300)
        basic.showString("AGE:")
        basic.showNumber(age)
        basic.showString("WT:")
        basic.showNumber(weight)
        basic.showString("PHONE:")
        basic.showNumber(phoneTime)
        basic.showString("A+B RESTART")
    }
}
// ============================================================
// RESTART — press A + B together
// ============================================================
input.onButtonPressed(Button.AB, function () {
    if (!(isDead)) {
        return
    }
    energy = 70
    happiness = 70
    health = 70
    satiation = 70
    social = 70
    weight = 50
    age = 0
    lifespan = 100
    phoneTime = 0
    algoScore = 0
    algoPhase = 0
    phoneBonusMulti = 10
    otherDampen = 10
    customMeter = 50
    isDead = false
    isMoving = false
    isSleeping = false
    roversa.stop()
    basic.showIcon(IconNames.Happy)
    basic.showString("NEW PET!")
})
// ============================================================
// BUTTON B — cycle stat pages with 5 vertical bars
// ============================================================
input.onButtonPressed(Button.B, function () {
    if (isDead) {
        return
    }
    showPageLabel()
    showStatPage(statPage)
    statPage += 1
    if (statPage > 1) {
        statPage = 0
    }
})
// ============================================================
// FEED — P14
// ============================================================
roversa.onEvent(RoversaPin.P14, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    health += 5
    energy += 10
    weightGain = 2
    if (satiation > 85) {
        weightGain = 4
        health += -3
        animSad()
        basic.showString("TOO FULL")
    } else {
        satiation += 15
        animHappy()
        basic.showIcon(IconNames.Happy)
        basic.pause(300)
        basic.showString("EAT")
    }
    weight += weightGain
    health = clamp(health)
    energy = clamp(energy)
    satiation = clamp(satiation)
    weight = clampWeight(weight)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.InBackground)
})
function updateAlgorithm (isPhone: boolean) {
    if (isPhone) {
        algoScore += 3
        if (algoPhase == 0 && algoScore >= 9) {
            algoPhase = 1
            phoneBonusMulti = 16
            otherDampen = 8
            basic.showString("...")
            animNotification()
        }
        if (algoPhase == 1 && algoScore >= 21) {
            algoPhase = 2
            phoneBonusMulti = 6
            otherDampen = 5
        }
        if (algoScore >= 24 && algoPhase >= 2) {
            basic.showString("ALGO WATCHING")
            basic.pause(400)
            basic.showString("SCORE:")
            basic.showNumber(algoScore)
        }
    } else {
        algoScore += 1
    }
}
function wakeUp () {
    if (isSleeping) {
        isSleeping = false
        roversa.stop()
        basic.showIcon(IconNames.Happy)
        basic.pause(300)
    }
}
// ============================================================
// PHONE — P8
// ============================================================
roversa.onEvent(RoversaPin.P8, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    phoneTime += 1
    weight += 1
    updateAlgorithm(true)
    if (phoneTime <= 5) {
        moodBoost = Math.idiv(phoneBonusMulti * 5, 10)
        happiness += moodBoost
        if (algoPhase >= 1) {
            animExcited()
        } else {
            animHappy()
        }
        music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Heart)
        basic.pause(300)
    } else if (phoneTime <= 10) {
        happiness += -5
        energy += -5
        health += -3
        social += -5
        lifespan += -1
        animSad()
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Sad)
        basic.pause(300)
    } else {
        happiness += -10
        energy += -10
        health += -5
        social += -10
        lifespan += -2
        animSad()
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
        basic.showString("TOO MUCH PHONE")
    }
    happiness = clamp(happiness)
    energy = clamp(energy)
    health = clamp(health)
    social = clamp(social)
    lifespan = clamp(lifespan)
    weight = clampWeight(weight)
    basic.showString("PHONE")
    checkDeath()
})
// ============================================================
// STUDY — P5
// ============================================================
roversa.onEvent(RoversaPin.P5, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    energy += -5
    satiation += -5
    happiness += -5
    health += 5
    energy = clamp(energy)
    satiation = clamp(satiation)
    happiness = clamp(happiness)
    health = clamp(health)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.soaring), music.PlaybackMode.InBackground)
    animStudy()
    basic.showString("STUDY")
})
function showPageLabel () {
    if (statPage == 0) {
        basic.showString("CORE")
    } else {
        basic.showString("MORE")
    }
}
function animDeath () {
    isMoving = true
    roversa.turnRight(720)
    basic.pause(1200)
    roversa.backward()
    basic.pause(500)
    roversa.stop()
    isMoving = false
}
// ============================================================
// DANCE — P15
// ============================================================
roversa.onEvent(RoversaPin.P15, RoversaEvent.Click, function () {
    if (isDead) {
        return
    }
    wakeUp()
    energy += -8
    health += 6
    happiness += 12
    social += 4
    weight += -1
    energy = clamp(energy)
    health = clamp(health)
    happiness = clamp(happiness)
    social = clamp(social)
    weight = clampWeight(weight)
    updateAlgorithm(false)
    music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
    animExercise()
    basic.showString("DANCE")
    checkDeath()
})
function showStatPage (page: number) {
    basic.clearScreen()
    if (page == 0) {
        // Energy, Happiness, Health, Satiation, Social
        drawBar(0, energy)
        drawBar(1, happiness)
        drawBar(2, health)
        drawBar(3, satiation)
        drawBar(4, social)
    } else if (page == 1) {
        // Weight, Lifespan, Phone, Age, Custom
        drawBar(0, Math.min(weight, 100))
        drawBar(1, lifespan)
        drawBar(2, Math.min(phoneTime * 10, 100))
        drawBar(3, Math.min(age * 5, 100))
        drawBar(4, customMeter)
    }
    basic.pause(1200)
    basic.clearScreen()
}
function drawBar (col: number, stat: number) {
    h = barHeight(stat)
    for (let y = 0; y <= 4; y++) {
        led.unplot(col, y)
    }
    for (let i = 0; i <= h - 1; i++) {
        led.plot(col, 4 - i)
    }
}
let lastPetTime = 0
let forceValue = 0
let drain = 0
let ageFactor = 0
let h = 0
let moodBoost = 0
let weightGain = 0
let statPage = 0
let algoPhase = 0
let algoScore = 0
let age = 0
let r = 0
let phoneTime = 0
let isDead = false
let isSleeping = false
let isMoving = false
let customMeter = 0
let otherDampen = 0
let phoneBonusMulti = 0
let lifespan = 0
let weight = 0
let social = 0
let satiation = 0
let health = 0
let happiness = 0
let energy = 0
let customActionName = ""
customActionName = "CUSTOM"
// ============================================================
// STARTING STATS
// ============================================================
energy = 70
happiness = 70
health = 70
satiation = 70
social = 70
weight = 50
lifespan = 100
phoneBonusMulti = 10
otherDampen = 10
customMeter = 50
// ============================================================
// STARTUP — runs when powered on
// ============================================================
basic.pause(500)
roversa.stop()
basic.showIcon(IconNames.Happy)
music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.InBackground)
basic.pause(800)
roversa.stop()
updateFace()
// ============================================================
// FOREVER LOOP — 15 second tick = 1 day
// ============================================================
basic.forever(function () {
    roversa.stop()
    basic.pause(15000)
    if (isDead) {
        return
    }
    if (isSleeping) {
        basic.showIcon(IconNames.Asleep)
        return
    }
    age += 1
    // Faster decay after day 30
    ageFactor = 1
    if (age > 30) {
        ageFactor = 2
    }
    energy += -2 * ageFactor
    satiation += -3 * ageFactor
    social += -1 * ageFactor
    // Weight drift
    if (satiation > 70) {
        weight += 1
    }
    if (satiation < 20) {
        weight += -1
    }
    weight = clampWeight(weight)
    // Lifespan drain
    drain = 1
    if (health < 30) {
        drain += 2
    }
    if (weight > 65) {
        drain += 1
    }
    if (phoneTime > 8) {
        drain += 1
    }
    lifespan += 0 - drain
    lifespan = clamp(lifespan)
    // Clamp all stats
    energy = clamp(energy)
    happiness = clamp(happiness)
    health = clamp(health)
    satiation = clamp(satiation)
    social = clamp(social)
    customMeter = clamp(customMeter)
    // Small custom meter decay over time
    if (customMeter > 0) {
        customMeter += -1
        customMeter = clamp(customMeter)
    }
    // Algorithm notification jitter in phase 1+
    if (algoPhase >= 1) {
        animNotification()
        basic.showString("NOTIF!")
        basic.pause(300)
    } else {
        animIdle()
    }
    updateFace()
    basic.pause(800)
    suggestAction()
    checkDeath()
})
// ============================================================
// FORCE SENSOR ON P0 — PET
// ============================================================
basic.forever(function () {
    forceValue = pins.analogReadPin(AnalogPin.P0)
    if (forceValue > 500 && input.runningTime() - lastPetTime > 1000) {
        lastPetTime = input.runningTime()
        petAction()
    }
    basic.pause(100)
})
