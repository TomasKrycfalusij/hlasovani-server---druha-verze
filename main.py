radio.set_group(69)
radio.set_transmit_power(7)
radio.set_transmit_serial_number(True)
my_serial = control.device_serial_number()

name= "vote"
name= "send"
number= 1
value= 0
send_message = True
list_of_votes = [0]
def dissable_client():
    if name == "send" and number == 0:
        radio.send_value("send", 1)
    else:
        radio.send_value("send", 0)
input.on_pin_pressed(TouchPin.P0, dissable_client)

def voting_A():
    global send_message
    basic.show_string("A")
    voted(0)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, voting_A)

def voting_B():
    global send_message
    basic.show_string("B")
    voted(1)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, voting_B)

def voting_C():
    global send_message
    basic.show_string("C")
    voted(2)
    basic.pause(500)
    basic.clear_screen()
input.on_logo_event(TouchButtonEvent.PRESSED, voting_C)

def voting_D():
    global send_message
    basic.show_string("D")
    voted(3)
    basic.pause(500)
    basic.clear_screen()
input.on_pin_pressed(TouchPin.P2, voting_D)

def voted(data):
    while send_message == True:
        global list_of_votes
        radio.send_value(str(my_serial), data)
        break

def on_received_value(name, value):
    global list_of_votes
    basic.show_number(value)
    list_of_votes.append(int(name))
    list_of_votes.append(value)
    print(list_of_votes)
radio.on_received_value(on_received_value)