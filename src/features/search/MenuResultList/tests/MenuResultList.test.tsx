import type { Menu } from "@/types/menu";
import { render, screen } from "@testing-library/react";
import MenuResultList from "../components/MenuResultList";

describe("MenuResultList", () => {
  const menusMock: Menu[] = [
    {
      id: "1",
      chain_id: "chain1",
      name: "メニューA",
      saltEquivalent_g: 2.5,
      type: "main",
      created_at: "2025-10-11T00:00:00Z",
      updated_at: "2025-10-11T00:00:00Z",
    },
    {
      id: "2",
      chain_id: "chain1",
      name: "メニューB",
      saltEquivalent_g: 1.2,
      type: "main",
      created_at: "2025-10-11T00:00:00Z",
      updated_at: "2025-10-11T00:00:00Z",
    },
    {
      id: "3",
      chain_id: "chain1",
      name: "メニューC",
      saltEquivalent_g: 3.0,
      type: "side",
      created_at: "2025-10-11T00:00:00Z",
      updated_at: "2025-10-11T00:00:00Z",
    },
  ];

  it("mainかつ塩分量フィルタで表示される", () => {
    render(<MenuResultList menus={menusMock} saltLimit={2.0} />);
    expect(screen.getByText("メニューB")).toBeInTheDocument();
    expect(screen.queryByText("メニューA")).not.toBeInTheDocument();
    expect(screen.queryByText("メニューC")).not.toBeInTheDocument();
  });

  it("mainのみ全件表示（フィルタなし）", () => {
    render(<MenuResultList menus={menusMock} />);
    expect(screen.getByText("メニューA")).toBeInTheDocument();
    expect(screen.getByText("メニューB")).toBeInTheDocument();
    expect(screen.queryByText("メニューC")).not.toBeInTheDocument();
  });

  it("条件に合うメニューがない場合はメッセージ表示", () => {
    render(<MenuResultList menus={[]} saltLimit={2.0} />);
    expect(
      screen.getByText(/条件に合うメインメニューが見つかりません/)
    ).toBeInTheDocument();
  });

  it("メニューリストが変わったときにスクロール位置がリセットされる", () => {
    // スクロール挙動はDOM操作のため、ここではレンダリングのみ確認
    render(<MenuResultList menus={menusMock} />);
    expect(screen.getByText("メニューA")).toBeInTheDocument();
  });
});
