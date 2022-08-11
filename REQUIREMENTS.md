### REQUIREMENTS

#### 1. Node & React

1. Node.js

```bash
apt list | grep nodejs // 노드 버전확인
sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash // 저장소를 최신버전으로 변경(16버전)
sudo apt-get install nodejs

```

2. react

```bash
npm install @react-three/fiber  // react three js
npm install @react-three/drei // 마우스 추적
npm install"@react-three/cannon" // 물리효과

npm install 'recoil'
npm install 'styled-components'
npm install 'axios'

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p // 리액트 오류 해결코드
```

3. express

```bash
npm install express
npm install cors
```



#### 2. 사진촬영

#### 3. 얼굴인식

1. 얼굴인식

```bash
python -m pip install opencv-python
python -m pip install opencv-contrib-python
python -m pip install dlib
python -m pip install face_recognition
```

2. Firebase 연동

```bash
python -m pip install pyrebase4
```

#### 4. TTS
```bash
pip install playsound==1.2.2
```