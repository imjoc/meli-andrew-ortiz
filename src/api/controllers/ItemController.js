import ItemService from "../services/ItemService";

/**
 * @class Create endpoint to item.
 */
class ItemController {

	/**
	 * @description Endpoint to search for articles.
	 * @param {Object} req
	 * @param {Object} res
	 * @return {Object.<JSON>}
	 */
	async search (req, res) {
		try {
			if (req.query.q) {
				const results = await ItemService.getItems(req.query.q, 4);
				res.send(results);
			} else {
				res.send(this.errorNoFound(req.path));
			}
		}
		catch (err) {
			res.send(err.data);
		}
	}

	/**
	 * @description Endpoint to show article data and only description.
	 * @param {Object} req
	 * @param {Object} res
	 * @return {Object.<JSON>}
	 */
	async show (req, res) {
		try {
			const id = req.params.id,
				response = await ItemService.getItem(id),
				show = (req.params.description === "description") ? response.item.description : response;
			res.send(show);
		}
		catch (err) {
			res.send(this.errorNoFound(req.path));
		}
	}

	/**
	 * @description Generate response error not found.
	 * @param {String} path
	 * @return {Object.<JSON>}
	 */
	errorNoFound (path) {
		return {
			"message": `Resource ${path} not found`,
			"error": "not_found",
			"status": 404
		};
	}
}

export default new ItemController();