import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import SearchBox from "./index";
configure({ adapter: new Adapter() });

it("renders searchbox correctly", () => {
    const tree = renderer.create(
        <SearchBox submit="https://api.mercadolibre.com" value="Search" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


test("Check render searchbox", function() {
    const component = shallow(
        <SearchBox submit="https://api.mercadolibre.com" value="Search" />
    );
    
    expect(component.text()).toEqual("Buscar");
});
