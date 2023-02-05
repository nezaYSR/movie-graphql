import { adminCredential } from "../../admin";
import ActorControllers from "../controllers/actorControllers";
import { actorMutations } from "../mutations/actorMutations";

describe("resolvers", () => {
  it("Should adding an actor by an Admin", async () => {
    const fetchedAdminToken = {
      username: adminCredential.username,
      password: adminCredential.password,
    };

    const args = {
      name: "Bambang",
      picLink: "",
      birthDate: "1990-12-11",
    };
    // actorMutations.addActor.resolve:()=>{}

    const func = await ActorControllers.addActor(null, args, fetchedAdminToken);

    console.log(123, func);
  });
});
