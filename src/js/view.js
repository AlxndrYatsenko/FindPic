import gridItemTpl from '../templates/gallery-template.hbs';

export default class View {
	constructor() {
		this.refs = {};
		this.refs.grid = document.querySelector('.grid');
		this.refs.form = document.querySelector('.form');
		this.refs.input = document.querySelector('.input-js');
		this.refs.loader = document.querySelector('.loader-overlay');
		this.refs.loadMoreBtn = document.querySelector('.load-more');
	}

	showLoadMoreBtn() {
		if (!this.refs.loadMoreBtn.classList.contains('visible')) {
			this.refs.loadMoreBtn.classList.add('visible');
		}
	}

	createGridItems(items) {
		return items.reduce((markup, item) => markup + gridItemTpl(item), '');
	}

	updatePhotosGrid(markup) {
		this.refs.grid.insertAdjacentHTML('beforeend', markup);
	}

	resetPhotosGrid() {
		this.refs.grid.innerHTML = '';
	}

	toggleLoader() {
		return this.refs.loader.classList.toggle('show-loader');
	}
}