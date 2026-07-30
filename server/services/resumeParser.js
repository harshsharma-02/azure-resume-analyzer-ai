import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (input) => {
  try {
    let buffer;

    if (Buffer.isBuffer(input)) {
      buffer = input;
    } else {
      if (!fs.existsSync(input)) {
        throw new Error("PDF file not found");
      }

      buffer = fs.readFileSync(input);
    }

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error.message);

    throw new Error("Unable to parse the resume");
  }
};