record.py 실행 시
1. line:72, 92 => 프로젝트 경로 변경
2. pip install wave
3. pip install pyauido

localhost:8000/stt 실행 후 5초동안 음성 녹음 -> STT 반환 후 결과 리턴
{ "result" : "STT 결과"}

현재는 5초동안 녹음하며, 최대 60초까지 STT 변환 가능 
line:92 => 녹음 시간 변경 가능