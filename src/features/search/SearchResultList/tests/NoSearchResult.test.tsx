import { render, screen } from "@testing-library/react";
import NoSearchResult from "../components/NoSearchResult";

describe("NoSearchResult", () => {
  it("0件時のメッセージが表示される", () => {
    render(<NoSearchResult />);
    expect(screen.getByText(/検索結果がありません/)).toBeInTheDocument();
  });
});
