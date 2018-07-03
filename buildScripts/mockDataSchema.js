module.exports = {
  type: "object",
  properties: {
    fuelSavings: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
            unique: true,
            minimum: 1
          },
          newMpg: {
            type: "number",
            minimum: 10,
            maximum: 50
          },
          tradeMpg: {
            type: "number",
            minimum: 10,
            maximum: 50
          },
          newPpg: {
            type: "number",
            minimum: 1,
            maximum: 5
          },
          tradePpg: {
            type: "number",
            minimum: 1,
            maximum: 5
          },
          milesDriven: {
            type: "number",
            minimum: 1,
            maximum: 100000
          },
          milesDrivenTimeframe: {
            type: "string",
            pattern: "week|month|year"
          },
          dateModified: {
            type: "date",
            faker: "date.recent"
          }
        },
        required: [
          "id",
          "newMpg",
          "tradeMpg",
          "newPpg",
          "tradePpg",
          "milesDriven",
          "milesDrivenTimeframe",
          "dateModified"
        ]
      }
    }
  },
  required: ["fuelSavings"]
};
