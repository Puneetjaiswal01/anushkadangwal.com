"""Original instrumental composition; no sampled recordings or borrowed melody."""
import numpy as np
import wave
from pathlib import Path
rate=32000
beat=60/64
bars=24
duration=bars*4*beat+5
audio=np.zeros(int(duration*rate),dtype=np.float64)
rng=np.random.default_rng(21)
def note(midi,start,length,gain=.15):
    freq=440*2**((midi-69)/12)
    t=np.arange(int(length*rate))/rate
    # A rounded struck-string tone, followed by a long, gentle decay.
    envelope=(1-np.exp(-t*35))*np.exp(-t/1.6)*np.minimum(1,np.maximum(0,(length-t)/.6))
    tone=np.sin(2*np.pi*freq*t)+.23*np.sin(2*np.pi*2*freq*t)*np.exp(-t*1.8)+.07*np.sin(2*np.pi*3*freq*t)*np.exp(-t*3)
    y=tone*envelope*gain
    begin=int(start*rate);end=min(len(audio),begin+len(y));audio[begin:end]+=y[:end-begin]
# Dmaj7, Aadd9, Bm7, Gmaj7. The melody and arrangement are authored here.
chords=[[50,57,61,66],[45,52,59,64],[47,54,57,62],[43,50,54,59]]
melody=[[74,None,73,69,66,None,69,73],[76,None,74,73,71,None,69,None],[74,None,78,76,74,None,73,69],[71,None,69,66,67,None,69,None],
        [78,None,76,74,73,None,69,None],[76,None,73,71,69,None,64,69],[74,None,73,69,66,None,62,None],[71,None,69,67,66,None,62,None]]
for bar in range(bars):
    start=bar*4*beat+1
    chord=chords[bar%4]
    for step,idx in enumerate([0,1,2,3,1,2,3,2]):
        note(chord[idx]+(12 if step>0 else 0),start+step*.5*beat,3.8,.075 if step else .10)
    phrase=melody[bar%len(melody)]
    for step,pitch in enumerate(phrase):
        if pitch is not None:note(pitch,start+step*.5*beat,3.5,.09 if bar<4 else .12)
# Sparse, quiet echoes create space without abrupt transients.
dry=audio.copy()
for sec,gain in [(.19,.10),(.41,.065),(.79,.04)]:
    shift=int(sec*rate);audio[shift:]+=dry[:-shift]*gain
fade_in=np.minimum(1,np.arange(len(audio))/(rate*3));fade_out=np.minimum(1,np.arange(len(audio))[::-1]/(rate*6))
audio*=fade_in*fade_out
audio*=.72/max(1,np.max(np.abs(audio)))
output=Path('/tmp/anushka-original-lullaby.wav')
with wave.open(str(output),'wb') as wav:
    wav.setnchannels(1);wav.setsampwidth(2);wav.setframerate(rate);wav.writeframes((audio*32767).astype('<i2').tobytes())
print(f'{duration:.1f} seconds; peak {np.max(np.abs(audio)):.3f}; {output}')
