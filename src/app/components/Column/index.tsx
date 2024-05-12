import styled from "@emotion/styled";

export const AutoColumn = styled.div<{
  gap?: "sm" | "md" | "lg" | string;
  justify?:
    | "stretch"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "space-between";
}>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) =>
    (gap === "sm" && "8px") ||
    (gap === "md" && "12px") ||
    (gap === "lg" && "16px") ||
    gap};
  justify-items: ${({ justify }) => justify && justify};
`;
