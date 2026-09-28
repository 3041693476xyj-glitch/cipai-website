/* >>> file: src/js/00-music-core.js */
/* ============================================================
   0. 音乐基础工具
   ============================================================ */
const PC = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const BLACK = [1,3,6,8,10];
const mod = n => ((n % 12) + 12) % 12;
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const isBlack = m => BLACK.indexOf(mod(m)) !== -1;
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

const CHORD_TONES = {
  maj:[0,4,7], min:[0,3,7], dim:[0,3,6], aug:[0,4,8], sus4:[0,5,7],
  maj7:[0,4,7,11], min7:[0,3,7,10], dom7:[0,4,7,10], m7b5:[0,3,6,10]
};
const CHORD_SUF = {maj:'',min:'m',dim:'dim',aug:'aug',sus4:'sus4',maj7:'maj7',min7:'m7',dom7:'7',m7b5:'m7b5'};
const chordLabel = (pc, type) => PC[mod(pc)] + CHORD_SUF[type];
const chordTones = (rootMidi, type) => CHORD_TONES[type].map(iv => rootMidi + iv);

const DIATONIC = {
  major:[{deg:0,type:'maj',roman:'I'},{deg:2,type:'min',roman:'ii'},{deg:4,type:'min',roman:'iii'},
         {deg:5,type:'maj',roman:'IV'},{deg:7,type:'maj',roman:'V'},{deg:7,type:'dom7',roman:'V7'},
         {deg:9,type:'min',roman:'vi'}],
  minor:[{deg:0,type:'min',roman:'i'},{deg:3,type:'maj',roman:'III'},{deg:5,type:'min',roman:'iv'},
         {deg:7,type:'maj',roman:'V'},{deg:7,type:'min',roman:'v'},{deg:8,type:'maj',roman:'VI'},
         {deg:10,type:'maj',roman:'VII'}]
};
const TRANS = {
  major:{
    I:{IV:1.7,V:1.2,vi:0.4,ii:0.5,iii:0.2,V7:1.3}, ii:{V:3.3,V7:3.5,I:0.3,vi:0.3,IV:0.1,iii:0.2},
    iii:{vi:2.6,IV:0.4,ii:0.4,I:0.4,V:0.3}, IV:{V:0.8,V7:0.8,ii:0.6,I:1.4,vi:0.3,iii:0.2},
    V:{I:2.6,vi:0.3,IV:0.2,ii:0.7,iii:0.3}, V7:{I:2.8,vi:0.3,IV:0.2},
    vi:{ii:2.9,IV:0.2,V:0.4,iii:0.3,I:0.3}
  },
  minor:{
    i:{iv:1.0,V:0.7,VI:0.2,VII:0.3,III:0.2,v:0.4}, III:{VI:0.5,VII:0.6,iv:1.0,i:0.6},
    iv:{V:0.8,i:0.7,VII:1.2,VI:0.1}, V:{i:1.5,VI:0.3,iv:0.3}, v:{i:1.0,VI:0.3,VII:0.4},
    VI:{VII:0.6,iv:0.8,V:0.2,i:0.9,III:0.7}, VII:{i:0.8,III:1.1,VI:0.1}
  }
};
