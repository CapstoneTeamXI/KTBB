import Phaser from 'phaser'


import WebFontFile from './WebFontFile'
import * as AudioKeys from '../consts/AudioKeys'

export class Preload extends Phaser.Scene
{
	preload()
	{
		const fonts = new WebFontFile(this.load, 'Press Start 2P')
		this.load.addFile(fonts)

		this.load.audio("Pong", ["audio/loading-title/beep.wav"])
	}

	create()
	{
		this.scene.start("title-screen")
	}
}