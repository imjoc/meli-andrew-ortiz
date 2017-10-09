import Service from "./Service";

/***
 * @class handle service calls.
 */
class ItemService extends Service {

	/**
	 * @description Gets category father and daughters.
	 * @param {Object} filters
	 * @return {Array} pathFromRoot
	 */
	parseCategories (filters) {
		let pathFromRoot = [];
		if (filters.length > 0) {
			const categories = filters[0].values[0].path_from_root;

			for (let index in categories) {
				if (categories.hasOwnProperty(index)) {
					pathFromRoot.push(categories[index].name);
				}
			}
		}
		return pathFromRoot;
	}

	/**
	 * @description Gets category path from root.
	 * @param {String} category_id
	 * @return {Array} pathFromRoot
	 */
	async getCategories (category_id) {
		const category = await this.fetch(`categories/${category_id}`),
			data = category.data,
			children = data.path_from_root;
		let pathFromRoot = [];

		if (children.length > 0) {
			for (let index in children) {
				if (children.hasOwnProperty(index)) {
					const row = children[index];
					pathFromRoot.push(row.name);
				}
			}
		}

		return pathFromRoot;
	}

	/**
	 * @description Find article by id.
	 * @param {String} id
	 * @param {String} alternaPath
	 * @return {Promise}
	 */
	async getItemData (id, alternaPath = "") {
		try {
			return await this.fetch(`items/${id}/${alternaPath}`);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * @description Gets items with custom structure.
	 * @param {String} query
	 * @param {Number} limit
	 * @return {Array} results
	 */
	async getItems (query, limit = 4) {
		query = encodeURIComponent(query);
		const response = await this.search(query, limit),
			data = response.data,
			items = data.results;

		let results = {
			author: {
				name: "Andrew",
				last_name: "Ortiz"
			},
			categories: [],
			items: []
		};

		if (items.length > 0) {
			const currency = await this.getCurrency(items[0].currency_id);
			results.categories = this.parseCategories(data.filters);

			for (let index in items) {
				if (items.hasOwnProperty(index)) {
					const item = items[index],
						dataCurrency = currency.data,
						picture = item.thumbnail;

					results.items.push({
						id: item.id,
						title: item.title,
						price: {
							currency: dataCurrency.symbol,
							amount: item.price,
							decimals: dataCurrency.decimal_places
						},
						picture: picture,
						condition: item.condition,
						free_shipping: item.shipping.free_shipping,
						address: {
							state_name: item.address.state_name,
							city_name: item.address.city_name
						}
					});
				}
			}
		}
		return results;
	}

	/**
	 * @description Gets item by id with custom structure object.
	 * @param {Number} id
	 * return {Object}
	 */
	async getItem (id) {
		try {
			const response = await this.getItemData(id),
				item = response.data,
				itemDescription = await this.getItemData(id, "description"),
				currency = await this.getCurrency(item.currency_id),
				dataCurrency = currency.data,
				description = itemDescription.data.plain_text || itemDescription.data.text,
				categories = await this.getCategories(item.category_id);

			return {
				author: {
					name: "Andrew",
					lastname: "Ortiz"
				},
				categories: categories,
				item: {
					id: item.id,
					title: item.title,
					price: {
						currency: dataCurrency.symbol,
						amount: item.price,
						decimals: dataCurrency.decimal_places
					},
					picture: item.pictures[0].url,
					condition: item.condition,
					free_shipping: item.shipping.free_shipping,
					sold_quantity: item.sold_quantity,
					description: description
				}
			};
		} catch (error) {
			throw error;
		}
	}
}

export default new ItemService();