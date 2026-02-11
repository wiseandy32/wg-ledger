import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { uid, requesterUid } = await req.json();
    const { adminDb, auth } = initAdmin();

    if (!uid || !requesterUid) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify requester is admin
    const requesterSnapshot = await adminDb
      .collection("users")
      .where("uid", "==", requesterUid)
      .limit(1)
      .get();

    if (requesterSnapshot.empty || !requesterSnapshot.docs[0].data().isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Requester is not an admin" },
        { status: 403 },
      );
    }

    // 1. Find user document by uid field
    const snapshot = await adminDb
      .collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn(`Firestore document not found for uid: ${uid}`);
      // Still try to delete from Auth even if Firestore doc not found
      await auth.deleteUser(uid);
      return NextResponse.json(
        { message: "User deleted from Auth (Firestore doc not found)" },
        { status: 200 },
      );
    }

    const userDocRef = snapshot.docs[0].ref;
    const userDocId = snapshot.docs[0].id;

    // 2. Delete all subcollections (transactions, etc.)
    const subcollections = ["transactions"];

    for (const subcollectionName of subcollections) {
      const subcollectionRef = adminDb.collection(
        `users/${userDocId}/${subcollectionName}`,
      );
      const subcollectionSnapshot = await subcollectionRef.get();

      // Delete all documents in the subcollection using batch
      const batchSize = 50; // Firestore batch limit
      let batch = adminDb.batch();
      let count = 0;

      for (const doc of subcollectionSnapshot.docs) {
        batch.delete(doc.ref);
        count++;

        if (count >= batchSize) {
          await batch.commit();
          batch = adminDb.batch();
          count = 0;
        }
      }

      // Commit any remaining deletions
      if (count > 0) {
        await batch.commit();
      }

      console.log(
        `Deleted ${subcollectionSnapshot.size} documents from ${subcollectionName} subcollection`,
      );
    }

    // 3. Delete the user document from Firestore
    await userDocRef.delete();

    // 4. Delete from Firebase Auth
    await auth.deleteUser(uid);

    return NextResponse.json(
      { message: "User account deleted permanently" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
