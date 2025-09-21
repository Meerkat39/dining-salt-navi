import { fireEvent, render, screen } from "@testing-library/react";
import SaltFilter from "../components/SaltFilter";

describe("SaltFilter", () => {
  it("初期値が正しく表示される", () => {
    render(<SaltFilter value={2.5} onChange={() => {}} />);
    const numberInput = screen.getByRole("spinbutton", { name: "塩分量" });
    const rangeInput = screen.getByRole("slider", { name: "塩分量" });
    expect(numberInput).toHaveValue(2.5);
    expect(rangeInput).toHaveValue("2.5");
  });

  it("数値入力欄で値変更→onChangeが呼ばれる", () => {
    const handleChange = jest.fn();
    render(<SaltFilter value={2.5} onChange={handleChange} />);
    const numberInput = screen.getByRole("spinbutton", { name: "塩分量" });
    fireEvent.change(numberInput, { target: { value: "3.1" } });
    expect(handleChange).toHaveBeenCalledWith(3.1);
  });

  it("スライダーで値変更→onChangeが呼ばれる", () => {
    const handleChange = jest.fn();
    render(<SaltFilter value={2.5} onChange={handleChange} />);
    const rangeInput = screen.getByRole("slider", { name: "塩分量" });
    fireEvent.change(rangeInput, { target: { value: "4.2" } });
    expect(handleChange).toHaveBeenCalledWith(4.2);
  });

  it("min/max/step/disabledが正しく反映される", () => {
    render(
      <SaltFilter
        value={1}
        onChange={() => {}}
        min={1}
        max={5}
        step={0.5}
        disabled
      />
    );
    const numberInput = screen.getByRole("spinbutton", { name: "塩分量" });
    const rangeInput = screen.getByRole("slider", { name: "塩分量" });
    expect(numberInput).toHaveAttribute("min", "1");
    expect(numberInput).toHaveAttribute("max", "5");
    expect(numberInput).toHaveAttribute("step", "0.5");
    expect(numberInput).toBeDisabled();
    expect(rangeInput).toHaveAttribute("min", "1");
    expect(rangeInput).toHaveAttribute("max", "5");
    expect(rangeInput).toHaveAttribute("step", "0.5");
    expect(rangeInput).toBeDisabled();
  });

  it("ラベル・単位表示が正しい", () => {
    render(<SaltFilter value={2} onChange={() => {}} />);
    expect(screen.getByText("塩分量（g）")).toBeInTheDocument();
    expect(screen.getByText("g")).toBeInTheDocument();
  });
});
