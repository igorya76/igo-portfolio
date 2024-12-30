import { tRecord } from "./context";

type tCalculations = {
  name: string;
  abbrev: string;
  description: string;
  typical_uses: string;
  formula: (rec: tRecord) => number;
  fieldsReq: {
    thickness?: boolean;
    width?: boolean;
    length?: boolean;
  };
};

export const constructionUnitOfMeasures: tCalculations[] = [
  {
    name: "Board Foot",
    abbrev: "BF",
    description:
      "A unit of quantity for lumber equal to the volume of a board 12 × 12 × 1 inches",
    typical_uses:
      "Random Length Lumber (trim, random length hardwood, bulk lumber purchases)",
    formula: (rec) => {
      let thicknessFactor = rec.thickness_unit === "in" ? 1 : 12;
      let widthFactor = rec.width_unit === "in" ? 1 : 12;
      let lengthFactor = rec.length_unit === "in" ? 1 : 12;
      let thicknessIn = rec.thickness || 0 * thicknessFactor;
      let widthIn = (rec.width || 0) * widthFactor;
      let lengthIn = (rec.length || 0) * lengthFactor;

      let value = (thicknessIn * widthIn * lengthIn) / 144;
      return Number(Number(value).toFixed(5));
    },
    fieldsReq: {
      length: true,
      thickness: true,
      width: true,
    },
  },
  {
    name: "Square Foot",
    abbrev: "SF",
    description: "A unit of area equal to a square one foot long on each side",
    typical_uses: "Paint, Roofing, Flooring",
    formula: (rec) => {
      // let thicknessFactor = rec.thickness_unit === "in" ? 12 : 1;
      let widthFactor = rec.width_unit === "in" ? 1 / 12 : 1;
      let lengthFactor = rec.length_unit === "in" ? 1 / 12 : 1;
      // let thicknessIn = rec.thickness || 0 * thicknessFactor;
      let widthIn = (rec.width || 0) * widthFactor;
      let lengthIn = (rec.length || 0) * lengthFactor;
      console.log({ widthIn, lengthIn, widthFactor });
      let value = widthIn * lengthIn;
      return Number(Number(value).toFixed(5));
    },
    fieldsReq: {
      length: true,
      width: true,
    },
  },
  {
    name: "Square Yards",
    abbrev: "SY",
    description: "A unit of area equal to a square one yard long on each side",
    typical_uses: "Carpet, turf, textiles",
    formula: (rec) => {
      // let thicknessFactor = rec.thickness_unit === "in" ? 12 : 1;
      let widthFactor = rec.width_unit === "in" ? 1 / 12 : 1;
      let lengthFactor = rec.length_unit === "in" ? 1 / 12 : 1;
      // let thicknessIn = rec.thickness || 0 * thicknessFactor;
      let widthIn = (rec.width || 0) * widthFactor;
      let lengthIn = (rec.length || 0) * lengthFactor;
      console.log({ widthIn, lengthIn, widthFactor });
      let value = widthIn * lengthIn;
      return Number(Number(value / 9).toFixed(5));
    },
    fieldsReq: {
      length: true,
      width: true,
    },
  },
  {
    name: "Cubic Yards",
    abbrev: "CY",
    description: "A unit of volume equal to a cube one yard long on each side.",
    typical_uses: "Concrete, Lancscape Materials (soil, stone, mulch) ",
    formula: (rec) => {
      let thicknessFactor = rec.thickness_unit === "in" ? 1 / 12 : 1;
      let widthFactor = rec.width_unit === "in" ? 1 / 12 : 1;
      let lengthFactor = rec.length_unit === "in" ? 1 / 12 : 1;
      let thicknessIn = (rec.thickness || 0) * thicknessFactor;
      let widthIn = (rec.width || 0) * widthFactor;
      let lengthIn = (rec.length || 0) * lengthFactor;
      console.log({ widthIn, lengthIn, widthFactor });
      let value = widthIn * lengthIn * thicknessIn;
      return Number(Number(value / 9).toFixed(5));
    },
    fieldsReq: {
      length: true,
      width: true,
    },
  },
  {
    name: "Each",
    abbrev: "EA",
    description: "A unit of measure equal to one piece.",
    typical_uses: "Physical count of pieces installed. ",
    formula: (rec) => {
      return rec.quantity;
    },
    fieldsReq: {},
  },
];
