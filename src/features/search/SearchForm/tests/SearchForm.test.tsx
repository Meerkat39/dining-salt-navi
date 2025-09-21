import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import SearchForm from "../components/SearchForm";
window.alert = jest.fn();

describe("SearchForm", () => {
  const defaultProps = {
    keyword: "",
    setKeyword: jest.fn(),
    useCurrentLocation: false,
    setUseCurrentLocation: jest.fn(),
    saltValue: 5,
    setSaltValue: jest.fn(),
    onSubmit: jest.fn(),
  };

  it("初期表示でキーワード入力欄・検索ボタン・現在地トグル・塩分量フィルタが表示される", () => {
    render(<SearchForm {...defaultProps} />);
    // キーワード入力欄（KeywordInputコンポーネント）
    expect(
      screen.getByPlaceholderText("エリア名・地名・駅名など")
    ).toBeInTheDocument();
    // 検索ボタン（ラベル完全一致）
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
    // 現在地トグル（ボタンラベルで取得）
    expect(
      screen.getByRole("button", { name: /現在地から検索/ })
    ).toBeInTheDocument();
    // 塩分量フィルタ（SaltFilter: spinbuttonで取得）
    expect(
      screen.getByRole("spinbutton", { name: /塩分量/ })
    ).toBeInTheDocument();
    // 塩分量スライダー（sliderで取得）
    expect(screen.getByRole("slider", { name: /塩分量/ })).toBeInTheDocument();
  });

  it("現在地トグルONでキーワード入力欄が無効化される", () => {
    // useStateで現在地トグル状態を制御
    const Wrapper = () => {
      const [useCurrentLocation, setUseCurrentLocation] = React.useState(false);
      return (
        <SearchForm
          {...defaultProps}
          useCurrentLocation={useCurrentLocation}
          setUseCurrentLocation={setUseCurrentLocation}
        />
      );
    };
    render(<Wrapper />);
    const toggle = screen.getByRole("button", { name: /現在地から検索/ });
    fireEvent.click(toggle);
    // キーワード入力欄がdisabledになる
    expect(
      screen.getByPlaceholderText("エリア名・地名・駅名など")
    ).toBeDisabled();
  });

  it("キーワード入力欄に値を入力すると反映される", () => {
    // 入力値をuseStateで制御
    const Wrapper = () => {
      const [keyword, setKeyword] = React.useState("");
      return (
        <SearchForm
          {...defaultProps}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      );
    };
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("エリア名・地名・駅名など");
    fireEvent.change(input, { target: { value: "新宿" } });
    expect(input).toHaveValue("新宿");
  });
});
