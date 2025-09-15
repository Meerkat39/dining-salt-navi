import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "../components/SearchForm";

describe("SearchForm", () => {
  it("初期表示で住所入力・検索ボタン・現在地トグル・塩分フィルタが表示される", () => {
    render(<SearchForm />);
    // 住所入力欄
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // 検索ボタン（完全一致ラベルで一意に取得）
    expect(screen.getByRole("button", { name: /^検索$/ })).toBeInTheDocument();
    // 現在地トグル（ラベルで判定）
    expect(
      screen.getByLabelText(/現在地|位置情報|現在地から検索/i)
    ).toBeInTheDocument();
    // 塩分量フィルタ（スライダーやspinbox想定）
    expect(
      screen.getByRole("spinbutton") || screen.getByRole("slider")
    ).toBeTruthy();
  });

  it("現在地トグルONで住所入力が無効化される", () => {
    render(<SearchForm />);
    const toggle = screen.getByLabelText(/現在地|位置情報|現在地から検索/i);
    fireEvent.click(toggle);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("住所入力が可能で値が反映される", () => {
    render(<SearchForm />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "新宿" } });
    expect(input).toHaveValue("新宿");
  });
});
