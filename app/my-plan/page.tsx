import type { Metadata } from "next";
import MyPlanView from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
};

export default function MyPlanPage() {
  return <MyPlanView />;
}
