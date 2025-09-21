import { fireEvent, render, screen } from "@testing-library/react";
import AddressInput from "../components/AddressInput";

describe("AddressInput", () => {
  it("入力値が表示される", () => {
    render(<AddressInput value="渋谷" onChange={() => {}} />);
    expect(screen.getByDisplayValue("渋谷")).toBeInTheDocument();
  });

  it("disabled時は入力不可", () => {
    render(<AddressInput value="" onChange={() => {}} disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("onChangeが呼ばれる", () => {
    const handleChange = jest.fn();
    render(<AddressInput value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "新宿" },
    });
    expect(handleChange).toHaveBeenCalledWith("新宿");
  });
});
