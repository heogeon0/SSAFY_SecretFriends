import os
import sys
import urllib.request
# import webbrowser
import datetime


def playTTS(word):
    print("NodeJs -> Python 전달 인자 : ", word)
    client_id = "k5i53b455i"
    client_secret = "jFIfChmAa488TljBIQZvXsS5SmRTvVR0Tmo2rk8B"
    encText = urllib.parse.quote(word)
    data = "speaker=ngaram&volume=0&speed=0&pitch=0&format=mp3&text=" + encText;
    url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts"
    request = urllib.request.Request(url)
    request.add_header("X-NCP-APIGW-API-KEY-ID",client_id)
    request.add_header("X-NCP-APIGW-API-KEY",client_secret)
    response = urllib.request.urlopen(request, data=data.encode('utf-8'))
    rescode = response.getcode()
    if(rescode==200):

        print("TTS mp3 저장")
        response_body = response.read()
        with open('tts.mp3', 'wb') as f:
            f.write(response_body)
        # webbrowser.open('tts.mp3')
        os.system("mpg123 " + "tts.mp3")
    else:
        print("Error Code:" + rescode)


if __name__ == '__main__':
    playTTS(sys.argv[1])