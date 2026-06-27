import TenantTopbar from "@/components/tenant/Topbar";
import InquiryHistoryPanel from "@/components/tenant/InquiryHistoryPanel";

export default function TenantInquiriesPage() {
  return (
    <div>
      <TenantTopbar title="My Inquiries" />
      <div className="p-6">
        <InquiryHistoryPanel />
      </div>
    </div>
  );
}
