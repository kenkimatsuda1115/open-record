import "@testing-library/jest-dom";
import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  test("フッターが正しくレンダリングされること", () => {
    render(<Footer />);

    // フッター内のリンクが存在することを確認
    expect(screen.getByText("https://jser.info/")).toBeInTheDocument();
    expect(screen.getByText("https://zenn.dev/")).toBeInTheDocument();
  });

  test("リンクが正しい属性を持っていること", () => {
    render(<Footer />);

    const jserLink = screen.getByText("https://jser.info/").closest("a");
    const zennLink = screen.getByText("https://zenn.dev/").closest("a");

    // リンクの属性を確認
    expect(jserLink).toHaveAttribute("href", "https://jser.info/");
    expect(jserLink).toHaveAttribute("target", "_blank");
    expect(jserLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(zennLink).toHaveAttribute("href", "https://zenn.dev/");
    expect(zennLink).toHaveAttribute("target", "_blank");
    expect(zennLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("アイコン画像が正しく表示されること", () => {
    render(<Footer />);

    const fileIcon = screen.getByAltText("File icon");
    const windowIcon = screen.getByAltText("Window icon");

    // アイコンの属性を確認
    expect(fileIcon).toBeInTheDocument();
    expect(fileIcon).toHaveAttribute("src", "/file.svg");
    expect(fileIcon).toHaveAttribute("width", "16");
    expect(fileIcon).toHaveAttribute("height", "16");

    expect(windowIcon).toBeInTheDocument();
    expect(windowIcon).toHaveAttribute("src", "/window.svg");
    expect(windowIcon).toHaveAttribute("width", "16");
    expect(windowIcon).toHaveAttribute("height", "16");
  });
});
