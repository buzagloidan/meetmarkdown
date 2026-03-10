export async function formatMarkdown(input: string): Promise<string> {
  const [prettier, markdownPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/markdown"),
  ]);
  return prettier.default.format(input, {
    parser: "markdown",
    plugins: [markdownPlugin.default],
    proseWrap: "always",
    printWidth: 80,
  });
}
