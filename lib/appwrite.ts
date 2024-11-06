import { Client, Account, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "672b7dbb0038c55262ee",
  databaseId: "672b82310022c10b3aec",
  userCollectioId: "672b88c4001d9a6fa475",
  videosCollectioId: "672b8823003121e0ef1c",
  storageId: "672b8a55000d137f4bca",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// register a user
// code use for testing purpose
const account = new Account(client);

export const createUser = () => {
  account
    .create(ID.unique(), "email@example.com", "password", "Walter O'Brien")
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
};
