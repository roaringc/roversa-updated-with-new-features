# Clean

def my_function():
    global health, happiness, energy, satiation
    health += 10
    happiness += 5
    energy += 0 - 5
    satiation += 0 - 5
    music.play(music.builtin_playable_sound_effect(soundExpression.giggle),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_string("CLEAN")
roversa.on_event(RoversaPin.P16, RoversaEvent.CLICK, my_function)

def suggestAction():
    if energy < 30:
        basic.show_string("TRY SLEEP")
    elif satiation < 30:
        basic.show_string("EAT FOOD")
    elif social < 30:
        basic.show_string("CALL FRIEND")
    elif happiness < 30:
        basic.show_string("PLAY")
    elif health < 30:
        basic.show_string("EXERCISE")
    elif phoneTime > 8:
        basic.show_string("TAKE BREAK")
# Play

def my_function2():
    global energy, happiness, social, satiation
    energy += 0 - 10
    happiness += 10
    social += 10
    satiation += 0 - 5
    music.play(music.builtin_playable_sound_effect(soundExpression.happy),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.show_string("PLAY")
roversa.on_event(RoversaPin.P9, RoversaEvent.CLICK, my_function2)

def clampStats():
    global energy, happiness, health, satiation, social
    energy = max(0, min(100, energy))
    happiness = max(0, min(100, happiness))
    health = max(0, min(100, health))
    satiation = max(0, min(100, satiation))
    social = max(0, min(100, social))
# Sleep

def my_function3():
    global energy, happiness, health, satiation
    energy += 20
    happiness += 5
    health += 5
    satiation += 0 - 10
    music.play(music.builtin_playable_sound_effect(soundExpression.yawn),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_icon(IconNames.ASLEEP)
    basic.pause(500)
    basic.show_string("SLEEP")
roversa.on_event(RoversaPin.P13, RoversaEvent.CLICK, my_function3)

def on_button_pressed_b():
    global statIndex
    statIndex += 1
    if statIndex == 1:
        basic.show_string("E")
        basic.show_number(energy)
    elif statIndex == 2:
        basic.show_string("HAP")
        basic.show_number(happiness)
    elif statIndex == 3:
        basic.show_string("HLT")
        basic.show_number(health)
    elif statIndex == 4:
        basic.show_string("SAT")
        basic.show_number(satiation)
    elif statIndex == 5:
        basic.show_string("SOC")
        basic.show_number(social)
        statIndex = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

# Feed

def my_function4():
    global health, satiation, energy
    health += 5
    satiation += 15
    energy += 10
    music.play(music.builtin_playable_sound_effect(soundExpression.spring),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.show_string("EAT")
roversa.on_event(RoversaPin.P14, RoversaEvent.CLICK, my_function4)

# Phone

def my_function5():
    global phoneTime, happiness, energy, health, social
    phoneTime += 1
    if phoneTime <= 5:
        happiness += 5
    else:
        if phoneTime > 10:
            basic.show_string("TOO MUCH PHONE")
            happiness += 0 - 5
            energy += 0 - 5
            health += 0 - 5
            social += 0 - 5
        happiness += 0 - 5
        energy += 0 - 5
        health += 0 - 5
        social += 0 - 5
    music.play(music.builtin_playable_sound_effect(soundExpression.sad),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_icon(IconNames.SAD)
    basic.pause(500)
    basic.show_string("PHONE")
roversa.on_event(RoversaPin.P8, RoversaEvent.CLICK, my_function5)

# Study

def my_function6():
    global energy, satiation, happiness, health
    energy += 0 - 5
    satiation += 0 - 5
    happiness += 0 - 5
    health += 5
    music.play(music.builtin_playable_sound_effect(soundExpression.soaring),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_string("STUDY")
roversa.on_event(RoversaPin.P5, RoversaEvent.CLICK, my_function6)

# Exercise

def my_function7():
    global energy, satiation, health
    energy += 0 - 10
    satiation += 0 - 10
    health += 10
    music.play(music.builtin_playable_sound_effect(soundExpression.mysterious),
        music.PlaybackMode.IN_BACKGROUND)
    basic.show_string("EXE")
roversa.on_event(RoversaPin.P15, RoversaEvent.CLICK, my_function7)

statIndex = 0
phoneTime = 0
social = 0
satiation = 0
health = 0
happiness = 0
energy = 0
energy = 70
happiness = 70
health = 70
satiation = 70
social = 70

def on_forever():
    global energy, satiation, social
    # every 15 seconds
    basic.pause(15000)
    energy += -2
    satiation += -3
    social += -1
    if health < 30:
        basic.show_icon(IconNames.SKULL)
    elif energy < 25:
        basic.show_icon(IconNames.ASLEEP)
    elif happiness < 30:
        basic.show_icon(IconNames.SAD)
    elif social < 30:
        basic.show_icon(IconNames.CONFUSED)
    else:
        basic.show_icon(IconNames.HAPPY)
    suggestAction()
basic.forever(on_forever)
