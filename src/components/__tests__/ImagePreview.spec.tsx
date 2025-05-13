 
import React from "react";
import { render } from "@testing-library/react-native";
import ImagePreview from "../ImagePreview";   

describe("ImagePreview Component", () => {
  it("should render an image when a URI is provided", () => {
    const uri = "https://example.com/image.jpg"; 
    const { getByTestId } = render(<ImagePreview uri={uri} />); 
    const image = getByTestId("image-preview");
    expect(image.props.source.uri).toBe(uri);
  });

  it("should not render anything when no URI is provided", () => {
    const { queryByTestId } = render(<ImagePreview uri={undefined} />); 
    expect(queryByTestId("image-preview")).toBeNull();
  });
});
