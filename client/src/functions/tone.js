import * as Tone from 'tone'

class JamPlayers {
    basePath;
    jamPlayers = [];
    currentlyPlaying = -1;
    pauseTime = -1;
    paused = false;

    constructor(basePath) {
        // await Tone.start();
        // Tone.debug = true;
        this.basePath = basePath;
    }

    async loadJam(jam) {
        return new Promise((resolve) => {
            var urls = jam.recordinginfos.map(x =>
                this.basePath + x.recording_rawrecording.recordingpath);

            var urlObj = {};
            for (let i = 0; i < jam.recordinginfos.length; i++) {
                const element = jam.recordinginfos[i];
                urlObj[element.id] = urls[i];
            }
            var playersObj = new Tone.Players(urlObj, resolve
            )
            var newJamPlayer = {
                id: jam.id,
                recordinginfos: jam.recordinginfos,
                players: playersObj,
            }

            var lastPlayerNodes = [];
            newJamPlayer.recordinginfos.forEach(recordingInfo => {
                var player = newJamPlayer.players.player(recordingInfo.id);
                player.volume.value = recordingInfo.volume;
                const equalizer = new Tone.EQ3(recordingInfo.bass,
                    recordingInfo.middle,
                    recordingInfo.treble);
                const panner = new Tone.Panner(recordingInfo.pan);

                player.connect(equalizer)
                equalizer.connect(panner);

                lastPlayerNodes.push(panner);
            })

            /* TODO
            Currently only one recording info works
            to have multiple they should be connected at the end like so:

            player, EQ3, panner
            * - * - * \
                        * <- output
            * - * - * /

            */
            lastPlayerNodes[0].toDestination();

            this.jamPlayers.push(newJamPlayer);
        });
    }

    play(jamId) {
        this.stopAll();
        var jamPlayer = this.jamPlayers.filter(x => x.id == jamId)[0];
        for (let i = 0; i < jamPlayer.recordinginfos.length; i++) {
            jamPlayer.players.player(jamPlayer.recordinginfos[i].id).start();
        }
        this.currentlyPlaying = jamId;
        this.paused = false;
    }
    pause() {
        var jamPlayer = this.jamPlayers.filter(x => x.id == this.currentlyPlaying)[0];
        jamPlayer.recordinginfos.forEach(x => {
            var player = jamPlayer.players.player(x.id);
            player.stop();
            // THIS IS WRONG
            this.pauseTime = player.now();
        })
        this.paused = true;
    }
    resume() {
        var jamPlayer = this.jamPlayers.filter(x => x.id == this.currentlyPlaying)[0];
        jamPlayer.recordinginfos.forEach(x => {
            var player = jamPlayer.players.player(x.id);
            player.start(this.pauseTime);
            this.pauseTime = -1;
        })
        this.paused = false;
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
}

export default { JamPlayers }