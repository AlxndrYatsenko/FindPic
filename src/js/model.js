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
}