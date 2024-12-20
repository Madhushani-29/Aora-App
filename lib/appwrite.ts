import { useGlobalContext } from "@/context/GlobalProvider";
import {
  AuthSignInType,
  AuthSignUpType,
  CreatePostType,
  GlobalContextType,
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
  Storage,
  ImageGravity,
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
const storage = new Storage(client);

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

    const formattedPosts = posts.documents.map((doc) => {
      // if creator is a string parse it into a json objecy
      const creator =
        typeof doc.creator === "string" ? JSON.parse(doc.creator) : doc.creator;
      return {
        title: doc.title,
        thumbnail: doc.thumbnail,
        video: doc.video,
        prompt: doc.prompt,
        $id: doc.$id,
        avatar: creator?.avatar || "",
        creator: creator?.username || "Unknown Creator",
      };
    });

    return formattedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};

export const getLatestPosts = async (): Promise<PostType[]> => {
  try {
    const posts = await databases.listDocuments<Models.Document & PostType>(
      databaseId,
      videosCollectioId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    const formattedPosts = posts.documents.map((doc) => {
      const creator =
        typeof doc.creator === "string" ? JSON.parse(doc.creator) : doc.creator;
      return {
        title: doc.title,
        thumbnail: doc.thumbnail,
        video: doc.video,
        prompt: doc.prompt,
        $id: doc.$id,
        avatar: creator?.avatar || "",
        creator: creator?.username || "Unknown Creator",
      };
    });

    return formattedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};

export const searchPosts = async (query: string): Promise<PostType[]> => {
  try {
    const posts = await databases.listDocuments<Models.Document & PostType>(
      databaseId,
      videosCollectioId,
      [Query.search("title", query)]
    );

    const formattedPosts = posts.documents.map((doc) => {
      const creator =
        typeof doc.creator === "string" ? JSON.parse(doc.creator) : doc.creator;
      return {
        title: doc.title,
        thumbnail: doc.thumbnail,
        video: doc.video,
        prompt: doc.prompt,
        $id: doc.$id,
        avatar: creator?.avatar || "",
        creator: creator?.username || "Unknown Creator",
      };
    });

    return formattedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};

export const getPostsById = async (userId: string): Promise<PostType[]> => {
  try {
    const posts = await databases.listDocuments<Models.Document & PostType>(
      databaseId,
      videosCollectioId,
      [Query.equal("creator", userId)]
    );

    const formattedPosts = posts.documents.map((doc) => {
      const creator =
        typeof doc.creator === "string" ? JSON.parse(doc.creator) : doc.creator;
      return {
        title: doc.title,
        thumbnail: doc.thumbnail,
        video: doc.video,
        prompt: doc.prompt,
        $id: doc.$id,
        avatar: creator?.avatar || "",
        creator: creator?.username || "Unknown Creator",
      };
    });

    return formattedPosts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const getFilePreview = (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "center" as ImageGravity,
        100
      );
    } else {
      console.log("Invaild file type.");
      throw new Error("Invaild file type.");
    }

    if (!fileUrl) {
      throw new Error("No image found.");
    }
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const uploadFile = async (file: any, type: string) => {
  if (!file) {
    return;
  }

  const { mimeType, ...rest } = file;
  const asset = {
    type: mimeType,
    ...rest,
  };

  try {
    const uploadFile = await storage.createFile(storageId, ID.unique(), asset);
    const fileUri = await getFilePreview(uploadFile.$id, type);
    return fileUri;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const createPost = async (post: CreatePostType, userId: string) => {
  try {
    if (!userId) {
      throw new Error("Try again. Cannot verify the current user.");
    }
    const [thumbnail, video] = await Promise.all([
      uploadFile(post.thumbnail, "image"),
      uploadFile(post.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videosCollectioId,
      ID.unique(),
      {
        title: post.title,
        prompt: post.prompt,
        thumbnail: thumbnail,
        video: video,
        creator: userId,
      }
    );
    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
