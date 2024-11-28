import MiniSearch, { Options, SearchResult } from "minisearch";
import searchIndex from "../searchIndex.json";

// Define the structure of your index objects
interface Word {
  id: number;
  word: string;
}

// Define MiniSearch instance globally in Node.js
declare global {
  // Extend the Node.js global object
  var miniSearchCache: MiniSearch<Word> | undefined;
}

// Initialize MiniSearch and cache it globally
let miniSearch: MiniSearch<Word>;

if (!global.miniSearchCache) {
  console.log("Initializing MiniSearch and caching...");
  const options: Options<Word> = {
    fields: ["word"], // Fields to index for searching
    storeFields: ["word"], // Fields to return with search results
  };
  miniSearch = MiniSearch.loadJSON(JSON.stringify(searchIndex), options);
  global.miniSearchCache = miniSearch;
} else {
  console.log("Using cached MiniSearch instance");
  miniSearch = global.miniSearchCache;
}

export default miniSearch;
// Export a search function
// export function search(query: string): SearchResult[] {
//   return miniSearch.search(query);
// }
