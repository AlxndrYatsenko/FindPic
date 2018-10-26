export default class Model {
	constructor() {
		this.currentQuery = '';
		this.currentPage = 1;
		// console.log(localStorage.getItem('images'))
		this.localImages = JSON.parse(localStorage.getItem('images'));

    if (this.localImages === null || this.localImages.length === 0) {
      this.localImages = []
    }
	}
	
	resetCurrentPage() {
		this.currentPage = 1;
	}
	
	incrementCurrentPage() {
		this.currentPage += 1;
	}

	addToLocalStorage(arr) {
    const jsonObj = JSON.stringify(arr);
    localStorage.setItem(`images`, jsonObj);
  }

	isHasUrl(url, arr) {
    return arr.some(obj => obj.webformatURL === url);
  }
}