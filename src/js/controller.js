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
        this._view.refs.modalPage.addEventListener('click',
            this.handleModalControls.bind(this));

        // this._view.refs.closeModalBtn.addEventListener('click',
        // this.handleCloseModal.bind(this));
    }

    // modal
    handleOpenModal() {
        const target = event.target;
        if (target.nodeName !== "IMG") return;

        this._view.refs.backdrop.classList.add('show-modal');
        this._view.refs.backdrop.style.display = "flex";

        this._view.refs.modalImg.src = this._model.backdropImageInit(target);


        window.addEventListener('keydown', this.handleModalEscPress.bind(this));
    }

    handleModalEscPress(evt) {
        // console.log(this)
        const key = evt.code;
        if (key === "Escape") {
            // console.log(this)
            this.handleCloseModal();
        }
    }

    handleCloseModal() {
        this._view.refs.backdrop.classList.remove('show-modal');
        this._view.refs.backdrop.style.display = "none"
        window.removeEventListener('keydown', this.handleModalEscPress.bind(this));
    }

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