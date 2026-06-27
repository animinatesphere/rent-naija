import AdminTopbar from "@/components/admin/Topbar";
import Reveal from "@/components/Reveal";
import LandlordsTable from "@/components/admin/LandlordsTable";
import { tenantsList } from "@/lib/admin";

export default function AdminUsersPage() {
  return (
    <div>
      <AdminTopbar title="Users" />

      <div className="space-y-8 p-6">
        <Reveal>
          <h2 className="mb-3 font-semibold text-foreground">Landlords</h2>
          <LandlordsTable />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-3 font-semibold text-foreground">Tenants</h2>
          <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black/5 bg-black/2 text-xs uppercase text-foreground/40">
                <tr>
                  <th className="px-5 py-3">Tenant</th>
                  <th className="px-5 py-3">Saved Homes</th>
                  <th className="px-5 py-3">Inquiries</th>
                  <th className="px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {tenantsList.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3 font-medium text-foreground">{tenant.name}</td>
                    <td className="px-5 py-3 text-foreground/70">{tenant.savedHomes}</td>
                    <td className="px-5 py-3 text-foreground/70">{tenant.inquiries}</td>
                    <td className="px-5 py-3 text-foreground/50">{tenant.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
