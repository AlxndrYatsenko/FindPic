import * as modal from './services/modal'

export default class Model {
    constructor() {
        this.currentQuery = '';
        this.currentPage = 1;

    }

    resetCurrentPage() {
        this.currentPage = 1;
    }

    incrementCurrentPage() {
        this.currentPage += 1;
    }

    backdropImageInit(selectedImage) {
        return modal.showCurrentImage(selectedImage);
    }
    backdropShowNextImage() {
        return modal.showNextImage();
    }
    backdropShowPrevImage() {
        return modal.showPrevImage();
    }
    backdropCloseModal() {
        return modal.closeModal();
    }
}