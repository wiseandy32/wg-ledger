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

    // 1. Delete from Firebase Auth
    await auth.deleteUser(uid);

    // 2. Delete from Firestore
    // Find doc by uid field
    const snapshot = await adminDb
      .collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;

      await docRef.delete();
    } else {
      console.warn(`Firestore document not found for uid: ${uid}`);
    }

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
