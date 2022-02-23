import * as Tone from 'tone'
import { Clock } from 'tone'

class JamPlayers {
    basePath;
    jamPlayers = [];
    currentlyPlaying = -1;
    pauseTime = -1;
    paused = false;

    constructor(basePath) {
        this.basePath = basePath;
    }

    async loadJam(jam) {
        return new Promise((resolve) => {
            var audios = jam.recordinginfos.map(x => {
                if (x.recording_rawrecording.recordingpath)
                    return this.basePath + x.recording_rawrecording.recordingpath
                if (x.recording_rawrecording.buffer)
                    return x.recording_rawrecording.buffer
                throw "No Raw Recording as URL or Buffer found.";
            }
            );

            var urlObj = {};
            for (let i = 0; i < jam.recordinginfos.length; i++) {
                const element = jam.recordinginfos[i];
                urlObj[element.id] = audios[i];
            }
            var playersObj = new Tone.Players(urlObj, resolve
            )

            var newJamPlayer = {
                id: jam.id,
                recordinginfos: jam.recordinginfos,
                players: playersObj,
                clock: new Clock(),
                playing: false
            }
            this.jamPlayers.push(newJamPlayer);

            this.setSettings(jam.id)

            // setTimeout(resolve, 5000);
            resolve();
        });
    }

    playOrPause(jamId) {
        this.stopAll();
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];

        if (jamPlayer.clock.seconds > this.getDuration(jamId)) {
            jamPlayer.playing = false;
            jamPlayer.clock.stop();
            jamPlayer.clock.seconds = 0;
        }
        if (jamPlayer.playing) {
            jamPlayer.recordinginfos.forEach(x => {
                var player = jamPlayer.players.player(x.id);
                jamPlayer.clock.pause();
                player.stop();
            })
        }
        else {
            this.stopAll();
            for (let i = 0; i < jamPlayer.recordinginfos.length; i++) {
                const player = jamPlayer.players.player(jamPlayer.recordinginfos[i].id)
                player.start(null, jamPlayer.clock.seconds);
                jamPlayer.clock.start();
            }
            this.currentlyPlaying = jamId;
            this.paused = false;
        }
        jamPlayer.playing = !jamPlayer.playing;
    }

    stopAll() {
        this.currentlyPlaying = -1;
        this.jamPlayers.forEach(jamPlayer => {
            jamPlayer.recordinginfos.forEach(recordingInfo => {
                jamPlayer.players.player(recordingInfo.id).stop();
            });
        })
        this.paused = false;
    }
    getDuration(jamId) {
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];
        const someId = jamPlayer.recordinginfos[0].id;
        return jamPlayer.players.player(someId).buffer.duration;
    }
    setTime(jamId, seconds) {
        this.stopAll();
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];
        // const offset = seconds - jamPlayer.clock.seconds;
        jamPlayer.recordinginfos.forEach(recordingInfo => {
            // jamPlayer.players.player(recordingInfo.id).seek(-1);
            jamPlayer.players.player(recordingInfo.id).start(null, seconds)
        });
        jamPlayer.clock.seconds = seconds;
    }
    getPosition(jamId) {
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];
        return jamPlayer.clock.seconds;
    }

    setSettings(jamId, recordingInfos = null) {
        console.log(recordingInfos)
        var lastPlayerNodes = [];
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];


        if (recordingInfos != null)
            jamPlayer.recordinginfos = recordingInfos;

        jamPlayer.recordinginfos.forEach(recordingInfo => {
            var player = jamPlayer.players.player(recordingInfo.id);
            player.volume.value = recordingInfo.volume;
            const equalizer = new Tone.EQ3(recordingInfo.bass,
                recordingInfo.middle,
                recordingInfo.treble);
            const panner = new Tone.Panner(recordingInfo.pan).toDestination();

            player.connect(equalizer)
            equalizer.connect(panner);

            lastPlayerNodes.push(panner);
        })

        // const outputNode = new Tone.Merge().toDestination();
        // lastPlayerNodes.forEach((x) => x.connect(outputNode));
        // TODO: Pan not working with merge. what other solution?
    }
}

export default { JamPlayers }