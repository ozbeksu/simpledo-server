import { rule } from "graphql-shield";
import { IRuleResult } from "graphql-shield/typings/types";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, _args, ctx): Promise<IRuleResult> => {
    return ctx.userId !== null;
  }
);
