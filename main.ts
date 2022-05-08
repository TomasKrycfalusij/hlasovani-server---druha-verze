//  ÚVOD
//  1. Zmáčknutí A/B/dotykového tlačítka/pinu 2 se odešle hlas
//  2. V konzoli to vypíše váš aktuální hlas a sériové číslo microbitu
//  3. Vypíše všechny vaše předešlé hlasy (budou uloženy v listu)
//  4. Samotné čísílko mezi hlasy určuje o kolikátou pozici v listu hlasů se jedná
//  5. Nepřišel jsem na způsob jak na detekci sériového čísla v listu,
//     přesněji pozice a jak funduje přiřazování v takovém stylu listu
radio.setGroup(69)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
let my_serial = control.deviceSerialNumber()
// PROMĚNNÉ
let name = "vote"
name = "send"
let number = 1
let value = 0
let posuvnik_1 = 1
let send_message = true
let list_of_votes = [ {
    "serial" : my_serial,
    "volba" : 0,
}
]
input.onPinPressed(TouchPin.P0, function zapinani_hlasovani() {
    
    if (send_message == true) {
        send_message = false
        basic.showIcon(IconNames.No)
    } else {
        send_message = true
        basic.showIcon(IconNames.Yes)
    }
    
})
// HLASOVANI CISEL
input.onButtonPressed(Button.A, function voting_A() {
    
    voted(0)
    basic.showString("A")
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function voting_B() {
    
    voted(1)
    basic.showString("B")
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function voting_C() {
    
    voted(2)
    basic.showString("C")
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P2, function voting_D() {
    
    voted(3)
    basic.showString("D")
    basic.clearScreen()
})
// ----------------------------------------------
// ODESLÁNÍ HLASU
function voted(data: number) {
    while (send_message == true) {
        
        radio.sendValue("" + my_serial, data)
        break
    }
}

// PŘIJMUTÍ HLASU
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    basic.showNumber(value)
    list_of_votes.push([ {
        "serial" : parseInt(name),
        "volba" : value,
    }
    ][0])
    console.log("Toto byl tvůj hlas")
    console.log([ {
        "serial" : parseInt(name),
        "volba" : value,
    }
    ][0])
    let posuvnik_2 = 0
    console.log("Toto je list tvých minulých hlasů")
    for (let i = 0; i < posuvnik_1; i++) {
        console.log(posuvnik_2)
        console.log(list_of_votes[posuvnik_2])
        posuvnik_2 += 1
    }
    posuvnik_1 += 1
    basic.pause(500)
    basic.clearScreen()
})
