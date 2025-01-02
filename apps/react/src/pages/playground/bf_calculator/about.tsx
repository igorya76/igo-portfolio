export default function () {
  return {
    title: `
      Bill of Material Calculator
    `,
    summary: `
      Construction material calculator to generate list 
      and overall cost of materials using different units of measure. 
    `,
    details: `
      ## Requirements
       * Add Items to a list including Cost and Quantity
       * Support calculation of specific units of measure: Square Foot (SF), Board Foot (BF), Cubic Foot (CF)
       * Allow list to be stored to Local Storage
      
      ## Design Limitations
       * No database needed, data stored in local storage
       * Common construction estimating Units of Measure used.
      
      ## Technology Used
       * React Context
       * Mui Text Fields
       * React-number-format
      `,
  };
}
