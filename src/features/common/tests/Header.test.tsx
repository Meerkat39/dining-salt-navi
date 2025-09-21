import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header", () => {
  it("header要素が描画される", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("サイトタイトルが表示される", () => {
    render(<Header />);
    expect(screen.getByText("外食減塩ナビ")).toBeInTheDocument();
  });

  it("クラス名が正しく付与されている", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("w-full");
    expect(header).toHaveClass("bg-blue-600");
    expect(header).toHaveClass("text-white");
    expect(header).toHaveClass("py-4");
    expect(header).toHaveClass("shadow");
  });
});
