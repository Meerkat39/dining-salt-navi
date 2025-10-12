import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("footer要素が描画される", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("ページリンクがすべて表示される", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Release Notes")).toBeInTheDocument();
    expect(screen.getByText("Disclaimer")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
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
