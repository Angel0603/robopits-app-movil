import React from 'react';
import QuienesSomos from '../QuienesSomos';
import renderer from "react-test-renderer";

describe("QuienesSomos", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<QuienesSomos />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("Renderizado correcto", () => {
    const tree = renderer.create(<QuienesSomos />).toJSON();
  });
});

