radio.setGroup(69)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
let my_serial = control.deviceSerialNumber()
let name = "vote"
name = "send"
let number = 1
let value = 0
let send_message = true
let list_of_votes = [0]
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
    list_of_votes.push(parseInt(name))
    list_of_votes.push(value)
    console.log(list_of_votes)
})
