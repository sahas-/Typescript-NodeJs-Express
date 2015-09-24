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

    getCategoryScore(division: string, product: string, application: string) {
      let query = {
        "sort": [
          {
            "timestamp": {
              "order": "desc"
            }
          }
        ],
        "size": 1,
        "fields": ["division", "product", "application", "categories.category", "categories.categoryscore"],
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "division": division
                }
              },
              {
                "match": {
                  "product": product
                }
              },
              {
                "match": {
                  "application": application
                }
              }
            ]
          }
        }
      }
      return(query);
    }
  }
}
