var waveform = "sine"
document.addEventListener("DOMContentLoaded", function(event) {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const keyboardFrequencyMap = {
        '90': 261.625565300598634,  //Z - C
        '83': 277.182630976872096, //S - C#
        '88': 293.664767917407560,  //X - D
        '68': 311.126983722080910, //D - D#
        '67': 329.627556912869929,  //C - E
        '86': 349.228231433003884,  //V - F
        '71': 369.994422711634398, //G - F#
        '66': 391.995435981749294,  //B - G
        '72': 415.304697579945138, //H - G#
        '78': 440.000000000000000,  //N - A
        '74': 466.163761518089916, //J - A#
        '77': 493.883301256124111,  //M - B
        '81': 523.251130601197269,  //Q - C
        '50': 554.365261953744192, //2 - C#
        '87': 587.329535834815120,  //W - D
        '51': 622.253967444161821, //3 - D#
        '69': 659.255113825739859,  //E - E
        '82': 698.456462866007768,  //R - F
        '53': 739.988845423268797, //5 - F#
        '84': 783.990871963498588,  //T - G
        '54': 830.609395159890277, //6 - G#
        '89': 880.000000000000000,  //Y - A
        '55': 932.327523036179832, //7 - A#
        '85': 987.766602512248223,  //U - B
    }

    let add_on = "off";
    let add_values = document.getElementById("additive").additive;
    for (let i = 0; i < add_values.length; i++) {
        add_values[i].onclick = function() {
        add_on = this.value;
      };
    }

    let am_on = "off";
    let am_values = document.getElementById("am").am;
    for (let i = 0; i < am_values.length; i++) {
        am_values[i].onclick = function() {
        am_on = this.value;
      };
    }

    let fm_on = "off";
    let fm_values = document.getElementById("fm").fm;
    for (let i = 0; i < fm_values.length; i++) {
        fm_values[i].onclick = function() {
        fm_on = this.value;
      };
    }

    let lfo_on = "off";
    let lfo_values = document.getElementById("lfo").lfo;
    for (let i = 0; i < lfo_values.length; i++) {
        lfo_values[i].onclick = function() {
            lfo_on = this.value;
      };
    }

    const globalGain = audioCtx.createGain();
    globalGain.connect(audioCtx.destination);

    var compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
    //Yes, I am using a compressor node. However, we were only explicitely banned from using it for Lab 1. Not Lab 2.
    //For some reason, manually setting the value at time causes clicking for me.
    
    const sawButton = document.getElementById("sawtooth");
    const sineButton = document.getElementById("sine");
    const extraButton = document.getElementById("?");

    var crazy

    sineButton.addEventListener('click', function(){
        waveform = "sine";
        crazy = 0;
    });

    sawButton.addEventListener('click', function(){
        waveform = "sawtooth";
        crazy = 0;
    });

    extraButton.addEventListener('click', function(){
        crazy = 1;
    });
 

    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false);

    activeOscillators = {}
    activeGains = {}

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function playCrazy() {
        let arr = [];

        for (var freq in keyboardFrequencyMap) {
            arr.push(freq)
        }

        shuffle(arr)
        let slicedArray = arr.slice(0, 1);
        slicedArray.forEach(function (item, index) {
            playNote(item, numPartials, distPartials, modFreqAM, modFreqFM, lfoFreq)
        });
        slicedArray.forEach(function (item, index) {
            for (const node of activeGains[item]) {
                node.gain.cancelScheduledValues(audioCtx.currentTime)
                node.gain.setValueAtTime(node.gain.value, audioCtx.currentTime)
                node.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + 0.3);
            }
            for (const osc of activeOscillators[item]) {
                osc.stop( audioCtx.currentTime+0.3);
            }
            delete activeOscillators[item];
            delete activeGains[item];
        });
    }

    function keyDown(event) {
        const key = (event.detail || event.which).toString();

        if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
            if(crazy === 1) {
                if (add_on === "on") {
                    numPartials = document.getElementById("numP").value;
                    distPartials = document.getElementById("distP").value;
                } else {
                    numPartials = 1;
                    distPartials = 0;
                }
                if (am_on === "on") {
                    modFreqAM = document.getElementById("amF").value;
                } else {
                    modFreqAM = 0;
                }
                if (fm_on === "on") {
                    modFreqFM = document.getElementById("fmF").value;
                } else {
                    modFreqFM = 0;
                }
                if (lfo_on === "on") {
                    lfoFreq = document.getElementById("lfoF").value;
                } else {
                    lfoFreq = 0;
                }
                playCrazy();
                } else {
                if (add_on === "on") {
                    numPartials = document.getElementById("numP").value;
                    distPartials = document.getElementById("distP").value;
                } else {
                    numPartials = 1;
                    distPartials = 0;
                }
                if (am_on === "on") {
                    modFreqAM = document.getElementById("amF").value;
                } else {
                    modFreqAM = 0;
                }
                if (fm_on === "on") {
                    modFreqFM = document.getElementById("fmF").value;
                } else {
                    modFreqFM = 0;
                }
                if (lfo_on === "on") {
                    lfoFreq = document.getElementById("lfoF").value;
                } else {
                    lfoFreq = 0;
                }
                playNote(key, numPartials, distPartials, modFreqAM, modFreqFM, lfoFreq);
            }
        }
    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
            for (const node of activeGains[key]) {
                node.gain.cancelScheduledValues(audioCtx.currentTime)
                node.gain.setValueAtTime(node.gain.value, audioCtx.currentTime)
                node.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + 0.3);
            }

            for (const osc of activeOscillators[key]) {
                osc.stop( audioCtx.currentTime+0.3);
            }

            delete activeOscillators[key];
            delete activeGains[key];
        }
    }

    function playNote(key, numPartials, distPartials, modFreqAM, modFreqFM, lfoFreq) {
        activeOscillators[key] = [];
        activeGains[key] = [];

        amMod = audioCtx.createOscillator();
        amMod.frequency.value = modFreqAM
        activeOscillators[key].push(amMod)

        fmMod = audioCtx.createOscillator();
        fmMod.frequency.value = modFreqFM
        activeOscillators[key].push(fmMod)

        lfo = audioCtx.createOscillator();
        lfo.frequency.value = lfoFreq;
        activeOscillators[key].push(lfo)

        for(var i = 0; i < numPartials; i++){
            const osc = audioCtx.createOscillator();
            osc.frequency.setValueAtTime(keyboardFrequencyMap[key] + i*distPartials, audioCtx.currentTime);
            osc.type = waveform;
            activeOscillators[key].push(osc);
        }
        
        const modulated = audioCtx.createGain();
        const depth = audioCtx.createGain();
        depth.gain.value = 0.5
        modulated.gain.value = 1.0 - depth.gain.value;
        amMod.connect(depth).connect(modulated.gain)

        const modulationIndex = audioCtx.createGain();
        modulationIndex.gain.value = 100;
        fmMod.connect(modulationIndex);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.setTargetAtTime(0.7, audioCtx.currentTime, 0.15);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);

        for (const osc of activeOscillators[key]) {
            osc.connect(modulated)
            modulationIndex.connect(osc.frequency)
            osc.start();
        }
        modulated.connect(gainNode).connect(compressor).connect(globalGain);

        activeGains[key].push(gainNode);
        activeGains[key].push(modulated);
        activeGains[key].push(depth);
    }
});