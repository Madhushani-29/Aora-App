import {
  AuthSignInType,
  AuthSignUpType,
  PostType,
  UserType,
} from "@/types/Types";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Models,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "672b7dbb0038c55262ee",
  databaseId: "672b82310022c10b3aec",
  userCollectioId: "672b88c4001d9a6fa475",
  videosCollectioId: "672b8823003121e0ef1c",
  storageId: "672b8a55000d137f4bca",
};

// now no need to call like appWriteConfig.endpoint
// can directly call endpoint
const {
  endpoint,
  projectId,
  databaseId,
  userCollectioId,
  videosCollectioId,
  storageId,
} = appwriteConfig;

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// register a user
// code use for testing purpose
export const createUserTest = () => {
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

export const createUser = async ({
  email,
  password,
  userName,
}: AuthSignUpType) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );

    if (!newAccount) throw Error;

    // get avatar image with initials of user name
    const avatarUrl = avatars.getInitials(userName);

    await signIn({ email, password });

    // create new user
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectioId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: userName,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const signIn = async ({ email, password }: AuthSignInType) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const getCurrentUser = async () => {
  try {
    // get current logged in account
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // get current user from database
    // query is a appwrite query  feature
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectioId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    const userDocument = currentUser.documents[0] as unknown as UserType;

    // Check if the document has the expected structure of UserType
    if (
      userDocument.accountId &&
      userDocument.email &&
      userDocument.username &&
      userDocument.avatar
    ) {
      return userDocument;
    } else {
      throw new Error("User document does not match expected structure");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (): Promise<PostType[]> => {
  try {
    // combines two types (Models.Document and PostType) into a single type
    // & (Intersection Type): Combines both types into a single type that has all the properties of Models.Document and PostType
    const posts = await databases.listDocuments<Models.Document & PostType>(
      databaseId,
      videosCollectioId
    );

    const formattedPosts = posts.documents.map((doc) => ({
      title: doc.title,
      thumbnail: doc.thumbnail,
      video: doc.video,
      prompt: doc.prompt,
      $id: doc.$id,
      avatar: doc.avatar,
      creator: doc.creator,
    }));

    return formattedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};
