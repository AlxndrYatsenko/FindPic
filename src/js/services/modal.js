const backdrop = {
    currentImage: document.querySelector('.page-modal img'),
    nextImage: "",
    prevImage: "",
    nextImageIndex: "",
    prevImageIndex: "",
    currentImgIndex: 0,

    getNextImage() {
        if (backdrop.currentImgIndex === imagesOnThePage.length - 1) return;


        backdrop.currentImgIndex += 1;
        return backdrop.nextImage = imagesOnThePage[backdrop.currentImgIndex];
    },
    getPrevImage() {
        if (backdrop.currentImgIndex === 0) return;
        backdrop.currentImgIndex -= 1;
        return backdrop.prevImage = imagesOnThePage[backdrop.currentImgIndex];
    }
}

const imagesOnThePage = [];


export const showCurrentImage = (target) => {
    imagesOnThePage.length = 0;

    backdrop.currentImage = target.src;
    document.querySelectorAll('.grid__item img').forEach(img => imagesOnThePage.push(img.src));

    backdrop.currentImgIndex = imagesOnThePage.indexOf(backdrop.currentImage);

    backdrop.getPrevImage();
    backdrop.getNextImage();

    return backdrop.currentImage;

}

export const showPrevImage = () => {
    backdrop.getPrevImage();
    backdrop.currentImage = backdrop.prevImage;
    return backdrop.currentImage;
}

export const showNextImage = () => {
    backdrop.getNextImage();
    backdrop.currentImage = backdrop.nextImage;
    return backdrop.currentImage;
}

export const addToFavorites = () => {

}
export const closeModal = () => {
    backdrop.nextImage = "";
    backdrop.prevImage = "";


}