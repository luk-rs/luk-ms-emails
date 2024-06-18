import { Response } from "express";
import * as fs from "fs/promises";

const format = async (
  path: string,
  onError: (error: Error) => Response,
  replacements: Record<string, string>
) => {
  return await fs.readFile(path, "utf8").then((template) => {
    for (const key in replacements) {
      const value = replacements[key];
      template = template.replaceAll(key, value);
    }
    return template;
  });
};

export default { format };
