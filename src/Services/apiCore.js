import { apiProvider } from "./apiProvider";

export class ApiCore {
  constructor(options) {
    if (options.getAll) {
      this.getAll = (query) => {
        return apiProvider.getAll(options.url, query);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(options.url, id);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(options.url, model);
      };
    }

    if (options.put) {
      this.put = (id, model) => {
        return apiProvider.put(options.url, id, model);
      };
    }

    if (options.patch) {
      this.patch = (id, model) => {
        return apiProvider.patch(options.url, id, model);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}