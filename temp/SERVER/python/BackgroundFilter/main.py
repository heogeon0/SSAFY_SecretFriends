import os
import cv2
import sys
import time
import asyncio
import datetime
import numpy as np
from uuid import uuid4
from cvzone.SelfiSegmentationModule import SelfiSegmentation
from playsound import playsound

# firebase import
import firebase_admin
from firebase_admin import storage
from firebase_admin import credentials

# pyqt import
from PyQt5 import QtGui
from PyQt5.QtWidgets import QWidget, QApplication, QLabel, QVBoxLayout, QPushButton, QDesktopWidget, QHBoxLayout, QGroupBox
from PyQt5.QtGui import QPixmap, QFontDatabase, QFont
from PyQt5.QtCore import pyqtSignal, pyqtSlot, Qt, QThread, QCoreApplication

# email import
import smtplib
from email.message import EmailMessage

projectPath = "C:/SSAFY/Workspace/20220811_13/S07P12D208/temp/SERVER/python/BackgroundFilter/" # 프로젝트 파일 경로
imgIndex = 1

seg = SelfiSegmentation()

flag_photo = False
flag_exit = False

class VideoThread(QThread):
    change_pixmap_signal = pyqtSignal(np.ndarray)

    def run(self):
        global img, imgIndex, email

        smtp_gmail = smtplib.SMTP('smtp.gmail.com', 587)  # gmail smtp
        smtp_gmail.ehlo() # 서버 연결을 설정하는 단계
        smtp_gmail.starttls() # 연결을 암호화

        smtp_gmail.login('hsduswl7@gmail.com', 'raltbxkzwzrjtrmh') # 로그인

        msg = EmailMessage()

        msg['Subject'] = "[나의 단짝친구] 회원님의 아이가 찍은 사진이 도착했습니다." # 제목 입력
        msg.set_content("아이와 캐릭터가 함께한 사진입니다.") # 내용 입력
        msg['From'] = 'mybuddy@ssafy.com' # 보내는 사람
        print("send to " + email)
        msg['To'] = email # 받는 사람

        # capture from web cam
        cap = cv2.VideoCapture(0)
        cnt = 1

        while True:
            img = cv2.imread(
                projectPath + "image/" + str(
                    imgIndex) + ".png")
            img = cv2.resize(img, (640, 480), fx=0, fy=0, interpolation=cv2.INTER_CUBIC)

            global flag_photo, filename
            ret, cv_img = cap.read()
            imgout = seg.removeBG(cv_img, img)

            self.change_pixmap_signal.emit(imgout)
            if flag_photo:
                print("Screenshot saved...")
                filename = datetime.datetime.now().strftime("%Y%m%d_%H%M%S") + 'screenshot{}.jpg'
                filename = filename.format(cnt)
                path = projectPath + 'result/'
                cv2.imwrite(path + filename.format(cnt), imgout, params=[cv2.IMWRITE_PNG_COMPRESSION, 0])
                fileUpload(path + filename.format(cnt))
                flag_photo = False

                file = projectPath + 'result/' + filename.format(cnt)
                fp = open(file, 'rb')
                file_data = fp.read()
                msg.add_attachment(file_data, maintype='image', subtype='jpg', filename=filename.format(cnt))

                smtp_gmail.send_message(msg)
            # elif flag_exit:
            #     # cv2.imwrite("image/photo.jpg", frame)
            #     close()


PROJECT_ID = "my-buddy-359c8"
# C:\SSAFY\Workspace\20220809_16\S07P12D208\temp\SERVER\python\BackgroundFilter\SDK
# cred = credentials.Certificate("./SDK/my-buddy-359c8-firebase-adminsdk-9vyrm-60b4fbbdf5.json")
cred = credentials.Certificate(
    projectPath + "SDK/my-buddy-359c8-firebase-adminsdk-9vyrm-60b4fbbdf5.json")
default_app = firebase_admin.initialize_app(cred, {
    # gs://smart-mirror-cf119.appspot.com
    'storageBucket': f"{PROJECT_ID}.appspot.com"
})

bucket = storage.bucket()


def fileUpload(file):
    global id
    global filename
    blob = bucket.blob('captureImages/' + str(id) + '/' + filename)  # 저장경로 : captureImage/아이번호/ + 업로드 이미지 명
    print("filename : " + filename)
    # new token and metadata 설정
    new_token = uuid4()
    metadata = {"firebaseStorageDownloadTokens": new_token}  # access token이 필요하다.
    blob.metadata = metadata

    # upload file
    blob.upload_from_filename(filename=file, content_type='image/jpeg')  # 업로드 할 파일 경로?
    print(blob.public_url)


