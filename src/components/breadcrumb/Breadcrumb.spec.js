import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import Breadcrumb from "./index";
configure({ adapter: new Adapter() });

const categories = ["Tecnelogias", "Macbook"];

it("renders Breadcumb component correctly", function() {
    const tree = renderer.create(
        <Breadcrumb data={categories}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


test("Check render categories in Breadcrumb", function() {
    const component = shallow(
        <Breadcrumb data={categories}/>
    );

    expect(component.text()).toEqual("TecnelogiasMacbook");
});
