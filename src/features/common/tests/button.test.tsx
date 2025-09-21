import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../components/button";

describe("Button", () => {
  it("variant/sizeごとにclassが正しく付与される", () => {
    render(
      <Button variant="default" size="lg">
        デフォルト
      </Button>
    );
    const btn = screen.getByRole("button", { name: "デフォルト" });
    expect(btn).toHaveClass("bg-primary");
    expect(btn).toHaveClass("h-10");

    render(
      <Button variant="outline" size="sm">
        アウトライン
      </Button>
    );
    const btn2 = screen.getByRole("button", { name: "アウトライン" });
    expect(btn2).toHaveClass("border");
    expect(btn2).toHaveClass("h-8");
  });

  it("disabled時に属性・classが正しく付与される", () => {
    render(<Button disabled>無効</Button>);
    const btn = screen.getByRole("button", { name: "無効" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("disabled:pointer-events-none");
  });

  it("onClickイベントが発火する", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    const btn = screen.getByRole("button", { name: "クリック" });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });

  it("role=button属性が付与される", () => {
    render(<Button>ラベル</Button>);
    const btn = screen.getByRole("button", { name: "ラベル" });
    expect(btn).toHaveAttribute("role", "button");
  });
});
