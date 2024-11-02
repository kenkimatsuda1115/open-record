import "@testing-library/jest-dom";
import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

// ボタンコンポーネントのテスト
describe("Input Component", () => {
  test("入力フォームが正しくレンダリングされること", () => {
    const mockOnChange = vi.fn();
    render(
      <Input
        id="test-input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        label="テストラベル"
      />,
    );

    const inputElement = screen.getByLabelText("テストラベル");
    expect(inputElement).toBeInTheDocument();
  });

  test("入力値が変更されたときにonChangeが呼ばれること", () => {
    const mockOnChange = vi.fn();
    render(
      <Input
        id="test-input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        label="テストラベル"
      />,
    );

    const inputElement = screen.getByLabelText("テストラベル");
    fireEvent.change(inputElement, { target: { value: "テスト入力" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("requiredが指定された場合、必須入力項目となること", () => {
    const mockOnChange = vi.fn();
    render(
      <Input
        id="test-input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        label="テストラベル"
        required={true}
      />,
    );

    const inputElement = screen.getByLabelText("テストラベル");
    expect(inputElement).toHaveAttribute("required");
  });

  test("パスワードタイプの場合、入力値が隠されること", () => {
    const mockOnChange = vi.fn();
    render(
      <Input
        id="test-input"
        name="test"
        type="password"
        value=""
        onChange={mockOnChange}
        label="パスワード"
      />,
    );

    const inputElement = screen.getByLabelText("パスワード");
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
