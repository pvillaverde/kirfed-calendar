import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import domtoimage from './domToImage';
import { ItemReorderEventDetail } from '@ionic/core';
import { Storage } from '@ionic/storage';
//import { elementToSVG } from 'dom-to-svg';
/* import domtoimage from 'dom-to-image'; */

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	persoas = [
		'anahanabi',
		'agosreigosa',
		'brais_camposino',
		'armesto3d',
		'adrancinho',
		'inowol',
		'mosynho',
		'galician_gamer',
		'lobeira',
		'farun',
		'sorpresa',
		'lgtb',
		'twitch_en_galego',

		'fedello',
		'kirtash',
		'clankirfed',
	];
	calendario = [
		{
			datetime: 'Sábado 20\n11:30',
			xogo: 'Planet Zoo',
			persoas: ['fedello', 'kirtash'],
		},
		{
			datetime: 'Domingo 21\n21:00',
			xogo: 'Star wars \nJedi Outcast',
			persoas: ['fedello', 'mosynho'],
		},
		{
			datetime: 'Lúns 22\n21:00',
			xogo: 'Planet Zoo',
			persoas: ['fedello', 'kirtash'],
		},
		{
			datetime: 'Martes 23\n21:00',
			xogo: 'Minecraft\n Eiras e Ferrados',
			persoas: ['kirtash'],
		},
		{
			datetime: 'Mércores 24\n21:00',
			xogo: 'Stardew Valley',
			persoas: ['fedello', 'kirtash'],
		},
		{
			datetime: 'Xoves 25\n21:00',
			xogo: 'Star wars \nJedi Outcast',
			persoas: ['fedello'],
		},
		{
			datetime: 'Domingo 28\n22:00',
			xogo: 'Valheim',
			host: 'galician_gamer',
			persoas: ['fedello', 'kirtash', 'inowol', 'galician_gamer'],
		},
	];
	@ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

	constructor(private storage: Storage) {
		this.storage.get('calendario').then((calendario) => (this.calendario = calendario));
	}

	downloadSvg() {
		this.saveCalendario();
		domtoimage.toSvg(document.getElementById('k-programacion')).then((dataUrl) => {
			var link = document.createElement('a');
			link.download = 'HistoriasProgramación.svg';
			link.href = dataUrl;
			link.click();
		});
	}
	downloadPng() {
		this.saveCalendario();
		domtoimage.toPng(document.getElementById('k-programacion')).then((dataUrl) => {
			var link = document.createElement('a');
			link.download = '00_programacion.png';
			link.href = dataUrl;
			link.click();
		});
	}
	preview() {
		this.saveCalendario();
		domtoimage.toSvg(document.getElementById('k-programacion')).then((dataUrl) => {
			var img = new Image();
			img.src = dataUrl;
			document.getElementById('preview').appendChild(img);
		});
	}

	saveCalendario() {
		this.storage.set('calendario', this.calendario);
	}

	doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively
		console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
		this.calendario = ev.detail.complete(this.calendario);

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		ev.detail.complete();
	}
	remove(item) {
		const index = this.calendario.indexOf(item);
		this.calendario.splice(index, 1);
	}
	add() {
		this.calendario.push({
			datetime: null,
			xogo: null,
			host: null,
			persoas: [],
		});
	}
}
