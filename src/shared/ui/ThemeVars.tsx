/**
 * 테마 CSS 변수를 주입하는 컴포넌트.
 * themeTokens.ts 의 상수에서 자동으로 모든 CSS 변수를 계산합니다.
 */
import { DEFAULT, BOY, GIRL, buildCssVars } from "@/styles/themeTokens";

export function ThemeVars() {
  const css = `
:root {
  ${buildCssVars(DEFAULT)}
}
body[data-theme="boy"] {
  ${buildCssVars(BOY)}
}
body[data-theme="girl"] {
  ${buildCssVars(GIRL)}
}
`.trim();

  // eslint-disable-next-line react/no-danger
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
