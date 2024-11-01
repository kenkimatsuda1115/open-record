import "@testing-library/jest-dom";
import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("ボタンが表示されること", () => {
    render(<Button>テストボタン</Button>);
    const buttonElement = screen.getByText("テストボタン");
    expect(buttonElement).toBeInTheDocument();
  });

  test("ボタンがクリックできること", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリックテスト</Button>);
    const buttonElement = screen.getByText("クリックテスト");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("ボタンのスタイルが適切であること", () => {
    const customStyle = { backgroundColor: "red" };
    render(<Button style={customStyle}>スタイルテスト</Button>);
    const buttonElement = screen.getByText("スタイルテスト");
    expect(buttonElement).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
  });
  test("無効なボタンがクリックできないこと", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        無効なボタン
      </Button>,
    );
    const buttonElement = screen.getByText("無効なボタン");
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
