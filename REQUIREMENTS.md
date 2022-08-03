###  REQUIREMENTS

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

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p // 리액트 오류 해결코드
```



#### 2. 사진촬영

#### 3. 얼굴인식

