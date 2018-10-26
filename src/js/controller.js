import {
    getImages
} from './services/api';

export default class Controller {

	constructor(model, view) {
		this._model = model;
		this._view = view;
		this.images = this._model.localImages;

		this._view.refs.form.addEventListener('submit',
			this.handleFormSumit.bind(this));

		this._view.refs.loadMoreBtn.addEventListener('click',
			this.handleLoadMoreClick.bind(this));

		this._view.refs.grid.addEventListener('click',
			this.handleOpenModal.bind(this));
    
    this._view.refs.modalPage.addEventListener('click',
            this.handleModalControls.bind(this));

		this._view.refs.closeModalBtn.addEventListener('click',
			this.handleCloseModal.bind(this));

		this._view.refs.favoriteModalBtn.addEventListener('click',
			this.handleFavoriteBtn.bind(this));

		this._view.refs.showFavorite.addEventListener('click',
			this.handleShowFavorite.bind(this));

		this.init();
	}

	init() {
		this._model.addToLocalStorage(this.images)
	}


	//favorite
	handleShowFavorite(){

		this._view.refs.grid.textContent = '';
		const markup = this._view.createGridItems(this.images);
		this._view.updatePhotosGrid(markup);
	}

	// modal
	handleFavoriteBtn(evt) {

		const parrent = evt.target.closest(".page-modal")
		const img = parrent.querySelector(".page-modal__img")
		const imgUrl = img.getAttribute("src")
		if(this._model.isHasUrl(imgUrl, this.images)) return
		const obj = {
			webformatURL: imgUrl
		}
		this.images.push(obj)
		console.log(this.images)
		this._model.addToLocalStorage(this.images)
	}

	handleOpenModal(evt) {
		const imgUrl = evt.target.getAttribute("src")

		if(this._model.isHasUrl(imgUrl, this.images)){
			console.log('qqqqqqqqqqqqq')
			this._view.refs.favoriteModalBtn.style.color = "red"
		}

		this._view.refs.modalImg.setAttribute("src", imgUrl)
		this._view.refs.backdrop.classList.add('show-modal');
		this._view.refs.backdrop.style.display = "flex"
		window.addEventListener('keydown', this.handleModalEscPress.bind(this));
		
		
		// const isHas = 
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

//controll
handleModalControls() {

        const target = event.target;

        if (target.nodeName !== "BUTTON") return;

        const action = target.dataset.action;

        switch (action) {
            case 'next':
                this._view.refs.modalImg.src = this._model.backdropShowNextImage();
                break;

            case 'prev':
                this._view.refs.modalImg.src = this._model.backdropShowPrevImage();
                break;

            case 'favorite':

                break;

            case 'close-modal':
                this._view.refs.backdrop.classList.remove('show-modal');
                this._view.refs.backdrop.style.display = "none"
                window.removeEventListener('keydown', this.handleModalEscPress.bind(this));
                this._model.backdropCloseModal();
                break;
        }
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