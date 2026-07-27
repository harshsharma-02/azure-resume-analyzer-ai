import fs from "fs";
import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (filePath) => {

    try {

        console.log("Reading PDF:", filePath);

        if (!fs.existsSync(filePath)) {
            throw new Error("PDF file not found");
        }

        const buffer = fs.readFileSync(filePath);

        const parser = new PDFParse({
            data: buffer
        });

        const result = await parser.getText();

        await parser.destroy();

        console.log("Extracted text length:", result.text.length);

        return result.text;


    } catch (error) {

        console.error("PDF Extraction Error:", error.message);

        throw new Error("Unable to parse the resume");

    }

};