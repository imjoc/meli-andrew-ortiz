import axios from "axios";
import config from "../../config";

class Service {
	/**
	 * @description Gets content to the requested free market url.
	 * @param {String} path
	 * @return {Promise}
	 */
	async fetch (path) {
		return await axios.get(`${config.api}/${path}`)
			.then(function (response) { return response; })
			.catch(function (error) { throw error; });
	}

	/**
	 * @description Find article by a word and with a default limit of 4.
	 * @param {String} query
	 * @param {Number} limit
	 * @param {Number} offset
	 * @return {Promise}
	 */
	async search (query, limit = 4, offset = 0) {
		return await this.fetch(`sites/MLA/search?q=${query}&offset=${offset}&limit=${limit}`);
	}

	/**
	 * @description Find articles by id.
	 * @param {Array} ids
	 * @return {Promise}
	 */
	async getArticles (ids) {
		return await this.fetch(`items?ids=${ids}`);
	}



	/**
	 * @description Find currencies by id.
	 * @param {String} id
	 * @return {Promise}
	 */
	async getCurrency (id) {
		return await this.fetch(`/currencies/${id}`);
	}

	/**
	 * @description Gets category by id.
	 * @param {String} category_id
	 * @return {Promise}
	 */
	async getCategory (category_id) {
		return await this.fetch(`categories/${category_id}`);
	}
}

export default Service;