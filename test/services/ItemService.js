require("babel-polyfill");
import ItemService from "../../src/api/services/ItemService";

const chai = require("chai"),
	chaiHttp = require("chai-http"),
	expect = chai.expect;

chai.use(chaiHttp);

describe("ItemService", function () {

	it("test search method", function () {
		return ItemService.search("zapatos", 4)
			.then(function (response) {
				expect(response).to.have.status(200);;
			});
	});

	it("test getCurrency method", function () {
		return ItemService.getCurrency("ARS")
			.then(function (response) {
				expect(response).to.have.status(200);
			});
	});

	it("test getCategory method", function () {
		return ItemService.getCategory("MLA1953")
			.then(function (response) {
				expect(response).to.have.status(200);
			});
	});

	it("test getCategories method", function () {
		return ItemService.getCategories("MLA1953")
			.then(function (response) {
				const length = (response.length > 0);
				expect(true).to.equal(length);
			});
	});

	it("test getItemData method", function () {
		return ItemService.getItemData("MLA663831439")
			.then(function (response) {
				expect(response).to.have.status(200);
			});
	});

	it("test getItemData gets description method", function () {
		return ItemService.getItemData("MLA663831439", "description")
			.then(function (response) {
				const typeData = (typeof response.data.plain_text === "string");
				expect(true).to.equal(typeData); // we verify that we obtain description successfully
			});
	});

	it("test end point show item_data not found results", function () {
		return ItemService.getItem(1)
			.catch(function (error) {
				expect(error.response.data).to.deep.equal(
					{
						message: "Item with id 1 not found.",
						error: "not_found",
						status: 404,
						cause: []
					});
			});
	});
});