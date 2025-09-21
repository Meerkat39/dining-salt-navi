import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("footer要素が描画される", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("著作権表示が正しく表示される", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${year} 外食減塩ナビ`))
    ).toBeInTheDocument();
  });

  it("クラス名が正しく付与されている", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("w-full");
    expect(footer).toHaveClass("bg-gray-100");
    expect(footer).toHaveClass("text-gray-600");
    expect(footer).toHaveClass("py-4");
    expect(footer).toHaveClass("mt-8");
    expect(footer).toHaveClass("border-t");
  });
});
