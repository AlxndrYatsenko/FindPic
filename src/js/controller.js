import {
	getImages
} from './services/api';

export default class Controller {
	constructor(model, view) {
		this._model = model;
		this._view = view;

		this._view.refs.form.addEventListener('submit',
			this.handleFormSumit.bind(this));

		this._view.refs.loadMoreBtn.addEventListener('click',
			this.handleLoadMoreClick.bind(this));

		this._view.refs.grid.addEventListener('click',
			this.handleOpenModal.bind(this));

		this._view.refs.closeModalBtn.addEventListener('click',
			this.handleCloseModal.bind(this));
	}

	// modal
	handleOpenModal(evt) {
		const imgUrl = evt.target.getAttribute("src")
		this._view.refs.modalImg.setAttribute("src", imgUrl)

		this._view.refs.backdrop.classList.add('show-modal');
		this._view.refs.backdrop.style.display = "flex"
		window.addEventListener('keydown', this.handleModalEscPress.bind(this));
	}

	handleModalEscPress(evt) {
		const key = evt.code;
		if (key === "Escape") {
			this.handleCloseModal();
		}
	}

	handleCloseModal() {
		this._view.refs.backdrop.classList.remove('show-modal');
		this._view.refs.backdrop.style.display = "none"
		window.removeEventListener('keydown', this.handleModalEscPress.bind(this));
	}

	// submit
	handleFormSumit(e) {
		e.preventDefault();

		this._model.resetCurrentPage();
		this._view.resetPhotosGrid();
		this._model.currentQuery = this._view.refs.input.value;
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});

		this._view.refs.form.reset();
		this._view.showLoadMoreBtn();
	}

	handleFetch(params) {
		this._view.toggleLoader();

		getImages(params).then(photos => {
			const markup = this._view.createGridItems(photos);
			this._view.updatePhotosGrid(markup);
			this._view.toggleLoader();
		});
	}

	handleLoadMoreClick() {
		this._model.incrementCurrentPage();
		this.handleFetch({
			query: this._model.currentQuery,
			page: this._model.currentPage,
		});
	}
}