class App(QWidget):
    def __init__(self):
        super().__init__()
        # self.set_style()

        self.setStyleSheet("background-color : white;")
        self.setWindowTitle("Qt live label demo")

        self.disply_width = 1000
        self.display_height = 960
        # create the label that holds the image
        self.image_label = QLabel(self)
        self.image_label.resize(self.disply_width, self.display_height)
        # create a text label
        # self.center()
        self.move(0, 0)

        self.label = QLabel(str(3), self)
        self.btnPhoto = QPushButton("사진 촬영", self)
        self.btnExit = QPushButton("종료", self)
        self.btnChangePrev = QPushButton("이전", self)
        self.btnChangeNext = QPushButton("다음 ", self)


        self.btnPhoto.clicked.connect(self.btnPhotoClicked)
        self.btnExit.clicked.connect(QCoreApplication.instance().quit)
        self.btnChangePrev.clicked.connect(self.changeImagePrev)
        self.btnChangeNext.clicked.connect(self.changeImageNext)


        self.groupBox = QGroupBox("배경을 바꿔가며 촬영해보세요!")
        layout = QHBoxLayout()
        layout.addWidget(self.btnChangePrev)
        layout.addWidget(self.btnPhoto)
        layout.addWidget(self.btnChangeNext)
        self.groupBox.setLayout(layout)

        # create a vertical box layout and add the two labels
        vbox = QVBoxLayout()
        vbox.addWidget(self.label)
        vbox.addWidget(self.image_label)
        # vbox.addWidget(self.btnPhoto)
        # vbox.addWidget(self.btnChangePrev)
        # vbox.addWidget(self.btnChangeNext)
        vbox.addWidget(self.groupBox)
        vbox.addWidget(self.btnExit)

        ####################### CSS #############################
        self.btnPhoto.setStyleSheet(
                                    "color : black;"
                                    "background-color: rgb(185, 235, 245);"
                                    "border-radius: 5px;"
                                    "margin: 10px;"
                                    "padding : 20px;"
                                    "padding-top : 20px;"
                                    "padding-bottom : 30px;"
                                    "font-size: 30px;"
        )
        self.btnChangePrev.setStyleSheet(
                                    "color : black;"
                                    "background-color: rgb(249, 242, 217);"
                                    "border-radius: 5px;"
                                    "margin: 10px;"
                                    "margin-right : 250px;"
                                    "padding : 15px;"
                                    "font-size: 20px;"
        )
        self.btnChangeNext.setStyleSheet(
                                    "color : black;"
                                    "background-color: rgb(248, 183, 205);"
                                    "border-radius: 5px;"
                                    "margin-left : 250px;"
                                    "padding : 15px;"
                                    "font-size: 20px;"
        )
        self.btnExit.setStyleSheet(
                                    "color : rgb(255, 0, 110);;"
                                    # "background-color: rgb(185, 235, 245);"
                                    "border: 2px solid rgb(255, 0, 110);"
                                    "border-radius: 5px;"
                                    "margin: 10px;"
                                    "margin-left: 800px;"
                                    "padding : 15px;"
        )

        # vbox.setStyleSheet("background-color: white")

        self.setWindowFlags(Qt.WindowStaysOnTopHint | Qt.FramelessWindowHint)

        # set the vbox layout as the widgets layout
        self.setLayout(vbox)

        # create the video capture thread
        self.thread = VideoThread()
        # connect its signal to the update_image slot
        self.thread.change_pixmap_signal.connect(self.update_image)
        # start the thread
        self.thread.start()
        # self.show()

    def btnPhotoClicked(self):
        global flag_photo
        flag_photo = True
        playsound(projectPath + "sound/shutter.mp3")

    def btnExitClicked(self):
        QCoreApplication.instance().quit
        print("quit")

    def changeImageNext(self):
        global imgIndex
        imgIndex = imgIndex % 5 + 1
        print(imgIndex)

    def changeImagePrev(self):
        global imgIndex
        if imgIndex == 1:
            imgIndex = 5
        else:
            imgIndex = (imgIndex - 1) % 5
        print(imgIndex)

    def center(self):
        # print("center!!!!!!")
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())

    @pyqtSlot(np.ndarray)
    def update_image(self, cv_img):
        """Updates the image_label with a new opencv image"""
        qt_img = self.convert_cv_qt(cv_img)
        self.image_label.setPixmap(qt_img)

    def convert_cv_qt(self, cv_img):
        """Convert from an opencv image to QPixmap"""
        rgb_image = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)
        h, w, ch = rgb_image.shape
        bytes_per_line = ch * w
        convert_to_Qt_format = QtGui.QImage(rgb_image.data, w, h, bytes_per_line, QtGui.QImage.Format_RGB888)
        p = convert_to_Qt_format.scaled(self.disply_width, self.display_height, Qt.KeepAspectRatio)
        return QPixmap.fromImage(p)


if __name__ == "__main__":
    global id, email
    app = QApplication(sys.argv)
    # print("Email : " + sys.argv[2])
    id = sys.argv[1]
    email = sys.argv[2]
    fontDB = QFontDatabase()
    fontDB.addApplicationFont(projectPath + "font/NanumBarunGothic.ttf")
    app.setFont(QFont('NanumBarunGothic'))
    a = App()
    a.show()
    sys.exit(app.exec_())

    print("quit")
