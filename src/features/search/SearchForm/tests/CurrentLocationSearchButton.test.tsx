import { fireEvent, render, screen } from "@testing-library/react";
import CurrentLocationSearchButton from "../components/CurrentLocationSearchButton";

describe("CurrentLocationSearchButton", () => {
  it("checked=trueでvariant=default/ON表示", () => {
    render(<CurrentLocationSearchButton checked={true} onChange={() => {}} />);
    const btn = screen.getByRole("button", { name: /現在地から検索/ });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveClass("w-full");
    expect(screen.getByText("ON")).toBeInTheDocument();
  });

  it("checked=falseでvariant=outline/ON非表示", () => {
    render(<CurrentLocationSearchButton checked={false} onChange={() => {}} />);
    const btn = screen.getByRole("button", { name: /現在地から検索/ });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    expect(btn).toHaveClass("w-full");
    expect(screen.queryByText("ON")).not.toBeInTheDocument();
  });

  it("ボタン押下でonChangeが呼ばれchecked値が反転する", () => {
    const handleChange = jest.fn();
    render(
      <CurrentLocationSearchButton checked={false} onChange={handleChange} />
    );
    const btn = screen.getByRole("button", { name: /現在地から検索/ });
    fireEvent.click(btn);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("アイコン・ラベル表示が正しい", () => {
    render(<CurrentLocationSearchButton checked={false} onChange={() => {}} />);
    expect(screen.getByRole("img", { name: "現在地" })).toBeInTheDocument();
    expect(screen.getByText("現在地から検索")).toBeInTheDocument();
  });
});
