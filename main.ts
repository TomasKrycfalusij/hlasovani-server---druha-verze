radio.setGroup(69)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
let my_serial = control.deviceSerialNumber()
let name = "vote"
name = "send"
let number = 1
let value = 0
let posuvnik_1 = 1
let send_message = true
let list_of_votes = [ {
    "serial" : my_serial,
    "volba" : 2,
}
]
console.log(list_of_votes[0])
input.onPinPressed(TouchPin.P0, function dissable_client() {
    if (name == "send" && number == 0) {
        radio.sendValue("send", 1)
    } else {
        radio.sendValue("send", 0)
    }
    
})
// HLASOVANI CISEL
input.onButtonPressed(Button.A, function voting_A() {
    
    basic.showString("A")
    voted(0)
    basic.pause(500)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function voting_B() {
    
    basic.showString("B")
    voted(1)
    basic.pause(500)
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function voting_C() {
    
    basic.showString("C")
    voted(2)
    basic.pause(500)
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P2, function voting_D() {
    
    basic.showString("D")
    voted(3)
    basic.pause(500)
    basic.clearScreen()
})
// ----------------------------------------------
function voted(data: number) {
    while (send_message == true) {
        
        radio.sendValue("" + my_serial, data)
        break
    }
}

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
    for (let i = 0; i < posuvnik_1; i++) {
        console.log("Toto je posuvník 2")
        console.log(posuvnik_2)
        console.log("Toto je list tvým minulých hlasů")
        console.log(list_of_votes[posuvnik_2])
        posuvnik_2 += 1
    }
    posuvnik_1 += 1
})
