import Topbar from "@/components/dashboard/Topbar";
import MessagesPanel from "@/components/dashboard/MessagesPanel";

export default function DashboardMessagesPage() {
  return (
    <div>
      <Topbar title="Messages" />
      <div className="p-6">
        <MessagesPanel />
      </div>
    </div>
  );
}
