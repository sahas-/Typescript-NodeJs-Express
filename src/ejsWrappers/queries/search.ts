module ejsOperations {
  export class queries {
    
    getUnique(desc: string) {
      let query = {
        "fields": ["division", "product", "application"],
        "aggs": {
          "uniqueItems": {
            "terms": {
              "field": desc
            }
          }
        }
      }
      return (query);
    }
    getAllCategories() {
      let query = {
        "fields": [
          "division",
          "product",
          "application",
          "categories.category"
        ],
        "aggs": {
          "categories": {
            "nested": {
              "path": "categories"
            },
            "aggs": {
              "category": {
                "terms": {
                  "field": "categories.category"
                }
              }
            }
          }
        }
      }
      return (query);
    }
  }
}
