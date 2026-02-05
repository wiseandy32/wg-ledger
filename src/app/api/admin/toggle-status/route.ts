import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { uid, disable, requesterUid } = await req.json();
    const { adminDb, auth } = initAdmin();

    if (!uid || typeof disable !== "boolean") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Optional: Verify requester is admin
    // Verify requester is admin
    if (!requesterUid) {
      return NextResponse.json(
        { error: "Requester UID is required" },
        { status: 400 },
      );
    }

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

    // 1. Disable/Enable in Firebase Auth directly using the Auth UID
    await auth.updateUser(uid, {
      disabled: disable,
    });

    // 2. Update Firestore status for UI sync
    // Since we now receive Auth UID, we need to find the document that has this uid.
    const snapshot = await adminDb
      .collection("users")
      .where("uid", "==", uid)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({
        isDisabled: disable,
      });
    } else {
      console.warn(`User document not found for uid: ${uid}`);
      // We still return success because the critical part (Auth disable) worked.
    }

    return NextResponse.json(
      {
        message: `User account ${disable ? "disabled" : "enabled"} successfully`,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error toggling user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 },
    );
  }
}
