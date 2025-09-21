import { fireEvent, render, screen } from "@testing-library/react";
import KeywordInput from "../components/KeywordInput";

describe("KeywordInput", () => {
  it("入力値が表示される", () => {
    render(<KeywordInput value="ラーメン" onChange={() => {}} />);
    expect(screen.getByDisplayValue("ラーメン")).toBeInTheDocument();
  });

  it("disabled時は入力不可", () => {
    render(<KeywordInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("onChangeが呼ばれる", () => {
    const handleChange = jest.fn();
    render(<KeywordInput value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "うどん" },
    });
    expect(handleChange).toHaveBeenCalledWith("うどん");
  });
});
