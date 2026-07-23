import Link from "next/link";
import PlanForm from "@/components/PlanForm";
export default function PlanPage() {
  return (
    <main className="shell">
      <div className="topbar">
        <Link className="brand" href="/">
          SummerQuest <span>NYC</span>
        </Link>
        <Link href="/featured">Featured Plans</Link>
      </div>
      <h1 className="page-title">Build your day.</h1>
      <p className="muted">
        A few details, then one compatible NYC summer plan.
      </p>
      <PlanForm />
    </main>
  );
}
