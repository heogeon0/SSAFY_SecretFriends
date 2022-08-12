import sys
import wave
import pyaudio
import requests
import json
import base64
from dataclasses import dataclass, asdict

@dataclass
class StreamParams:
    format: int = pyaudio.paInt16
    channels: int = 2
    rate: int = 44100
    frames_per_buffer: int = 1024
    input: bool = True
    output: bool = False

    def to_dict(self) -> dict:
        return asdict(self)


class Recorder:
    """Recorder uses the blocking I/O facility from pyaudio to record sound
    from mic.
    Attributes:
        - stream_params: StreamParams object with values for pyaudio Stream
            object
    """
    def __init__(self, stream_params: StreamParams) -> None:
        self.stream_params = stream_params
        self._pyaudio = None
        self._stream = None
        self._wav_file = None

    def record(self, duration: int, save_path: str) -> None:
        """Record sound from mic for a given amount of seconds.
        :param duration: Number of seconds we want to record for
        :param save_path: Where to store recording
        """
        # print("Start recording...")
        self._create_recording_resources(save_path)
        self._write_wav_file_reading_from_stream(duration)
        self._close_recording_resources()
        # print("Stop recording")

    def _create_recording_resources(self, save_path: str) -> None:
        self._pyaudio = pyaudio.PyAudio()
        self._stream = self._pyaudio.open(**self.stream_params.to_dict())
        self._create_wav_file(save_path)

    def _create_wav_file(self, save_path: str):
        self._wav_file = wave.open(save_path, "wb")
        self._wav_file.setnchannels(self.stream_params.channels)
        self._wav_file.setsampwidth(self._pyaudio.get_sample_size(self.stream_params.format))
        self._wav_file.setframerate(self.stream_params.rate)

    def _write_wav_file_reading_from_stream(self, duration: int) -> None:
        for _ in range(int(self.stream_params.rate * duration / self.stream_params.frames_per_buffer)):
            audio_data = self._stream.read(self.stream_params.frames_per_buffer)
            self._wav_file.writeframes(audio_data)

    def _close_recording_resources(self) -> None:
        self._wav_file.close()
        self._stream.close()
        self._pyaudio.terminate()

def sound_to_text():
    client_id = "k5i53b455i"
    client_secret = "jFIfChmAa488TljBIQZvXsS5SmRTvVR0Tmo2rk8B"
    lang = "Kor"  # 언어 코드 ( Kor, Jpn, Eng, Chn )
    url = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + lang
    data = open('C:/프로젝트경로/S07P12D208/temp/SERVER/python/STT/audio.wav', 'rb')
    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/octet-stream"
    }
    response = requests.post(url, data=data, headers=headers)
    rescode = response.status_code
    if (rescode == 200):
        json_data = json.loads(response.text)
        # print(json_data["text"])
        result = json_data["text"]
        print(base64.b64encode(result.encode('utf-8')))
        # print(base64.b64encode(json_data["text"].encode('utf-8')))
    else:
        print("Error : " + response.text)

if __name__ == "__main__":
    stream_params = StreamParams()
    recorder = Recorder(stream_params)
    recorder.record(5, "C:/프로젝트경로/S07P12D208/temp/SERVER/python/STT/audio.wav")
    sound_to_text()

