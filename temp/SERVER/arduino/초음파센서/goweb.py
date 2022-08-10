import serial
import time
import webbrowser

url = "https://i7d208.p.ssafy.io/login"
chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'

py_serial = serial.Serial(
    port='COM3',
    baudrate=9600,
)
while True:
    if py_serial.readable():
        response = py_serial.readline()
        allStr = response[:len(response) - 1].decode()
        check = allStr[0:7]
        if check == 'Sensor1' and int(float(allStr[-3:])) < int(20):
            print(response[:len(response) - 1].decode())
            print(int(float(allStr[-3:])))
            webbrowser.get(chrome_path).open(url)
            break
        print(response[:len(response) - 1].decode())


