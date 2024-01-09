import { TreeNode } from "../models";
import Dummies from "../dummies/users.json";

export default {
  async get({ id = 0 } = {}) {
    const user = Dummies.find((user) => user.WWID === id);

    if (!user) {
      return null;
    }

    return new TreeNode({ name: `${user.FirstName} ${user.LastName}`, attributes: { ...user, path: [] }, children: [] });
  },
  async collapse({ manager = "", path } = {}) {
    return Dummies.filter((user) => user.Manager.toLowerCase() === manager.toLowerCase()).map(
      (user, index) => new TreeNode({ name: `${user.FirstName} ${user.LastName}`, attributes: { ...user, path: [...path, index] }, children: [] })
    );
  },
  async search({ search = "" } = {}) {
    return Dummies.filter((user) => user.FirstName.toLowerCase().includes(search.toLowerCase()) || user.LastName.toLowerCase().includes(search.toLowerCase()));
  },
};
