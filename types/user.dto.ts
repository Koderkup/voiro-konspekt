export interface User {
  uid: string;
  email: string;
  surname?: string;
  username: string;
  fullName: string;
  role: "guest" | "admin" | "student";
  profilePicURL?: string;
  accessibleNotes: string[];
  createdAt: number;
}
 export interface GoogleAuthProps {
   prefix: string;
 }

 export interface SignUpInputs {
   email?: string;
   password?: string;
   surname?: string;
   fullName?: string;
 }